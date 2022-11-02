import { useQuery } from '../convex/_generated/react'
import { CartItem as CartItem } from './CartItem'
import { useAuth0 } from '@auth0/auth0-react'

// Convert a string into a hex color for the background so we can make it more
// clear when adjacent browser windows are for different users. Code from
// https://stackoverflow.com/questions/3426404/create-a-hexadecimal-colour-based-on-a-string-with-javascript
var stringToColor = function (str: string) {
  var hash = 0
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  var color = '#'
  for (var i = 0; i < 3; i++) {
    var value = (hash >> (i * 8)) & 0xff
    color += ('00' + value.toString(16)).substr(-2)
  }
  return color
}

export function Cart() {
  const { user } = useAuth0()
  const cartItems = useQuery('getCart') ?? []
  const color = stringToColor(user!.sub!)

  return (
    <div>
      <h2 style={{
          backgroundColor: color,
          padding: '20px',
          margin: 0,
          textAlign: 'center',
        }}>{user?.given_name}'s Cart</h2>  
      <div>
        {cartItems.map(({ cartItem, item }) => (
          <CartItem
            cartItem={cartItem}
            item={item}
            key={cartItem._id.toString()}
          />
        ))}
      </div>
    </div>
  )
}
