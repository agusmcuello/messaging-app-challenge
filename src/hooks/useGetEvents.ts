import { useCallback } from "react";

import ChatService from "../api/domain/chat/chat.service";
import useQuery from "./useQuery";

const chatService = new ChatService();

export const useGetEvents = () => {
  const get = useCallback(async (data: any) => {
    return chatService.getEvents(data.limit, data.offset);
  }, []);

  return useQuery({ fetchFn: get });
};
