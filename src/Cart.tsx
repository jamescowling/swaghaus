import { api } from "../convex/_generated/api";
import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { CartItem as CartItem } from "./CartItem";
import { useAuth0 } from "@auth0/auth0-react";
import styles from "../styles/Cart.module.css";
import { Logout } from "./Logout";
import LoginButton from "./Login";

export function Cart() {
  return (
    <div>
      <Authenticated>
        <LoggedInCart />
      </Authenticated>
      <Unauthenticated>
        <LoginButton />
      </Unauthenticated>
    </div>
  );
}

function LoggedInCart() {
  const { user } = useAuth0();
  const cartItems = useQuery(api.cart.list) ?? [];

  return (
    <div>
      <div className={styles.cartHead}>
        <img className={styles.img} src={user!.picture} />
        <h2 className={styles.h2}>{user!.given_name}'s Cart</h2>
        <Logout />
      </div>
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
  );
}
