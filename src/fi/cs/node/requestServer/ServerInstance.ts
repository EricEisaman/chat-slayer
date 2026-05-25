export interface ServerListenCallback {
  (): void;
}

export interface ServerCloseCallback {
  (): void;
}

export interface ServerInstance {
  listen(
    port: number,
    hostname: string | undefined,
    listenCallback: ServerListenCallback,
  ): void;

  close(closeCallback: ServerCloseCallback): void;
}
