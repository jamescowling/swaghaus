import { mutation } from './_generated/server'

export default mutation(({ db }) => {
  console.log('Creating dummy item')

  db.insert('items', {
    name: 'yo',
    description: 'yooo',
    image: 'convex.svg',
    remaining: Math.floor(Math.random() * 10) + 1,
    price: Math.floor(Math.random() * 100),
  })
})
