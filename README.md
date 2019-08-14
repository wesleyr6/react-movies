# React Movies Project
This is a create react app using (react + redux) built in React 16.8

## Goals
Get movies, get movies details and search for movies.

## REST APIs
[themoviedb](https://www.themoviedb.org/documentation/api)

## React Pattern
ESLint using Airbnb styleguide

## Styles
`sass`

## Middlewares
`redux-thunk` and `redux-logger`

## Preview
[Check it out](https://react-movies-wesley.herokuapp.com/)

## Instructions
To get started developing right away:

### Config Env Vars
Create a `.env` file in the root of the project with the following information
* REACT_APP_ENV = `dev`
* REACT_APP_API_URL = `https://api.themoviedb.org/3`
* REACT_APP_API_KEY = `your API key`

Notice: If the `REACT_APP_ENV` is set to `production`, you will not able to see the redux dev tools neither the middlewares.

### Client
* install all project dependencies with `npm install`
* start the development server with `npm start`

### Libraries
* axios
* eslint-config-airbnb
* moment
* node-sass
* prop-types
* query-string
* react
* react-dom
* react-helmet
* react-rating
* react-redux
* react-router-dom
* react-scripts
* redux
* redux-logger
* redux-thunk
