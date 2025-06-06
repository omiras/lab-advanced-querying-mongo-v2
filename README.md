![logo_ironhack_blue 7](https://user-images.githubusercontent.com/23629340/40541063-a07a0a8a-601a-11e8-91b5-2f13e4e6b441.png)

# MongoDB | Advanced Querying

### Iteration 1 - Notas para el certificado IFCD0210

Tenemos dos opciones para trabajar con esa base de datos

### Setup de proyecto y dependencias

`npm init -y`
`npm install mongodb`

### Sencilla

Usar esta _connection string_ para acceder a la base de datos companiesDB:

`mongodb+srv://sololectura:sololectura@cluster0.c8tq0vp.mongodb.net`

Además, dispones del fichero index-ayuda.js si no quieres implementar el código de cero.

### Completa

Cargar nosotros mismos el JSON en nuestra base de datos de MongoDB atlas. 
Para ello debemos:

1. Descargar mongoDB Tools - [enlace](https://www.mongodb.com/try/download/database-tools)
2. Descomprimir el fichero _crunch-database.zip_ donde hemos descargado las herramientas mongoDB Tools
3. Ejecutar 
```
mongoimport --uri "TU_URI_DE_CONEXIÓN/companiesDB" \
  --collection companies \
  --file data.json \
```

### Fichero index.js

## Introduction

We are back with our queries! :wink:

We have learned some super useful query operators that will helps us to make much better queries to retrieve the data we need. For this lab, we will be using the **Crunchbase** database. Please keep reading and work on the following iterations.

## Requirements

- Fork this repo
- Clone this repo



## Deliverables

Since we will be querying our database from Mongo Compass, you will need to copy/paste the `query`, `projection`, `sort`, `skip` and `limit` you entered on Mongo Compass. In the `queries.md` file, you will find the instructions about the queries you need to do, and a field to fill the answers.

### Example

1. This is an example

- **`query`**: /_You should copy/paste the query in here_/
- **`projection`**: /_You should copy/paste the projection in here_/
- **`sort`**: /_You should copy/paste the sort in here_/
- **`skip`**: /_You should copy/paste the skip in here_/
- **`limit`**: /_You should copy/paste the limit in here_/

## Instructions



### Iteration 1

First, we need to import the database we will be using for the `lab`. We will use the Crunchbase database. Crunchbase is the premier destination for discovering industry trends, investments, and news about hundreds of thousands of companies globally. From startups to Fortune 500s, Crunchbase is recognized as the primary source of company intelligence by millions of users globally.

The database contains more than 18k documents. Each document holds the data about each of the companies. A document looks like the following:

![image](https://user-images.githubusercontent.com/23629340/36494916-d6db1770-1733-11e8-903e-5119b3c1b688.png)

1. You will find the `.zip` file of the database on the **lab** folder.
2. Unzip the file
3. Open MongoDB Compass and connect to your MongoDB server.
4. Create a new database named `companiesDB` and inside of it a collection  named `companies`.
5. Import the data from the .json file in to the collection `companies`.
6. Check on MongoDB Compass if everything goes ok:

![image](https://user-images.githubusercontent.com/23629340/36534191-1f1bc5ec-17c6-11e8-9463-4945679b98c0.png)

### Iteration 2

You already know how this goes, so let's start working:

1. All the companies whose name match 'Babelgum'. Retrieve only their `name` field.

<details>
  <summary>Solution</summary>

- Query: `{name: 'Babelgum'}`
- Projection: `{name: 1, _id: 0}`

</details>

<br>

2. All the companies that have more than 5000 employees. Limit the search to 20 companies and sort them by **number of employees**.

<details>
  <summary>Solution</summary>

- Query: `{number_of_employees: { $gt: 5000 }}`
- Limit: `20`

</details>

<br>

3. All the companies founded between 2000 and 2005, both years included. Retrieve only the `name` and `founded_year` fields.

<details>
  <summary>Solution</summary>

- Query: `{$and: [{founded_year: {$gte: 2000}}, {founded_year:{$lte: 2005}}]}`
- Projection: `{name: 1, _id: 0, founded_year: 1}`

</details>

<br>

4. All the companies that had a IPO Valuation Amount of more than 100,000,000 and have been founded before 2010. Retrieve only the `name` and `ipo` fields.

<details>
  <summary>Solution</summary>

- Query: `{$and: [{'ipo.valuation_amount': {$gte: 10000000}}, {founded_year:{$lt: 2010}}]}`
    - Shorthand: `{founded_year: {$lt:2010}, "ipo.valuation_amount": {$gt: 100000000}}`
- Projection: `{name: 1, _id: 0, ipo: 1}`

</details>

<br>

5. All the companies that don't include the `partners` field.

<details>
  <summary>Solution</summary>

- Query: `{partners: {$exists: false}}`

</details>

<br>

6. All the companies that have a null type of value on the `category_code` field.

<details>
  <summary>Solution</summary>

- Query: `{category_code: {$type: 'null'}}`

</details>

<br>

7. Order all the companies by their IPO price in descending order.

<details>
  <summary>Solution</summary>

- Sort: `{'ipo.valuation_amount': -1}`

</details>

<br>

8. Retrieve the 10 companies with the most employees, order by the `number of employees`.

<details>
  <summary>Solution</summary>

- Query: `{ number_of_employees: { $exists: true } }`
- Sort:  `{number_of_employees: -1}`
- Limit: `10`

</details>

<br>

9. All the companies founded in the second semester of the year (July to December). Limit your search to 1000 companies.

<details>
  <summary>Solution</summary>

- Query: `{founded_month: {$gte: 7}}`
- Limit: `1000`

</details>

<br>

10. All the companies that have been founded on the first seven days of the month, including the seventh. Sort them by their `acquisition price` in descending order. Limit the search to 10 documents.

<details>
  <summary>Solution</summary>

- Query: `{founded_day: {$lte: 7}}`
- Sort: `{'acquisition.price_amount': -1}`
- Limit: `10`

</details>

<br>

### Iteration 3 (Bonus)

For an extra challenge and additional practice, try the following queries:

1. All the companies that have been acquired after 2010, order by the acquisition amount, and retrieve only their `name` and `acquisition` field.

<details>
  <summary>Solution</summary>

- Query: `{'acquisition.acquired_year': {$gt: 2010}}`
- Projection: `{name: 1, acquisition: 1, _id: 0}`
- Sort: `{'acquisition.price_amount': -1}`

</details>

<br>

2. Order the companies by their `founded year`, retrieving only their `name` and `founded year`.

<details>
  <summary>Solution</summary>

- Query: `{'founded_year': { '$ne': null }}`
- Projection: `{name: 1, founded_year: 1, _id: 0}`
- Sort: `{founded_year: 1}`

</details>

<br>

3. All the companies on the 'web' `category` that have more than 4000 employees. Sort them by the number of employees in ascending order.

<details>
  <summary>Solution</summary>

- Query: `{$and: [{category_code: 'web'}, {number_of_employees: {$gt: 4000}}]}`
- Sort: `{number_of_employees: 1}`

</details>

<br>

4. All the companies whose acquisition amount is more than 10,000,000 and the currency is 'EUR'.

<details>
  <summary>Solution</summary>

- Query: `{$and: [{'acquisition.price_currency_code': 'EUR'}, {'acquisition.price_amount': {$gt: 10000000}}]}`

</details>

<br>

5. All the companies that have been founded between 2000 and 2010, but have not been acquired before 2011.

<details>
  <summary>Solution</summary>

- Query: `{$and: [{founded_year: {$gte: 2000}}, {founded_year: {$lte: 2010}}, {'acquisition.acquired_year':{$gt:2011}}]}`

</details>

<br>

Happy Coding! :heart:
