# KFC UI

### Total hours spent:
- 30 minutes for the initial setup, including setting up React and all the dependencies needed.
- 30 minutes on how to properly manage the modules and mostly the state and the hooks.
- 2 hours of implementing and testing the User Order page and the Success page.
- 1 hour of implementing and testing the real time part of the orders.

Total hours spent: 4

## Documentation
The purpose of this project is to provide the client side for the KFC web application. The project is built in React and
follows the default structure (no redux is used). The implementation is included inside the **src** folder divided into 
the relevant sections including:

- **components**: This folder contains all the components required for building the React pages. The components are function-based
and not class-based.

- **context**: The context is responsible for maintaining the main state for the KFC UI application. It holds information that
are relevant to the items that a user can buy and an order object which is adjusted depending on what the user selects to purchase.

- **hooks**: The hooks section contains all the custom hooks that are needed for the react application. Specifically, there are
2 hooks: one for fetching the items in the page where users place the orders (**useFetchItems**) and one for fetching the orders
paginated in the merchant page (**useFetchOrders**). Both of these hooks fetch the information during the initialization fot the
relevant page the user or merchant enters. 

- **pages**: The pages sections contains all the pages needed for the KFC UI client side application. For the application,
3 pages are needed: one for the user to place the order (**UserOrderPage**), another one for displaying the success when the
order is placed successfully (**SuccessPage**) and the merchant page (**MerchantPage**). The pages are complext components
which are constructed by smaller components which implement a goal for the specific page.\
_Important side note: The merchant page is at `/merchant`_

- **App.js**: This file contains the main component of the react application. it is the one primarily rendered inside the **index.js**
which is the main file for the website. The app component contains the router component from react-router library which handles the proper
rendering of a page by mapping it with a specific route. Inside the Router component in the app component the routes are declared
where each route contains one of the page components previously mentioned. outside of the routes there is also a layout component which provides
the shell of the react page. As shell we define a set of components that should be rendered in every page that the react application contains.
The shell contains a set of components such as the menubar, navigation bar, footer, header etc. For the KFC UI application the shell contains 
a simple header and optionally the cart icon on the top right (not displayed in merchant and success page) which opens the modal for the user
to fill in their information and place the order.

## Common Conventions

When designing the implementation of the React application some designing choices had to be taken, some of which are:

- **State Management**: Since the state of the application contains primarily only 2 main objects, one for the items and
another one for the order that the user will place it was decided to not use redux for simplicity reasons. The **ItemsContext**
defines all the actions needed for handling the state including adding an item to the order, removing item from the order and
resetting the order object (**resetCart**). Although, **ItemsProvider** wraps also all the pages inside the app component.
It would be better to wrap only the User Order page but Layout component also needs some information from the context.
Better peformance could be achieved but it would require rearrangement of the components and especially for the Layout component.

- **UX Conventions**: Along with the implementation, some UX conventions were performed. For instance, when a user selects items
the items that the user selected are visible in the order card on the right. This accomplishes a better visibility of system status.
For the same reason it was essential to create the success page in order to make the user informed that the order has been placed successfully.
Finally, the currency convertion is performed in both items and the total price in the order card on the right. This provides the user
a control freedom to adjust the display of the price for a specific currency on any place they desire.

- **Orders Pagination**: At the beginning the initial convention was to only display the top N orders (where N is configurable number)
of orders in the merchant page, but in that way the merchant cannot see the previous orders which is a crucial mistake. Hence, pagination is required.
Regarding the visual representation of the pagination it was a controversial issue. Maybe a paginator could
be used to display what portion of orders the merchant displays that time, but this would require a dynamic update of the paginator once a new order comes in real time.
Finally, it is decided to display the N recent orders and adding any new order on top in real time. In the case when the merchant would desire to see the previous
orders, when scrolling at the bottom the N previous orders are fetched. It is a similar process that messaging applications follow.

## Build instructions

For the initial time when opening the project it is essential to execute the ```npm install``` command.

Additionally, in the project directory, the available scripts are:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the **build** folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.
In order to run the built scripts make sure to have **serve** installed. This can be achieved by executing the command
`npm install -g serve` and once it is installed inside the project directory execute the `npm run deploy` command.
