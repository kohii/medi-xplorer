export type FieldKey = string | number; // name or seq

export type ComparisonOperator =
	/** equals */
	"=" |
	/** not equals */
	"!=" |
	/** greater than */
	">" |

	/** less than */
	"<" |
	/** greater than or equal */
	">=" |
	/** less than or equal */
	"<=" |
	/** contains */
	":" |
	/** not contains */
	"!:";
export type LogicalOperator = 'AND' | 'OR' | 'NOT';
export type Operator = LogicalOperator | ComparisonOperator;

export type FilterItem = {
	operator: ComparisonOperator;
	field: FieldKey;
	value: string;
};

export type FilterExpression = {
	operator: 'AND' | 'OR';
	items: FilterExpression[];
} | {
	operator: 'NOT';
	item: FilterExpression;
} | FilterItem;

export type FilterExpressionTree = FilterExpression[];

/**
 * - Space may be used to separate tokens, but is not required.
 * - Operators defined in {@link ComparisonOperator} are supported.
 * - AND, OR, NOT are supported.
 * - Parentheses are supported.
 *
 * @example
 * ```
 * 診療行為コード=100000000
 * 診療行為コード !="100000000"
 * "告示等識別区分（１）"!=1 AND (入外適用区分=1 OR 入外適用区分=2)
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
