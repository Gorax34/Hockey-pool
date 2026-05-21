"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  collection,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";

import { db } from "@/app/firebase";

export default function PredictionsPage() {

  const [predictions, setPredictions] =
    useState<any[]>([]);

  // =========================
  // LOAD FIREBASE
  // =========================

  const loadPredictions =
    async () => {

      try {

        // =========================
        // LOAD PREDICTIONS
        // =========================

        const snapshot =
          await getDocs(

            collection(
              db,
              "predictions"
            )

          );

        const data =
          snapshot.docs.map(
            (doc) => ({

              id: doc.id,

              ...doc.data(),

            })
          );

        // =========================
        // LOAD GAME
        // =========================

        const gamesSnapshot =
          await getDocs(

            collection(
              db,
              "games"
            )

          );

        const game =
          gamesSnapshot.docs[0]?.data();

        if (!game) {

          console.log(
            "NO GAME FOUND"
          );

          return;

        }

        // =========================
        // RESULTAT FINAL
        // =========================

        const realWinner =

          game.homeScore >
          game.awayScore

            ? "MTL"

            : "CAR";

        const realHomeScore =
          Number(
            game.homeScore
          );

        const realAwayScore =
          Number(
            game.awayScore
          );

        // =========================
        // JOUEURS QUI ONT SCORE
        // =========================

        const goodPlayers = [

          // =========================
          // MTL
          // =========================

          "Suzuki",
          "Caufield",
          "Slafkovsky",
          "Demidov",
          "Hutson",
          "Gallagher",

          // =========================
          // CAR
          // =========================

          "Aho",
          "Svechnikov",
          "Jarvis",
          "Stankoven",
          "Slavin",
          "Gostisbehere",

        ];

        // =========================
        // CALCULATE POINTS
        // =========================

        const updatedData =
          data.map(
            (prediction: any) => {

              let points = 0;

              // =========================
              // BON GAGNANT
              // =========================

              if (

                prediction.winner
                  ?.toUpperCase() ===
                realWinner

              ) {

                points += 1;

              }

              // =========================
              // SCORE EXACT
              // =========================

              if (

                Number(
                  prediction.homeScore
                ) === realHomeScore

                &&

                Number(
                  prediction.awayScore
                ) === realAwayScore

              ) {

                points += 2;

              }

              // =========================
              // JOUEURS
              // =========================

              prediction.players?.forEach(
                (
                  player: string
                ) => {

                  if (

                    goodPlayers.includes(
                      player
                    )

                  ) {

                    points += 1;

                  }

                }
              );

              return {

                ...prediction,

                points,

              };

            }
          );

        // =========================
        // SAVE FIREBASE
        // =========================

        for (
          const prediction
          of updatedData
        ) {

          await updateDoc(

            doc(
              db,
              "predictions",
              prediction.id
            ),

            {
              points:
                Number(
                  prediction.points
                ),
            }

          );

        }

        console.log(
          "POINTS UPDATED"
        );

        // =========================
        // UPDATE STATE
        // =========================

        setPredictions(
          updatedData
        );

      } catch (error) {

        console.error(error);

      }

    };

  useEffect(() => {

    loadPredictions();

    // AUTO REFRESH
    const interval =
      setInterval(() => {

        loadPredictions();

      }, 3000);

    return () =>
      clearInterval(interval);

  }, []);

  return (

    <main
      className="min-h-screen bg-cover bg-center bg-fixed text-white"
      style={{
        backgroundImage:
          "url('/LNH.png')",
      }}
    >

      <div className="min-h-screen bg-black/60">

        {/* CONTENT */}

        <div className="p-8">

          <h1 className="text-6xl font-bold mb-8">

            Prédictions 🏒

          </h1>

          <div className="space-y-6">

            {predictions.map(
              (
                prediction,
                index
              ) => (

                <div
                  key={index}
                  className="bg-black/80 rounded-3xl p-6 w-[600px] border border-white/10"
                >

                  {/* HEADER */}

                  <div className="flex items-center justify-between mb-4">

                    <h2 className="text-3xl font-bold">

                      {
                        prediction.player
                      }

                    </h2>

                    <div className="text-4xl font-bold text-yellow-400">

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

                  <div className="text-green-400 text-2xl font-bold mb-4">

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
                        prediction.points
                      }

                    </div>

                  </div>

                </div>

              )
            )}

          </div>

        </div>

      </div>

    </main>

  );

}