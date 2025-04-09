# Shoppy - React E-commerce Practice Project

A responsive e-commerce web application built with React, Firebase, and React Query. This project was developed as a learning exercise to understand React fundamentals, state management, authentication, and real-time database operations.

## Features

- **User Authentication**: Login/logout functionality with Google authentication via Firebase
- **Product Browsing**: View all products with filtering by category
- **Product Details**: View detailed product information with options selection
- **Shopping Cart**: Add products to cart, adjust quantities, and remove items
- **Dynamic Tax Calculation**: Tax rates and shipping costs update based on selected location
- **Admin Panel**: Protected routes for admin users to add new products
- **Responsive Design**: Fully responsive UI that works on mobile, tablet, and desktop

## Technologies Used

- **React**: Frontend library for building the user interface
- **React Router**: For navigation and routing
- **React Query**: For server state management and data fetching
- **Firebase**: For authentication, database, and hosting
- **Tailwind CSS**: For styling and responsive design
- **Cloudinary**: For image storage and optimization

## Project Structure

- `src/api`: API integration with Firebase and image upload functionality
- `src/components`: Reusable UI components
- `src/context`: Context providers for authentication
- `src/pages`: Main page components

## Key Learning Points

- React component architecture and composition
- Context API for state management
- React Query for server state and cache management
- Firebase integration for authentication and real-time database
- Protected routes and role-based access control
- Form handling and validation in React
- Optimistic UI updates for a responsive user experience

## Getting Started

1. Clone the repository
2. Install dependencies with `npm install`
3. Create a `.env` file with your Firebase and Cloudinary credentials:
   ```
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_PROJECT_ID=your_project_id
   VITE_FIREBASE_DB_DOMAIN=your_db_url
   VITE_CLOUDINARY_PRESET=your_cloudinary_preset
   VITE_CLOUDINARY_URL=your_cloudinary_url
   ```
4. Run the development server with `npm run dev`

## Future Improvements

- Add search functionality
- Implement user profiles and order history
- Add product reviews and ratings
- Integrate a payment gateway
- Improve admin dashboard with sales analytics

## Acknowledgements

This project was created as a learning exercise to understand React and 
related technologies better. Logos (favicon) are created by ChatGPT. The 
cart icon in the navbar was fixed using claude. The solution was to set 
staleTime to 0 and add refetchOnWindowFocus: true (which is probably not an 
ideal solution).