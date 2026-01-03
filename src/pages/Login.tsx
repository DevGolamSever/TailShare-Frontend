import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Footer } from "../components/Footer";
import { useLoginMutation } from "../store/api";
import { setCredentials } from "../store/authSlice";
import { useAppDispatch } from "../store/hooks";
import { trackEvent, trackException } from "../utils/telemetry";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login, { isLoading: loading }] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const startTime = Date.now();
    try {
      const result = await login({ email, password }).unwrap();
      const duration = Date.now() - startTime;

      dispatch(setCredentials({ user: result.user, token: result.token }));

      // Track successful login
      trackEvent("UserLogin", {
        userId: result.user.id,
        email: result.user.email,
        duration,
        success: true,
      });

      navigate("/feed");
    } catch (err: any) {
      const duration = Date.now() - startTime;
      const errorMessage =
        err?.data?.error ||
        err?.message ||
        "Failed to sign in. Please try again.";

      // Track failed login
      trackEvent("UserLogin", {
        email,
        duration,
        success: false,
        error: errorMessage,
      });

      if (err instanceof Error) {
        trackException(err, { action: "login", email });
      }

      setError(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7fafc] text-[#0f172a] flex flex-col">
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-xl shadow-[0_6px_18px_rgba(15,23,42,0.04)] p-8">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-[#2563eb] mb-2">
                TrailShare
              </h1>
              <h2 className="text-xl font-semibold text-[#0f172a]">
                Welcome back
              </h2>
              <p className="text-sm text-[#667085] mt-1">
                Sign in to your account
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-[#e6eef8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-[#e6eef8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
                  placeholder="••••••••"
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-gray-600">Remember me</span>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-[#2563eb] hover:text-[#1d4ed8]"
                >
                  Forgot password?
                </Link>
              </div>

              {error && (
                <div className="text-red-600 text-sm bg-red-50 p-2 rounded">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 px-4 bg-[#2563eb] text-white rounded-lg hover:bg-[#1d4ed8] disabled:opacity-60 transition-colors font-medium"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-gray-600">Don't have an account? </span>
              <Link
                to="/signup"
                className="text-[#2563eb] hover:text-[#1d4ed8] font-medium"
              >
                Sign up
              </Link>
            </div>

            
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
