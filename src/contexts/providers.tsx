"use client";

import {

	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query";

import { ShinryoukouiMasterDataProvider } from "@/contexts/shinryoukoui-master-data-context";

import { ShisetsukijunDataProvider } from "./shisetsukijun-data-context";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<QueryClientProvider client={queryClient} >
			<ShinryoukouiMasterDataProvider>
				<ShisetsukijunDataProvider>
					{children}
				</ShisetsukijunDataProvider>
			</ShinryoukouiMasterDataProvider>
		</QueryClientProvider>
	);
}