import { Categories } from "../../entity/category";
import { ErrorType } from "../../error/error-types";
import { Checker } from "../../utils/checker";
import { Sanitizer } from "../../utils/sanitizer";

export class GetByCategoriesDTO {
    private constructor(
        public page: number,
        public pageSize: number,
        public categories: string[],
    ){}

    static create(data: {[key: string]: any}): [string?, GetByCategoriesDTO?] {
        Sanitizer.trim(data);

        if (data.categories === undefined) {
            return [ErrorType.MissingFields];
        }

        let categoryList: string[] = data.categories.split(',');
        if (data.categories.length === 0) { // Not categories filter applied
            categoryList = Object.keys(Categories);
        }

        const pageInt = parseInt(data.page);
        const pageSizeInt = parseInt(data.pageSize);

        if (!Checker.isNumber([pageInt, pageSizeInt])) {
            return [ErrorType.InvalidFields];
        }

        if(!Checker.isString(categoryList)) {
            return [ErrorType.InvalidFields];
        }

        if (pageInt <= 0 || pageSizeInt <= 0) {
            return [ErrorType.InvalidFields];
        }

        return [undefined, new GetByCategoriesDTO(data.pageInt, data.pageSizeInt, data.categoryList)];
    }

}