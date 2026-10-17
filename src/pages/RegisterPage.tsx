import { useState, type FormEvent } from "react";
import { useNavigate, Link } from "react-router";
import useAuthStore from "../store/authStore";
import { registerUser, loginUser } from "../api/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const setAuth = useAuthStore((s) => s.setAuth);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      // 1. Register the new account
      await registerUser({ name, email, password });

      // 2. Automatically log the user in to retrieve the JWT token
      const auth = await loginUser({ email, password });
      setAuth(auth.token, auth.user);

      navigate("/submissions");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-850">
      <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">Create Account</h2>
      <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
        Register to submit and track your programming assignments.
      </p>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-400">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name" className="text-foreground mb-1 block">
            Full name
          </Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            required
            autoComplete="name"
          />
        </div>

        <div>
          <Label htmlFor="email" className="text-foreground mb-1 block">
            Email address
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            autoComplete="email"
          />
        </div>

        <div>
          <Label htmlFor="password" className="text-foreground mb-1 block">
            Password (min. 8 characters)
          </Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            autoComplete="new-password"
            minLength={8}
          />
        </div>

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Creating account..." : "Register"}
        </Button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
        Already have an account?{" "}
        <Link to="/login" className="font-semibold text-blue-600 hover:underline dark:text-blue-400">
          Sign In
        </Link>
      </p>
    </div>
  );
}

export default RegisterPage;

