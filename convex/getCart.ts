import { query } from './_generated/server'
import { Document } from '../convex/_generated/dataModel'

export default query(
  async ({
    db,
  }): Promise<{ cartItem: Document<'carts'>; item: Document<'items'> }[]> => {
    const cart = await db.query('carts').collect()
    // TODO make parallel
    const cartsAndItems = await Promise.all(
      cart.map(async (cartItem) => {
        const item = await db.get(cartItem.itemId)
        if (item === null) {
          throw new Error(`No item with id ${cartItem.itemId}`)
        }
        return {
          cartItem,
          item,
        }
      })
    )
    return cartsAndItems
  }
)
