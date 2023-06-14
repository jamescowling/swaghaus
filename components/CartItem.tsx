import styles from '../styles/CartItem.module.css'
import { useMutation } from '../convex/_generated/react'
import { Doc } from '../convex/_generated/dataModel'

export function CartItem({
  cartItem,
  item,
}: {
  cartItem: Doc<'carts'>
  item: Doc<'items'>
}) {
  const removeCart = useMutation('removeCart')
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })

  return (
    <div className={styles.cartItem}>
      <img className={styles.cartItemImage} src={item.image} />
      <div className={styles.cartItemText}>
        <div className={styles.cartItemName}>{item.name}</div>
        <div>{cartItem.count} in cart</div>
        <div>
          Total:{' '}
          <span className={styles.cartItemPrice}>
            {formatter.format(cartItem.count * item.price)}
          </span>
        </div>
        <button
          className={styles.cartItemButton}
          onClick={() => removeCart({ cartItemId: cartItem._id })}
        >
          Remove
        </button>
      </div>
    </div>
  )
}
