import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from './entities/post.entity';
import { Model } from 'mongoose';
import { UserDocument } from 'src/users/entities/user.entity';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  // 게시글 생성
  async create(createPostDto: CreatePostDto, user: UserDocument) {
    const post = new this.postModel({
      ...createPostDto,
      authorId: user._id,
      authorNickname: user.nickname,
    });
    return await post.save();
  }

  // 전체 게시글 목록 조회 (최신순)
  async findAll(): Promise<Post[]> {
    return await this.postModel
      .find()
      .select('-password')
      .sort({ createdAt: -1 })
      .exec();
  }

  // 특정 게시물 조회
  async findOne(id: string): Promise<Post> {
    const post = await this.postModel.findById(id).select('-password').exec();

    if (!post) {
      throw new NotFoundException('게시글을 찾을 수 없습니다.');
    }

    return post;
  }

  // 게시글 수정
  async update(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
    // 게시글 존재 여부 확인
    const post = await this.postModel.findById(id);
    if (!post) {
      throw new NotFoundException('게시글을 찾을 수 없습니다.');
    }

    // 비밀번호 확인
    if (post.password !== updatePostDto.password) {
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
    }

    // 게시글 업데이트
    const updatedPost = await this.postModel
      .findByIdAndUpdate(
        id,
        {
          title: updatePostDto.title,
          content: updatePostDto.content,
        },
        { new: true },
      )
      .select('-password')
      .exec();

    return updatedPost;
  }

  // 게시글 삭제
  async remove(id: string, password: string): Promise<void> {
    // 게시글 존재 여부 확인
    const post = await this.postModel.findById(id);
    if (!post) {
      throw new NotFoundException('게시글을 찾을 수 없습니다');
    }

    // 비밀번호 확인
    if (post.password !== password) {
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
    }

    await this.postModel.findByIdAndDelete(id);
  }
}
