export class Message {
  id?: number;
  user_id: string;
  chat_room_id: number;
  message: string;
  // date: Date;
  status: number;
}

export interface ResponseMessage {
  message: string;
  data: {
    data: Message[];
  };
}

export interface ResponseOneMessage {
  message: string;
  data: Message;
}
