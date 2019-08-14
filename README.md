# React Movies Project
This is a create react app with `react` and `redux` built in React 16.8

## Goal
Allow us to get movies, get movies details and search for movies.

## REST API
[themoviedb](https://www.themoviedb.org/documentation/api)

## React Pattern
ESLint using Airbnb styleguide

## Styles
`sass` without any frameworks

## Middlewares
`redux-thunk` and `redux-logger`

## Preview
[Check it out](https://react-movies-wesley.herokuapp.com/)

## Instructions
To get started developing right away:

### Config Env Vars
Create an `.env` file in the root of the project with the following information
* REACT_APP_ENV = `dev`
* REACT_APP_API_URL = `https://api.themoviedb.org/3`
* REACT_APP_API_KEY = `your API key`

Notice: If the `REACT_APP_ENV` is set to `production`, you will not able to see the redux dev tools neither the `redux-logger` middleware.

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
