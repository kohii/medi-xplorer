import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "利用規約 | MediXplorer",
  description: "MediXplorerの利用規約",
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">利用規約</h1>
      
      <div className="prose max-w-none space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-4">第1条（適用）</h2>
          <p className="mb-4">
            本利用規約（以下「本規約」）は、MediXplorer（以下「本サービス」）の利用条件を定めるものです。
            本サービスを利用される全ての方（以下「利用者」）は、本規約に同意したものとみなします。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">第2条（サービス内容）</h2>
          <p className="mb-4">
            本サービスは、社会保険診療報酬支払基金が公開している医科診療行為マスターのデータを検索・閲覧できるようにした個人開発のツールです。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">第3条（免責事項）</h2>
          <p className="mb-4">
            1. 本サービスで提供される情報の正確性、完全性、最新性について一切保証いたしません。
          </p>
          <p className="mb-4">
            2. 本サービスの利用によって生じたいかなる損害についても、開発者は一切の責任を負いません。
          </p>
          <p className="mb-4">
            3. 本サービスは「現状のまま」で提供され、明示的または黙示的な保証は一切行いません。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">第4条（利用者の責任）</h2>
          <p className="mb-4">
            1. 本サービスの利用は、利用者自身の責任において行ってください。
          </p>
          <p className="mb-4">
            2. 実際の診療報酬請求等の業務で使用される場合は、必ず公式の資料をご確認ください。
          </p>
          <p className="mb-4">
            3. 本サービスから得られた情報を元に行った判断・行動については、利用者が全ての責任を負うものとします。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">第5条（サービスの変更・中止）</h2>
          <p className="mb-4">
            本サービスは予告なく内容の変更、一時的な中断、または終了する場合があります。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">第6条（本規約の変更）</h2>
          <p className="mb-4">
            本規約は予告なく変更される場合があります。変更後の規約は、本サービスに掲載した時点から効力を生じるものとします。
          </p>
        </section>
      </div>
    </div>
  );
}