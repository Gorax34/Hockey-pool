"use client";

import { usePathname } from "next/navigation";

export default function Navbar() {

  const pathname = usePathname();

  // Pages publiques
  const publicPages = [

    "/",
    "/create-pool",
    "/join-pool",

  ];

  const showAccueil =
    !publicPages.includes(pathname);

  return (

    <div className="w-full bg-black/80 border-b border-white/10 px-8 py-5 flex items-center justify-between">

      <h1 className="text-3xl font-bold text-red-500">
        Hockey Pool
      </h1>

      <div className="flex gap-8 text-xl font-semibold">

        {showAccueil && (

          <a href="/dashboard">
            Accueil
          </a>

        )}

        <a href="/create-pool">
          Créer Pool
        </a>

        <a href="/join-pool">
          Rejoindre
        </a>

      </div>

    </div>

  );

}