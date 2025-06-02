"use client";

import { useCallback, useEffect, useState } from "react";
import { FaCopy } from "react-icons/fa";

type PasswordOptions = {
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
};

const PasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [options, setOptions] = useState<PasswordOptions>({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: false,
  });
  const [length, setLength] = useState(16);
  const [copied, setCopied] = useState(false);

  const letterCaseWarning =
    !options.uppercase && !options.lowercase
      ? "At least one of uppercase or lowercase must be selected"
      : "";

  const generatePassword = useCallback(() => {
    let charset = "";
    if (options.uppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (options.lowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (options.numbers) charset += "0123456789";
    if (options.symbols) charset += "!@#$%^&*()-_=+[]{}|;:,.<>?/";

    if (!charset) {
      setPassword("");
      return;
    }

    let newPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      newPassword += charset[randomIndex];
    }
    setPassword(newPassword);
  }, [options, length]);

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  const updateOption = (key: keyof PasswordOptions, value: boolean) => {
    if (
      (key === "uppercase" && !value && !options.lowercase) ||
      (key === "lowercase" && !value && !options.uppercase)
    ) {
      return; // Prevent both from being unchecked
    }
    setOptions((prev) => ({ ...prev, [key]: value }));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-4">
      <div className="backdrop-blur-md bg-white/5 border border-white/10 shadow-2xl rounded-3xl p-8 w-full max-w-md space-y-6 text-white transition-all duration-300">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold">Password Generator</h1>
        </div>

        <div className="space-y-3">
          {(["uppercase", "lowercase", "numbers", "symbols"] as const).map(
            (key) => (
              <label
                key={key}
                className="flex justify-between items-center px-3 py-2 bg-white/10 rounded-xl hover:bg-white/15 transition"
              >
                <span className="capitalize">
                  {key.replace(/^\w/, (c) => c.toUpperCase())}
                </span>
                <input
                  type="checkbox"
                  checked={options[key]}
                  onChange={(e) => updateOption(key, e.target.checked)}
                  className="w-5 h-5 accent-purple-500"
                />
              </label>
            )
          )}

          {letterCaseWarning && (
            <p className="text-red-400 text-sm text-center">
              {letterCaseWarning}
            </p>
          )}

          <div className="flex items-center justify-between bg-white/10 px-3 py-2 rounded-xl">
            <span>Length</span>
            <input
              type="range"
              min={4}
              max={64}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-32 accent-purple-500"
            />
            <span className="text-purple-400 font-mono">{length}</span>
          </div>
        </div>

        <div className="relative">
          <input
            type="text"
            readOnly
            value={password}
            className="w-full text-lg font-mono tracking-wide bg-black/40 text-white border border-white/20 rounded-xl px-4 py-3 pr-12 placeholder-gray-500"
            placeholder="Your secure password..."
          />
          <button
            onClick={copyToClipboard}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white transition"
            title="Copy password"
          >
            <FaCopy />
          </button>
        </div>

        {copied && (
          <p className="text-green-400 text-center text-sm transition-opacity duration-300">
            Copied to clipboard!
          </p>
        )}
      </div>
    </main>
  );
};

export default PasswordGenerator;
