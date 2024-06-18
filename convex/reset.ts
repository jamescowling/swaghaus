import { mutation } from "./_generated/server";

// Resets the application state, i.e., removes all items from all carts.
export default mutation({
  handler: async ({ db, auth }) => {
    // Access control check.
    const identity = await auth.getUserIdentity();
    if (!identity) {
      throw new Error("reset called without user auth");
    }
    console.log(`${identity.email} resetting application state`);

    // Fetch items from each cart, perform an application-level join to get the
    // details for each item, and then reset the stock.
    const cartItems = await db.query("carts").collect();
    Promise.all(
      cartItems.map(async (cartItem) => {
        const item = await db.get(cartItem.itemId);
        if (item === null) {
          throw new Error(`No item with id ${cartItem.itemId}`);
        }
        await db.patch(item._id, {
          remaining: item.remaining + cartItem.count,
        });
        await db.delete(cartItem._id);
      })
    );
  },
});
