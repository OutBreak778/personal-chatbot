"use client";

import { MessageContext } from "@/context/message";
import { cn } from "@/lib/utils";
import React, { HTMLAttributes, useContext, useEffect, useRef } from "react";
import MarkdownLite from "./MarkdownLite";

interface ChatMessageProps extends HTMLAttributes<HTMLElement> {}

const ChatMessages: React.FC<ChatMessageProps> = ({ className, ...props }) => {
  const { messages } = useContext(MessageContext);
  const invertMessage = [...messages];
  const messagesEndRef = useRef<null | HTMLDivElement>(null); 

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages]);
  

  return (
    <div
      {...props}
      className={cn(
        "flex flex-col-reverse gap-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumg-rounded scrollbar-blue-lighter scrollbar-w-2 scrolling-touch",
        className
      )}
    >
        <div className="flex flex-grow" />
        {invertMessage.map((message) => (
            <div key={message.id} className="chat-message rounded-md mb-3">
                <div className={cn("flex items-end", {'justify-end': message.isUser})}>
                    <div className={cn("flex flex-col space-y-3 text-sm max-w-xs mx-3 overflow-x-hidden", {
                        'bg-blue-600 text-white rounded-sm': message.isUser,
                        'bg-neutral-200 text-neutral-900 rounded-sm': !message.isUser 
                    })}>
                        <span className={cn("px-4 py-3 rounded-lg")}>
                             {/* {message.text} */}
                          <MarkdownLite text={message.text} />
                        </span>
                    </div>
                </div>
            </div>
        ))}
        <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;

