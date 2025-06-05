/**
 * Necesitas ejecutar en el terminal:
 * 
 * 1. npm init -y
 * 2. npm install mongodb
 */
const { MongoClient } = require('mongodb');

const client = new MongoClient('mongodb+srv://sololectura:sololectura@cluster0.c8tq0vp.mongodb.net');

async function run() {
  try {
    await client.connect();
    const db = client.db('companiesDB'); // usa el que pusiste en el URI
    const companies = db.collection('companies'); // suponiendo que la colección se llama así

    // Iteration 2: 1. All the companies whose name match 'Babelgum'. Retrieve only their `name` field.

    const results = await companies.find(
      { name: 'Babelgum' },
      { projection: { name: 1, _id: 0 } }
    ).toArray();

    console.log(results);
  } catch (error) {
    console.error('Error:', error);
  }
}

run();
