import { Items } from "./Items";
import { Cart } from "./Cart";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Authenticated } from "convex/react";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="flex">
        <Items />
        <Authenticated>
          <Cart />
        </Authenticated>
      </div>
      <Footer />
    </div>
  );
}
