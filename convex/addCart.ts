import { Id } from './_generated/dataModel'
import { mutation } from './_generated/server'

// Moves the item to the given shopping cart and deducts one from the quantity
// in stock.
export default mutation(async ({ db }, itemId: Id<'items'>) => {
  // Check the item exists and has sufficient stock.
  const item = await db.get(itemId)
  if (item === null) {
    throw new Error(`No item with id ${itemId}`)
  }
  if (item.remaining <= 0) {
    throw new Error(`Insufficient stock of ${item.name}`)
  }

  // Add item to cart or increment count in cart.
  const cartItem = await db
    .query('carts')
    .filter((q) => q.eq(q.field('itemId'), itemId))
    .first()
  if (cartItem === null) {
    db.insert('carts', {
      itemId: itemId,
      count: 1,
    })
  } else {
    db.patch(cartItem._id, { count: cartItem.count + 1 })
  }

  // Deduct stock for item.
  db.patch(itemId, { remaining: item.remaining - 1 })
})
