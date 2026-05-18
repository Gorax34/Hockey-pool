"use client";

export default function HomePage() {

  return (

    <main
      className="min-h-screen bg-cover bg-center text-white"
      style={{
        backgroundImage:
          "url('/HHH.png')",
      }}
    >

      {/* OVERLAY */}
      <div className="min-h-screen bg-black/40">

        

        {/* CENTER */}
        <div className="flex flex-col items-center justify-center h-[85vh]">

          <div className="bg-black/50 backdrop-blur-sm px-16 py-14 rounded-3xl border border-white/10 shadow-2xl">

            <h1 className="text-7xl font-extrabold mb-6 text-center">

              Hockey Pool 

            </h1>

            

            <div className="flex gap-6 justify-center">

              <a
                href="/create-pool"
                className="bg-red-600 hover:bg-red-700 transition px-10 py-4 rounded-2xl text-2xl font-bold shadow-xl"
              >
                Créer un Pool
              </a>

              <a
                href="/join-pool"
                className="bg-white text-black hover:bg-gray-200 transition px-10 py-4 rounded-2xl text-2xl font-bold shadow-xl"
              >
                Rejoindre
              </a>

            </div>

          </div>

        </div>

      </div>

    </main>

  );

}