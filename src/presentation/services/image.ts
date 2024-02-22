import fs from 'fs';
import sharp from 'sharp';
import { env } from '../../config';

export class ImageService {
    private readonly path: string;

    constructor() {
        this.path = env.IMAGES_PATH;
        this.ensureDirectoryExists(this.path);
    }

    private async ensureDirectoryExists(directoryPath: string): Promise<void> {
        try {
            await fs.promises.access(directoryPath);
        } catch (error: any) {
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
                .resize({ width: 800, height: 600 })
                .toBuffer();

            const timestamp = Date.now();
            const fileName = `${imageName}_${timestamp}.jpg`;
            const filePath = `${this.path}${fileName}`;

            await fs.promises.writeFile(filePath, compressedImageBuffer);
            
            return filePath;
        } catch (error: any) {
            throw error;
        }
    }
}
