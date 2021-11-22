import pg from "pg"
import knex from "knex"
import { knexConfig } from "./knex"
import { NODE_ENV } from "../../utils/helpers"


pg.types.setTypeParser(20, "text", parseInt)
const config = knexConfig[NODE_ENV]
export default knex(config)
