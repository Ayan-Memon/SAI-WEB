// "use client";

// import { useCurrentUser } from "@/hooks/useCurrentUser";
// import { useRouter } from "next/navigation";
// import { useEffect, useMemo } from "react";

// export default function AdminLayout({ children }) {
//   const { data: user, isLoading } = useCurrentUser();

//   const roles = useMemo(() => ["admin", "social_handler"], []);

//   const router = useRouter();

//   useEffect(() => {
//     if (!isLoading && !roles.includes(user?.role)) {
//       router.replace("/");
//     }
//   }, [user, isLoading, router, roles]);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   return children;
// }

"use client";

import { Footer } from "@/components/layouts/Footer";
import Navbar from "@/components/layouts/Navbar";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ALLOWED_ROLES = ["admin", "social_handler"];

export default function AdminLayout({ children }) {
  const { data: user, isLoading } = useCurrentUser();
  const router = useRouter();

  const hasAccess = !isLoading && user && ALLOWED_ROLES.includes(user.role);
  const shouldRedirect = !isLoading && !hasAccess;

  useEffect(() => {
    if (shouldRedirect) {
      router.replace("/");
    }
  }, [shouldRedirect, router]);

  // --- KEY FIX ---
  // Jab tak loading hai, ya redirect hona hai — kuch bhi render mat karo.
  // Children tab render honge jab role confirm ho jaye.
  // Isse admin panel ka ek frame bhi screen pe nahi aayega unauthorized users ko.
  if (isLoading || shouldRedirect) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-4 border-secondary border-t-transparent animate-spin" />
          <p className="text-secondary font-heading">Loading...</p>
        </div>
      </div>
    );
  }
  return (
    <>
      <Navbar />
      <main className="xl:mt-28 lg:mt-24 md:mt-22 mt-18">{children}</main>
      <Footer />
    </>
  );
}
