"use client";

import { useQuery } from "@tanstack/react-query";
type TTodo = {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
};

type TUser = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };

  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

export default function Home() {
  const {
    data: todosData,
    isLoading,
    isError,
  } = useQuery<TTodo[]>({
    queryKey: ["todos"],
    queryFn: () =>
      fetch("https://jsonplaceholder.typicode.com/todos").then((res) =>
        res.json()
      ),

    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });

  const { data: usersData } = useQuery<TUser[]>({
    queryKey: ["users"],
    queryFn: () =>
      fetch("https://jsonplaceholder.typicode.com/users").then((res) =>
        res.json()
      ),
    enabled: !!todosData,
  });

  console.log(todosData);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }
  if (!todosData) {
    return <div>No data</div>;
  }
  if (!usersData) {
    return <div>No data</div>;
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1>Tanstack Query</h1>
      <h2 className="text-xl">TODOS</h2>
      <div className="flex flex-col gap-2">
        {todosData.slice(0, 10).map((todo) => (
          <div key={todo.id} className="flex ">
            <p className="text-sm">{todo.title}</p>
            <p className="text-sm">
              {todo.completed ? "Completed" : "Not Completed"}
            </p>
          </div>
        ))}
      </div>

      <h2 className="text-xl">USERS</h2>
      <div className="flex flex-col gap-2">
        {usersData.map((user) => (
          <div key={user.id} className="flex">
            <p className="text-sm">{user.name}</p>
            <p className="text-sm">{user.email}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
