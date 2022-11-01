import { Id } from './_generated/dataModel'
import { mutation } from './_generated/server'

export default mutation(async ({ db }, cartItemId: Id<'carts'>) => {
  const cartItem = await db.get(cartItemId)
  if (cartItem === null) {
    throw new Error(`No cart item with id ${cartItemId}`)
  }
  const item = await db.get(cartItem.itemId)
  if (item === null) {
    throw new Error(`No item with id ${cartItem.itemId}`)
  }

  // Remove item from cart or deduct quantity.
  if (cartItem.count > 1) {
    db.patch(cartItem._id, { count: cartItem.count - 1 })
  } else {
    db.delete(cartItem._id)
  }

  // Increment stock for item.
  db.patch(item._id, { remaining: item.remaining + 1 })
})
