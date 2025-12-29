import React, { useCallback, useEffect } from "react";
import { Message } from "../api/domain/chat/chat.types";
import { Socket } from "../api/sockets/Sockets";
import { SocketEvent } from "../api/types/socket";
import { setAddEvent } from "../redux/chat";
import { useAppDispatch } from "../redux/hooks";

interface SocketProviderProps {
  children: React.ReactNode;
}

function SocketProvider(props: SocketProviderProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    Socket.listen(SocketEvent.NEW_MESSAGE, handleNewMessage);

    return () => {
      Socket.stop(SocketEvent.NEW_MESSAGE);
    };
  }, []);

  const handleNewMessage = useCallback(
    (data: Message) => {
      dispatch(setAddEvent(data));
    },
    [dispatch]
  );

  return props.children;
}

export default React.memo(SocketProvider);
