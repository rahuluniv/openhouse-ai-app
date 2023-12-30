# OpenHouse.AI Front End Web Development Project Documentation

## Overview
I have created this project which involves creating a web application using React to display data from RESTful endpoints. It presents a collection of geographic communities, including the average price of homes in each community.

## Project Structure

### Components
- **CommunityList**: Main component displaying the list of communities. Responsible for fetching, processing data, and rendering the UI.
- **App**: Root component initializing the application, fetching data from the endpoints, and passing it to `CommunityList`.

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

## Conclusion
This project demonstrates the creation of a functional, user-friendly web application that processes and displays data from external sources, showcasing skills in React, TypeScript, and Material-UI with a focus on user experience and responsive design.


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
