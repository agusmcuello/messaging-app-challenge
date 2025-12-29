import { createContext, ReactNode, useContext } from "react";

interface MessageContextType {
  id: string;
}

const MessageContext = createContext<MessageContextType | null>(null);

export const useMessageContext = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("useMessageContext must be used within a MessageProvider");
  }
  return context;
};

interface MessageProviderProps {
  id: string;
  children: ReactNode;
}

export function MessageProvider({ id, children }: MessageProviderProps) {
  const contextValue: MessageContextType = {
    id,
  };

  return (
    <MessageContext.Provider value={contextValue}>
      {children}
    </MessageContext.Provider>
  );
}

export default MessageProvider;
