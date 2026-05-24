import {
  NextRequest,
  NextResponse
} from "next/server";

export async function GET(
  request: NextRequest
) {

  try {

    // =========================
    // NHL GAME ID
    // =========================

    const searchParams =
      request.nextUrl.searchParams;

    const gameId =
      searchParams.get(
        "gameId"
      );

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
    // MANUAL GOALS
    // =========================

    const manualGoals: any = {

      "2025030311": [

        {
          scorer:
            "Seth Jarvis",

          assists: [
            "A.Svechnikov",
            "S.Aho"
          ],
        },

        {
          scorer:
            "Cole Caufield",

          assists: [
            "J.Slafkovsky",
            "N.Suzuki"
          ],
        },

        {
          scorer:
            "Phillip Danault",

          assists: [
            "A.Carrier",
            
          ],
        },

        {
          scorer:
            "Alexandre Texier",

          assists: [
            "P.Danault",
            "K.Guhle"
          ],
        },
      
        {
          scorer:
            "Ivan Demidov",

          assists: [
            "A.Newhook",
            "J.Evans"
          ],
        },

        {
          scorer:
            "Eric Robinson",

          assists: [
            "W.Carrier",
            
          ],
        },

        {
          scorer:
            "Juraj Slafkovsky",

          assists: [
            "N.Suzuki",
            "C.Caufield"
          ],
        },

        {
          scorer:
            "Juraj Slafkovsky",

          assists: [
            "N.Suzuki",
            
          ],
        },
    ],

      "2025030312": [

        {
          scorer:
            "Eric Robinson",

          assists: [
            "W.Carrier",
            "M.Jankowski"
          ],
        },
{
          scorer:
            "Josh Anderson",

          assists: [
            "P.Danault",
            "K.Guhle"
          ],
        },

        {
          scorer:
            "Nikolaj Ehlers",

          assists: [
            "J.Slavin",
            "J.Chatfield"
          ],
        },
      
    {
          scorer:
            "Josh Anderson",

          assists: [
            "A.Carrier",
            "P.Danault"
          ],
        },
    
    {
          scorer:
            "Nikolaj Ehlers",

          assists: [
            "M.Jankowski",
            "J.Chatfield"
          ],
        },
    
    ],

        "2025030313": [

        {
          scorer:
            "",

          assists: [
            "",
            ""
          ],
        },
{
          scorer:
            "",

          assists: [
            "",
            ""
          ],
        },

        {
          scorer:
            "",

          assists: [
            "",
            ""
          ],
        },
      
    {
          scorer:
            "",

          assists: [
            "",
            ""
          ],
        },
    
    {
          scorer:
            "",

          assists: [
            "",
            ""
          ],
        },
    
    
    
    
    
    
    
    
    ],







      
    };

    // =========================
    // FORMAT GOALS
    // =========================

    const formattedGoals =
      goals.map(
        (
          goal: any,
          index: number
        ) => ({

          scorer:

            manualGoals?.[
              gameId || ""
            ]?.[index]?.scorer ||

            goal.details?.scoringPlayerName ||

            goal.details?.playerName ||

            "Buteur",

          assists:

            manualGoals?.[
              gameId || ""
            ]?.[index]?.assists ||

            [

              goal.details?.assist1PlayerName,

              goal.details?.assist2PlayerName,

            ].filter(Boolean),

          homeScore:
            goal.details?.homeScore,

          awayScore:
            goal.details?.awayScore,

          period:
            goal.periodDescriptor?.number,

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