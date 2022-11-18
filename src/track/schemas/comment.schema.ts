import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { Track } from "./track.schema";

export type CommentDocument = Comment & mongoose.Document

@Schema()
export class Comment {
    @Prop()
    username: string

    @Prop()
    text: string

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Track', default: 0 })
    track: Track
}

export const CommentSchema = SchemaFactory.createForClass(Comment)