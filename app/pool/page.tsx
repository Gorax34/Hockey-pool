"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "@/app/firebase";

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
          // LOAD FIREBASE GAMES
          // =========================

          const snapshot =
            await getDocs(

              collection(
                db,
                "games"
              )

            );

          const data =
            snapshot.docs.map(
              (doc) => ({

                id: doc.id,

                ...doc.data(),

              })
            );

          console.log(
            "FIREBASE GAMES:",
            data
          );

          setGames(data);

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

          Matchs du CH 🏒

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
                        game.homeTeam
                      }

                      {" vs "}

                      {
                        game.awayTeam
                      }

                    </div>

                    <div className="text-2xl text-gray-400 mt-2">

                      {

                        game.finished
                          ? "FINAL"
                          : "Scheduled"

                      }

                    </div>

                  </div>

                  {/* SCORE */}

                  <div className="text-right text-yellow-400 font-bold text-5xl">

                    {
                      game.homeScore
                    }

                    {" - "}

                    {
                      game.awayScore
                    }

                  </div>

                </div>

                {/* BUTTONS */}

                <div className="flex gap-4 mt-6">

                  <a
                    href={`/predict/mtl-buf`}
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