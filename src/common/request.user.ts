import { Request } from 'express';

export class RequestUser extends Request {
  user: {
    username: string;
    id: number;
  };
}
