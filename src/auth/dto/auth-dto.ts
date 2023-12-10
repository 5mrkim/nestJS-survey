import { RefreshToken } from './../../entity/refreshtoken.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Max, max, min } from 'class-validator';

//회원가입 Dto
export class SignUpDto {
  @ApiProperty({
    required: true,
    example: 'kimseon@gmail.com',
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    required: true,
    example: 'kimseon',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    required: true,
    example: 'kimseon',
  })
  @IsString()
  @IsNotEmpty()
  passwordConfirm: string;
}

//로그인 Dto
export class SigninDto {
  @ApiProperty({
    required: true,
    example: 'kimseon@gmail.com',
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    required: true,
    example: 'kimseon',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class SignInResponseDto {
  @ApiProperty({
    required: true,
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhVmFsdWVzIjp7Im5hbWUiOiLslrTrk5zrr7wiLCJob3NwaXRhbF9pZCI6MTA2NDcsImVtcGxveWVlX2lkIjoyODksImxvZ2luX2lkIjoiYXNhbiIsImlzX2xldmVsIjozLCJkdXR5Ijo5LCJpc19lbmFibGUiOmZhbHNlLCJpbWFnZV91cmwiOm51bGx9LCJfcHJldmlvdXNEYXRhVmFsdWVzIjp7Im5hbWUiOiLslrTrk5zrr7wiLCJob3NwaXRhbF9pZCI6MTA2NDcsImVtcGxveWVlX2lkIjoyODksImxvZ2luX2lkIjoiYXNhbiIsImlzX2xldmVsIjozLCJkdXR5Ijo5LCJpc19lbmFibGUiOmZhbHNlLCJpbWFnZV91cmwiOm51bGx9LCJ1bmlxbm8iOjEsIl9jaGFuZ2VkIjp7fSwiX29wdGlvbnMiOnsiaXNOZXdSZWNvcmQiOmZhbHNlLCJfc2NoZW1hIjpudWxsLCJfc2NoZW1hRGVsaW1pdGVyIjoiIiwicmF3Ijp0cnVlLCJhdHRyaWJ1dGVzIjpbIm5hbWUiLCJob3NwaXRhbF9pZCIsImVtcGxveWVlX2lkIiwibG9naW5faWQiLCJpc19sZXZlbCIsImR1dHkiLCJpc19lbmFibGUiLCJpbWFnZV91cmwiXX0sImlzTmV3UmVjb3JkIjpmYWxzZSwiaWF0IjoxNzAxOTk5NzIyLCJleHAiOjE3MDIwODYxMjIsImF1ZCI6IjI4OSIsImlzcyI6ImJhcnVkYSJ9.S3z2YWgrQ4dPMEvxdAMUMDuyaYp8nWNtrTa5YiXRVhQ',
  })
  accessToken: string;

  @ApiProperty({
    required: true,
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhVmFsdWVzIjp7Im5hbWUiOiLslrTrk5zrr7wiLCJob3NwaXRhbF9pZCI6MTA2NDcsImVtcGxveWVlX2lkIjoyODksImxvZ2luX2lkIjoiYXNhbiIsImlzX2xldmVsIjozLCJkdXR5Ijo5LCJpc19lbmFibGUiOmZhbHNlLCJpbWFnZV91cmwiOm51bGx9LCJfcHJldmlvdXNEYXRhVmFsdWVzIjp7Im5hbWUiOiLslrTrk5zrr7wiLCJob3NwaXRhbF9pZCI6MTA2NDcsImVtcGxveWVlX2lkIjoyODksImxvZ2luX2lkIjoiYXNhbiIsImlzX2xldmVsIjozLCJkdXR5Ijo5LCJpc19lbmFibGUiOmZhbHNlLCJpbWFnZV91cmwiOm51bGx9LCJ1bmlxbm8iOjEsIl9jaGFuZ2VkIjp7fSwiX29wdGlvbnMiOnsiaXNOZXdSZWNvcmQiOmZhbHNlLCJfc2NoZW1hIjpudWxsLCJfc2NoZW1hRGVsaW1pdGVyIjoiIiwicmF3Ijp0cnVlLCJhdHRyaWJ1dGVzIjpbIm5hbWUiLCJob3NwaXRhbF9pZCIsImVtcGxveWVlX2lkIiwibG9naW5faWQiLCJpc19sZXZlbCIsImR1dHkiLCJpc19lbmFibGUiLCJpbWFnZV91cmwiXX0sImlzTmV3UmVjb3JkIjpmYWxzZSwiaWF0IjoxNzAxOTk5NzIyLCJleHAiOjE3MDIwODYxMjIsImF1ZCI6IjI4OSIsImlzcyI6ImJhcnVkYSJ9.S3z2YWgrQ4dPMEvxdAMUMDuyaYp8nWNtrTa5YiXRVhQ',
  })
  RefreshToken: string;
}

export class RefreshResDto {
  @ApiProperty({
    required: true,
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhVmFsdWVzIjp7Im5hbWUiOiLslrTrk5zrr7wiLCJob3NwaXRhbF9pZCI6MTA2NDcsImVtcGxveWVlX2lkIjoyODksImxvZ2luX2lkIjoiYXNhbiIsImlzX2xldmVsIjozLCJkdXR5Ijo5LCJpc19lbmFibGUiOmZhbHNlLCJpbWFnZV91cmwiOm51bGx9LCJfcHJldmlvdXNEYXRhVmFsdWVzIjp7Im5hbWUiOiLslrTrk5zrr7wiLCJob3NwaXRhbF9pZCI6MTA2NDcsImVtcGxveWVlX2lkIjoyODksImxvZ2luX2lkIjoiYXNhbiIsImlzX2xldmVsIjozLCJkdXR5Ijo5LCJpc19lbmFibGUiOmZhbHNlLCJpbWFnZV91cmwiOm51bGx9LCJ1bmlxbm8iOjEsIl9jaGFuZ2VkIjp7fSwiX29wdGlvbnMiOnsiaXNOZXdSZWNvcmQiOmZhbHNlLCJfc2NoZW1hIjpudWxsLCJfc2NoZW1hRGVsaW1pdGVyIjoiIiwicmF3Ijp0cnVlLCJhdHRyaWJ1dGVzIjpbIm5hbWUiLCJob3NwaXRhbF9pZCIsImVtcGxveWVlX2lkIiwibG9naW5faWQiLCJpc19sZXZlbCIsImR1dHkiLCJpc19lbmFibGUiLCJpbWFnZV91cmwiXX0sImlzTmV3UmVjb3JkIjpmYWxzZSwiaWF0IjoxNzAxOTk5NzIyLCJleHAiOjE3MDIwODYxMjIsImF1ZCI6IjI4OSIsImlzcyI6ImJhcnVkYSJ9.S3z2YWgrQ4dPMEvxdAMUMDuyaYp8nWNtrTa5YiXRVhQ',
  })
  accessToken: string;

  @ApiProperty({
    required: true,
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhVmFsdWVzIjp7Im5hbWUiOiLslrTrk5zrr7wiLCJob3NwaXRhbF9pZCI6MTA2NDcsImVtcGxveWVlX2lkIjoyODksImxvZ2luX2lkIjoiYXNhbiIsImlzX2xldmVsIjozLCJkdXR5Ijo5LCJpc19lbmFibGUiOmZhbHNlLCJpbWFnZV91cmwiOm51bGx9LCJfcHJldmlvdXNEYXRhVmFsdWVzIjp7Im5hbWUiOiLslrTrk5zrr7wiLCJob3NwaXRhbF9pZCI6MTA2NDcsImVtcGxveWVlX2lkIjoyODksImxvZ2luX2lkIjoiYXNhbiIsImlzX2xldmVsIjozLCJkdXR5Ijo5LCJpc19lbmFibGUiOmZhbHNlLCJpbWFnZV91cmwiOm51bGx9LCJ1bmlxbm8iOjEsIl9jaGFuZ2VkIjp7fSwiX29wdGlvbnMiOnsiaXNOZXdSZWNvcmQiOmZhbHNlLCJfc2NoZW1hIjpudWxsLCJfc2NoZW1hRGVsaW1pdGVyIjoiIiwicmF3Ijp0cnVlLCJhdHRyaWJ1dGVzIjpbIm5hbWUiLCJob3NwaXRhbF9pZCIsImVtcGxveWVlX2lkIiwibG9naW5faWQiLCJpc19sZXZlbCIsImR1dHkiLCJpc19lbmFibGUiLCJpbWFnZV91cmwiXX0sImlzTmV3UmVjb3JkIjpmYWxzZSwiaWF0IjoxNzAxOTk5NzIyLCJleHAiOjE3MDIwODYxMjIsImF1ZCI6IjI4OSIsImlzcyI6ImJhcnVkYSJ9.S3z2YWgrQ4dPMEvxdAMUMDuyaYp8nWNtrTa5YiXRVhQ',
  })
  RefreshToken: string;
}
