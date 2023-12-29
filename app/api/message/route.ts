import { chatbotPrompt } from "@/helpers/constants/ChatbotPrompt"
import { GPTMessage, OpenAIStream, OpenAIStreamPayload } from "@/lib/openaiStream"
import { MessageArraySchema } from "@/lib/validators/message"
import { NextResponse } from "next/server"


export async function POST(req: Request) {
    try {
        
        const {messages} = await req.json()
        const parseMessage = MessageArraySchema.parse(messages)

        const outBound: GPTMessage[] = parseMessage.map((message) => ({
            role: message.isUser ? 'user' : 'system',
            content: message.text,
        }))

        outBound.unshift({
            role: 'system',
            content: chatbotPrompt
        })

        const payload: OpenAIStreamPayload = {
            model: "gpt-3.5-turbo",
            messages: outBound,
            temperature: 0.4,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
            max_tokens: 150,
            stream: true,
            n: 1
        }

        const stream = await OpenAIStream(payload)


        return new Response(stream)

    } catch (error) {
        console.log("POST_route")
        return new NextResponse("Internal Server Error", {status: 500})
    }
}
