// importar un par de métodos del paquete mongodb para conectarnos a la base de datos
const { MongoClient, ServerApiVersion } = require("mongodb");

// Connection string: el string donde especificámos usuario:contraseña y URL de conexión 
const uri = "mongodb+srv://oscar:oscar@cluster0.c8tq0vp.mongodb.net/";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
}
);

// Busca todas las empresas que empiezan por el nombre "Ben" ordenalas de forma decreciente por año de creación. Solamente queremos obtener 20 empresas.
async function run() {
    try {
        // Connect the client to the server (optional starting in v4.7)
        await client.connect();

        // Una vez nos hemos conectado seleccionamos la base de datos 'companiesDB'
        const database = client.db("companiesDB");

        const companies = database.collection("companies");
        //All the companies that have more than 5000 employees. Limit the search to 20 companies and sort them by number of employees.
        const query = { number_of_employees: { $gt: 5000 } };

        // Objeto de opciones
        const options = {
            // Quiero quedarme solamente con el campo title y year 
            // Queremos ordenar por año de lanzamiento de forma decreciente
            projection: { _id: 0, name: 1, number_of_employees: 1 },
            sort: { number_of_employees: -1 },
            limit: 20

        };

        // Ejecutar la consulta 
        const cursor = companies.find(query, options);
        // Print a message if no documents were found
        if ((await companies.countDocuments(query)) === 0) {
            console.log("No documents found!");
        }

        // Print returned documents
        // El for va a hacer iterar el cursor por todos los resultados de la query. Cuando consultamos una posición de este cursor lo que hacemos es materializar un documento en nuestra aplicación nodejs. 
        for await (const doc of cursor) {
            console.dir(doc);
        }

        // finally es una palabra reservada que significa finalmente. Este bloque de código se ejecuta SIEMPRE , tanto si se ha producido un error como si todo ha ido bien.
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);
// ejetuamos la función y como es una función asíncrona, concatenamos la palabra reserva "catch" para capturar cualquier tipo de excepción que suelte nuestro código