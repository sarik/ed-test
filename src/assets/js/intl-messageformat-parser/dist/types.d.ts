export declare enum TYPE {
    /**
     * Raw text
     */
    literal = 0,
    /**
     * Variable w/o any format, e.g `var` in `this is a {var}`
     */
    argument = 1,
    /**
     * Variable w/ number format
     */
    number = 2,
    /**
     * Variable w/ date format
     */
    date = 3,
    /**
     * Variable w/ time format
     */
    time = 4,
    /**
     * Variable w/ select format
     */
    select = 5,
    /**
     * Variable w/ plural format
     */
    plural = 6
}
export declare const enum SKELETON_TYPE {
    number = 0,
    date = 1
}
export interface LocationDetails {
    offset: number;
    line: number;
    column: number;
}
export interface Location {
    start: LocationDetails;
    end: LocationDetails;
}
export interface BaseElement<T extends TYPE> {
    type: T;
    value: string;
    location?: Location;
}
export declare type LiteralElement = BaseElement<TYPE.literal>;
export declare type ArgumentElement = BaseElement<TYPE.argument>;
export interface SimpleFormatElement<T extends TYPE, S extends Skeleton> extends BaseElement<T> {
    style?: string | S | null;
}
export declare type NumberElement = SimpleFormatElement<TYPE.number, NumberSkeleton>;
export declare type DateElement = SimpleFormatElement<TYPE.date, DateSkeleton>;
export declare type TimeElement = SimpleFormatElement<TYPE.time, DateSkeleton>;
export interface SelectOption {
    id: string;
    value: MessageFormatElement[];
    location?: Location;
}
export declare type ValidPluralRule = 'zero' | 'one' | 'two' | 'few' | 'many' | 'other' | string;
export interface PluralOrSelectOption {
    value: MessageFormatElement[];
    location?: Location;
}
export interface SelectElement extends BaseElement<TYPE.select> {
    options: Record<string, PluralOrSelectOption>;
}
export interface PluralElement extends BaseElement<TYPE.plural> {
    options: Record<ValidPluralRule, PluralOrSelectOption>;
    offset: number;
    pluralType: Intl.PluralRulesOptions['type'];
}
export declare type MessageFormatElement = LiteralElement | ArgumentElement | NumberElement | DateElement | TimeElement | SelectElement | PluralElement;
export interface NumberSkeletonToken {
    stem: string;
    options: string[];
}
export interface NumberSkeleton {
    type: SKELETON_TYPE.number;
    tokens: NumberSkeletonToken[];
    location?: Location;
}
export interface DateSkeleton {
    type: SKELETON_TYPE.date;
    pattern: string;
    location?: Location;
}
export declare type Skeleton = NumberSkeleton | DateSkeleton;
/**
 * Type Guards
 */
export declare function isLiteralElement(el: MessageFormatElement): el is LiteralElement;
export declare function isArgumentElement(el: MessageFormatElement): el is ArgumentElement;
export declare function isNumberElement(el: MessageFormatElement): el is NumberElement;
export declare function isDateElement(el: MessageFormatElement): el is DateElement;
export declare function isTimeElement(el: MessageFormatElement): el is TimeElement;
export declare function isSelectElement(el: MessageFormatElement): el is SelectElement;
export declare function isPluralElement(el: MessageFormatElement): el is PluralElement;
export declare function isNumberSkeleton(el: Skeleton): el is NumberSkeleton;
export declare function isDateSkeleton(el: Skeleton): el is DateSkeleton;
export declare function createLiteralElement(value: string): LiteralElement;
export declare function createNumberElement(value: string, style?: string | null): NumberElement;
export interface Options {
    /**
     * Whether to convert `#` in plural rule options
     * to `{var, number}`
     * Default is true
     */
    normalizeHashtagInPlural?: boolean;
    /**
     * Capture location info in AST
     * Default is false
     */
    captureLocation?: boolean;
}
