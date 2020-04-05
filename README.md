[![Codacy Badge](https://api.codacy.com/project/badge/Grade/05523e3986724519b5a479d4ccac75c6)](https://www.codacy.com/manual/abdolrhman/travolic_task?utm_source=github.com&utm_medium=referral&utm_content=abdolrhman/travolic_task&utm_campaign=Badge_Grade)
[![Build Status](https://travis-ci.org/abdolrhman/travolic_task.svg?branch=master)](https://travis-ci.org/abdolrhman/travolic_task)

# Travolic Task

A simple module that consume an API, that gets hotels data,
then do some <br>

> <b>search, filter, pagination, sort</b>

## Getting Started

##### Install with `npm`:


```sh
git clone https://github.com/abdolrhman/travolic_task.git
cd travolic_task
npm install
npm run dev
```

##### Install with Docker


```
docker build -t travolic_task .
docker images
docker run -p 3000:3000 -d travolic_task
```

## Test
- To Run Test
```shell script
npm run test
```
- it covers most cases, this is an integration test, i could wrote Unite test, but for time i didn't. 

## Objective

- Consume Hotels API To:
  - Filter Date
  - Search
  - Paginate
  - Sort
- In Generic, Optimize Way


## Folder Structure

- Src
    - api
      - controllers -> connect pieces together
      - middlewares -> error handler
      - routes -> map url to controller
      - services -> generic components
      - tests 
    - config -> app startup, logs, global variables

## Implementation Cycle

- Two main components 
    - Search, this one has main methods to filter data, 
    > ex: nameSearch, citySearch, DateSearch, priceSearch
    - organize, methods to organize data,
    > ex: sortBy, paginateHotels
