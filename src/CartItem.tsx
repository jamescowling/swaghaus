import { api } from "../convex/_generated/api";
import { useMutation } from "convex/react";
import { Doc } from "../convex/_generated/dataModel";

export function CartItem({
  cartItem,
  item,
}: {
  cartItem: Doc<"carts">;
  item: Doc<"items">;
}) {
  const removeCart = useMutation(api.cart.remove);
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <div>
      <img className="w-20" src={item.image} />
      <div>
        <div>{item.name}</div>
        <div>{cartItem.count} in cart</div>
        <div>
          Total: <span>{formatter.format(cartItem.count * item.price)}</span>
        </div>
        <button
          className="btn btn-blue"
          onClick={() => removeCart({ cartItemId: cartItem._id })}
        >
          Remove
        </button>
      </div>
    </div>
  );
}
