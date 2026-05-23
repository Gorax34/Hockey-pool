"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  addDoc,
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "@/app/firebase";

export default function PoolPage() {

  // =========================
  // SERIES PREDICTIONS
  // =========================

  const [
    seriesPredictions,
    setSeriesPredictions
  ] = useState<any[]>([]);

  const [
    seriesTeam,
    setSeriesTeam
  ] = useState("");

  const [
    seriesGames,
    setSeriesGames
  ] = useState("");

  const [
    seriesName,
    setSeriesName
  ] = useState("");

  const [
    showSeriesForm,
    setShowSeriesForm
  ] = useState(false);

  // =========================
  // LOAD SERIES PREDICTIONS
  // =========================

  const loadSeriesPredictions =
    async () => {

      const snapshot =
        await getDocs(

          collection(
            db,
            "seriesPredictions"
          )

        );

      const data =
        snapshot.docs.map(
          (doc) => doc.data()
        );

      setSeriesPredictions(data);

    };

  // =========================
  // LOAD ON START
  // =========================

  useEffect(() => {

    loadSeriesPredictions();

  }, []);

  // =========================
  // VOTE SERIES
  // =========================

  const voteSeries =
    async () => {

      if (
        seriesTeam.trim() === "" ||
        seriesGames.trim() === "" ||
        seriesName.trim() === ""
      ) {

        alert(
          "Remplis tous les champs"
        );

        return;

      }

      try {

        await addDoc(

          collection(
            db,
            "seriesPredictions"
          ),

          {
            name:
              seriesName,

            prediction:
              `${seriesTeam.toUpperCase()} en ${seriesGames}`,
          }

        );

        alert(
          "Prédiction enregistrée !"
        );

        setSeriesTeam("");
        setSeriesGames("");
        setSeriesName("");

        setShowSeriesForm(false);

        loadSeriesPredictions();

      } catch (error) {

        console.log(error);

        alert(
          "Erreur Firebase"
        );

      }

    };

  // =========================
  // GAMES
  // =========================

  const games = [

    {
      gameId: "game-1",
      match: "Match 1",
      date: "Jeu. 21 mai",
      homeTeam: "Canadiens",
      awayTeam: "Hurricanes",
      homeScore: 6,
      awayScore: 2,
      status: "terminer",
      serie: "1-0",
    },

    {
      gameId: "game-2",
      match: "Match 2",
      date: "Sam. 23 mai",
      homeTeam: "Canadiens",
      awayTeam: "Hurricanes",
      homeScore: 0,
      awayScore: 1,
      status: "en cours",
      serie: "1-0",
    },

    {
      gameId: "game-3",
      match: "Match 3",
      date: "Lun. 25 mai",
      homeTeam: "Hurricanes",
      awayTeam: "Canadiens",
      homeScore: 0,
      awayScore: 0,
      status: "À venir",
      serie: "1-0",
    },

    {
      gameId: "game-4",
      match: "Match 4",
      date: "Mer. 27 mai",
      homeTeam: "Hurricanes",
      awayTeam: "Canadiens",
      homeScore: 0,
      awayScore: 0,
      status: "À venir",
      serie: "1-0",
    },

    {
      gameId: "game-5",
      match: "Match 5",
      date: "Ven. 29 mai",
      homeTeam: "Canadiens",
      awayTeam: "Hurricanes",
      homeScore: 0,
      awayScore: 0,
      status: "À venir",
      serie: "1-0",
    },

    {
      gameId: "game-6",
      match: "Match 6",
      date: "Dim. 31 mai",
      homeTeam: "Hurricanes",
      awayTeam: "Canadiens",
      homeScore: 0,
      awayScore: 0,
      status: "À venir",
      serie: "1-0",
    },

    {
      gameId: "game-7",
      match: "Match 7",
      date: "Mar. 2 juin",
      homeTeam: "Canadiens",
      awayTeam: "Hurricanes",
      homeScore: 0,
      awayScore: 0,
      status: "À venir",
      serie: "1-0",
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

          Canadiens vs Hurricanes 🏒

        </h1>

        {/* LAYOUT */}

        <div className="flex gap-8 items-start">

          {/* GAMES */}

          <div className="space-y-6 flex-1 max-w-[900px]">

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

                    Série :

                    {" "}

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

          {/* FIN DE SERIE */}

          <div className="w-[380px] bg-black/80 border border-white/10 rounded-3xl p-6 sticky top-8">

            <h2 className="text-4xl font-bold mb-6">

              🏆 Fin de série

            </h2>

            {/* OPEN FORM */}

            <button
              onClick={() =>
                setShowSeriesForm(
                  !showSeriesForm
                )
              }
              className="w-full bg-red-600 hover:bg-red-700 rounded-2xl py-4 text-2xl font-bold mb-6"
            >

              Predire Fin de série

            </button>

            {/* FORM */}

            {showSeriesForm && (

              <div className="space-y-4 mb-8">

                <input
                  value={seriesTeam}
                  onChange={(e) =>
                    setSeriesTeam(
                      e.target.value
                    )
                  }
                  placeholder="MTL ou CAR"
                  className="w-full bg-zinc-800 rounded-2xl px-4 py-4 text-xl"
                />

                <input
                  value={seriesGames}
                  onChange={(e) =>
                    setSeriesGames(
                      e.target.value
                    )
                  }
                  placeholder="4 à 7"
                  className="w-full bg-zinc-800 rounded-2xl px-4 py-4 text-xl"
                />

                <input
                  value={seriesName}
                  onChange={(e) =>
                    setSeriesName(
                      e.target.value
                    )
                  }
                  placeholder="Ton nom"
                  className="w-full bg-zinc-800 rounded-2xl px-4 py-4 text-xl"
                />

                <button
                  onClick={voteSeries}
                  className="w-full bg-green-600 hover:bg-green-700 rounded-2xl py-4 text-2xl font-bold"
                >

                  Enregistrer

                </button>

              </div>

            )}

            {/* RESULTS */}

            <div className="space-y-4">

              {seriesPredictions.map(
                (
                  prediction: any,
                  index: number
                ) => (

                  <div
                    key={index}
                    className="bg-zinc-900 rounded-2xl p-4"
                  >

                    <div className="text-2xl font-bold text-yellow-400 mb-2">

                      {prediction.prediction}

                    </div>

                    <div className="text-xl">

                      👤 {prediction.name}

                    </div>

                  </div>

                )
              )}

            </div>

          </div>

        </div>

      </div>

    </main>

  );

}