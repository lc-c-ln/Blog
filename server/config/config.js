module.exports  = {
  development: {
    user: "root",
    password: "0000",
    database: "nts",
    multipleStatements : true,
    host: "127.0.0.1"
  },
  production: {
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
    multipleStatements : true,
    host: process.env.host
  }
}
