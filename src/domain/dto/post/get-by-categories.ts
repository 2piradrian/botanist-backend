import { Categories } from "../../entity/category";
import { ErrorType } from "../../error/error-types";

export class GetByCategoriesDTO {
    private constructor(
        public page: number,
        public pageSize: number,
        public categories: string[],
    ){}

    static create(data: {[key: string]: any}): [string?, GetByCategoriesDTO?] {
        const { page, pageSize, categories } = data;

        if (page === undefined || pageSize === undefined || categories === undefined) {
            return [ErrorType.MissingFields];
        }

        let categoryList: string[] = categories.split(',');
        if (categories.length === 0) {
            categoryList = Object.keys(Categories);
        }

        const pageInt = parseInt(page);
        const pageSizeInt = parseInt(pageSize);

        for (const category of categoryList) {
            if (typeof category !== 'string') {
                return [ErrorType.InvalidFields];
            }
            if ((Categories as any)[category] === undefined) {
                return [ErrorType.InvalidFields];
            }
        }

        if (pageInt <= 0 || pageSizeInt <= 0) {
            return [ErrorType.InvalidFields];
        }

        return [undefined, new GetByCategoriesDTO(pageInt, pageSizeInt, categoryList)];
    }

}