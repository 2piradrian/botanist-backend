export class Checker {

    static isString(value: any[]): boolean {
        return value.every(v => typeof v === 'string' && v.length > 0);
    }

    static isNumber(value: any[]): boolean {
        return value.every(v => typeof v === 'number' && !isNaN(v));
    }

    static isBoolean(value: any[]): boolean {
        return value.every(v => typeof v === 'boolean');
    }

}