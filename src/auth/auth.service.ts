import { RefreshToken } from './../entity/refreshtoken.entity';
import { SigninDto, SignUpDto } from './dto/auth-dto';
import { User } from './../entity/user.entity';
import { Injectable, HttpException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(RefreshToken)
    private refreshTokenRepository: Repository<RefreshToken>,
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
  //리프레시토큰 발행
  private generateRefreshToken(userId: string) {
    const payload = {
      sub: userId,
      tokenType: 'refresh',
    };
    return this.jwtService.sign(payload, { expiresIn: '30d' });
  }
  //리프레시토큰 업데이트
  private async createRefreshTokenUsingUser(
    userId: string,
    refreshToken: string,
  ) {
    let refreshTokenEntity = await this.refreshTokenRepository.findOneBy({
      user: {
        id: userId,
      },
    });
    if (refreshTokenEntity) {
      refreshTokenEntity.token = refreshToken;
    } else {
      refreshTokenEntity = this.refreshTokenRepository.create({
        user: {
          id: userId,
        },
        token: refreshToken,
      });
    }
    await this.refreshTokenRepository.save(refreshTokenEntity);
  }

  private generateAccessToken(userId: string) {
    const payload = {
      sub: userId,
      tokenType: 'access',
    };
    return this.jwtService.sign(payload, { expiresIn: '1d' });
  }

  //로그인
  async signIn(data: SigninDto) {
    const { email, password } = data;

    const user = await this.userRepository.findOneBy({ email });
    if (!user) throw new HttpException('존재하지않는 유저입니다', 401);
    const refreshToken = this.generateRefreshToken(user.id);
    await this.createRefreshTokenUsingUser(user.id, refreshToken);

    return {
      accessToken: this.generateAccessToken(user.id),
      refreshToken,
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

  async refresh(token: string, userId: string) {
    const refreshTokenEntity = await this.refreshTokenRepository.findOneBy({
      user: {
        id: userId,
      },
    });
    console.log('111?', refreshTokenEntity);
    if (!refreshTokenEntity) throw new BadRequestException();

    const accessToken = this.generateAccessToken(userId);
    const refreshToken = this.generateRefreshToken(userId);
    refreshTokenEntity.token = refreshToken;
    await this.refreshTokenRepository.save(refreshTokenEntity);

    return { accessToken, refreshToken };
  }
}
