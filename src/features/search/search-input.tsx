"use client";

import { Button } from "@/components/button";
import { SearchIcon } from "@/components/icons/search-icon";
import { TextInput } from "@/components/text-input";
import { useRouterFn } from "@/hooks/use-router-fn";

type SearchInputProps = {
	value?: string;
	onChange?: (value: string) => void;
	onSubmit?: () => void;
};

export function SearchInput({ value, onChange, onSubmit }: SearchInputProps) {
	const { push } = useRouterFn();
	const handleSubmit = onSubmit ?? ((event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const q = event.currentTarget.q.value;
		push(`/s?q=${encodeURIComponent(q)}`);
	});

	return (
		<form onSubmit={handleSubmit} action="/s">
			<div className="relative">
				<div className="absolute flex items-center text-gray-400 inset-y-0 start-0 ps-3 pointer-events-none">
					<SearchIcon className="" />
				</div>
				<TextInput
					name="q"
					value={value}
					onChange={onChange}
					placeholder="診療行為を検索"
					autoFocus
					className="block w-full ps-10 py-2"
				/>
				<Button
					type="submit"
					className="absolute right-0 top-0 bottom-0 px-4 py-0.5 rounded-s-none"
				>
					検索
				</Button>
			</div>
		</form>
	);
}
