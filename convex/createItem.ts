import { mutation } from './_generated/server'

export default mutation(({ db }) => {
  console.log('adding')
  db.insert('items', {
    name: 'yo',
    description: 'yo',
    image: 'convex.svg',
    remaining: Math.floor(Math.random() * 10) + 1,
    price: Math.floor(Math.random() * 100),
  })
})
