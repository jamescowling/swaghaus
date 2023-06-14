import { defineSchema, defineTable } from "convex/schema";
import { v } from "convex/values";

export default defineSchema({
  items: defineTable({
    name: v.string(),
    description: v.string(),
    price: v.number(),
    remaining: v.number(),
    image: v.string(),
  }),
  carts: defineTable({
    userToken: v.string(),
    itemId: v.id("items"),
    count: v.number(),
  }),
});
