const { Pool }= require("pg")
 const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "library",
    password: "Athira@10",
    port: 5433
});
module.exports=pool