import { query } from "./_generated/server";

// Returns the current shopping cart for the user.
export default query({
  handler: async ({ db, auth }) => {
    // Access control check.
    const identity = await auth.getUserIdentity();
    if (!identity) {
      throw new Error("getCart called without user auth");
    }
    const userToken = identity.tokenIdentifier;
    console.log(`${identity.email} fetching cart items`);

    // Fetch all item ids from the user cart and then perform an
    // application-level join to get the details for each item.
    //
    // user_item is a composite index on both the user and each item id but
    // we're just using the user here. Given the small size of the app none of
    // these indexes are strictly necessary but it's usually best to use an
    // index over a `filter` operation on tables that could scale up.
    const cart = await db
      .query("carts")
      .withIndex("user_item", (q) => q.eq("userToken", userToken))
      .collect();
    const cartItems = await Promise.all(
      cart.map(async (cartItem) => {
        const item = await db.get(cartItem.itemId);
        if (item === null) {
          throw new Error(`No item with id ${cartItem.itemId}`);
        }
        return {
          cartItem,
          item,
        };
      })
    );
    return cartItems;
  },
});
