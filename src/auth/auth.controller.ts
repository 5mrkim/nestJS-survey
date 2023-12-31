import { User, UserAfterAuth } from './../common/decorator/user.decorator';
import {
  SigninDto,
  SignUpDto,
  SignInResponseDto,
  RefreshResDto,
} from './dto/auth-dto';
import { AuthService } from './auth.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiOperation,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import {
  Body,
  Controller,
  Post,
  ValidationPipe,
  BadRequestException,
  Headers,
} from '@nestjs/common';
import { ApiPostResponse } from 'src/common/decorator/swagger.decorator';
import { Public } from 'src/common/decorator/public.decorator';

@ApiTags('인증')
@ApiExtraModels(SignInResponseDto, RefreshResDto)
@Controller('auth')
export class AuthController {
  constructor(private AuthService: AuthService) {}

  @ApiOperation({
    description: '회원가입',
    summary: '회원가입',
  })
  @Post('join')
  @Public()
  async signUp(
    @Body(new ValidationPipe()) { email, password, passwordConfirm }: SignUpDto,
  ) {
    if (password !== passwordConfirm) {
      throw new BadRequestException(400, '입력한 비밀번호가 서로 다릅니다');
    }
    const isEmailDuplicateValidation =
      await this.AuthService.findByEmail(email);

    if (isEmailDuplicateValidation) {
      console.log('??');
      throw new BadRequestException(400, '이미 회원가입한 유저 입니다');
    }

    return this.AuthService.signUp(email, password);
  }

  @ApiOperation({
    description: '로그인',
    summary: '로그인',
  })
  //   @ApiCreatedResponse({
  //     schema: {
  //       allOf: [{ $ref: getSchemaPath(SignInResponseDto) }],
  //     },
  //   })
  @ApiPostResponse(SignInResponseDto)
  @Public()
  @Post('login')
  async signIn(@Body(new ValidationPipe()) loginRequestDto: SigninDto) {
    return this.AuthService.signIn(loginRequestDto);
  }

  @ApiPostResponse(RefreshResDto)
  @ApiBearerAuth()
  @ApiOperation({
    description: '리프레시토큰 불러오기',
    summary: '리프레시토큰 불러오기',
  })
  @Post('refresh')
  async refresh(
    @Headers('authorization') authorization,
    @User() user: UserAfterAuth,
  ) {
    console.log(authorization);
    const token = /Bearer\s(.+)/.exec(authorization)[1];
    const { accessToken, refreshToken } = await this.AuthService.refresh(
      token,
      user.id,
    );

    return {
      accessToken,
      refreshToken,
    };
  }
}
