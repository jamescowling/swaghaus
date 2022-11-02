import { useQuery } from '../convex/_generated/react'
import { CartItem as CartItem } from './CartItem'

export function Cart() {
  const cartItems = useQuery('getCart') ?? []
  return (
    <div>
      <h2>Shopping Cart</h2>
      <div>
        {cartItems.map(({ cartItem, item }) => (
          <CartItem
            cartItem={cartItem}
            item={item}
            key={cartItem._id.toString()}
          />
        ))}
      </div>
    </div>
  )
}
