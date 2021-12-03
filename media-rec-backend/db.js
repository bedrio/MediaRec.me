const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "28uVYGf2JfM6LrXX",
    host: "database-2.cg8r25usay7f.us-east-2.rds.amazonaws.com",
    port: 5432,
    database: "userdata"
});

module.exports = pool;