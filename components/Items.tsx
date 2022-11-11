import { useQuery } from '../convex/_generated/react'
import { Item } from './Item'

export function Items() {
  const items = useQuery('getItems') ?? []

  return (
    <div>
      {items.map((item) => (
        <Item item={item} key={item._id.toString()} />
      ))}
    </div>
  )
}
