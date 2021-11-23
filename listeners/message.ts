import { saveMessage } from "../actions/message"
import { Socket } from "socket.io"


export const sendMessageHandler = (socket: Socket) => async (data: any, cb: (err: any, data?: any) => void) => {
    try {
        await saveMessage(data.message_id, data.message)
        cb(false, data)
        socket.emit('receiveMessage', 'message received')
    } catch (e) {
        cb(true, e)
    }
}