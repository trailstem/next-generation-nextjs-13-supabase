# Next.js 13 概要

- ### ServerComponents (force-cache, no-store, revalidate)
  app ディレクトリに作成したファイルはデフォルトではすべて Server Component
  ##### 以下オプションの説明
  - `force-cache`は従来の getStaticProps(SSG) と同じ
  - `no-store`は従来の getServerSideProps(SSR) と同じ
  - `revalidate`は従来の ISR 同じ(ISR)
- ### route.refresh
  以下のように実装することで、router.refresh が実行された場合
  client comopnent は再レンダリングされず（useState のローカル情報が削除されず）、server comopnent のみレンダリングされる

```tsx
'use client'
import { useRouter } from 'next/navigation'
export default function RefreshBtn() {
  const router = useRouter()
  return (
    <button
      className="rounded bg-indigo-600 px-3 py-1 font-medium text-white hover:bg-indigo-700"
      onClick={() => {
        router.refresh()
      }}
    >
      Refresh current route
    </button>
  )
}
```

```tsx
export default function Page() {
  return (

    <ServerComponent />
    <ClientComponent />
    <RefreshButton />
  )
}
```

- ### Nested Layout
  layout に関しては、ルートセグメントからルートセグメント以下のセグメントに対して、layout が適用（累積）される。
- ### Suspense

  以下のようにすることで、MyComponent がレンダリングされる前に必要なデータがまだロードされていない場合、React は`<div>Loading...</div>`を代わりに表示

  ```tsx
  <Suspense fallback={<div>Loading...</div>}>
    <MyComponent />
  </Suspense>
  ```

- ### Soft navigation and Hard navigation

  Next.js version 13.4 以降では、`router.push()`の場合、`初回だけ`Hard Navigation する使用になっている。2 回目以降は Soft Navigation

  また、`Dinamic Segment` のパラメータが変わるたびに 毎回`Hard Navigation` になる。

  Hard Navigation は個別ツリー以下のセグメントのみだけ対象に行われている
  ルートセグメントから Hard Navigation したい場合は、`router.refresh`を使用して実現可能

- ### Dynamic segment + generateStaticParams

  generateStaticParams(SSG の設定)
  `Dynamic Route` を利用している場合に存在するページの一覧を定義することでビルド時に静的ファイルを作成してくれます。page ディレクトリで利用していた getStaticPaths と同じような設定を行います。

- ### Streaming HTML

  streaming の解決に時間がかかる component の解決をまたずして、他の Client Components を先に画面に表示ができる（Client Component の HTML がクライアントに送られ、その後必要な JS・Hydrate されてインララクティブになる）。

- ### Revalidating Data(ISR)
  最初のリクエストが行われてから ⚪︎ 秒過ぎてアクセスがあった場合に静的ファイルの更新を行う

---

## ServerComponent と ClientComponent の違い

#### Server component

- サーバでレンダリングされる
- Data fetch に async function を使用できる
- Secure key を使用可能
- Browser API は使用不可
- useState, useEffect 等は使用不可
- Event lister(onClick 等)は使用不可

#### ClientComponent

- ブラウザで JS 実行される
- Data fetch に async function を使用できない
- useEffect, React-query, SWR, use を使用する必要がある
- Secure key を使用不可
- useState, useEffect 等を使用可
- Event lister(onClick 等)は使用可

<span style="color:red">Server components から Client Components は使用できるが、Client components から Server components は使用できません。</span>
以下のように Client components の children として Server components を渡すことは可能。

```tsx
//as a child or prop of a Client Component
import ClientComponent from '../ClientComponent/'
import ServerComponent from '../ServerComponent/'

// Pages are Server Components by default
export default function Page() {
  return (
    <ClientComponent>
      <ServerComponent />
    </ClientComponent>
  )
}
```

以下のような場合は、暗黙的に React の方が server Components を作成してから Client Components を作成するといった順序を判断できないため、アンチパターンとされている

```tsx
'use client'

import ServerComponent from '../ServerComponent'

//❌ this pattern will not work
export default function ClientComponent() {
  return (
    <>
      <ServerComponent />
    </>
  )
}
```

## generateStaticParams

static なブログページ等を build 時点で作成する場合は、表示するためのブログ一覧を取得する必要があり、従来では`getStaticPaths`を使用していたが、
Next.js13.4 以降は`generateStaticParams`を使用する。
