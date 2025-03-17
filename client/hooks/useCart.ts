// TODO create some custom hooks that do a couple of things.

// 1. useQuery to get cartData
// NOTE: will need to make a backend database for cartData and connect to it.
// In order to create a unique cartData record in the database, your database query for "AddToCart", will need to return the id for you to use on the client side.

// 2. useMutation to add new items and quanitites to the cartData record by cartId

// 4. useMutation to update / edit the cartData record by cartId

// 3. useMutation to remove items from the cartData record by cartId

// STRETCH: figure out a way to hold your "cartData" in lcoal storage, or a session, and only when someone makes a purchase, does it add an "order" record to the database. This way you're not clogging up your database with half completed orders AND its less of a security risk, so you don't have to worry about someone stealing or editing your cartData.
