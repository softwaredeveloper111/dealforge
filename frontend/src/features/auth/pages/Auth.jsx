import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FiEye, FiEyeOff } from "react-icons/fi";
import useAuth from "../hooks/useAuth";
import Loader from "../../shared/Loader";
import { useNavigate } from "react-router-dom";


const AuthPage = () => {

  const { handlerLoginAPI, handlerRegisterAPI ,loading , user } = useAuth();

  const [showLoginPass, setShowLoginPass] = useState(false);
  const [showRegPass, setShowRegPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const navigate = useNavigate();

  // LOGIN FORM
  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm();

  // REGISTER FORM
  const {
    register: regRegister,
    handleSubmit: handleRegisterSubmit,
    watch,
    formState: { errors: regErrors },
  } = useForm();

  const passwordValue = watch("password");

  // LOGIN SUBMIT
  const onLogin = async (data) => {
    console.log("Login Data:", data);
    try {
       
    const result = await handlerLoginAPI(data);
    if(result.success){
      toast.success("Login successful! Welcome back.");
      navigate("/");
    }
    
    else{
      toast.error(result.message || "Login failed. Please try again.");
    }

    } catch (error) {
      toast.error("An error occurred during login.");
    }
  };

  // REGISTER SUBMIT
  const onRegister = async(data) => {
    
    console.log("Register Data:", data);

    const {email,password,username} = data
    try {
       
      const result =await handlerRegisterAPI({email,password,username});
      if(result.success){
        toast.success("Registration successful! Welcome to DealForge.");
        navigate("/");
      }
      else{
        toast.error(result.message || "Registration failed. Please try again.");
      }

    } catch (error) {
      toast.error("An error occurred during registration.");
    }
    
  };


  if(loading){
    return <Loader/>
  }

  const handleError = (errors) => {
    Object.values(errors).forEach((err) => toast.error(err.message));
  };

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white px-4 py-10">
      {/* Header */}
      <div className="flex items-center gap-2 mb-10 px-6">
        <span className="text-2xl">⚒️</span>
        <h1 className="text-2xl font-bold">DealForge</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">

        {/* LOGIN */}
        <div>
          <h2 className="text-4xl font-bold mb-2">Welcome Back!</h2>
          <p className="text-gray-400 mb-6">
            Pick up right where you left the negotiation.
          </p>

          <form
            onSubmit={handleLoginSubmit(onLogin, handleError)}
            className="bg-[#262626]/60 backdrop-blur-lg p-8 rounded-xl border border-gray-700 space-y-6 shadow-[0_8px_32px_rgba(131,174,255,0.15)]"
          >
            {/* Identifier */}
            <div>
              <label className="text-xs text-gray-400 block mb-2 uppercase">
                Email or Username
              </label>
              <input
                {...loginRegister("identifier", {
                  required: "Identifier required",
                })}
                placeholder="negotiator@forge.ai"
                className="w-full px-4 py-3 rounded-md bg-[#1a1a1a] outline-none focus:ring-2 focus:ring-blue-400/20"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label className="text-xs text-gray-400 block mb-2 uppercase">
                Password
              </label>
              <input
                type={showLoginPass ? "text" : "password"}
                {...loginRegister("password", {
                  required: "Password required",
                })}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-md bg-[#1a1a1a] outline-none focus:ring-2 focus:ring-blue-400/20"
              />
              <span
                onClick={() => setShowLoginPass(!showLoginPass)}
                className="absolute right-4 top-10 cursor-pointer"
              >
                {showLoginPass ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full cursor-pointer py-3 rounded-md font-bold bg-gradient-to-br from-blue-400 to-blue-500 
              hover:scale-[1.02] active:scale-95 transition-all 
              shadow-[0_8px_32px_rgba(131,174,255,0.25)]"
            >
              Let's Negotiate
            </button>
          </form>
        </div>

        {/* REGISTER */}
        <div>
          <h2 className="text-4xl font-bold mb-2">Join DealForge</h2>
          <p className="text-gray-400 mb-6">
            Sharpen your edge. Start your first forge today.
          </p>

          <form
            onSubmit={handleRegisterSubmit(onRegister, handleError)}
            className="bg-[#131313] p-8 rounded-xl border border-gray-700 space-y-4"
          >
            {/* Username + Email */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-400 block mb-2 uppercase">
                  Username
                </label>
                <input
                  {...regRegister("username", {
                    required: "Username required",
                    pattern: {
                      value: /^[A-Za-z_][A-Za-z0-9_]*$/,
                      message:
                        "Start with letter/_ and only letters, numbers, _ allowed",
                    },
                  })}
                  placeholder="ForgeMaster"
                  className="w-full px-4 py-3 rounded-md bg-[#1a1a1a] outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-gray-400 block mb-2 uppercase">
                  Email
                </label>
                <input
                  {...regRegister("email", {
                    required: "Email required",
                    pattern: {
                      value:
                        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email",
                    },
                  })}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-md bg-[#1a1a1a] outline-none"
                />
              </div>
            </div>

            {/* Password */}
            <div className="relative">
              <label className="text-xs text-gray-400 block mb-2 uppercase">
                Password
              </label>
              <input
                type={showRegPass ? "text" : "password"}
                {...regRegister("password", {
                  required: "Password required",
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
                    message:
                      "Min 8 chars, 1 upper, 1 lower, 1 number, 1 special",
                  },
                })}
                placeholder="Create strong password"
                className="w-full px-4 py-3 rounded-md bg-[#1a1a1a]"
              />
              <span
                onClick={() => setShowRegPass(!showRegPass)}
                className="absolute right-4 top-10 cursor-pointer"
              >
                {showRegPass ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <label className="text-xs text-gray-400 block mb-2 uppercase">
                Confirm Password
              </label>
              <input
                type={showConfirmPass ? "text" : "password"}
                {...regRegister("confirmPassword", {
                  validate: (value) =>
                    value === passwordValue || "Passwords do not match",
                })}
                placeholder="Repeat password"
                className="w-full px-4 py-3 rounded-md bg-[#1a1a1a]"
              />
              <span
                onClick={() => setShowConfirmPass(!showConfirmPass)}
                className="absolute right-4 top-10 cursor-pointer"
              >
                {showConfirmPass ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full cursor-pointer py-3 rounded-md font-bold bg-orange-500 
              hover:scale-[1.02] active:scale-95 transition-all"
            >
              Start Negotiating
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-10 text-green-400">
        The AI never gives up easily. <span className="text-white font-bold">Can you?</span>
      </div>
    </div>
  );
};

export default AuthPage;