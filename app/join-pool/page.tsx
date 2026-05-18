"use client";

import { useState } from "react";
import { db } from "../firebase";
import { useRouter } from "next/navigation";

import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
} from "firebase/firestore";

export default function JoinPool() {

  const router = useRouter();

  const [poolName, setPoolName] = useState("");
  const [password, setPassword] = useState("");
  const [playerName, setPlayerName] = useState("");

  async function joinPool() {

    const q = query(
      collection(db, "pools"),
      where("name", "==", poolName),
      where("password", "==", password)
    );

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {

      const poolDoc = querySnapshot.docs[0];

      await addDoc(collection(db, "members"), {
        poolId: poolDoc.id,
        playerName: playerName,
      });

      router.push("/dashboard");

    } else {

      alert("Pool introuvable ❌");

    }
  }

  return (
    <main className="min-h-screen bg-zinc-900 text-white flex flex-col items-center justify-center">

      <div className="bg-zinc-800 p-8 rounded-2xl w-96">

        <h1 className="text-4xl font-bold mb-6 text-center">
          Rejoindre un Pool
        </h1>

        <input
          type="text"
          placeholder="Nom du Pool"
          value={poolName}
          onChange={(e) => setPoolName(e.target.value)}
          className="w-full p-3 mb-4 rounded bg-zinc-700"
        />

        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 rounded bg-zinc-700"
        />

        <input
          type="text"
          placeholder="Ton nom"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          className="w-full p-3 mb-4 rounded bg-zinc-700"
        />

        <button
          onClick={joinPool}
          className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-xl"
        >
          Rejoindre
        </button>

      </div>

    </main>
  );
}