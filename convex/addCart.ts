import { v } from "convex/values";
import { mutation } from "./_generated/server";

// Moves item to the given shopping cart and decrements quantity in stock.
export default mutation({
  args: { itemId: v.id("items") },
  handler: async ({ db, auth }, { itemId }) => {
    console.log(`Adding item ${itemId} to cart`);

    const identity = await auth.getUserIdentity();
    if (!identity) {
      throw new Error("getCart called without user auth");
    }
    const userToken = identity.tokenIdentifier;

    // Check the item exists and has sufficient stock.
    const item = await db.get(itemId);
    if (item === null) {
      throw new Error(`No item with id ${itemId}`);
    }
    if (item.remaining <= 0) {
      throw new Error(`Insufficient stock of ${item.name}`);
    }

    // Add item to cart or increment count in cart.
    const cartItem = await db
      .query("carts")
      .withIndex("user_item", (q) =>
        q.eq("userToken", userToken).eq("itemId", itemId)
      )
      .first();
    if (cartItem === null) {
      await db.insert("carts", {
        userToken,
        itemId: itemId,
        count: 1,
      });
    } else {
      await db.patch(cartItem._id, { count: cartItem.count + 1 });
    }

    // Deduct stock for item.
    await db.patch(itemId, { remaining: item.remaining - 1 });
  },
});
