import { query } from "./_generated/server";

export default query({
  args: {},
  handler: async ({ db }) => {
    console.log("fetching items");

    const items = await db
      .query("items")
      .filter((q) => q.gt(q.field("remaining"), 0))
      .collect();
    return items;
  },
});
