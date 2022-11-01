import { defineSchema, defineTable, s } from 'convex/schema'

export default defineSchema({
  items: defineTable({
    name: s.string(),
    description: s.string(),
    price: s.number(),
    remaining: s.number(),
  }),
  carts: defineTable({
    itemId: s.id('items'),
    count: s.number(),
  }),
})
