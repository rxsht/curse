export function GuideProfilePage() {
  return (
    <div className="space-y-4 rounded-2xl border bg-white p-6">
      <h1 className="text-2xl font-semibold">Профиль гида</h1>
      <p className="text-slate-600">Укажите опыт, языки и специализацию, чтобы повысить конверсию в бронирования.</p>
      <ul className="list-disc space-y-1 pl-6 text-sm text-slate-700">
        <li>Опыт: 5 лет</li>
        <li>Языки: RU, EN</li>
        <li>Категории: Culture, Food</li>
      </ul>
    </div>
  );
}
