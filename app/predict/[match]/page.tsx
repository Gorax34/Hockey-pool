"use client";

import { useState } from "react";

import {
  addDoc,
  collection,
} from "firebase/firestore";

import { db } from "@/app/firebase";

export default function PredictPage() {

  // =========================
  // LISTE JOUEURS
  // =========================

  const allPlayers = [

    // MTL
    "Suzuki",
    "Caufield",
    "Slafkovsky",
    "Hutson",
    "Matheson",
    "Demidov",
    "Evans",
    "Newhook",
    "Dach",
    "Anderson",
    "Gallagher",
    "Armia",
    "Roy",
    "Heineman",
    "Xhekaj",
    "Savard",
    "Guhle",
    "Struble",

    // BUF
    "Thompson",
    "Tuch",
    "Peterka",
    "Cozens",
    "Quinn",
    "Byram",
    "Dahlin",
    "Power",
    "Greenway",
    "McLeod",
    "Benson",
    "Kulich",
    "Skinner",
    "Samuelsson",

  ];

  // =========================
  // STATES
  // =========================

  const [name, setName] =
    useState("");

  const [homeScore, setHomeScore] =
    useState("");

  const [awayScore, setAwayScore] =
    useState("");

  const [winner, setWinner] =
    useState("");

  const [players, setPlayers] =
    useState([
      "",
      "",
      "",
      "",
      "",
    ]);

  // =========================
  // UPDATE JOUEURS
  // =========================

  const updatePlayer = (
    index: number,
    value: string
  ) => {

    const updated =
      [...players];

    updated[index] =
      value;

    setPlayers(updated);

  };

  // =========================
  // SAVE FIREBASE
  // =========================

  const savePrediction =
    async () => {

      try {

        const prediction = {

          player: name,

          homeTeam: "MTL",

          awayTeam: "BUF",

          homeScore:
            Number(homeScore),

          awayScore:
            Number(awayScore),

          winner,

          players,

          points: 0,

          createdAt:
            Date.now(),

        };

        console.log(
          "SAVE DATA:",
          prediction
        );

        const ref =
          await addDoc(

            collection(
              db,
              "predictions"
            ),

            prediction

          );

        console.log(
          "DOCUMENT CREATED:",
          ref.id
        );

        alert(
          "Prédiction enregistrée !"
        );

      } catch (error) {

        console.error(
          "FIREBASE ERROR:",
          error
        );

        alert(
          "Erreur Firebase"
        );

      }

    };

  return (

    <main
      className="min-h-screen bg-cover bg-center bg-fixed text-white"
      style={{
        backgroundImage:
          "url('/LNH.png')",
      }}
    >

      <div className="min-h-screen bg-black/60">

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
        <div className="flex justify-center pt-16">

          <div className="w-[520px] bg-black/80 rounded-3xl p-8 border border-white/10">

            <h1 className="text-5xl font-bold text-center mb-10">
              Faire une prédiction 🏒
            </h1>

            <div className="space-y-4">

              {/* NOM */}
              <input
                type="text"
                placeholder="Ton nom"
                value={name}
                onChange={(e) =>
                  setName(
                    e.target.value
                  )
                }
                className="w-full p-4 rounded-xl bg-zinc-800 text-white"
              />

              {/* ÉQUIPES */}
              <div className="grid grid-cols-2 gap-4">

                <input
                  type="text"
                  value="MTL"
                  readOnly
                  className="p-4 rounded-xl bg-zinc-800 text-white"
                />

                <input
                  type="text"
                  value="BUF"
                  readOnly
                  className="p-4 rounded-xl bg-zinc-800 text-white"
                />

              </div>

              {/* SCORES */}
              <div className="grid grid-cols-2 gap-4">

                <input
                  type="number"
                  placeholder="Score maison"
                  value={homeScore}
                  onChange={(e) =>
                    setHomeScore(
                      e.target.value
                    )
                  }
                  className="p-4 rounded-xl bg-zinc-800 text-white"
                />

                <input
                  type="number"
                  placeholder="Score visiteur"
                  value={awayScore}
                  onChange={(e) =>
                    setAwayScore(
                      e.target.value
                    )
                  }
                  className="p-4 rounded-xl bg-zinc-800 text-white"
                />

              </div>

              {/* GAGNANT */}
              <input
                type="text"
                placeholder="Équipe gagnante"
                value={winner}
                onChange={(e) =>
                  setWinner(
                    e.target.value
                  )
                }
                className="w-full p-4 rounded-xl bg-zinc-800 text-white"
              />

              {/* JOUEURS */}
              {players.map(
                (
                  player,
                  index
                ) => (

                  <input
                    key={index}
                    list="players-list"
                    placeholder={`Joueur ${index + 1}`}
                    value={player}
                    onChange={(e) =>

                      updatePlayer(
                        index,
                        e.target.value
                      )

                    }
                    className="w-full p-4 rounded-xl bg-zinc-800 text-white"
                  />

                )
              )}

              {/* DATALIST */}
              <datalist id="players-list">

                {allPlayers.map(
                  (
                    player,
                    index
                  ) => (

                    <option
                      key={index}
                      value={player}
                    />

                  )
                )}

              </datalist>

              {/* BOUTON */}
              <button
                onClick={savePrediction}
                className="w-full bg-red-600 hover:bg-red-700 transition rounded-xl p-4 text-xl font-bold mt-4"
              >

                Enregistrer la prédiction

              </button>

            </div>

          </div>

        </div>

      </div>

    </main>

  );

}