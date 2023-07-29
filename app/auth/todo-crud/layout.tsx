import { Suspense } from 'react'

import EditTask from '../../components/todo-edit'
import TodoList from '../../components/todo-list'
import Spinner from '@/app/components/spinner'

export default async function TodoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="flex">
      <aside className={`h-[calc(100vh-56px)] w-1/4 bg-gray-200`}>
        <EditTask />
        <Suspense fallback={<Spinner />}>
          {/* @ts-ignore*/}
          <TodoList />
        </Suspense>
      </aside>
      <main className="flex flex-1 justify-center">{children}</main>
    </section>
  )
}