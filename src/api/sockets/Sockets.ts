import io, { Socket as SocketType } from "socket.io-client";

import { config } from "../config";
import { SocketCallback, SocketEvent } from "../types/socket";

export class Socket {
  private static socket?: SocketType;

  static start() {
    Socket.socket = io(`${config.socketUrl}`);

    Socket.socket.on("connect", () => {
      Socket.socket?.emit("join-chat", { username: "testuser" });
    });
  }

  static async listen<T>(event: SocketEvent, callback: SocketCallback<T>) {
    if (!Socket.socket) {
      Socket.start();
    }

    return new Promise<void>((resolve) => {
      const setupListener = () => {
        Socket.socket?.on(event, (data) => {
          callback(data);
        });
        resolve();
      };

      if (Socket.socket?.connected) {
        setupListener();
      } else {
        Socket.socket?.on("connect", setupListener);
      }
    });
  }

  static async stop<T>(event?: SocketEvent, callback?: SocketCallback<T>) {
    if (!Socket.socket) {
      return;
    }

    Socket.socket.off(event, callback);
  }

  static isConnected() {
    return !!Socket.socket;
  }

  static async disconnect() {
    Socket.socket?.disconnect();
    Socket.socket = undefined;
  }

  static async removeAllListeners(event?: SocketEvent) {
    Socket.socket?.removeAllListeners(event);
  }
}
