import { SigninDto, SignUpDto, SignInResponseDto } from './dto/auth-dto';
import { AuthService } from './auth.service';
import {
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
} from '@nestjs/common';
import { ApiPostResponse } from 'src/common/decorator/swagger.decorator';

@ApiTags('인증')
@ApiExtraModels(SignInResponseDto)
@Controller('auth')
export class AuthController {
  constructor(private AuthService: AuthService) {}

  @ApiOperation({
    description: '회원가입',
    summary: '회원가입',
  })
  @Post('join')
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
  @Post('login')
  async signIn(@Body(new ValidationPipe()) loginRequestDto: SigninDto) {
    return this.AuthService.signIn(loginRequestDto);
  }
}
