import { Answer } from './entity/answer.entity';
import { Choice } from './entity/choice.entity';
import { Question } from './entity/question.entity';
import { SurveyService } from './survey/survey.service';
import { Survey } from './entity/survey.entity';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SurveyController } from './survey/survey.controller';
import { SurveyModule } from './survey/survey.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    // GraphQLModule.forRoot({
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
      entities: [Survey, Question, Choice, Answer],
      synchronize: true,
      logging: true,
    }),
    SurveyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
