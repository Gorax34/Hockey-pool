"use client";

export default function DashboardPage() {

  return (

    <main
      className="min-h-screen bg-cover bg-center text-white"
      style={{
        backgroundImage:
          "url('/stp-pool.png')",
      }}
    >

      {/* OVERLAY */}
      <div className="min-h-screen bg-black/25">

        {/* CONTENT */}
        <div className="flex flex-col items-center justify-end h-[88vh] pb-16">

          {/* BUTTONS */}
          <div className="flex gap-5">

            {/* VOIR POOLS */}
            <a
              href="/pool"
              className="
                bg-red-600/90
                hover:bg-red-700
                transition-all
                duration-300
                px-8
                py-4
                rounded-2xl
                text-2xl
                font-bold
                shadow-xl
                backdrop-blur-sm
                hover:scale-105
              "
            >

              🏒 Voir les Pools

            </a>

            {/* CLASSEMENT */}
            <a
              href="/classement"
              className="
                bg-black/70
                hover:bg-black/90
                transition-all
                duration-300
                px-8
                py-4
                rounded-2xl
                text-2xl
                font-bold
                text-yellow-400
                shadow-xl
                backdrop-blur-sm
                hover:scale-105
              "
            >

              🏆 Classement

            </a>

          </div>

        </div>

      </div>

    </main>

  );

}