import { Logger } from '@nestjs/common';
import { HttpExceptionFilter } from './http-exception/http-exception.filter';
import { NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { AppModule } from './app.module';
import { WinstonModule, utilities } from 'nest-winston';
import * as winston from 'winston';
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        new winston.transports.Console({
          level: process.env.STAGE === 'prod' ? 'info' : 'debug',
          format: winston.format.combine(
            winston.format.timestamp(),
            utilities.format.nestLike('NestJS', { prettyPrint: true }),
          ),
        }),
      ],
    }),
  });
  const port = process.env.PORT || 4000;

  app.useGlobalFilters(new HttpExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('설문지 API문서')
    .setDescription('설문지 API 문서입니다.')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
  };
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, customOptions);
  await app.listen(port);
  Logger.log(`${port} on listening`);
  Logger.log(process.env.STAGE);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
