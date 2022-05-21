const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: 'host.docker.internal',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'main',
  }
});

export default knex;
