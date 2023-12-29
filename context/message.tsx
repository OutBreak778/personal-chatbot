import { Message } from "@/lib/validators/message";
import { nanoid } from "nanoid";
import { createContext, useState } from "react";

export const MessageContext = createContext<{
    messages: Message[]
    MessageUpdate: boolean
    addMessage: (message: Message) => void
    removeMessage: (id: string) => void
    updateMessage: (id: string, updatefn: (prevText: string) => string) => void
    setMessageUpdate: (MessageUpdate: boolean) => void 
}>({
    messages: [],
    MessageUpdate: false,
    addMessage: () => {},
    removeMessage: () => {},
    updateMessage: () => {},
    setMessageUpdate: () => {}
})

export const MessageProvider = ({children}: {children: React.ReactNode}) => {
    
    const [MessageUpdate, setMessageUpdate] = useState<boolean>(false)
    const [ messages, setMessage] = useState<Message[]>([
        {
            id: nanoid(),
            text: "Hello how are you ?",
            isUser: false
        }
    ])

    const removeMessage = (id: string) => {
        setMessage((prev) => prev.filter((message) => message.id !== id))
    }

    const addMessage = (message: Message) => {
        setMessage((prev) => [...prev, message])
    }

    const updateMessage = (id: string, updateFn: (prevText: string) => string) => {
        setMessage((prev) => prev.map((message) =>{
            if(message.id === id) {
                return {...message, text: updateFn(message.text)}
            }

            return message
        }))
    }

    return(
        <MessageContext.Provider value={{
            messages,
            addMessage,
            removeMessage,
            updateMessage,
            MessageUpdate,
            setMessageUpdate
        }}>
            {children}
        </MessageContext.Provider>
    )
}