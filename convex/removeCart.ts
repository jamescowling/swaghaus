import { v } from "convex/values";
import { mutation } from "./_generated/server";

export default mutation({
  args: { cartItemId: v.id("carts") },
  handler: async ({ db, auth }, { cartItemId }) => {
    console.log(`Removing cartItem ${cartItemId} from cart`);

    const identity = await auth.getUserIdentity();
    if (!identity) {
      throw new Error("getCart called without user auth");
    }
    const userToken = identity.tokenIdentifier;

    const cartItem = await db.get(cartItemId);
    if (cartItem === null) {
      throw new Error(`No cart item with id ${cartItemId}`);
    }
    if (cartItem.userToken != userToken) {
      throw new Error(
        `Cart item ${cartItemId} has user ${cartItem.userToken} instead of ${userToken}`,
      );
    }
    const item = await db.get(cartItem.itemId);
    if (item === null) {
      throw new Error(`No item with id ${cartItem.itemId}`);
    }

    // Remove item from cart or deduct quantity.
    if (cartItem.count > 1) {
      await db.patch(cartItem._id, { count: cartItem.count - 1 });
    } else {
      await db.delete(cartItem._id);
    }

    // Increment stock for item.
    await db.patch(item._id, { remaining: item.remaining + 1 });
  },
});
