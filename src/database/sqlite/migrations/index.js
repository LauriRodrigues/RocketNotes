import database from "../index.js"
import { createUsers } from "./createUsers.js"

export default async function migrationsRun() {
  const schemas = [ 
    createUsers,
  ].join("")

  database()
  .then(db => db.exec(schemas))
  .catch(error => console.error(error))
}