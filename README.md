# 1Stop

### Outline

We have developed an e-commerce platform that may be utilised by businesses looking to sell good online. The website will be geared towards smaller businesses in niche   markets that want a straight forward way to handle payments and control their offereings.

### Team Members

- Finn Tolmie - Backend Dev/Database
- Kate Goldfinch - Frontend Dev
- Dalia Alsuwayt - Backend / Frontend Dev
- Farhan Rashid - Backend / Frontend Dev

### Features

- Creation of frontend storefront and administrator interface
- Backend routes setup for product/user/orders and connected to MongoDB
- Implementation of Auth0 to handlle login and registation
- Endpoints protected for admin/regular users with json web tokens
- Added Stripe to handle checkout and payments
- Connected Stripe Webhooks to send confirmation email to customers with NodeMailer


### Using the Site
    
The administrator interface is protected by Auth0 login, to view login with the details {username: 'Finn@email.test', password : 'password'}

### Next Steps

If we were to continue the development of this project, one area we could focus on would be creating the infrastructure to host multiple stores on our platform.         Another area could be adding a recommender system to our platform to increase engagement and generate value for our clients.
