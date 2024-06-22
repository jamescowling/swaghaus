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
    <div className="flex flex-row gap-4 mx-4 items-center">
      <img className="w-20 md:w-32" src={item.image} />
      <div>
        <div className="text-sm md:text-lg font-bold">{item.name}</div>
        <div className="text-sm md:text-base">{cartItem.count} in cart</div>
        <div className="text-sm md:text-base">
          Total:{" "}
          <span className="font-bold">
            {formatter.format(cartItem.count * item.price)}
          </span>
        </div>
        <button
          className="btn text-sm md:text-base"
          onClick={() => removeCart({ cartItemId: cartItem._id })}
        >
          Remove
        </button>
      </div>
    </div>
  );
}
