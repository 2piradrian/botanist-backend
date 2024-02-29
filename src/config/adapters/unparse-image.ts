import { env } from "./env";

export const UnparseImage = (image: string) => {
    const urlChars = env.API_URL.length + env.IMAGES_PATH.length;
    return image.slice(urlChars);
}