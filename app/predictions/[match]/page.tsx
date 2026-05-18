"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import { db } from "../../firebase";

import {
  collection,
  getDocs,
} from "firebase/firestore";

export default function PredictionsPage() {

  const params = useParams();

  const match = params.match;

  const [predictions, setPredictions] = useState<any[]>([]);

  useEffect(() => {

    async function fetchPredictions() {

      const querySnapshot = await getDocs(
        collection(db, "predictions")
      );

      const allPredictions: any[] = [];

      querySnapshot.forEach((doc) => {

        allPredictions.push(doc.data());

      });

      const filtered = allPredictions.filter(
        (prediction) => prediction.matchId === match
      );

      setPredictions(filtered);

    }

    fetchPredictions();

  }, [match]);

  return (

    <main
      className="min-h-screen bg-cover bg-center bg-fixed text-white"
      style={{
        backgroundImage: "url('/LNH.png')",
      }}
    >

      {/* OVERLAY */}
      <div className="min-h-screen bg-black/55">

        {/* NAVBAR */}
        <div className="w-full bg-black/80 border-b border-white/10 px-8 py-5 flex items-center justify-between">

          <h1 className="text-3xl font-bold text-red-500">
            Hockey Pool
          </h1>

          <div className="flex gap-8 text-xl font-semibold">

            <a href="/dashboard">
              Accueil
            </a>

            <a href="/create-pool">
              Créer Pool
            </a>

            <a href="/join-pool">
              Rejoindre
            </a>

          </div>

        </div>

        {/* CONTENU */}
        <div className="p-8">

          <h1 className="text-6xl font-bold mb-8">
            Prédictions : {match} 🏒
          </h1>

          {/* BOX PRINCIPALE */}
          <div className="bg-black/80 rounded-3xl p-6 w-[420px] h-[600px] overflow-y-auto border border-white/10">

            <div className="space-y-4">

              {predictions.map((prediction, index) => (

                <div
                  key={index}
                  className="bg-zinc-900/95 rounded-2xl p-4"
                >

                  {/* HEADER */}
                  <div className="flex items-center justify-between mb-3">

                    <h2 className="text-2xl font-bold">
                      {prediction.memberName}
                    </h2>

                    <div className="text-2xl font-bold text-yellow-400">

                      {prediction.homeTeam}
                      {" "}
                      {prediction.homeScorePrediction}

                      {" - "}

                      {prediction.awayScorePrediction}
                      {" "}
                      {prediction.awayTeam}

                    </div>

                  </div>

                  {/* JOUEURS */}
                  <div className="flex flex-wrap gap-2">

                    {prediction.players?.map((player: string, i: number) => (

                      <div
                        key={i}
                        className="bg-red-600 px-3 py-1 rounded-lg text-xs font-bold"
                      >
                        {player}
                      </div>

                    ))}

                  </div>

                </div>

              ))}

              {predictions.length === 0 && (

                <div className="text-gray-300 text-xl">
                  Aucune prédiction pour ce match.
                </div>

              )}

            </div>

          </div>

        </div>

      </div>

    </main>

  );
}
