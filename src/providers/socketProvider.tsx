import * as SecureStore from "expo-secure-store";
import React, { useCallback, useEffect } from "react";
import { Message } from "../api/domain/chat/chat.types";
import { Socket } from "../api/sockets/Sockets";
import { SocketEvent } from "../api/types/socket";
import { setAddEvent } from "../redux/chat";
import { useAppDispatch } from "../redux/hooks";

interface SocketProviderProps {
  children: React.ReactNode;
}

function SocketProvider({ children }: SocketProviderProps) {
  const dispatch = useAppDispatch();

  // Message handler
  const handleNewMessage = useCallback(
    (data: Message) => {
      console.log("📩 Nuevo mensaje recibido:", data);
      dispatch(setAddEvent(data));
    },
    [dispatch]
  );

  useEffect(() => {
    const initSocketFlow = async () => {
      try {
        const token = await SecureStore.getItemAsync("userToken");

        Socket.start();

        // Join 'chat-room' via public .emit() method (required by server.ts)
        Socket.emit("join-chat", {
          username: "Agustin Levin", // Aquí puedes pasar el user real de Redux
          token: token,
        });

        Socket.listen(SocketEvent.NEW_MESSAGE, handleNewMessage);
      } catch (error) {
        console.error("⚠️ Error inicializando SocketProvider:", error);
      }
    };

    initSocketFlow();

    // Limpieza al salir de la app o desloguear
    return () => {
      Socket.stop(SocketEvent.NEW_MESSAGE, handleNewMessage);
      Socket.disconnect();
    };
  }, [handleNewMessage]);

  return <>{children}</>;
}

export default React.memo(SocketProvider);
