"use client";

import {
  useState,
  useMemo,
} from "react";

import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { db } from "@/app/firebase";

import {
  useParams,
} from "next/navigation";

// =========================
// JOUEURS NHL
// =========================

const allPlayers = [

  // =========================
  // CANADIENS
  // =========================

  "Slafkovsky",
  "Suzuki",
  "Caufield",

  "Newhook",
  "Kapanen",
  "Demidov",

  "Anderson",
  "Dach",
  "Bolduc",

  "Florian Xhekaj",
  "Evans",
  "Gallagher",

  "Veleno",

  "Matheson",
  "Hutson",

  "Guhle",
  "Dobson",

  "Arber Xhekaj",
  "Carrier",

  "Struble",

  "Montembeault",
  "Dobes",

  // =========================
  // HURRICANES
  // =========================

  "Svechnikov",
  "Aho",
  "Jarvis",

  "Taylor Hall",
  "Stankoven",
  "Jackson Blake",

  "Eric Robinson",
  "Jankowski",
  "Jordan Staal",

  "Martinook",
  "Deslauriers",

  "Slavin",
  "Chatfield",

  "K'Andre Miller",
  "Shawn Walker",

  "Nikishin",
  "Gostisbehere",

  "Frederik Andersen",
  "Kochetkov",

];

export default function PredictPage() {

  const params =
    useParams();

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
  // AUTOCOMPLETE
  // =========================

  const suggestions =
    useMemo(() => {

      return players.map(
        (player) => {

          if (!player) {
            return [];
          }

          return allPlayers.filter(
            (p) =>

              p
                .toLowerCase()

                .includes(

                  player.toLowerCase()

                )
          );

        }
      );

    }, [players]);

  // =========================
  // CHANGE PLAYER
  // =========================

  const changePlayer =
    (
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
  // SELECT PLAYER
  // =========================

  const selectPlayer =
    (
      index: number,
      playerName: string
    ) => {

      const updated =
        [...players];

      updated[index] =
        playerName;

      setPlayers(updated);

    };

  // =========================
  // SAVE PREDICTION
  // =========================

  const savePrediction =
    async () => {

      try {

        // =========================
        // CHECK EXISTING
        // =========================

        const existing =
          await getDocs(

            query(

              collection(
                db,
                "predictions"
              ),

              where(
                "player",
                "==",
                name
              ),

              where(
                "gameId",
                "==",
                String(params.match)
              )

            )

          );

        if (!existing.empty) {

          alert(
            "Tu as déjà une prédiction pour ce match"
          );

          return;

        }

        // =========================
        // SAVE FIREBASE
        // =========================

        await addDoc(

          collection(
            db,
            "predictions"
          ),

          {

            player:
              String(name),

            gameId:
              String(params.match),

            homeTeam:
              "MTL",

            awayTeam:
              "CAR",

            homeScore:
              Number(
                homeScore
              ),

            awayScore:
              Number(
                awayScore
              ),

            winner:
              String(
                winner
              ),

            players:
              [...players],

            points: 0,

            createdAt:
              Date.now(),

          }

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

      <div className="min-h-screen bg-black/55">

        {/* PAGE */}

        <div className="flex justify-center pt-16 pb-16">

          <div className="bg-black/80 rounded-3xl p-8 w-[520px] border border-white/10">

            <h1 className="text-6xl font-bold mb-8 text-center">

              Faire une prédiction 🏒

            </h1>

            {/* NOM */}

            <input
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value
                )
              }
              placeholder="Ton nom"
              className="w-full bg-zinc-800 rounded-xl px-4 py-4 mb-4 text-xl"
            />

            {/* SCORE */}

            <div className="grid grid-cols-2 gap-4 mb-4">

              <input
                value={homeScore}
                onChange={(e) =>
                  setHomeScore(
                    e.target.value
                  )
                }
                placeholder="Score MTL"
                className="bg-zinc-800 rounded-xl px-4 py-4 text-xl"
              />

              <input
                value={awayScore}
                onChange={(e) =>
                  setAwayScore(
                    e.target.value
                  )
                }
                placeholder="Score CAR"
                className="bg-zinc-800 rounded-xl px-4 py-4 text-xl"
              />

            </div>

            {/* WINNER */}

            <input
              value={winner}
              onChange={(e) =>
                setWinner(
                  e.target.value
                )
              }
              placeholder="Équipe gagnante"
              className="w-full bg-zinc-800 rounded-xl px-4 py-4 mb-4 text-xl"
            />

            {/* JOUEURS */}

            {players.map(
              (
                player,
                index
              ) => (

                <div
                  key={index}
                  className="relative mb-4"
                >

                  <input
                    value={player}
                    onChange={(e) =>

                      changePlayer(
                        index,
                        e.target.value
                      )

                    }
                    placeholder={`Joueur ${index + 1}`}
                    className="w-full bg-zinc-800 rounded-xl px-4 py-4 text-xl"
                  />

                  {/* AUTOCOMPLETE */}

                  {player &&
                   player.length > 0 &&
                   suggestions[index]?.length > 0 &&
                   suggestions[index][0] !== player && (

                    <div className="absolute z-50 w-full bg-black border border-white/10 rounded-xl mt-1 overflow-hidden">

                      {suggestions[index]

                        .slice(0, 5)

                        .map(
                          (
                            suggestion,
                            i
                          ) => (

                            <div
                              key={i}
                              onClick={() =>

                                selectPlayer(
                                  index,
                                  suggestion
                                )

                              }
                              className="px-4 py-3 hover:bg-red-600 cursor-pointer text-white"
                            >

                              {suggestion}

                            </div>

                          )
                        )}

                    </div>

                  )}

                </div>

              )
            )}

            {/* SAVE */}

            <button
              onClick={
                savePrediction
              }
              className="w-full bg-red-600 hover:bg-red-700 rounded-xl py-4 text-2xl font-bold mt-4"
            >

              Enregistrer la prédiction

            </button>

          </div>

        </div>

      </div>

    </main>

  );

}