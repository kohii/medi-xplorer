export const advancedSearchOperatorOptions = [{
	kind: "in",
	label: "が次のいずれかに一致する",
	operator: ":",
	negative: false,
}, {
	kind: "not-in",
	label: "が次のいずれでもない",
	operator: ":",
	negative: true,
}, {
	kind: "gt",
	label: "が次より大きい",
	operator: ">",
	negative: false,
}, {
	kind: "gte",
	label: "が次以上",
	operator: ">=",
	negative: false,
}, {
	kind: "lt",
	label: "が次より小さい",
	operator: "<",
	negative: false,
}, {
	kind: "lte",
	label: "が次以下",
	operator: "<=",
	negative: false,
}] as const;

export const advancedSearchItemOperatorKinds = advancedSearchOperatorOptions.map((option) => option.kind);

export type AdvancedSearchOperatorKind = typeof advancedSearchOperatorOptions[number]["kind"];
