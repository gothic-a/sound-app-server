import { Module } from "@nestjs/common";
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { FileModule } from "./file/file.module";
import { ServeStaticModule } from '@nestjs/serve-static'

import { TrackModule } from "./track/track.module";
import * as path from "path";

@Module({
    imports: [
        ConfigModule.forRoot({ envFilePath: '.env' }),
        ServeStaticModule.forRoot({ rootPath: path.resolve(__dirname, 'static') }),
        MongooseModule.forRoot(process.env.MONGO_URI),
        TrackModule,
        FileModule
    ]
})
export class AppModule {

}