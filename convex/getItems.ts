import { query } from "./_generated/server";

// Returns all items with remaining stock.
export default query({
  handler: async ({ db }) => {
    // No auth is required here but also this makes the function very cacheable.
    console.log("fetching items");

    // Fetch all items with remaining stock.
    const items = await db
      .query("items")
      .withIndex("remaining", (q) => q.gt("remaining", 0))
      .collect();
    return items;
  },
});
