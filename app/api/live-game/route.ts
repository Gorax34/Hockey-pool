import { NextResponse } from "next/server";

export async function GET() {

  try {

    // =========================
    // NHL GAME ID
    // =========================

    const gameId =
      "2025030311";

    // =========================
    // NHL API
    // =========================

    const response =
      await fetch(

        `https://api-web.nhle.com/v1/gamecenter/${gameId}/play-by-play`

      );

    const data =
      await response.json();

    // =========================
    // FILTER GOALS
    // =========================

    const goals =
      data.plays.filter(
        (play: any) =>

          play.typeDescKey ===
          "goal"
      );

    // =========================
    // FORMAT GOALS
    // =========================

    const formattedGoals =
      goals.map(
        (goal: any) => ({

          // =========================
          // SCORER
          // =========================

          scorer:

            goal.details?.scoringPlayerName ||

            goal.details?.playerName ||

            "Buteur",

          // =========================
          // ASSISTS
          // =========================

          assists: [

            goal.details?.assist1PlayerName,

            goal.details?.assist2PlayerName,

          ].filter(Boolean),

          // =========================
          // SCORE
          // =========================

          homeScore:
            goal.details?.homeScore,

          awayScore:
            goal.details?.awayScore,

          // =========================
          // PERIOD
          // =========================

          period:
            goal.periodDescriptor?.number,

          // =========================
          // TIME
          // =========================

          time:
            goal.timeInPeriod,

        })
      );

    // =========================
    // RETURN
    // =========================

    return NextResponse.json({

      goals:
        formattedGoals,

    });

  } catch (error) {

    console.log(error);

    return NextResponse.json({

      goals: [],

    });

  }

}