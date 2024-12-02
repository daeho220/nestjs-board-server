import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signup(createAuthDto: CreateAuthDto) {
    const { nickname, password, passwordConfirm } = createAuthDto;

    if (password !== passwordConfirm) {
      throw new BadRequestException('비밀번호가 일치하지 않습니다.');
    }

    const user = await this.usersService.createUser(nickname, password);

    return {
      message: '회원가입이 완료되었습니다.',
      user,
    };
  }

  async login(loginDto: LoginDto) {
    const { nickname, password } = loginDto;

    // 사용자 찾기
    const user = await this.usersService.findByNickname(nickname);

    // 사용자가 없거나 비밀번호가 일치하지 않는 경우
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('닉네임 또는 패스워드를 확인해주세요.');
    }

    // JWT 토큰 생성
    const payload = { sub: user._id, nickname: user.nickname };
    const accessToken = await this.jwtService.signAsync(payload);

    return {
      message: '로그인에 성공하였습니다.',
      accessToken,
    };
  }

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
