// Server-side logic for managing items in the store.
//
// The functions in this file run on the Convex database and execute as
// transactions with ACID guarantees.

import { query, mutation } from "./_generated/server";

// Returns all items with remaining stock.
export const list = query({
  handler: async ({ db }) => {
    // No auth is required here but also this makes the function very cacheable.
    console.log("fetching items");

    // Fetch all items with remaining stock.
    const items = await db
      .query("items")
      .withIndex("remaining", (q) => q.gt("remaining", 0))
      .collect();
    return items;
  },
});

// Resets the application state, i.e., removes all items from all carts.
//
// This function is very simple and just updates all carts at once. In a much
// larger application you might want to reset state a user or batch or users at
// a time
export const reset = mutation({
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
