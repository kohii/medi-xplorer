type OperatorSelectProps = {
	value: string;
	onChange: (value: string) => void;
};

export function OperatorSelect({ value, onChange, }: OperatorSelectProps) {
	return (
		<select
			className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-s focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
			value={value}
			onChange={e => onChange(e.target.value)}
		>
			<option value=":">次のいずれかに一致する</option>
			<option value=":">次のいずれでもない</option>
			<option value=">">次より大きい</option>
			<option value=">=">次以上</option>
			<option value="<">次より小さい</option>
			<option value="<=">次以下</option>
		</select>
	)
}