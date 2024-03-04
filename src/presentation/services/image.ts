import fs from 'fs';
import sharp from 'sharp';
import { UnparseImage, env } from '../../config';

export class ImageService {
    private readonly path: string;

    constructor() {
        this.path = env.IMAGES_PATH;
        this.ensureDirectoryExists(this.path);
    }

    private async ensureDirectoryExists(directoryPath: string): Promise<void> {
        try {
            await fs.promises.access(directoryPath);
        } 
        catch (error: any) {
            if (error.code === 'ENOENT') {
                await fs.promises.mkdir(directoryPath, { recursive: true });
            } else {
                throw error;
            }
        }
    }

    async uploadImage(base64Image: string, imageName: string): Promise<string> {
        try {
            const imageBuffer = Buffer.from(base64Image, 'base64');
            
            const compressedImageBuffer = await sharp(imageBuffer)
                .resize({ width: 1280, height: 720 })
                .toBuffer();

            const fixedImageName = imageName.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();

            const timestamp = Date.now();
            const fileName = `${fixedImageName}_${timestamp}.webp`;
            const filePath = `${this.path}${fileName}`;

            await fs.promises.writeFile(filePath, compressedImageBuffer);
            
            return fileName;
        } 
        catch (error: any) {
            throw error;
        }
    }

    async deleteImage(imageName: string): Promise<void> {
        try {
            const unparsedImage = UnparseImage(imageName);
            const filePath = `${this.path}${unparsedImage}`;

            await fs.promises.unlink(filePath);
        }
        catch(error: any) {
            throw error;
        }
    }
}
