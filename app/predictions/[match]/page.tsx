"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "next/navigation";

import {
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "@/app/firebase";

export default function PredictionsPage() {

  const params =
    useParams();

  const match =
    String(params.match);

  const [
    predictions,
    setPredictions
  ] = useState<any[]>([]);

  const [
    loading,
    setLoading
  ] = useState(true);

  useEffect(() => {

    async function loadPredictions() {

      try {

        // =========================
        // FIREBASE
        // =========================

        const snapshot =
          await getDocs(

            collection(
              db,
              "predictions"
            )

          );

        // =========================
        // FORMAT DATA
        // =========================

        const data =
          snapshot.docs.map(
            (doc) => ({

              id: doc.id,

              ...doc.data(),

            })
          );

        console.log(
          "ALL PREDICTIONS:",
          data
        );

        console.log(
          "CURRENT MATCH:",
          match
        );

        // =========================
        // FILTER GAME
        // =========================

        const filtered =
          data.filter(

            (prediction: any) =>

              String(
                prediction.gameId
              ) === match

          );

        console.log(
          "FILTERED:",
          filtered
        );

        setPredictions(filtered);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    }

    loadPredictions();

  }, [match]);

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

        <h1 className="text-6xl font-bold mb-10">

          Prédictions 🏒

        </h1>

        {/* LOADING */}

        {loading && (

          <div className="text-3xl">

            Chargement...

          </div>

        )}

        {/* NO PREDICTIONS */}

        {!loading && predictions.length === 0 && (

          <div className="text-3xl text-gray-300">

            Aucune prédiction pour ce match.

          </div>

        )}

        {/* LIST */}

        <div className="space-y-6">

          {predictions.map(
            (
              prediction,
              index
            ) => (

              <div
                key={index}
                className="bg-black/80 border border-white/10 rounded-3xl p-6 max-w-[700px]"
              >

                {/* HEADER */}

                <div className="flex items-center justify-between mb-4">

                  <h2 className="text-4xl font-bold">

                    {
                      prediction.player
                    }

                  </h2>

                  <div className="text-5xl font-bold text-yellow-400">

                    {
                      prediction.homeScore
                    }

                    {" - "}

                    {
                      prediction.awayScore
                    }

                  </div>

                </div>

                {/* MATCH */}

                <div className="text-2xl mb-4">

                  {
                    prediction.homeTeam
                  }

                  {" VS "}

                  {
                    prediction.awayTeam
                  }

                </div>

                {/* WINNER */}

                <div className="text-green-400 text-2xl font-bold mb-5">

                  Gagnant :

                  {" "}

                  {
                    prediction.winner
                  }

                </div>

                {/* PLAYERS */}

                <div className="flex flex-wrap gap-2 mb-6">

                  {prediction.players?.map(
                    (
                      player: string,
                      i: number
                    ) => (

                      <div
                        key={i}
                        className="bg-red-600 px-4 py-2 rounded-xl text-sm font-bold"
                      >

                        {player}

                      </div>

                    )
                  )}

                </div>

                {/* POINTS */}

                <div className="flex items-center justify-between">

                  <div className="text-2xl">

                    Points du pool

                  </div>

                  <div className="text-5xl font-bold text-yellow-400">

                    {
                      prediction.points ?? 0
                    }

                  </div>

                </div>

              </div>

            )
          )}

        </div>

      </div>

    </main>

  );

}