import { useNavigate } from "react-router-dom";

export default function WalletSelect() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white px-4">
      
      <div className="border border-slate-800 rounded-2xl p-10 w-full max-w-md text-center bg-[#020617] shadow-lg">
        
        {/* Title */}
        <h1 className="text-3xl font-bold text-sky-400 mb-2">
          Wallet
        </h1>

        {/* Buttons Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          <button
            onClick={() => navigate("/mentor-wallet")}
            className="py-3 rounded-xl bg-sky-600 hover:bg-slate-600 transition font-medium"
          >
            Mentor Wallet
          </button>

          <button
            onClick={() => navigate("/user-wallet")}
            className="py-3 rounded-xl bg-sky-600 hover:bg-slate-600 transition font-medium"
          >
            User Wallet
          </button>

        </div>

      </div>

    </div>
  );
}
