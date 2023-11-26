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
		}>;
		/** 簡潔さ重視の独自に定義した名称 */
		alias?: string;
	}[];
	/** {@link codes}が指定されていた場合に、そのコード以外の値が入っているかどうか */
	allowFreeValue?: boolean;
}>;

export type FieldGroup = Readonly<{
	name: string; // グループの項目名
	description?: string; // 内容
}>;
