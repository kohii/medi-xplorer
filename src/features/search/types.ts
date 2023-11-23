export type FieldKey = string; // name or seq

export type Operator =
	/** contains (values separated by comma) */
	":" |
	/** greater than */
	":>" |
	/** less than */
	":<" |
	/** greater than or equal */
	":>=" |
	/** less than or equal */
	":<=";

export type FieldFilterItem = {
	operator: Operator;
	fieldKey: FieldKey;
	value: string;
	negative: boolean;
};

export type KeywordFilterItem = {
	operator?: undefined;
	value: string;
	negative: boolean;
};

export type FilterItem = FieldFilterItem | KeywordFilterItem;
export type FilterExpression = FilterItem[];

/**
 * @example
 * ```
 * 診療行為コード:100000000 // 診療行為コードが100000000のもの
 * 診療行為コード:100000000,100000001 // 診療行為コードが100000000または100000001のもの
 * 初診 -入外適用区分:2 // 「初診」を含み、入外適用区分が2のもの
 * ```
 */
export type FilterExpressionText = string;

export type ParseResult<T> = {
	kind: "SUCCESS";
	value: T;
} | {
	kind: "ERROR";
	message: string;
};
