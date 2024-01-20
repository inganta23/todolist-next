import TodoList from "@/components/TodoList";
import Head from "next/head";

export default function Home() {
  return (
    <main className="h-screen bg-gray-100">
      <Head>
        <title>Todo List - Johanes</title>
      </Head>
      <TodoList />
    </main>
  );
}
