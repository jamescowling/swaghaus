import { mutation } from "./_generated/server";

export default mutation({
  handler: async ({ db }) => {
    console.log("Resetting application state");

    const cartItems = await db.query("carts").collect();
    cartItems.forEach(async (cartItem) => {
      const item = await db.get(cartItem.itemId);
      if (item === null) {
        throw new Error(`No item with id ${cartItem.itemId}`);
      }
      await db.patch(item._id, { remaining: item.remaining + cartItem.count });
      await db.delete(cartItem._id);
    });
  },
});
