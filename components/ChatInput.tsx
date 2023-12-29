"use client";

import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { HTMLAttributes, useContext, useRef, useState } from "react";
import { nanoid } from "nanoid";
import TextareaAutosize from "react-textarea-autosize";
import { Message } from "@/lib/validators/message";
import { MessageContext } from "@/context/message";
import { CornerDownLeft, Loader2 } from "lucide-react";
import {toast} from "react-hot-toast"

interface ChatInputProps extends HTMLAttributes<HTMLDivElement> {}

const ChatInput: React.FC<ChatInputProps> = ({ className, ...props }) => {
  const textareaRef = useRef<null | HTMLTextAreaElement>(null);

  const [input, setInput] = useState<string>("");
  const {
    messages,
    addMessage,
    removeMessage,
    updateMessage,
    setMessageUpdate,
  } = useContext(MessageContext);
  const { mutate: sendMessage, isPending } = useMutation({
    mutationFn: async (message: Message) => {
      const res = await fetch("/api/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: [message] }),
      });

      if(!res.ok) {
        throw new Error()
      }

      return res.body;
    },
    onMutate(message) {
      addMessage(message);
    },
    onSuccess: async (stream) => {
      if (!stream) {
        throw new Error("No Stream found");
      }

      const id = nanoid();
      const responseMessage: Message = {
        id,
        isUser: false,
        text: "",
      };

      addMessage(responseMessage);
      setMessageUpdate(true);

      const reader = stream.getReader();
      const decoder = new TextDecoder();

      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunk = decoder.decode(value);
        updateMessage(id, (prev) => prev + chunk);
      }

      setMessageUpdate(false);
      setInput("");

      setTimeout(() => {
        textareaRef.current?.focus();
      }, 10);
    },
    onError: (_, message) => {
      toast.error('Something went wrong. Please try again.')
      removeMessage(message.id)
      textareaRef.current?.focus()
    },
  });

  return (
    <div className={cn("border-t border-neutral-300", className)} {...props}>
      <div className="relative mt-4 flex-1 overflow-hidden rounded-lg border-none outline-none">
        <TextareaAutosize
          ref={textareaRef}
          rows={2}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();

              const message = {
                id: nanoid(),
                isUser: true,
                text: input,
              };
              sendMessage(message);
            }
          }}
          maxRows={4}
          autoFocus
          disabled={isPending}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask question about Nikhil..."
          className="peer disabled:opacity-50 pr-12 resize-none w-full border-0 bg-neutral-100 py-2
            text-neutral-900 focus:ring-0 text-sm leading-6"
        />
        <div className="absolute inset-y-0 right-0 flex py-2 pr-1.5">
          <kbd className="inline-flex items-center rounded-sm border bg-white border-neutral-300 px-2 text-gray-500">
            {isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <CornerDownLeft className="w-4 h-4" />
            )}
          </kbd>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 border-t border-neutral-400 peer-focus:border-t-2 peer-focus:border-indigo-600"
        />
      </div>
    </div>
  );
};

export default ChatInput;
