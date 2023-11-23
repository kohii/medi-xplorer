export type VirtualField = {
	name: string;
	value(row: string[]): string;
};
