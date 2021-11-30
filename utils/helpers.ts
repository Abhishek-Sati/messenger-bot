import { NodeEnvironments } from "./types"
import moment from "moment"


export const NODE_ENV = process.env.NODE_ENV ?? NodeEnvironments.DEVELOPMENT
export const isProduction = NODE_ENV === NodeEnvironments.PRODUCTION
export const isStaging = NODE_ENV === NodeEnvironments.STAGING
export const isDevelopment = NODE_ENV === NodeEnvironments.DEVELOPMENT


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