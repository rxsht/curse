import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import { MainLayout } from "../../shared/layouts/MainLayout";
import { ProtectedRoute } from "../../features/auth/ui/ProtectedRoute";
import { AuthPage } from "../../pages/AuthPage";
import { AuthCallbackPage } from "../../pages/AuthCallbackPage";
import { BookingsPage } from "../../pages/BookingsPage";
import { GuideProfilePage } from "../../pages/GuideProfilePage";
import { HomePage } from "../../pages/HomePage";
import { NotFoundPage } from "../../pages/NotFoundPage";
import { ProfilePage } from "../../pages/ProfilePage";
import { TourDetailsPage } from "../../pages/TourDetailsPage";
import { TourEditorPage } from "../../pages/TourEditorPage";
import { ToursCatalogPage } from "../../pages/ToursCatalogPage";

export function AppRouter() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/auth/callback" element={<AuthCallbackPage />} />
          <Route path="/tours" element={<ToursCatalogPage />} />
          <Route path="/tours/:id" element={<TourDetailsPage />} />
          <Route
            path="/tours/new"
            element={
              <ProtectedRoute roles={["GUIDE", "ADMIN"]}>
                <TourEditorPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bookings"
            element={
              <ProtectedRoute>
                <BookingsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/guide-profile"
            element={
              <ProtectedRoute roles={["GUIDE", "ADMIN"]}>
                <GuideProfilePage />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AnimatePresence>
  );
}
