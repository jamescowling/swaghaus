// Schema for the online store.
//
// It's possible to start using Convex with no schema and to just let the system
// infer the types for you. In this case we're manually defining a schema and
// also defining some indexes. Indexes aren't strictly necessary on an app this
// small and the `filter` operation would suffice but they're generally always a
// good idea when you want to access into a table that might grow over time.

import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  items: defineTable({
    name: v.string(),
    description: v.string(),
    price: v.float64(),
    remaining: v.float64(),
    image: v.string(),
  }).index("remaining", ["remaining"]),
  carts: defineTable({
    userToken: v.string(),
    itemId: v.id("items"),
    count: v.float64(),
  }).index("user_item", ["userToken", "itemId"]),
});
