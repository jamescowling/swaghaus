// Server-side logic for managing a shopping cart.
//
// The functions in this file run on the Convex database and execute as
// transactions with ACID guarantees.

import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Returns the current shopping cart for the user.
export const list = query({
  handler: async ({ db, auth }) => {
    // Access control check.
    const identity = await auth.getUserIdentity();
    if (!identity) {
      throw new Error("cart.list called without user auth");
    }
    const userToken = identity.tokenIdentifier;
    console.log(`${identity.email} fetching cart items`);

    // Fetch all item ids from the user cart and then perform an
    // application-level join to get the details for each item.
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

// Moves item to the given shopping cart and decrements quantity in stock.
export const add = mutation({
  args: { itemId: v.id("items") },
  handler: async ({ db, auth }, { itemId }) => {
    // Access control check.
    const identity = await auth.getUserIdentity();
    if (!identity) {
      throw new Error("cart.add called without user auth");
    }
    const userToken = identity.tokenIdentifier;
    console.log(`${identity.email} adding item ${itemId} to cart`);

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

// Removes a single item from the cart.
export const remove = mutation({
  args: { cartItemId: v.id("carts") },
  handler: async ({ db, auth }, { cartItemId }) => {
    // Access control check.
    const identity = await auth.getUserIdentity();
    if (!identity) {
      throw new Error("removeCart called without user auth");
    }
    const userToken = identity.tokenIdentifier;
    console.log(`${identity.email} removing cartItem ${cartItemId} from cart`);

    // Check the cart item exists and belongs to the user.
    const cartItem = await db.get(cartItemId);
    if (cartItem === null) {
      throw new Error(`No cart item with id ${cartItemId}`);
    }
    if (cartItem.userToken != userToken) {
      throw new Error(
        `Cart item ${cartItemId} has user ${cartItem.userToken} instead of ${userToken}`
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
