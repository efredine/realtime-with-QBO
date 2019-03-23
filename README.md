# realtime-with-QBO

This is a work in progress.

The idea is to build a demonstration of real-time integration with the [QuickBooks Online API](https://developer.intuit.com/app/developer/homepage). I imagine it as a very small subset of what I do in my work at [Beanworks](https://www.beanworks.com/) where all edits to the accounting data propagate in real-time.

So far it just allows a user to sign in to QuickBooks Online using OAuth 2. But that's a little bit interesting in it's own right, because it's done using `React`, `React Router`, `GraphQL`, `Apollo Client` with `Hooks` and `GraphQL Yoga` on the back-end. The QuickBooks developer portal provides excellent documentation and examples on how to get started. But it's all a bit old school. This provides an example of how it might look in a modern application!

Next up, I'm going to start fetching some actual data. Going to use Bills because that's what I know.

_Name is not meaningful in any way nod to Real-time With Bill Maher._
