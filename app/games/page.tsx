"use client";

import { useEffect, useState } from "react";

import { db } from "../firebase";

import {
  collection,
  getDocs,
} from "firebase/firestore";

export default function GamesPage() {

  const [games, setGames] = useState<any[]>([]);

  useEffect(() => {

    async function loadGames() {

      const querySnapshot = await getDocs(collection(db, "games"));

      const gamesData: any[] = [];

      querySnapshot.forEach((doc) => {

        gamesData.push({
          id: doc.id,
          ...doc.data(),
        });

      });

      setGames(gamesData);

    }

    loadGames();

  }, []);

  return (

    <main className="min-h-screen bg-black text-white p-10">

      <h1 className="text-6xl font-bold mb-10">
        Games NHL 🏒
      </h1>

      <div className="flex flex-col gap-6">

        {games.map((game) => (

          <div
            key={game.id}
            className="bg-zinc-900 p-6 rounded-2xl"
          >

            <h2 className="text-3xl font-bold mb-4">

              {game.homeTeam} VS {game.awayTeam}

            </h2>

            <p className="text-xl">

              Score :
              {" "}
              {game.homeScore}
              {" - "}
              {game.awayScore}

            </p>

            <p className="mt-2 text-gray-400">

              {game.finished
                ? "Match terminé"
                : "Match en attente"}

            </p>

          </div>

        ))}

      </div>

    </main>

  );

}