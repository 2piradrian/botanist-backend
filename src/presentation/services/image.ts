import fs from 'fs';
import sharp from 'sharp';

export class ImageService {
    private path: string;

    constructor(){
        this.path = 'public/images/';
    }

    async uploadImage(base64Image: string, imageName: string): Promise<Boolean> {
        try{
            const imageBuffer = Buffer.from(base64Image, 'base64');

            const compressedImageBuffer = await sharp(imageBuffer)
                .resize({ width: 500 })
                .toBuffer();

            fs.writeFile(`${this.path + imageName}.jpg`, compressedImageBuffer, (error) => {
                if (error) {
                    console.error('Error al guardar la imagen:');
                    throw error;
                }
            });

            return true;
        }catch(error: any){
            return false;
        }
    }
}