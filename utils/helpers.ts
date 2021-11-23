import { NodeEnvironments, RedisCachedKeys } from "./types"
import { redisClient } from "../config/redis"
import { Response } from "express"
import moment from "moment"


export const NODE_ENV = process.env.NODE_ENV ?? NodeEnvironments.DEVELOPMENT
export const isProduction = NODE_ENV === NodeEnvironments.PRODUCTION
export const isStaging = NODE_ENV === NodeEnvironments.STAGING
export const isDevelopment = NODE_ENV === NodeEnvironments.DEVELOPMENT

// This is the helper function to call directly check if any value exist inside redis:
// 1. if yes, return that value.
// 2. else store value in redis and return the data.
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


export const daysRemaining = (eventDate: string) => {
// Get today's date in ISO 8601 format
    const today = moment().format('YYYY-MM-DD')

// Calculate current age of person in years (moment truncates by default)
    const years = moment().diff(eventDate, 'years')

// Special case if birthday is today; we do NOT need an extra year added
    const adjustToday = eventDate.substring(5) === today.substring(5) ? 0 : 1

// Add age plus one year (unless birthday is today) to get next birthday
    const nextBirthday = moment(eventDate).add(years + adjustToday, 'years')

// Final calculation in days
    return nextBirthday.diff(today, 'days')
}