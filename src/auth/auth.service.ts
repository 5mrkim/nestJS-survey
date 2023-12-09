import { SigninDto, SignUpDto } from './dto/auth-dto';
import { User } from './../entity/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  //로그인
  async signIn(data: SigninDto) {}

  //회원가입
  async signUp(data: SignUpDto) {}
}
