import NotesList from './components/NotesList'
import TimerCounter from './components/timer-counter'
import { Suspense } from 'react'
import RefreshBtn from './components/refresh-btn'
import Spinner from './components/spinner'

export default function Home() {
  return (
    <main className="">
      <div className="m-10 text-center">
        {/* Suspense:server componentsの処理をまたずしてclient componentsを表示することができる */}
        <Suspense fallback={<Spinner color="border-green-500" />}>
          <NotesList />
        </Suspense>
        <TimerCounter />
        <RefreshBtn />
      </div>
    </main>
  )
}
