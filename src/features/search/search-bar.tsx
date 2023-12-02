"use client";

import { useState } from "react";

import { Button } from "@/components/button";
import { SearchIcon } from "@/components/icons/search-icon";
import { TextInput } from "@/components/text-input";
import { useShinryoukouiSearch } from "@/hooks/use-shinryoukoui-search";

import { SearchInput } from "./search-input";

type SearchBarProps = {
	value?: string;
	onChange?: (value: string) => void;
};

export function SearchBar({ value, onChange }: SearchBarProps) {
	const search = useShinryoukouiSearch();
	const handleSubmit = ((event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		search(event.currentTarget.q.value);
	});

	return (
		<form onSubmit={handleSubmit} action="/s">
			<div className="relative h-10">
				<div className="absolute flex items-center text-gray-400 inset-y-0 start-0 ps-3 pointer-events-none h-10">
					<SearchIcon />
				</div>
				<SearchInput
					value={value ?? ""}
					onChange={onChange}
					className="block w-full ps-10 py-2 h-10"
				/>
				<Button
					type="submit"
					className="absolute right-0 top-0 bottom-0 px-4 py-0.5 rounded-s-none h-10"
				>
					検索
				</Button>
			</div>
		</form>
	);
}

export function UncontrolledSearchBar() {
	const [value, setValue] = useState("");
	return (
		<SearchBar
			value={value}
			onChange={setValue}
		/>
	);
}
