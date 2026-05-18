"use client";

export default function PoolPage() {

  // =========================
  // GAMES
  // =========================

  const games = [

    {
      gameId: "game-1",
      match: "Match 1",
      date: "mer. 6 mai",
      homeTeam: "Canadiens",
      awayTeam: "Sabres",
      homeScore: 2,
      awayScore: 4,
      status: "Final",
      serie: "BUF mène 1-0",
    },

    {
      gameId: "game-2",
      match: "Match 2",
      date: "ven. 8 mai",
      homeTeam: "Canadiens",
      awayTeam: "Sabres",
      homeScore: 5,
      awayScore: 1,
      status: "Final",
      serie: "Série égale 1-1",
    },

    {
      gameId: "game-3",
      match: "Match 3",
      date: "dim. 10 mai",
      homeTeam: "Sabres",
      awayTeam: "Canadiens",
      homeScore: 2,
      awayScore: 6,
      status: "Final",
      serie: "MTL mène 2-1",
    },

    {
      gameId: "game-4",
      match: "Match 4",
      date: "mar. 12 mai",
      homeTeam: "Sabres",
      awayTeam: "Canadiens",
      homeScore: 3,
      awayScore: 2,
      status: "Final",
      serie: "Série égale 2-2",
    },

    {
      gameId: "game-5",
      match: "Match 5",
      date: "jeu. 14 mai",
      homeTeam: "Canadiens",
      awayTeam: "Sabres",
      homeScore: 6,
      awayScore: 3,
      status: "Final",
      serie: "MTL mène 3-2",
    },

    {
      gameId: "game-6",
      match: "Match 6",
      date: "sam. 16 mai",
      homeTeam: "Sabres",
      awayTeam: "Canadiens",
      homeScore: 8,
      awayScore: 3,
      status: "Final",
      serie: "Série égale 3-3",
    },

    {
      gameId: "game-7",
      match: "Match 7",
      date: "lun. 18 mai",
      homeTeam: "Canadiens",
      awayTeam: "Sabres",
      homeScore: "-",
      awayScore: "-",
      status: "19h30",
      serie: "Match ultime",
    },

  ];

  return (

    <main
      className="min-h-screen bg-cover bg-center bg-fixed text-white"
      style={{
        backgroundImage:
          "url('/LNH.png')",
      }}
    >

      <div className="min-h-screen bg-black/70 p-8">

        {/* TITLE */}

        <h1 className="text-7xl font-bold mb-10">

          Matchs NHL 🏒

        </h1>

        {/* GAMES */}

        <div className="space-y-6 max-w-[900px]">

          {games.map(
            (
              game,
              index
            ) => (

              <div
                key={index}
                className="bg-black/80 border border-white/10 rounded-3xl p-6"
              >

                {/* HEADER */}

                <div className="flex items-center justify-between">

                  <div>

                    <div className="text-4xl font-bold">

                      {game.match}

                    </div>

                    <div className="text-gray-400 text-xl mt-1">

                      {game.date}

                    </div>

                  </div>

                  <div className="text-right">

                    <div className="text-5xl font-bold text-yellow-400">

                      {game.homeScore}

                      {" - "}

                      {game.awayScore}

                    </div>

                    <div className="text-xl text-gray-400 mt-2">

                      {game.status}

                    </div>

                  </div>

                </div>

                {/* TEAMS */}

                <div className="mt-6 text-3xl font-semibold">

                  {game.homeTeam}

                  {" VS "}

                  {game.awayTeam}

                </div>

                {/* SERIE */}

                <div className="mt-4 text-green-400 text-2xl font-bold">

                  {game.serie}

                </div>

                {/* BUTTONS */}

                <div className="flex gap-4 mt-8">

                  <a
                    href={`/predict/${game.gameId}`}
                    className="bg-red-600 hover:bg-red-700 px-8 py-4 rounded-2xl text-2xl font-bold"
                  >

                    Prédire

                  </a>

                  <a
                    href={`/predictions/${game.gameId}`}
                    className="bg-zinc-700 hover:bg-zinc-600 px-8 py-4 rounded-2xl text-2xl font-bold"
                  >

                    Voir

                  </a>

                </div>

              </div>

            )
          )}

        </div>

      </div>

    </main>

  );

}