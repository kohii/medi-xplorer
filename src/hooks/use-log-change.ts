import { useRef } from "react";

export const useOnChange = <T>(value: T, onChange: (value: T, oldValue: T) => void) => {
	const valueRef = useRef<T>(value);

	if (valueRef.current !== value) {
		onChange(value, valueRef.current);
		valueRef.current = value;
	}
};

// for debugging
export const useLogChange = <T>(value: T, name: string, logValue = false) => {
	useOnChange(value, (value, oldValue) => {
		if (logValue) {
			console.log(name, value, oldValue);
		} else {
			console.log(name);
		}
	});
};
