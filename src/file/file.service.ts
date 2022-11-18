import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as path from 'path'
import * as fs from 'fs'
import { v4 } from 'uuid'

export enum FileType {
    AUDIO = 'audio',
    IMAGE = 'image'
}

@Injectable()
export class FileService {
    writeFile(type: FileType, file: Express.Multer.File): string {
        try {
            const { originalname } = file

            const fileExtention = originalname.split('.').reverse()[0]
            
            const fileName = `${originalname}-${v4()}.${fileExtention}`
            const filePath = path.resolve(__dirname, '..', 'static', type)

            if(!fs.existsSync(filePath)) fs.mkdirSync(filePath, { recursive: true })

            fs.writeFileSync(path.resolve(filePath, fileName), file.buffer)

            return `${type}/${fileName}`
        } catch(e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    removeFile(fileName: string) {

    }
}