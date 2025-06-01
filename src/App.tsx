import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";

function App() {
  const [password, setPassword] = useState("");

  async function genPassword() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setPassword(await invoke("genpassword", { name }));
  }

  return (
    <main className="flex items-center justify-center h-screen w-screen bg-black flex-col text-white">
      <h1 className="text-">Welcome to Tauri + React</h1>

      <input
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={genPassword}>Generate Password</button>
    </main>
  );
}

export default App;
