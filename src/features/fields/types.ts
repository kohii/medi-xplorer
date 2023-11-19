export type Field = Readonly<{
	/** 項番 */
	seq: number;
	/** 項目名 */
	name: string;
	/** 内容 */
	description: string;
	/** モード */
	mode: 'numeric' | 'text' | 'date' | 'alphanumeric';
	/** コード定義 */
	codes?: readonly {
		/** コード */
		code: string;
		/** 名称 */
		name: string;
		/** このコード値が有効な条件 */
		condition?: Readonly<{
			/** 項番 */
			seq: number;
			/** 値 */
			value: readonly string[];
		}>
	}[];
	style?: {
		width?: number,
		wrap?: boolean,
	}
}>;

export type FieldGroup = Readonly<{
	name: string; // グループの項目名
	description?: string; // 内容
}>;
