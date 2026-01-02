import * as path from "path";
import * as fs from "fs";
import { FileTypeEnum } from "src/enums/file-type.enum";
import { BadRequestException } from "src/exceptions";

export function UploadFile (file: Express.Multer.File, fileType:keyof typeof FileTypeEnum) {
   console.log(fileType)
   if (fileType == "CONTRACT") {
      const fileName =
         Date.now() + '-' + file.originalname.replace(/\s+/g, '');
      const uploadDir = path.join(process.cwd(), "src", "documents")
      const filePath = path.join(uploadDir, fileName);

      fs.writeFileSync(filePath, file.buffer);
      
      return filePath


   }else if (fileType == "IMAGE") {
      
   }
   else {
      throw new BadRequestException("",  `${fileType} is not recognized`)
   }
}