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

        if (typeof page !== 'number' || typeof pageSize !== 'number') {
            return [ErrorType.InvalidFields];
        }

        if (!Array.isArray(categories)) {
            return [ErrorType.InvalidFields];
        }

        for (const category of categories) {
            if (typeof category !== 'string') {
                return [ErrorType.InvalidFields];
            }
            if ((Categories as any)[category] === undefined) {
                return [ErrorType.InvalidFields];
            }
        }

        let categoryList: string[] = categories;
        if (categories.length === 0) {
            categoryList = Object.keys(Categories);
        }

        return [undefined, new GetByCategoriesDTO(page, pageSize, categoryList)];
    }

}