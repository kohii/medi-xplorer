import { AppIcon } from "@/components/app-icon";
import { AdvancedSearchAnchor } from "@/features/advanced-search/advanced-search-anchor";
import { UncontrolledSearchBar } from "@/features/search/search-bar";

import { PrefetchSearchResultPage } from "./prefetch-search-result";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between h-full">
      <div className="flex flex-col items-center justify-center h-full w-full">
        <main className="flex flex-col items-center max-w-[600px] w-full pb-28 pt-12 px-4">
          <h1 className="text-center text-5xl text-slate-500 flex items-center gap-2">
            <AppIcon />
            MediXplorer
          </h1>
          <p className="text-center text-gray-500 mt-4">
            医科診療行為マスタービューアー
          </p>
          <div className="my-8 w-full">
            <UncontrolledSearchBar />
          </div>
          <AdvancedSearchAnchor />
        </main>
      </div>
      <footer>
        <div className="flex items-center justify-center h-24">
          <div className="text-gray-500 text-sm">
            © {new Date().getFullYear()} kohii
          </div>
        </div>
      </footer>
      <PrefetchSearchResultPage />
    </div>
  );
}
