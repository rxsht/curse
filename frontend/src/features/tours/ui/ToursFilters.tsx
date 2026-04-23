import { Input } from "../../../shared/ui/Input";
import { Select } from "../../../shared/ui/Select";

type Props = {
  city: string;
  category: string;
  sort: string;
  minPrice: string;
  maxPrice: string;
  onCity: (v: string) => void;
  onCategory: (v: string) => void;
  onSort: (v: string) => void;
  onMinPrice: (v: string) => void;
  onMaxPrice: (v: string) => void;
};

export function ToursFilters({ city, category, sort, minPrice, maxPrice, onCity, onCategory, onSort, onMinPrice, onMaxPrice }: Props) {
  return (
    <section className="grid gap-3 rounded-2xl border bg-white p-4 md:grid-cols-5">
      <Input placeholder="Поиск по городу..." value={city} onChange={(e) => onCity(e.target.value)} aria-label="Город" />
      <Select value={category} onChange={(e) => onCategory(e.target.value)} aria-label="Категория">
        <option value="">Все категории</option>
        <option value="Adventure">Adventure</option>
        <option value="Food & Culture">Food & Culture</option>
        <option value="City Highlights">City Highlights</option>
      </Select>
      <Input value={minPrice} onChange={(e) => onMinPrice(e.target.value)} type="number" placeholder="Мин. цена" aria-label="Минимальная цена" />
      <Input value={maxPrice} onChange={(e) => onMaxPrice(e.target.value)} type="number" placeholder="Макс. цена" aria-label="Максимальная цена" />
      <Select value={sort} onChange={(e) => onSort(e.target.value)} aria-label="Сортировка">
        <option value="rating,desc">По рейтингу</option>
        <option value="price,asc">Цена по возрастанию</option>
        <option value="price,desc">Цена по убыванию</option>
      </Select>
    </section>
  );
}
