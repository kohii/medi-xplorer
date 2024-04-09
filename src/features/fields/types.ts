import { ShinryoukouiMasterLayoutVersion } from "../shinryoukoui-master-versions/layouts";

export type Field = Readonly<{
  /** 項番 */
  seq: number;
  /** 項目名 */
  name: string;
  /** 短縮項目名 */
  shortName?: string;
  // 現状では使用していないのでコメントアウト
  // /** 内容 */
  // description: string;
  /** モード */
  mode: "numeric" | "text" | "date" | "alphanumeric";
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
  /** 一覧表示するときの列の幅 */
  columnWidth?: number | "auto";
  /** この項目が有効になった改定年度 */
  validFrom?: ShinryoukouiMasterLayoutVersion;
}>;

export type FieldGroup = Readonly<{
  name: string; // グループの項目名
  description?: string; // 内容
}>;
