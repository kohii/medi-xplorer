import exp from "constants";

const KANA_MAP: Record<string, string> = {
	"ガ": "ｶﾞ", "ギ": "ｷﾞ", "グ": "ｸﾞ", "ゲ": "ｹﾞ", "ゴ": "ｺﾞ",
	"ザ": "ｻﾞ", "ジ": "ｼﾞ", "ズ": "ｽﾞ", "ゼ": "ｾﾞ", "ゾ": "ｿﾞ",
	"ダ": "ﾀﾞ", "ヂ": "ﾁﾞ", "ヅ": "ﾂﾞ", "デ": "ﾃﾞ", "ド": "ﾄﾞ",
	"バ": "ﾊﾞ", "ビ": "ﾋﾞ", "ブ": "ﾌﾞ", "ベ": "ﾍﾞ", "ボ": "ﾎﾞ",
	"パ": "ﾊﾟ", "ピ": "ﾋﾟ", "プ": "ﾌﾟ", "ペ": "ﾍﾟ", "ポ": "ﾎﾟ",
	"ヴ": "ｳﾞ", "ヷ": "ﾜﾞ", "ヺ": "ｦﾞ",
	"ア": "ｱ", "イ": "ｲ", "ウ": "ｳ", "エ": "ｴ", "オ": "ｵ",
	"カ": "ｶ", "キ": "ｷ", "ク": "ｸ", "ケ": "ｹ", "コ": "ｺ",
	"サ": "ｻ", "シ": "ｼ", "ス": "ｽ", "セ": "ｾ", "ソ": "ｿ",
	"タ": "ﾀ", "チ": "ﾁ", "ツ": "ﾂ", "テ": "ﾃ", "ト": "ﾄ",
	"ナ": "ﾅ", "ニ": "ﾆ", "ヌ": "ﾇ", "ネ": "ﾈ", "ノ": "ﾉ",
	"ハ": "ﾊ", "ヒ": "ﾋ", "フ": "ﾌ", "ヘ": "ﾍ", "ホ": "ﾎ",
	"マ": "ﾏ", "ミ": "ﾐ", "ム": "ﾑ", "メ": "ﾒ", "モ": "ﾓ",
	"ヤ": "ﾔ", "ユ": "ﾕ", "ヨ": "ﾖ",
	"ラ": "ﾗ", "リ": "ﾘ", "ル": "ﾙ", "レ": "ﾚ", "ロ": "ﾛ",
	"ワ": "ﾜ", "ヲ": "ｦ", "ン": "ﾝ",
	"ァ": "ｧ", "ィ": "ｨ", "ゥ": "ｩ", "ェ": "ｪ", "ォ": "ｫ",
	"ッ": "ｯ", "ャ": "ｬ", "ュ": "ｭ", "ョ": "ｮ",
	"。": "｡", "、": "､", "ー": "ｰ", "「": "｢", "」": "｣", "・": "･"
};

export function toKatakana(s: string): string {
	return s.replace(/[ぁ-ん]/g, c => String.fromCharCode(c.charCodeAt(0) + 0x60));
}

export function toHalfWidth(s: string): string {
	return s.replace(/[！-～]/g, c => String.fromCharCode(c.charCodeAt(0) - 0xFEE0));
}

export function toHalfWidthKatakana(s: string): string {
	return s.replace(/[ァ-ン]/g, c => KANA_MAP[c] || c);
}

export function isNumeric(s: string): boolean {
	return s.match(/^\d+$/) != null;
}

export function splitByWhitespace(s: string): string[] {
	return s.split(/\s+/).filter(s => s !== "");
}

/** 
 * 小数点以下の0を削除
 * @example
 * ```
 * trimDecimalZero("1.00") // => "1"
 * trimDecimalZero("1.10") // => "1.1"
 * ```
 */
export function trimDecimalZero(s: string): string {
	if (s.endsWith('.00')) {
		return s.substring(0, s.length - 3);
	}
	if (s.endsWith('0')) {
		return s.substring(0, s.length - 1);
	}
	return s;
}

/** 
 * アルファベットを数値に変換
 * @example
 * ```
 * alphabetToNumber("A") // => 0
 * alphabetToNumber("B") // => 1
 * ```
 */
export function alphabetToNumber(s: string): number {
	return s.charCodeAt(0) - 65;
}