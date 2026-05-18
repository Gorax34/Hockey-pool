import { NextResponse } from "next/server";

import { db } from "@/app/firebase";

import {
  collection,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";

export async function GET() {

  try {

    // =========================
    // LOAD PREDICTIONS
    // =========================

    const predictionsSnapshot =
      await getDocs(
        collection(
          db,
          "predictions"
        )
      );

    console.log(
      "NB PREDICTIONS:",
      predictionsSnapshot.docs.length
    );

    // =========================
    // RESULTAT TEST
    // =========================

    const realWinner = "BUF";

    const realHomeScore = 2;

    const realAwayScore = 4;

    const playersWithGoals = [

      "Slafkovsky",
      "Hutson",
      "Evans",
      "Roy",

    ];

    // =========================
    // LOOP PREDICTIONS
    // =========================

    for (

      const predictionDoc
      of predictionsSnapshot.docs

    ) {

      const prediction =
        predictionDoc.data();

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
        (player: string) => {

          if (

            playersWithGoals.includes(
              player
            )

          ) {

            points += 1;

          }

        }
      );

      console.log(
        "POINTS:",
        prediction.player,
        points
      );

      // =========================
      // UPDATE FIREBASE
      // =========================

      const predictionRef = doc(
        db,
        "predictions",
        predictionDoc.id
      );

      console.log(
        "UPDATING:",
        predictionDoc.id
      );

      await updateDoc(
        predictionRef,
        {
          points: points,
        }
      );

      console.log(
        "UPDATED OK"
      );

    }

    return NextResponse.json({
      success: true,
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json({
      success: false,
      error,
    });

  }

}