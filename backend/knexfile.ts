import path from "path";

import { host, user, password, database } from "./src/configs/database.json";

module.exports = {
  client: "mysql",
  connection: { host, user, password, database },
  migrations: {
    directory: path.resolve(__dirname, "src", "database", "migrations"),
  },
  seeds: {
    directory: path.resolve(__dirname, 'src', 'database', 'seeds')
  },
  useNullAsDefault: true,
};
