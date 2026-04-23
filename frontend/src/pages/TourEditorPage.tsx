import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import toast from "react-hot-toast";
import { AppImage } from "../shared/ui/AppImage";
import { Button } from "../shared/ui/Button";
import { Input } from "../shared/ui/Input";

const schema = z.object({
  title: z.string().min(5),
  price: z.coerce.number().min(1),
  city: z.string().min(2),
  description: z.string().min(20),
  imageUrl: z.string().url()
});

type FormValues = z.infer<typeof schema>;

export function TourEditorPage() {
  const { register, handleSubmit } = useForm<FormValues>({ resolver: zodResolver(schema) });
  const [preview, setPreview] = useState<string>("");

  const onSubmit = handleSubmit(() => {
    toast.success("Черновик тура сохранен");
  });

  return (
    <form className="grid max-w-2xl gap-3 rounded-2xl border bg-white p-6" onSubmit={onSubmit}>
      <h1 className="text-2xl font-semibold">Создание/редактирование тура</h1>
      <Input {...register("title")} placeholder="Название тура" />
      <Input {...register("city")} placeholder="Город" />
      <Input {...register("price")} type="number" placeholder="Цена" />
      <Input {...register("description")} placeholder="Описание" />
      <Input {...register("imageUrl")} placeholder="Image URL (cover)" onChange={(e) => setPreview(e.target.value)} />
      <label className="text-sm text-slate-600">Локальный preview upload (без отправки в backend)</label>
      <input type="file" accept="image/*" className="rounded-xl border p-2 text-sm" onChange={(e) => {
        const file = e.target.files?.[0];
        if (file) setPreview(URL.createObjectURL(file));
      }} />
      {preview && <AppImage asset={{ imageUrl: preview, alt: "Preview" }} alt="Preview" className="h-56 w-full rounded-xl" />}
      <Button type="submit">Сохранить тур</Button>
    </form>
  );
}
