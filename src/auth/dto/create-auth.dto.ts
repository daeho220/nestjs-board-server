import { IsString, MinLength, Matches, MaxLength } from 'class-validator';

export class CreateAuthDto {
  @IsString()
  @MinLength(3, { message: '닉네임은 최소 3자 이상이어야 합니다.' })
  @MaxLength(20, { message: '닉네임은 최대 20자까지 가능합니다.' })
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: '닉네임은 알파벳 대소문자와 숫자만 사용할 수 있습니다.',
  })
  nickname: string;

  @IsString()
  @MinLength(4, { message: '비밀번호는 최소 4자 이상이어야 합니다.' })
  password: string;

  @IsString()
  @MinLength(4, { message: '비밀번호 확인은 최소 4자 이상이어야 합니다.' })
  passwordConfirm: string;
}
