import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setLoggedInUsername, setLoggedUserRole, setToken } from "../service/AuthService";
import { login } from "../service/AuthService";


export default function LoginComponent() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const loginHandler = (e) => {
    e.preventDefault();
    login(username, password)
      .then(res => {
        console.log("Successfully logged in", res.data);
        const token = 'Basic ' + btoa(username + ":" + password);
        setToken(token);
        setLoggedInUsername(username);
        setLoggedUserRole(res.data.role)

        navigate("/help");
        window.location.reload();
      })

      
      .catch(err => console.log(err));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[var(--bg-dark)] via-[var(--bg)] to-[var(--bg-light)] p-4 relative">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-1/4 w-40 h-40 bg-[var(--primary)] rounded-full mix-blend-soft-light"></div>
        <div className="absolute bottom-20 right-1/3 w-60 h-60 bg-[var(--secondary)] rounded-full mix-blend-soft-light"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-[var(--highlight)] rounded-full mix-blend-soft-light"></div>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-lg z-10">
        <div className="bg-[var(--bg-light)] rounded-3xl shadow-xl overflow-hidden border border-[var(--border)]">
          {/* Athena-themed header */}
          <div className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] p-6 text-center relative">
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
              <div className="bg-[var(--bg-light)] rounded-full p-3 border-4 border-[var(--highlight)] shadow-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>
            
            <div className="mt-16 pt-4">
              <h1 className="text-3xl md:text-4xl font-bold text-[var(--text)]">
                <span className="bg-[var(--bg-light)] text-[var(--primary)] px-4 py-1 rounded-full">Athena</span>
                <span className="ml-2">Learning Center</span>
              </h1>
              <p className="font-bold text-[var(--text)] mt-4 shadow-lg">"Inspire life begins with small steps"</p>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={loginHandler} className="px-8 pt-10 pb-8">
            <h2 className="text-3xl font-bold text-center text-[var(--text)] mb-8">
              Login
            </h2>
            
            <div className="space-y-6">
              {/* Username Field */}
                <div className="space-y-2">
                <label className="text-lg font-medium text-[var(--text)] flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[var(--primary)]" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  Your Name
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 cursor-pointer rounded-xl border-2 border-[var(--border)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)] focus:outline-none transition text-lg bg-[var(--bg)] text-[var(--text)]"
                  placeholder="Enter your username"
                  required
                />
               
                {username !== "" && password.length < 3 && (
                  <p className="text-red-500 text-sm mt-1">Invalid password.</p>
                )}
                </div>

              {/* Password Field */}
                <div className="space-y-2">
                <label className="text-lg font-medium text-[var(--text)] flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[var(--primary)]" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full cursor-pointer px-4 py-3 rounded-xl border-2 border-[var(--border)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)] focus:outline-none transition text-lg bg-[var(--bg)] text-[var(--text)]"
                  placeholder="Enter your password"
                  required
                />
              
                {password !== "" && password.length < 3 && (
                  <p className="text-red-500 text-sm mt-1">Invalid password.</p>
                )}
                </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full cursor-pointer bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] hover:from-[var(--highlight)] hover:to-[var(--primary)] text-[var(--bg)] font-bold py-4 px-4 rounded-xl transition transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl text-xl"
              >
                LOGIN
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>

            
          </form>

        </div>
      </div>
    </div>
  );
}