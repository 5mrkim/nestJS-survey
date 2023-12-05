import { CustomError } from '../common/customError';
import {
  ExceptionFilter,
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch(HttpException, CustomError)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception, host: ArgumentsHost) {
    console.log('요긴타나요?');
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    if (exception instanceof HttpException) {
      // HttpException 또는 하위 클래스인 경우
      response.status(status).json({
        code: status,
        success: false,
        message: exception.message,
      });
    } else if (exception instanceof CustomError) {
      // CustomError 클래스인 경우
      response.status(exception.statusCode).json({
        code: exception.code,
        success: false,
        message: exception.message,
      });
    }
  }
}
