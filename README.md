# Book Store Application

This Book Store application is a Node.js app that allows users to place orders for books and pens, with server-side validation and order processing. All orders are stored in MongoDB, and an order summary with detailed calculations is provided upon completion.

## Features
- Order books and pens:
  - HTML5 Books: $62.99 each
  - CSS3 Books: $51.99 each
  - Pens: $2.99 each
- Server-side validation for user input:
  - Name: cannot be empty
  - Student ID: must be a 7-digit number
- Order confirmation displays:
  - Subtotal (total cost of all items)
  - Tax (calculated at 13%)
  - Total Cost (Subtotal + Tax)
- View all orders on a separate page in a table format with order details, subtotal, tax, and total cost.
  
## Technologies Used
- **Frontend**: HTML, CSS, JavaScript, EJS (for templating)
- **Backend**: Node.js, Express
- **Database**: MongoDB

