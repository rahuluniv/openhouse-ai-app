# OpenHouse.AI Front End Web Development Project Documentation

## Overview
I have created this project which involves creating a web application using React to display data from RESTful endpoints. It presents a collection of geographic communities, including the average price of homes in each community.

## Project Structure

### Components
- **CommunityList**: Main component displaying the list of communities. Responsible for fetching, processing data, and rendering the UI.
- **App**: Root component initializing the application, fetching data from the endpoints, and passing it to `CommunityList`.

### Time taken to Compelete the Project - 5 hours

## Key Features
- **Data Fetching**: Fetches data from `communities.json` and `homes.json` using Axios.
- **Data Processing**: Sorts communities alphabetically and calculates the average price of homes.
- **Filtering and Sorting**: Allows users to filter communities and sort homes by price and area.
- **Error Handling**: Handles network errors and invalid data gracefully.
- **Responsive Design**: Mobile-friendly and adaptable to different screen sizes.

## Libraries and Frameworks
- **React**: Used for building the user interface.
- **Material-UI**: For UI components and styling.
- **Axios**: For HTTP requests.
- **TypeScript**: For static type checking.

## Component Details
1. **CommunityList**: Renders community cards with name, image, and average home price. Includes a modal for home details.
2. **App**: Initializes the application, includes AppBar, Footer, and Select components for group filtering.

## Error Handling
- **Network Errors**: Displayed with an error message.
- **Image Errors**: Handled with a default 'image coming soon' placeholder.

## Potential Improvements (Follow Up Question)
- **Performance Optimization**: Implement lazy loading and paginated data fetching.
- **Accessibility Enhancements**: Improve accessibility for screen readers.
- **Advanced Filtering**: Add more filtering options like community name search.
- **UI/UX Enhancements**: Improve UI with animations and transitions.
- **Testing**: Comprehensive suite of unit and integration tests.
- **Code Organization**: Refactor for better modularity and readability.
- **State Management**: Use Redux or Context API for efficient state management.
- **Documentation**: Enhance comments and documentation for components and functions.

## Obstacles Faced and how I Solved Them 
## Introduction

This document details the approach and steps taken to resolve the Cross-Origin Resource Sharing (CORS) issue encountered during the development of our React.js and TypeScript application.

## Problem Statement

During development, we encountered a CORS policy error when attempting to fetch data from an external API. This error prevented our application from receiving the necessary data from the server.

## Solution Overview

To address this issue, a development-only proxy server was implemented to bypass CORS restrictions. This allowed our application to make requests to the external API without being blocked by CORS policy.

## Detailed Steps

### Installation of `http-proxy-middleware`

- Installed `http-proxy-middleware` in our React project to create a proxy server.

### Proxy Server Setup

- Created a `setupProxy.js` file in the `src` directory.
- Configured the proxy to forward requests from a specified path in our application to the target API server.

### Updating Axios Requests

- Modified Axios calls in our application to use the proxy route, ensuring all requests to the external API go through the proxy.

### Proxy Server Configuration

- Set the target to the external API’s base URL.
- Configured path rewriting to remove the proxy path prefix before forwarding requests.

### Environment-Specific Configuration

- Ensured that the proxy setup is used only in development to avoid any security risks in production.

## Results and Testing

The implementation of the proxy server successfully resolved the CORS issue. All Axios requests to the external API are now correctly routed through the proxy during development, allowing for the necessary data fetching without any CORS policy errors. Rigorous testing was conducted to ensure the functionality works as expected.

## Conclusion
This project demonstrates the creation of a functional, user-friendly web application that processes and displays data from external sources, showcasing my skills in React, TypeScript, and Material-UI with a focus on user experience and responsive design.

# Project Dependencies

This project has the following dependencies:

## Dependencies

- **@emotion/react (Version: 11.11.3)**
  - Description: The `@emotion/react` library provides a way to use Emotion CSS-in-JS styling with React applications.

- **@emotion/styled (Version: 11.11.0)**
  - Description: This library is a part of Emotion and allows you to style React components using tagged template literals.

- **@fontsource/roboto (Version: 5.0.8)**
  - Description: This package provides the Roboto font for your application.

- **@mui/icons-material (Version: 5.15.2)**
  - Description: Material-UI Icons is a set of icons designed for use with Material-UI components.

- **@mui/material (Version: 5.15.2)**
  - Description: Material-UI is a popular React UI framework that provides pre-designed components following the Material Design guidelines.

- **@testing-library/jest-dom (Version: 5.17.0)**
  - Description: This library extends Jest to provide a set of custom matchers for DOM elements. It's commonly used for testing React applications.

- **@testing-library/react (Version: 13.4.0)**
  - Description: Testing utilities for React applications, including `render` and `fireEvent` functions.

- **@testing-library/user-event (Version: 13.5.0)**
  - Description: This library provides simulated user events for testing, such as `click`, `type`, etc.

- **@types/jest (Version: 27.5.2)**
  - Description: TypeScript type definitions for Jest, enhancing your test development experience.

- **@types/node (Version: 16.18.69)**
  - Description: TypeScript type definitions for Node.js.

- **@types/react (Version: 18.2.46)**
  - Description: TypeScript type definitions for React.

- **@types/react-dom (Version: 18.2.18)**
  - Description: TypeScript type definitions for ReactDOM.

- **axios (Version: 1.6.3)**
  - Description: Axios is a popular HTTP client for making requests to APIs and servers.

- **react (Version: 18.2.0)**
  - Description: React is a JavaScript library for building user interfaces.

- **react-dom (Version: 18.2.0)**
  - Description: React DOM is a package that provides the integration of React with the browser's DOM.

- **react-scripts (Version: 5.0.1)**
  - Description: React Scripts is a set of scripts and configurations for managing and building React applications.

- **typescript (Version: 4.9.5)**
  - Description: TypeScript is a superset of JavaScript that adds static typing to the language.

- **web-vitals (Version: 2.1.4)**
  - Description: Web Vitals is a library for measuring web performance metrics like Core Web Vitals.

## DevDependencies

- **http-proxy-middleware (Version: 2.0.6)**
  - Description: This is a development dependency used to set up proxy middleware for handling HTTP requests during development, especially when working with backend APIs.

These dependencies and devDependencies are essential for building and running your React application. You can manage and update these dependencies using npm or yarn as needed for your project requirements.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
