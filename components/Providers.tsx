"use client"

import { MessageProvider } from "@/context/message"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

interface ProvidersProps {
    children: React.ReactNode
}

const Providers: React.FC<ProvidersProps> = ({children}) => {
    const queryClient = new QueryClient()

    return(
        <QueryClientProvider client={queryClient}>
            <MessageProvider>
            {children}
            </MessageProvider>
        </QueryClientProvider>
    )
}

export default Providers