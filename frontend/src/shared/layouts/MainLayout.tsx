import { Menu, PlusCircle } from "lucide-react";
import { Outlet, Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../model/useAuth";
import { Button } from "../ui/Button";

export function MainLayout() {
  const { isAuthenticated, role, logout } = useAuth();
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <Link to="/" className="text-xl font-bold tracking-tight text-slate-900">GuideMate</Link>
          <button className="md:hidden" onClick={() => setOpen((v) => !v)} aria-label="Открыть меню">
            <Menu className="h-5 w-5" />
          </button>
          <nav className="hidden items-center gap-2 md:flex">
            {["/", "/tours", "/bookings", "/profile"].map((p, idx) => (
              <NavLink key={p} to={p} className={({ isActive }) => `rounded-lg px-3 py-2 text-sm ${isActive ? "bg-slate-100 font-medium" : "text-slate-600"}`}>
                {["Главная", "Экскурсии", "Бронирования", "Профиль"][idx]}
              </NavLink>
            ))}
            {(role === "GUIDE" || role === "ADMIN") && (
              <Link to="/tours/new"><Button variant="secondary" className="inline-flex items-center gap-1"><PlusCircle className="h-4 w-4" />Создать тур</Button></Link>
            )}
            {isAuthenticated ? <Button variant="ghost" onClick={logout}>Выйти</Button> : <Link to="/auth"><Button>Войти</Button></Link>}
          </nav>
        </div>
        {open && (
          <div className="space-y-2 border-t bg-white p-4 md:hidden">
            <Link to="/tours" className="block text-sm">Экскурсии</Link>
            <Link to="/bookings" className="block text-sm">Бронирования</Link>
            <Link to="/profile" className="block text-sm">Профиль</Link>
            {(role === "GUIDE" || role === "ADMIN") && <Link to="/tours/new" className="block text-sm">Создать тур</Link>}
          </div>
        )}
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
