import { api } from "../convex/_generated/api";
import { useConvexAuth, useMutation } from "convex/react";
import styles from "../styles/Item.module.css";
import { Doc } from "../convex/_generated/dataModel";

export function Item({ item }: { item: Doc<"items"> }) {
  const { isAuthenticated } = useConvexAuth();

  const addCart = useMutation(api.cart.add);
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <div className={styles.item}>
      <img className={styles.itemImage} src={item.image} />
      <div className={styles.itemText}>
        <div className={styles.itemName}>{item.name}</div>
        <div className={styles.itemDesc}>{item.description}</div>
        <div className={styles.itemPrice}>{formatter.format(item.price)}</div>
        <button
          className={styles.itemButton}
          onClick={() => addCart({ itemId: item._id })}
          disabled={!isAuthenticated}
        >
          Add to Cart
        </button>
        <span>({item.remaining} remaining)</span>
      </div>
    </div>
  );
}
