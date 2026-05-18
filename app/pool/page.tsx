"use client";

import {
  useEffect,
  useState,
} from "react";

export default function PoolPage() {

  const [games, setGames] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const loadGames =
      async () => {

        try {

          // =========================
          // NHL API
          // =========================

          const response =
            await fetch(
              "https://api-web.nhle.com/v1/schedule/now"
            );

          const data =
            await response.json();

          console.log(
            "NHL API:",
            data
          );

          // =========================
          // TODAY GAMES
          // =========================

          const todayGames =
            data.gameWeek[0].games;

          setGames(todayGames);

        } catch (error) {

          console.error(error);

        } finally {

          setLoading(false);

        }

      };

    loadGames();

  }, []);

  return (

    <main
      className="min-h-screen bg-cover bg-center bg-fixed text-white"
      style={{
        backgroundImage:
          "url('/LNH.png')",
      }}
    >

      <div className="min-h-screen bg-black/60 p-8">

        {/* TITLE */}

        <h1 className="text-7xl font-bold mb-10">

          Matchs NHL 🏒

        </h1>

        {/* LOADING */}

        {loading && (

          <div className="text-3xl">

            Chargement...

          </div>

        )}

        {/* GAMES */}

        <div className="space-y-6 max-w-[700px]">

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

                      {
                        game.awayTeam.abbrev
                      }

                      {" vs "}

                      {
                        game.homeTeam.abbrev
                      }

                    </div>

                    <div className="text-2xl text-gray-400 mt-2">

                      {

                        game.gameState === "OFF"
                          ? "FINAL"
                          : game.gameState === "LIVE"
                          ? "LIVE"
                          : "Scheduled"

                      }

                    </div>

                  </div>

                  {/* SCORE */}

                  <div className="text-right text-yellow-400 font-bold text-5xl">

                    {
                      game.awayTeam.score ?? 0
                    }

                    {" - "}

                    {
                      game.homeTeam.score ?? 0
                    }

                  </div>

                </div>

                {/* TIME */}

                <div className="mt-4 text-xl text-gray-300">

                  {

                    new Date(
                      game.startTimeUTC
                    ).toLocaleString()

                  }

                </div>

                {/* BUTTONS */}

                <div className="flex gap-4 mt-6">

                  <a
                    href={`/predict/${game.id}`}
                    className="bg-red-600 hover:bg-red-700 px-8 py-4 rounded-2xl text-2xl font-bold"
                  >

                    Prédire

                  </a>

                  <a
                    href="/predictions"
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