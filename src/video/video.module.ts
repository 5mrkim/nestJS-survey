import { User } from './../entity/user.entity';
import { CreateVideoHandler } from './create-video.handler';
import { Video } from './../entity/video.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { VideoController } from './video.controller';
import { VideoService } from './video.service';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [TypeOrmModule.forFeature([Video, User]), CqrsModule],
  controllers: [VideoController],
  exports: [VideoService],
  providers: [VideoService, CreateVideoHandler],
})
export class VideoModule {}
