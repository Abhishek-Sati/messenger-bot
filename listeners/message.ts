import { saveMessage } from "../actions/message"
import { Socket } from "socket.io"
import { MessageType } from "../utils/types"
import { findMessageById } from "../actions/common"
import { daysRemaining } from "../utils/helpers"


export type NewMessageType = {
    message: string
    message_id: string
    type: MessageType
    prevMessageId: string
    fromBot: boolean
};

export const respondAndSaveMessage = async (socket: Socket, messageData: NewMessageType) => {
    const { message, type, message_id, prevMessageId } = messageData
    let messageToSend: Omit<NewMessageType, 'message_id' | 'prevMessageId' | 'fromBot'> = {
        message: 'Enter your name',
        type: MessageType.NAME
    }
    switch (type) {
        case MessageType.NAME: {
            messageToSend = {
                message: 'Enter your date of birth',
                type: MessageType.DOB
            }
            break
        }
        case MessageType.DOB: {
            messageToSend = {
                message: 'Do you want count of days remaining till your birth day',
                type: MessageType.DAYS_LEFT
            }
            break
        }
        case MessageType.DAYS_LEFT: {
            if (message.toLocaleLowerCase().startsWith('y')) {
                const response = await findMessageById(prevMessageId)
                if (response) {
                    messageToSend = {
                        message: `There are ${daysRemaining(response.message)} days left until your next birthday`,
                        type: MessageType.END
                    }
                }
            } else {
                messageToSend = { message: 'Goodbye', type: MessageType.END }
            }
            break
        }
        default: {
            break
        }
    }
    await saveMessage(messageToSend.message)
    socket.emit('receiveMessage', { ...messageToSend, fromBot: true, prevMessageId: message_id })
}

export const sendMessageHandler = (socket: Socket) => async (data: NewMessageType, cb: (err: any, data?: any) => void) => {
    try {
        const [ response ] = await saveMessage(data.message) as [ NewMessageType ]
        cb(false, { ...data, message_id: response.message_id })
        await respondAndSaveMessage(socket, { ...data, message_id: response.message_id })
    } catch (e) {
        cb(true, e)
        return Promise.reject(e)
    }
}