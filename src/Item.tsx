import { api } from "../convex/_generated/api";
import { useConvexAuth, useMutation } from "convex/react";
import { Doc } from "../convex/_generated/dataModel";

export function Item({ item }: { item: Doc<"items"> }) {
  const { isAuthenticated } = useConvexAuth();

  const addCart = useMutation(api.cart.add);
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <div>
      <img className="w-40" src={item.image} />
      <div>
        <div>{item.name}</div>
        <div>{item.description}</div>
        <div>{formatter.format(item.price)}</div>
        <button
          className="btn btn-blue"
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
