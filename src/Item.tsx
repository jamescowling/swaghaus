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
    <div className="flex flex-row gap-4 items-center">
      <img className="w-40" src={item.image} />
      <div className="flex flex-col">
        <div className="text-lg font-bold">{item.name}</div>
        <div>{item.description}</div>
        <div className="font-bold">{formatter.format(item.price)}</div>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-x-4 gap-y-1 my-4">
          <button
            className="btn"
            onClick={() => addCart({ itemId: item._id })}
            disabled={!isAuthenticated}
          >
            Add to Cart
          </button>
          <div>({item.remaining} remaining)</div>
        </div>
      </div>
    </div>
  );
}
