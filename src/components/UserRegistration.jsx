import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

export default function UserRegistration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [generatedCode, setGeneratedCode] = useState(null); // Stores the actual code
  const [message, setMessage] = useState(""); // Feedback message
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://apilayer.net/api/check?access_key=e880adda32df3690e7dbcf034a46a590&email=${email}&smtp=1&format=1`
      );
      const data = await response.json();

      if (!data.format_valid || !data.smtp_check) {
        setMessage("❌ Invalid email address. Please enter a valid email.");
        setIsLoading(false);
        return;
      }

      // Generate and store verification code
      const newCode = Math.floor(100000 + Math.random() * 900000);
      setGeneratedCode(newCode);
      setMessage(`✅ Verification code sent: ${newCode}`);
      setIsLoading(false);
    } catch (error) {
      console.error("Error verifying email:", error);
      setMessage("⚠️ Failed to verify email. Please try again.");
      setIsLoading(false);
    }
  };

  const handleVerification = () => {
    if (!generatedCode) {
      setMessage("⚠️ No code generated. Please register first.");
      return;
    }

    if (parseInt(verificationCode) === generatedCode) {
      setMessage("✅ Code Matched! You are verified.");
    } else {
      setMessage("❌ Invalid Code. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
        <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">Sign Up</h1>

        {message && <p className="text-center mb-4 text-gray-700">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Verifying..." : "Register"}
          </button>

          <div className="relative flex items-center justify-center">
            <hr className="w-full border-gray-300" />
            <span className="absolute bg-white px-2 text-gray-500">OR</span>
          </div>

          <button
            type="button"
            className="w-full flex items-center justify-center bg-white border border-gray-300 p-3 rounded-lg shadow-md hover:shadow-lg transition"
          >
            <FcGoogle className="text-2xl mr-2" /> Continue with Google
          </button>

          {generatedCode && (
            <>
              <input
                type="text"
                placeholder="Enter Verification Code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <button
                type="button"
                onClick={handleVerification}
                className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition"
              >
                Submit Verification Code
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
