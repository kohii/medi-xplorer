import { toHalfWidth, trimDecimalZero } from "@/utils/text";

import { SimpleTable, SimpleTableColumn } from "../../components/simple-table";
import { getValue } from "../fields/get-values";
import { getField } from "../shinryoukoui-master-fields/shinryoukoui-master-fields";
import { normalizeUnit } from "../shinryoukoui-master-fields/shinryoukoui-master-utils";


type Row = {
	amount: string;
	point: React.ReactNode;
}

const columns: SimpleTableColumn<Row>[] = [
  {
    name: "数量",
    render(row) {
      return row.amount;
    }
  },
  {
    name: "点数",
    render(row) {
      return row.point;
    }
  }
];

export function KizamichiFormula({ row }: { row: string[] }) {
  const 下限値 = +getValue(row, getField("きざみ値/下限値"));
  const 上限値 = +getValue(row, getField("きざみ値/上限値"));
  const きざみ値 = +getValue(row, getField("きざみ値/きざみ値"));
  const きざみ点数 = +trimDecimalZero(getValue(row, getField("きざみ値/きざみ点数")));
  const 上下限エラー処理 = getValue(row, getField("きざみ値/上下限エラー処理"));

  const 基本点数 = +getValue(row, getField("新又は現点数/新又は現点数"));
  const 点数識別 = getValue(row, getField("新又は現点数/点数識別"));
  const 点数単位 = (() => {
    switch (点数識別) {
    case "1":
      return "円";
    case "3":
      return "点";
    default:
      throw new Error(`Unknown 点数識別: ${点数識別}`);
    }
  })();

  const 数量単位 = normalizeUnit(getValue(row, getField("データ規格名/漢字名称")));

  const createFormula1 = () => {
    if (基本点数 === きざみ点数 && きざみ値 === 1 && 下限値 === 1) {
      return (
        <>
          <span>{基本点数}{点数単位}</span>
          <span> × </span>
          <span>数量</span>
        </>
      );
    }
    return (
      <>
        {基本点数 > 0 && <span>{基本点数}{点数単位} + </span>}
        <span>{下限値 === 0 ? "数量" : `(数量 - ${下限値})`}</span>
        {きざみ値 !== 1 && <span> ÷ {きざみ値} </span>}
        <span> × </span>
        <span>{きざみ点数}{点数単位}</span>
      </>
    );
  };

  const createAmountExpression = (lower: number | undefined, upper: number | undefined) => {
    if (lower === upper) {
      return `${lower}${数量単位}`;
    }
    if (lower === undefined || lower === 0) {
      if (upper && upper > 1) {
        return `〜${upper}${数量単位}`;
      } else {
        return `${upper}${数量単位}`;
      }
    }
    if (!upper || upper === 99999999) {
      return `${lower}${数量単位}〜`;
    }
    return `${lower}${数量単位}〜${upper}${数量単位}`;

  };

  const data: Row[] = [];

  if (下限値 !== 0) {
    if (上下限エラー処理 === "0" || 上下限エラー処理 === "1") {
      data.push({
        amount: createAmountExpression(undefined, 下限値),
        point: `${基本点数}${点数単位}`,
      });
    } else {
      if (下限値 > きざみ値) {
        data.push({
          amount: createAmountExpression(undefined, 下限値 - きざみ値),
          point: "算定せず (返戻)",
        });
      }
      data.push({
        amount: createAmountExpression(下限値 - きざみ値 + 1, 下限値),
        point: `${基本点数}${点数単位}`,
      });
    }
  }

  data.push({
    amount: createAmountExpression(下限値 + 1, 上限値),
    point: createFormula1(),
  });

  if (上限値 !== 99999999) {
    if (上下限エラー処理 === "0" || 上下限エラー処理 === "2") {
      data.push({
        amount: createAmountExpression(上限値 + 1, undefined),
        point: <>{createFormula1()} <span className="text-slate-400">(警告)</span></>,
      });
    } else {
      data.push({
        amount: createAmountExpression(上限値 + 1, undefined),
        point: `${Math.round(基本点数 + Math.ceil(上限値 - 下限値) / きざみ値 * きざみ点数)}${点数単位}`,
      });
    }
  }

  return (
    <SimpleTable
      className="w-auto min-w-[50%]"
      columns={columns}
      data={data}
    />
  );
}
