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
    const gamesSnapshot = await getDocs(
      collection(db, "games")
    );

    for (const gameDoc of gamesSnapshot.docs) {
      const gameData = gameDoc.data();

      if (gameData.finished) {
        continue;
      }

      await updateDoc(
        doc(db, "games", gameDoc.id),
        {
          homeScore: 4,
          awayScore: 2,
          finished: true,
        }
      );
    }

    return NextResponse.json({
      success: true,
    });

  } catch (error) {
    console.log(error);

    return NextResponse.json({
      success: false,
    });
  }
}