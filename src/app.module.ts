import { QuestionService } from './question/question.service';
import { HttpExceptionFilter } from './http-exception/http-exception.filter';
import { SuccessInterceptor } from './interceptors/success.interceptor';
import { Answer } from './entity/answer.entity';
import { Choice } from './entity/choice.entity';
import { Question } from './entity/question.entity';
import { User } from './entity/user.entity';
import { SurveyService } from './survey/survey.service';
import { Survey } from './entity/survey.entity';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SurveyController } from './survey/survey.controller';
import { SurveyModule } from './survey/survey.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { QuestionController } from './question/question.controller';
import { QuestionModule } from './question/question.module';
import { ChoiceController } from './choice/choice.controller';
import { ChoiceModule } from './choice/choice.module';
import { AnswerController } from './answer/answer.controller';
import { AnswerModule } from './answer/answer.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
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
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Survey, Question, Choice, Answer, User],
      synchronize: true,
      logging: true,
    }),
    SurveyModule,
    QuestionModule,
    ChoiceModule,
    AnswerModule,
    AuthModule,
  ],
  controllers: [
    AppController,
    QuestionController,
    ChoiceController,
    AnswerController,
    AuthController,
  ],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: SuccessInterceptor },
  ],
})
export class AppModule {}
