import { ParsedEvent, ReconnectInterval, createParser } from "eventsource-parser"

export type ChatGPTAgent = "user" | "system"

export interface GPTMessage {
    role: ChatGPTAgent,
    content: string
}

  export interface OpenAIStreamPayload {
    model: string;
    messages: GPTMessage[];
    temperature: number;
    top_p: number;
    frequency_penalty: number;
    presence_penalty: number;
    max_tokens: number;
    stream: boolean;
    n: number;
  }

export async function OpenAIStream(payload: OpenAIStreamPayload) {
    const encoder = new TextEncoder()
    const decoder = new TextDecoder()

    let cnt = 0

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
          },
          body: JSON.stringify(payload)
    })

    const stream = new ReadableStream({
        async start(controller) {
            function onParse(e: ParsedEvent | ReconnectInterval) {
                if(e.type === 'event') {
                    const data = e.data 
                    if(e.data === "[DONE]") {
                        controller.close()
                        return
                    }

                    try {

                        const json = JSON.parse(data)
                        const text = json.choices[0].delta?.content || ''
                        if(cnt < 2 && (text.match(/\n/) || []).length) {
                            return
                        }

                        const queue = encoder.encode(text)
                        controller.enqueue(queue)

                        cnt++

                    } catch (error) {
                        console.log("Error in openaiStream")
                        controller.error(error)
                    }
                }
            }

            const parser = createParser(onParse)
            for await (const chunk of res.body as any) {
                parser.feed(decoder.decode(chunk))
            }
        }
    })

    return stream
}