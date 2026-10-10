
"use client";

import { useState, type FormEvent } from "react";
import { supabase } from "../../lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendOtp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: { shouldCreateUser: true },
      });

      if (error) {
        setMessage(error.message);
        return;
      }

      setOtpSent(true);
      setMessage("OTP sent! Check your email.");
    } catch {
      setMessage("Could not send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function verifyOtp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const { error } = await supabase.auth.verifyOtp({
        email: email.trim(),
        token: otp.trim(),
        type: "email",
      });

      if (error) {
        setMessage(error.message);
        return;
      }

      window.location.assign("/");
    } catch {
      setMessage("Could not verify OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-green-50 p-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-green-800">
          FarmShare 🌾
        </h1>

        <p className="mt-2 text-gray-600">
          Login securely using a one-time email code.
        </p>

        {!otpSent ? (
          <form onSubmit={sendOtp} className="mt-6 space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Email address
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="mt-1 w-full rounded-lg border p-3"
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-green-700 p-3 font-semibold text-white disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </form>
        ) : (
          <form onSubmit={verifyOtp} className="mt-6 space-y-4">
            <p className="text-sm text-gray-600">
              Enter the code sent to {email}.
            </p>

            <label className="block text-sm font-medium text-gray-700">
              One-time password (OTP)
              <input
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                required
                value={otp}
                onChange={(event) => setOtp(event.target.value)}
                placeholder="Enter your code"
                className="mt-1 w-full rounded-lg border p-3"
              />
            </label>

            <button
              type="submit"
              disabled={loading || !otp.trim()}
              className="w-full rounded-lg bg-green-700 p-3 font-semibold text-white disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>

            <button
              type="button"
              disabled={loading}
              onClick={() => {
                setOtpSent(false);
                setOtp("");
                setMessage("");
              }}
              className="w-full p-2 text-green-800"
            >
              Use a different email
            </button>
          </form>
        )}

        {message && (
          <p role="status" aria-live="polite" className="mt-4 text-sm text-gray-700">
            {message}
          </p>
        )}

        <a href="/" className="mt-6 block text-center text-sm text-green-800">
          ← Back to equipment
        </a>
      </div>
    </main>
  );
}