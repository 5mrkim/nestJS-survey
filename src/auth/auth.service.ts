import { SigninDto, SignUpDto } from './dto/auth-dto';
import { User } from './../entity/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
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
  async signIn(data: SigninDto) {
    const { email, password } = data;
    console.log();
    const user = await this.userRepository.findOneBy({ email });
    return {
      accessToken: this.jwtService.sign({ sub: user.id }),
    };
  }

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
