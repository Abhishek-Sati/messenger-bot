import { NodeEnvironments, RedisCachedKeys } from "./types"
import { redisClient } from "../config/redis"
import { Response } from "express"


export const NODE_ENV = process.env.NODE_ENV ?? NodeEnvironments.DEVELOPMENT
export const isProduction = NODE_ENV === NodeEnvironments.PRODUCTION
export const isStaging = NODE_ENV === NodeEnvironments.STAGING
export const isDevelopment = NODE_ENV === NodeEnvironments.DEVELOPMENT


export const getRedisClientCache = (redisKey: RedisCachedKeys, cb: (args?: any) => Promise<any>, res?: Response, args?: any) => {
    redisClient.get(redisKey, async (error, reply) => {
        if (reply) {
            const cachedData = JSON.parse(reply as string)
            if (res) {
                res.status(200).send({ data: cachedData, count: cachedData.length })
            }
        } else {
            const fetchedData = await cb(args)
            redisClient.set(redisKey, JSON.stringify(fetchedData))
            if (res) {
                res.status(200).send({ data: fetchedData, count: fetchedData.length })
            }
        }
    })
}