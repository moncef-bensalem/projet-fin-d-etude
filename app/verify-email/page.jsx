import { Suspense } from "react";
import VerifyEmailContent from "./content";

export const dynamic = "force-dynamic"; // configuration correcte ici

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div className="text-center p-8">Chargement...</div>}>
      <VerifyEmailContent />
    </Suspense>
  );
}
