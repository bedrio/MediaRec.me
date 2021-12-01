const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "28uVYGf2JfM6LrXX",
    host: "localhost",
    port: 5432,
    database: "userdata"
});

module.exports = pool;