import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div className="grid min-h-[60vh] place-content-center gap-4 text-center">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-slate-600">Страница не найдена.</p>
      <Link className="text-sky-700" to="/">Вернуться на главную</Link>
    </div>
  );
}
