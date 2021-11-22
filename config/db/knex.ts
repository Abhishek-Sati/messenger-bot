import { NodeEnvironments } from "../../utils/types"


const connection = {
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
}

export const knexConfig = {
    [NodeEnvironments.DEVELOPMENT]: {
        client: "pg",
        connection,
        useNullAsDefault: true,
    },
    [NodeEnvironments.STAGING]: {
        client: "pg",
        connection,
        useNullAsDefault: true,
    },
    [NodeEnvironments.PRODUCTION]: {
        client: "pg",
        connection,
        useNullAsDefault: true,
    },
}
