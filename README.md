# Clerk (universal cashier application)



## Functionality
The application supports 2 different payment methods.
1. Badge payment
2. Cash payment

### Badge payment
For the badge payment the [isleoflan/payment-terminal]() is necessary,
so that the application can read the serial number of the badge.
The badge is read out via a serial interface.

### Cash payment
The application does not need any additional tools for cash payments.

## Usage
The application should be installed on its own computer,
which is only there for the cash register system.
The login only works for users who are in the "chashier" group.

### Steps
1. Add the products to the "shopping cart".
2. Click on PAY
3. To activate the badge payment, hold the badge up to the terminal.
4.If the badge has enough money, the purchase can be continued.
