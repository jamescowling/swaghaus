import { query } from "./_generated/server";
import { Doc } from "../convex/_generated/dataModel";

export default query(async ({ db }): Promise<Doc<"items">[]> => {
  console.log("fetching items");

  const items = await db
    .query("items")
    .filter((q) => q.gt(q.field("remaining"), 0))
    .collect();
  return items;
});
