import { api } from "../convex/_generated/api";
import { useQuery } from "convex/react";
import { CartItem as CartItem } from "./CartItem";
import { useAuth0 } from "@auth0/auth0-react";

export function Cart() {
  const { user } = useAuth0();
  const cartItems = useQuery(api.cart.list) ?? [];

  return (
    <div className="shadow shadow-black w-full min-h-80">
      <div className="text-center text-xl p-4 font-bold">
        {user!.given_name}'s Cart
      </div>
      <div className="flex flex-col gap-4 p-2">
        {cartItems.map(({ cartItem, item }) => (
          <CartItem
            cartItem={cartItem}
            item={item}
            key={cartItem._id.toString()}
          />
        ))}
      </div>
    </div>
  );
}
