export class CustomError extends Error {
  code: number;
  message: string;
  statusCode: number;
  constructor(code: number, message: string = '', statusCode: number) {
    super();
    this.code = code;
    this.message = message;
    this.statusCode = statusCode;
  }
}
