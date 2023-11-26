"use client";

import { useEffect } from "react";

import { getMasterData } from "./s/get-master-data";

export function Prefetch() {
	useEffect(() => {
		getMasterData();
	}, []);
	return null;
}