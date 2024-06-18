import { api } from "../convex/_generated/api";
import { useMutation } from "convex/react";

export function ResetButton({}: {}) {
  const reset = useMutation(api.items.reset);

  return <button onClick={() => reset()}>Reset app state</button>;
}
