import knex from "../config/db"


export const findMessageById = (message_id: string) => {
    return knex("message")
        .where({ message_id })
        .first()
}