import io, { Socket as SocketType } from "socket.io-client";
import { config } from "../config";
import { SocketCallback, SocketEvent } from "../types/socket";

export class Socket {
  private static socket?: SocketType;

  static start() {
    if (Socket.socket) return;

    Socket.socket = io(`${config.socketUrl}`, {
      transports: ["websocket"],
      autoConnect: true,
    });

    Socket.socket.on("connect", () => {
      console.log("✅ Socket conectado con ID:", Socket.socket?.id);
    });

    Socket.socket.on("connect_error", (err) => {
      console.error("❌ Error de conexión Socket:", err.message);
    });
  }

  // Method for emitting events from the Provider (e.g., join-chat)
  static emit(event: string, data: any) {
    if (!Socket.socket) {
      this.start();
    }
    Socket.socket?.emit(event, data);
  }

  static async listen<T>(event: SocketEvent, callback: SocketCallback<T>) {
    if (!Socket.socket) {
      Socket.start();
    }

    Socket.socket?.on(event, (data) => {
      callback(data);
    });
  }

  static async stop<T>(event: SocketEvent, callback?: SocketCallback<T>) {
    if (Socket.socket) {
      Socket.socket.off(event, callback);
    }
  }

  static async disconnect() {
    if (Socket.socket) {
      Socket.socket.disconnect();
      Socket.socket = undefined;
    }
  }
}
