export enum SocketEvent {
  NEW_MESSAGE = "new-message",
}

export interface SocketData<T> {
  event: SocketEvent;

  timestamp: Date;

  payload: T;
}

export type SocketCallback<T> = (data: T) => void;
