import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  items: defineTable({
    name: v.string(),
    description: v.string(),
    price: v.float64(),
    remaining: v.float64(),
    image: v.string(),
  }),
  carts: defineTable({
    userToken: v.string(),
    itemId: v.id("items"),
    count: v.float64(),
  }),
});
