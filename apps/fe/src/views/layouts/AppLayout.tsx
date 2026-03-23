import { Outlet } from 'react-router';

export function AppLayout() {
  return (
    <main className="flex h-full w-full">
      <section className="flex-1 overflow-hidden">
        <Outlet />
      </section>
    </main>
  );
}
