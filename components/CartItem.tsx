import styles from '../styles/Home.module.css'
import { useMutation } from '../convex/_generated/react'
import { Document } from '../convex/_generated/dataModel'

export function CartItem({
  cartItem,
  item,
}: {
  cartItem: Document<'carts'>
  item: Document<'items'>
}) {
  const removeCart = useMutation('removeCart')
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })

  return (
    <div className={styles.cartItem}>
      <img className={styles.cartItemImage} src="hovercraft.jpeg" />
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
          onClick={() => removeCart(cartItem._id)}
        >
          Remove
        </button>
      </div>
    </div>
  )
}
