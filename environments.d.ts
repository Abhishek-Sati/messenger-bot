// environments.d.ts
import { NodeEnvironments } from "./utils/types"


declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: string;
            PGHOST: string;
            PGDATABASE: string;
            PGUSER: string;
            PGPASSWORD: string;
            PGURI: string;
            NODE_ENV: NodeEnvironments;
            REDIS_PORT: string;
            WEBHOOK_VERIFY_TOKEN: string;
            FACEBOOK_PAGE_TOKEN: string;
        }
    }
}

export {}
