import { Catch, ArgumentsHost, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Response } from 'express';

@Catch(RpcException)
export class ExceptionToHttpFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    
    const error = exception.getError();
    
    const status = 
      typeof error === 'object' && 'statusCode' in error 
        ? (error as any).statusCode 
        : HttpStatus.BAD_REQUEST;

    const message = 
      typeof error === 'object' && 'message' in error 
        ? (error as any).message 
        : error;

    response.status(status).json({
      statusCode: status,
      message: message,
      timestamp: new Date().toISOString(),
    });
  }
}