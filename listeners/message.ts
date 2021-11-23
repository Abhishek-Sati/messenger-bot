import { io } from "."
import { saveMessage } from "../actions/message"


io.on('sendMessage', async (data) => {
    await saveMessage(data.user_id, data.message)
    io.emit('receiveMessage', 'message received')
})