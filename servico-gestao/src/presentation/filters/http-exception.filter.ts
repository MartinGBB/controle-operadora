import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { RegistroNaoEncontradoError, RegraNegocioError } from 'src/domain/errors/regra-negocio.error';

@Catch() // Captura todas as exceções
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // Define o status: Se for um erro HTTP conhecido, usa ele.
    // Se for um erro genérico usa 500
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | string[] | object = 'Erro interno do servidor';

 if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      
      if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        message = exceptionResponse; // Mantém o objeto de erro do Nest (ex: array de validação)
      } else {
        message = exceptionResponse;
      }
    }
    else if (exception instanceof RegistroNaoEncontradoError) {
      status = HttpStatus.NOT_FOUND;
      message = exception.message;
    }
    else if (exception instanceof RegraNegocioError) {
      status = HttpStatus.BAD_REQUEST;
      message = exception.message;
    }
    // 3. Erros Genéricos (bugs não tratados)
    else if (exception instanceof Error) {
      message = exception.message; 
      console.error('Erro não tratado:', exception.stack);
    }

    console.error('Erro capturado:', exception);

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      ...(typeof message === 'object' ? message : { message }),
    });
  }
}
