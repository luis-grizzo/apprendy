import knex from 'knex'

import { host, user, password, database } from "../configs/database.json";

const connection = knex({ 
  client: 'mysql',
  connection: { host, user, password, database },
  useNullAsDefault: true
});

export default connection;
