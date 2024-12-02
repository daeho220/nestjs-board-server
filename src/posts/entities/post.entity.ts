import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export type PostDocument = Document & Post;

@Schema({ timestamps: true })
export class Post {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: Types.ObjectId, required: true, ref: 'User' })
  authorId: Types.ObjectId;

  @Prop({ required: true })
  authorNickname: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
