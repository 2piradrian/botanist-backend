import { Sanitizer, TypeChecker } from "../../../config";
import { Categories } from "../../entity/category";
import { ErrorType } from "../../error/error-types";

export class GetByCategoriesDTO {
    private constructor(
        public page: number,
        public pageSize: number,
        public categories: string[],
    ){}

    static create(data: {[key: string]: any}): [string?, GetByCategoriesDTO?] {
        Sanitizer.trimStrings(data);

        if (data.categories === undefined) {
            return [ErrorType.MissingFields];
        }

        let categoryList: string[] = data.categories.split(',');
        if (data.categories.length === 0) { // Not categories filter applied
            categoryList = Object.keys(Categories);
        }

        const pageInt = parseInt(data.page);
        const pageSizeInt = parseInt(data.pageSize);

        if (!TypeChecker.areNumbers([pageInt, pageSizeInt])) {
            return [ErrorType.InvalidFields];
        }

        if(!TypeChecker.areStrings(categoryList)) {
            return [ErrorType.InvalidFields];
        }

        if (pageInt <= 0 || pageSizeInt <= 0) {
            return [ErrorType.InvalidFields];
        }

        return [undefined, new GetByCategoriesDTO(data.pageInt, data.pageSizeInt, data.categoryList)];
    }

}