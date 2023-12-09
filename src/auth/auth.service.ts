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
  //이메일 중복 찾기
  async findByEmail(email: string) {
    const result = await this.userRepository.findOneBy({ email });
    let isEmail: boolean = false;
    if (result) {
      isEmail = true;
    }
    return isEmail;
  }

  //로그인
  async signIn(data: SigninDto) {}

  //회원가입
  async signUp(email: string, password: string) {
    // const results = this.findByEmail(email)
    const result = await this.userRepository.create({
      email,
      password,
    });
    return await this.userRepository.save(result);
  }
}
