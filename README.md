# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Getting Started:

After fetching the code run: <br>
npm install <br>
npm start

You should be able to see the results on http://localhost:3000

## Libs Used:

This project was made using the following libs: <br>

<ul> 
  <li>React Query to fetch server data</li>
  <li>React Table to manage table state</li>
  <li>Tailwind to style the components</li>
  <li>React Select</li>
  <li>Context API</li>
  <li>React Icons</li>
</ul>

# Keypoints of the project:
## Data Storage:

The data is storaged on cache of react query and context, basically everytime it is needed to fetch a pokemon the application check if this pokemon already exists on context and fetch if doesn't or those ones that doesn't. 

## Prefetch:

The application counts with prefetching of the next or previous page (it passes through a check up to see which page has to be fetched).

## Filter and search: 

Since searching for a pokemons type will give the user all data needed, the dropdown was made to filter the data displayed on the current page of the table ( only front end ). When searching for a pokemon on the backend, I decided to do my own pagination so it doesn't need to fetch all the data at once (100+ pokemons), which means it will only fetch the current page data and prefetch the next.


# What's next?:

Although it's working the code, it's still needed to go through refactoration in order to make more components reusable and test the aplication. It has many functions that are being used at many places, so it's crucial to create UNIT and INTEGRATION tests.








