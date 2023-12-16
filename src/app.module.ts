import { CqrsModule } from '@nestjs/cqrs';
import { LoggerMiddleware } from './../middleware/logger.middleware';
import { RefreshToken } from './entity/refreshtoken.entity';
import { SuccessInterceptor } from './interceptors/success.interceptor';
import { Answer } from './entity/answer.entity';
import { Choice } from './entity/choice.entity';
import { Question } from './entity/question.entity';
import { User } from './entity/user.entity';
import { Survey } from './entity/survey.entity';
import { MiddlewareConsumer, Module, NestModule, Logger } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SurveyModule } from './survey/survey.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ApolloDriver } from '@nestjs/apollo';
import { QuestionController } from './question/question.controller';
import { QuestionModule } from './question/question.module';
import { ChoiceController } from './choice/choice.controller';
import { ChoiceModule } from './choice/choice.module';
import { AnswerController } from './answer/answer.controller';
import { AnswerModule } from './answer/answer.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { VideoController } from './video/video.controller';
import { VideoModule } from './video/video.module';
import { Video } from './entity/video.entity';
import postgresConfig from './config/postgres.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [postgresConfig],
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60,
        limit: 10,
      },
    ]),
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      playground: true,
      debug: true,
      driver: ApolloDriver,
      path: '/graphql',
    }),
    // GraphQLModule.forRoot({
    //   typePaths: ['./src/**/*.graphql'],
    //   autoSchemaFile: 'schema.gql',
    //   playground: true,
    //   debug: true,
    //   driver: ApolloDriver, // Apollo Server를 직접 사용하도록 변경
    //   path: '/graphql',
    // }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        let obj: TypeOrmModuleOptions = {
          type: 'postgres',
          host: configService.get('postgres.host'),
          port: configService.get('postgres.port'),
          database: configService.get('postgres.database'),
          username: configService.get('postgres.username'),
          password: configService.get('postgres.password'),
          autoLoadEntities: true,
        };
        // 주의! development 환경에서만 개발 편의성을 위해 활용
        if (configService.get('NODE_ENV') === 'development') {
          console.info('Sync TypeORM');
          obj = Object.assign(obj, {
            synchronize: true,
            logging: true,
          });
        }
        return obj;
      },
    }),
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'localhost',
    //   port: parseInt(process.env.DB_PORT),
    //   username: 'postgres',
    //   password: 'postgres',
    //   database: 'postgres',
    //   entities: [Survey, Question, Choice, Answer, User, RefreshToken, Video],
    //   synchronize: true,
    //   logging: true,
    // }),
    CqrsModule,
    SurveyModule,
    QuestionModule,
    ChoiceModule,
    AnswerModule,
    AuthModule,
    VideoModule,
  ],
  controllers: [
    AppController,
    QuestionController,
    ChoiceController,
    AnswerController,
    AuthController,
    VideoController,
  ],
  providers: [
    AppService,
    Logger,
    { provide: APP_INTERCEPTOR, useClass: SuccessInterceptor },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
