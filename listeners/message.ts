import { saveMessage } from "../actions/message"
import { Socket } from "socket.io"


export const sendMessageHandler = (socket: Socket) => async (data: any, cb: (err: any, data?: any) => void) => {
    try {
        const [ response ] = await saveMessage(data)
        cb(false, response)
        socket.emit('receiveMessage', { message: 'Message Received' })
    } catch (e) {
        cb(true, e)
        return Promise.reject(e)
    }
}