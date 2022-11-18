import { Body, Controller, Get, Post, Param, Delete, UseInterceptors, UploadedFiles, Put, Query } from "@nestjs/common";
import { FileFieldsInterceptor } from '@nestjs/platform-express'
import { ObjectId } from "mongoose";

import { TrackService } from "./track.service";

import { Track } from "./schemas/track.schema";
import { Comment } from "./schemas/comment.schema";

import { CreateTrackDto, CreateTrackFilesDto } from "./dto/create-track.dto";
import { AddCommentDto } from "./dto/add-comment.dto";

@Controller('/tracks')
export class TrackController {
    constructor(private trackService: TrackService) {}

    @Post('/create')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'image', maxCount: 1 },
        { name: 'audio', maxCount: 1 }
    ]))
    create(@Body() dto: CreateTrackDto, @UploadedFiles() files: CreateTrackFilesDto): Promise<Track> {
        return this.trackService.create(dto, files)
    }

    @Get()
    getAll(@Query('page') page: number, @Query('limit') limit: number, @Query('query') query: string): Promise<Track[]> {
        return this.trackService.getAll(page, limit, query)
    }

    @Get('/search')
    search(@Query('query') query: string): Promise<Track[]> {
        return this.trackService.search(query)
    }

    @Get('/:id')
    getOne(@Param('id') id: string): Promise<Track | never> {
        return this.trackService.getOne(id)
    }

    @Delete('/:id')
    delete(@Param('id') id: string): Promise<Track | never> {
        return this.trackService.delete(id) 
    }

    @Put('/listen/:id')
    addListen(@Param('id') id: string): (void | never) {
        this.trackService.addListen(id)
    }

    @Post('/comment/create')
    addComment(@Body() dto: AddCommentDto): Promise<Comment | never> {
        return this.trackService.addComment(dto.track, dto)
    }

}