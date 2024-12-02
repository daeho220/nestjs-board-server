import { IsString, MinLength } from 'class-validator';

export class UpdatePostDto {
  @IsString()
  @MinLength(1, { message: '제목을 입력해주세요.' })
  title: string;

  @IsString()
  @MinLength(1, { message: '내용을 입력해주세요.' })
  content: string;

  @IsString()
  @MinLength(4, { message: '비밀번호는 최소 4자 이성이어야 합니다.' })
  password: string;
}
