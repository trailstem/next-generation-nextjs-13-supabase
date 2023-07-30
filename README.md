# Next.js 13 概要

- ### Server components (force-cache, no-store, revalidate)
  app ディレクトリに作成したファイルはデフォルトではすべて Server Component
  ##### 以下オプションの説明
  - `force-cache`は従来の getStaticProps(SSG) と同じ
  - `no-store`は従来の getServerSideProps(SSR) と同じ
  - `revalidate`は従来の ISR 同じ(ISR)
- ### Client components
  クライアント側でインタラクティブな処理を行うための components
- ### Nested Layout

- ### Suspense

  以下のようにすることで、MyComponent がレンダリングされる前に必要なデータがまだロードされていない場合、React は`<div>Loading...</div>`を代わりに表示

  ```tsx
  <Suspense fallback={<div>Loading...</div>}>
    <MyComponent />
  </Suspense>
  ```

- ### Soft navigation and Hard navigation

  Next.js version 13.4 以降では、`router.push()`の場合、`初回だけ`Hard Navigation する使用になっている。2 回目以降は Soft Navigation

  また、`Dinamic Segment` のパラメータが変わるたびに `Hard Navigation` になる。

- ### Dynamic segment + generateStaticParams

  generateStaticParams(SSG の設定)
  `Dynamic Route` を利用している場合に存在するページの一覧を定義することでビルド時に静的ファイルを作成してくれます。page ディレクトリで利用していた getStaticPaths と同じような設定を行います。

- ### Streaming HTML

- ### Revalidating Data(ISR)
  最初のリクエストが行われてから ⚪︎ 秒過ぎてアクセスがあった場合に静的ファイルの更新を行う

---

## Server component と Client component の違い

#### Server component

- サーバでレンダリングされる
- Data fetch に async function を使用できる
- Secure key を使用可能
- Browser API は使用不可
- useState, useEffect 等は使用不可
- Event lister(onClick 等)は使用不可

#### Client component

- ブラウザで JS 実行される
- Data fetch に async function を使用できない
- useEffect, React-query, SWR, use を使用する必要がある
- Secure key を使用不可
- useState, useEffect 等を使用可
- Event lister(onClick 等)は使用可
