import React from 'react'

const ChatHeader = () => {
  return (
    <div className='w-fullgap-3 justify-start items-center text-neutral-800'>
        <div className="flex flex-col items-start text-sm">
            <p className="tex-tsx">Chat with</p>
            <div className="flex gap-1.5 items-center">
                <p className='w-2 h-2 rounded-full bg-green-500' />
                <p>Nikhil's Support system</p>
            </div>
        </div>
    </div>
  )
}

export default ChatHeader