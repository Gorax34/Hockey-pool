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

export default function ClassementPage() {

  const [classement, setClassement] =
    useState<any[]>([]);

  // =========================
  // LOAD FIREBASE
  // =========================

  const loadClassement =
    async () => {

      try {

        const snapshot =
          await getDocs(

            collection(
              db,
              "predictions"
            )

          );

        // =========================
        // TOTAL PAR JOUEUR
        // =========================

        const totals: any = {};

        snapshot.docs.forEach(
  (doc) => {

    const data =
      doc.data();

    const player =
      data.player;

    const points =
      Number(
        data.points || 0
      );

    if (
      !totals[player]
    ) {

      totals[player] = 0;

    }

    totals[player] =

      Number(
        totals[player]
      )

      +

      Number(points);

  }
);

        // =========================
        // CONVERT ARRAY
        // =========================

        const classementArray =
          Object.keys(totals).map(
            (player) => ({

              player,

              points:
                totals[player],

            })
          );

        // =========================
        // SORT
        // =========================

        classementArray.sort(

          (
            a,
            b
          ) =>

            b.points -
            a.points

        );

        setClassement(
          classementArray
        );

      } catch (error) {

        console.log(error);

      }

    };

  useEffect(() => {

    loadClassement();

    const interval =
      setInterval(() => {

        loadClassement();

      }, 2000);

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

      {/* OVERLAY */}
      <div className="min-h-screen bg-black/60">

        <div className="p-8">

          {/* TITLE */}
          <h1 className="text-7xl font-bold mb-10">

            🏆 Classement

          </h1>

          {/* TABLE */}
          <div className="bg-black/70 rounded-3xl overflow-hidden border border-white/10 max-w-[900px]">

            {/* HEADER */}
            <div className="grid grid-cols-3 bg-red-600 p-6 text-4xl font-bold">

              <div>
                Rang
              </div>

              <div>
                Joueur
              </div>

              <div className="text-right">
                Points
              </div>

            </div>

            {/* PLAYERS */}
            {classement.map(

              (
                player,
                index
              ) => (

                <div
                  key={index}
                  className="
                    grid
                    grid-cols-3
                    p-6
                    text-3xl
                    border-b
                    border-white/10
                    items-center
                  "
                >

                  {/* RANK */}
                  <div className="font-bold text-yellow-400">

                    #

                    {
                      index + 1
                    }

                  </div>

                  {/* PLAYER */}
                  <div className="font-bold">

                    {
                      player.player
                    }

                  </div>

                  {/* POINTS */}
                  <div className="text-right text-green-400 font-bold text-5xl">

                    {
                      player.points
                    }

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