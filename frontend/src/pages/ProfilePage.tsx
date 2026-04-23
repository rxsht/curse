import { useAuth } from "../shared/model/useAuth";
import { AppImage } from "../shared/ui/AppImage";

export function ProfilePage() {
  const { user, role } = useAuth();
  return (
    <div className="space-y-4 rounded-2xl border bg-white p-6">
      <h1 className="text-2xl font-semibold">Профиль пользователя</h1>
      <p className="text-slate-600">Управляйте личными данными, историей поездок и настройками уведомлений.</p>
      <div className="flex items-center gap-3">
        <AppImage asset={user?.avatar} alt={user?.fullName || "User"} className="h-14 w-14 rounded-full" sizes="56px" />
        <div>
          <p className="font-medium">{user?.fullName || "Demo User"}</p>
          <p className="text-sm text-slate-500">{role || "USER"}</p>
        </div>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-xl bg-slate-50 p-3">Имя: {user?.fullName || "Demo User"}</div>
        <div className="rounded-xl bg-slate-50 p-3">Email: {user?.email || "demo@guidemate.app"}</div>
      </div>
    </div>
  );
}
