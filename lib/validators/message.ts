import {z} from "zod"

export const MessageSchema = z.object({
    id: z.string(),
    isUser: z.boolean(),
    text: z.string().min(4)
})

export const MessageArraySchema = z.array(MessageSchema)
export type Message = z.infer<typeof MessageSchema>
