import { query } from "./_generated/server";

export default query({
  args: {},
  handler: async ({ db, auth }) => {
    console.log("Fetching cart");

    const identity = await auth.getUserIdentity();
    if (!identity) {
      throw new Error("getCart called without user auth");
    }
    const userToken = identity.tokenIdentifier;

    const cart = await db
      .query("carts")
      .filter((q) => q.eq(q.field("userToken"), userToken))
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
      }),
    );
    return cartItems;
  },
});
