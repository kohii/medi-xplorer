import Link from "next/link";
import { Suspense } from "react";

import { AppIcon } from "@/components/app-icon";
import { GitHubIcon } from "@/components/icons/github-icon";
import { AdvancedSearchButton } from "@/features/advanced-search/advanced-search-button";
import { SearchBar } from "@/features/search/search-bar";
import { getLayoutVersion } from "@/features/shinryoukoui-master-versions/layouts";

import { PrefetchSearchResultPage } from "./prefetch-search-result";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between h-full">
      <div className="flex flex-col items-center justify-center h-full w-full">
        <main className="flex flex-col items-center max-w-[600px] w-full pb-24 pt-12 px-4">
          <h1 className="text-center text-5xl text-slate-500 flex items-center gap-2">
            <AppIcon />
            MediXplorer
          </h1>
          <p className="text-center text-gray-500 mt-4">医科診療行為マスタービューアー</p>
          <div className="my-8 w-full">
            <SearchBar />
          </div>
          <AdvancedSearchButton layoutVersion={getLayoutVersion("")} />
        </main>
      </div>
      <footer>
        <div className="flex items-center justify-center h-24 gap-4 text-gray-500 text-sm">
          <div>© {new Date().getFullYear()} kohii</div>
          <Link href="/terms" className="text-gray-500 text-sm underline">
            利用規約
          </Link>
          <a
            href="https://github.com/kohii/medi-xplorer"
            target="_blank"
            rel="noopener noreferrer"
            title="MediXplorer on GitHub"
            className="block flex items-center gap-2 underline"
          >
            <GitHubIcon />
            GitHub
          </a>
        </div>
      </footer>
      <Suspense>
        <PrefetchSearchResultPage />
      </Suspense>
    </div>
  );
}
