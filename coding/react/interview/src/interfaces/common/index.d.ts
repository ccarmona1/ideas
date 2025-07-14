type ResponseMessage = 'ok';

export interface Response<T> {
  message: ResponseMessage;
  result?: T;
  results?: T[];
}
