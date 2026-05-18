"use client";

import { useState } from "react";
import { db } from "../firebase";

import {
  collection,
  addDoc,
} from "firebase/firestore";

export default function CreatePool() {

  const [poolName, setPoolName] = useState("");
  const [password, setPassword] = useState("");

  async function createPool() {

    try {

      await addDoc(collection(db, "pools"), {
        name: poolName,
        password: password,
        createdAt: new Date(),
      });

      alert("Pool créé avec succès 🔥");

      setPoolName("");
      setPassword("");

    } catch (error) {

      console.error(error);

      alert("Erreur lors de la création");

    }
  }

  return (
    <main className="min-h-screen bg-zinc-900 text-white flex flex-col items-center justify-center">

      <h1 className="text-5xl font-bold mb-8">
        Créer un Pool
      </h1>

      <div className="bg-zinc-800 p-8 rounded-2xl w-[400px]">

        <input
          type="text"
          placeholder="Nom du Pool"
          value={poolName}
          onChange={(e) => setPoolName(e.target.value)}
          className="w-full p-3 rounded-lg bg-zinc-700 mb-4"
        />

        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded-lg bg-zinc-700 mb-6"
        />

        <button
          onClick={createPool}
          className="w-full bg-red-600 hover:bg-red-700 p-3 rounded-lg font-bold"
        >
          Créer
        </button>

      </div>

    </main>
  );
}
