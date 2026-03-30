const Loader = () => {
  return (
    <div className="fixed inset-0 bg-[#0e0e0e] flex flex-col items-center justify-center z-50">

      {/* Glow Background Blob */}
      <div className="absolute w-[400px] h-[400px] bg-blue-400/10 rounded-full blur-3xl"></div>

      {/* Loader */}
      <div className="relative flex items-center justify-center">

        {/* Outer rotating ring */}
        <div className="w-28 h-28 rounded-full border-2 border-transparent 
        border-t-blue-400 border-r-blue-500 animate-spin 
        shadow-[0_0_40px_rgba(131,174,255,0.3)]"></div>

        {/* Inner pulse circle */}
        <div className="absolute w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 
        rounded-full animate-pulse 
        shadow-[0_0_30px_rgba(131,174,255,0.6)]"></div>

        {/* Center dot */}
        <div className="absolute w-4 h-4 bg-white rounded-full"></div>
      </div>

      {/* Text */}
      <p className="mt-8 text-lg text-gray-300 tracking-wide animate-pulse">
        Forging your deal...
      </p>

      {/* Brand */}
      <div className="mt-4 flex items-center gap-2 text-white font-bold text-xl">
        ⚒️ DealForge
      </div>
    </div>
  );
};

export default Loader;