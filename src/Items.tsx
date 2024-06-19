import { api } from "../convex/_generated/api";
import { useQuery } from "convex/react";
import { Item } from "./Item";

export function Items() {
  const items = useQuery(api.items.list) ?? [];

  return (
    <div className="flex flex-col gap-4">
      {items.map((item) => (
        <Item item={item} key={item._id.toString()} />
      ))}
    </div>
  );
}
