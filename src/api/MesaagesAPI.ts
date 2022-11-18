export default class MessagesAPI {
  private readonly _socket: WebSocket;

  constructor(url: string) {
    this._socket = new WebSocket(url);
  }

  public open(callback: (message: string) => void): void {
    this._socket.addEventListener('open', () => {
      callback('Соединение установлено');
    });
  }

  public close(
    successCallback: (message: string) => void,
    errorCallback: (message: string) => void,
  ): void {
    this._socket.addEventListener('close', (event) => {
      if (event.wasClean) {
        successCallback('Соединение закрыто чисто');
      } else {
        errorCallback('Обрыв соединения');
        console.error(`Код: ${event.code} | Причина: ${event.reason}`);
      }
    });
  }

  public closeConnection(code: number, reason?: string): void {
    this._socket.close(code, reason);
  }

  public error(errorCallback: (event: Event) => void): void {
    this._socket.addEventListener('error', (event) => {
      errorCallback(event);
    });
  }

  public message(callback: (data: unknown) => void): void {
    this._socket.addEventListener('message', (event) => {
      // console.log(event.data);
      callback(event.data);
      // if (typeof event.data === 'string') {
      //   callback(JSON.parse(event.data));
      // } else {
      //   callback(event.data);
      // }
    });
  }

  public send(message: string, type = 'message'): void {
    this._socket.send(
      JSON.stringify({
        content: message,
        type,
      }),
    );
  }

  public ping(): void {
    setTimeout(() => {
      this._heartbeat();
    }, 10000);
  }

  private _heartbeat() {
    if (!this._socket || this._socket.readyState !== 1) {
      return;
    }

    this._ping();
    setTimeout(() => {
      this._heartbeat();
    }, 10000);
  }

  private _ping(): void {
    this._socket.send(
      JSON.stringify({
        type: 'ping',
      }),
    );

    console.log('websocket ping...');
  }
}
