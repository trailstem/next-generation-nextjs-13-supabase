import NotesList from './components/NotesList'
import TimerCounter from './components/timer-counter'
import { Suspense } from 'react'
import Spinner from './components/Spinner'
import RefreshBtn from './components/refresh-btn'

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
