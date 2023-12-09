import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt } from 'class-validator';

export class PageReqDto {
  @ApiPropertyOptional({
    description: '페이지 넘버 default = 1',
  })
  @IsInt()
  @Transform((param) => Number(param.value))
  pageNum?: number = 1;

  @ApiPropertyOptional({
    description: '가져올게시글 수 default= 10',
  })
  @IsInt()
  @Transform((param) => Number(param.value))
  size?: number = 10;
}

export class PageResDto<TData> {
  @ApiProperty({
    required: true,
  })
  page: number;

  @ApiProperty({
    required: true,
  })
  size: number;

  items: TData[];
}
