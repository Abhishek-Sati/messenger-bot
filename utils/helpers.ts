import { NodeEnvironments } from "./types"

export const NODE_ENV = process.env.NODE_ENV ?? NodeEnvironments.DEVELOPMENT
export const isProduction = NODE_ENV === NodeEnvironments.PRODUCTION
export const isStaging = NODE_ENV === NodeEnvironments.STAGING
export const isDevelopment = NODE_ENV === NodeEnvironments.DEVELOPMENT