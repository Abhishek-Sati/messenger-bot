import knex from "../config/db"


export const findUserById = (user_id: number) => {
    return knex("user")
        .where({ user_id })
}