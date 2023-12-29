import React from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'
import ChatHeader from './ChatHeader'
import ChatInput from './ChatInput'
import ChatMessages from './ChatMessages'

const Chat = () => {
  return (
    <div>
        <Accordion type='single' collapsible className='relative bg-white z-40 shadow'> 
            <AccordionItem value='item-1'>
                <div className="fixed right-10 w-72 md:w-[360px] lg:w-96 bottom-8 shadow-lg bg-white border border-gray-200 rounded-md overflow-hidden">
                    <div className="w-full-h-full flex flex-col">
                        <AccordionTrigger className='px-6 border-b border-neutral-300'>
                            <ChatHeader />
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="flex flex-col h-64 md:h-80 lg:h-96">
                                <ChatMessages className='flex flex-col h-64 md:h-80 lg:h-96' />
                            </div>
                            <ChatInput className='px-5' />
                        </AccordionContent>
                    </div>
                </div>
            </AccordionItem>
        </Accordion>
    </div>
  )
}

export default Chat