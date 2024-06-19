import { api } from "../convex/_generated/api";
import { useMutation } from "convex/react";

export function ResetButton({}: {}) {
  const reset = useMutation(api.items.reset);

  return (
    <button className="btn" onClick={() => reset()}>
      Reset app
    </button>
  );
}
