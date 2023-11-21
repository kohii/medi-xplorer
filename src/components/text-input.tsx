type TextInputProps = {
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
	autoFocus?: boolean;
	className?: string;
	id?: string;
};

export function TextInput({
	onChange,
	...props
}: TextInputProps) {
	return (
		<input
			className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
			type="text"
			onChange={e => onChange(e.target.value)}
			{...props}
		/>
	);
}
