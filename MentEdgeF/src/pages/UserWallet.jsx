import { useEffect, useState } from "react"
import QRCode from "qrcode"

const WalletUser = () => {
  const [showDesktopUPI, setShowDesktopUPI] = useState(false);
  const [upiInput, setUpiInput] = useState("");
  const [upiName, setUpiName] = useState("");
  const [upiError, setUpiError] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState("wallet");
  const [showUPI, setShowUPI] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [qrUrl, setQrUrl] = useState("");
  const [activePayment, setActivePayment] = useState(""); // "" | "upi" | "qr"


  const [walletData, setWalletData] = useState(null);
const [transactions, setTransactions] = useState([]);
const [loading, setLoading] = useState(true);

const amount = walletData?.amount;

const internshipId = 3;
const userId = 201;

useEffect(() => {
  const fetchWalletData = async () => {
    try {
      const res = await fetch(`http://localhost:8080/userwallet/${internshipId}`);
      const data = await res.json();
      setWalletData(data);
    } catch (err) {
      console.error("Wallet fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  fetchWalletData();
}, []);


useEffect(() => {
  const fetchTransactions = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/userwallet/transactions/${userId}`
      );
      const data = await res.json();
      setTransactions(data);
    } catch (err) {
      console.error("Transaction fetch error", err);
    }
  };

  fetchTransactions();
}, []);



  const upiLink = `upi://pay?pa=mentorwallet@upi&pn=${encodeURIComponent(
    "Mentor Wallet"
  )}&am=${amount}&cu=INR&tn=${encodeURIComponent(
    internshipId + " - Technical Internship Payment"
  )}`;

  useEffect(() => {
    QRCode.toDataURL(upiLink).then(setQrUrl);
  }, []);

  const openUPI = (appName) => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = upiLink;
    } else {
      setShowDesktopUPI(true);
      setPaymentSuccess(false);
      setUpiInput("");
      setUpiName("");
      setUpiError("");
    }
  };

  const verifyUPI = () => {
    if (!upiInput || !upiInput.includes("@")) {
      setUpiError("Enter a valid UPI ID");
      setUpiName("");
    } else {
      setUpiError("");
      setUpiName("Bhakti Bharat Shinde"); // mock name
    }
  };


  const saveTransaction = async () => {
  const payload = {
    transactionId: `TXN${Date.now()}`,
    userId: userId,
    mentorId: walletData.mentorId,
    name: "Ram Joshi", // or logged-in user
    internshipId: internshipId,
    type: "internship",
    amount: walletData.amount,
    status: "SUCCESS",
  };

  await fetch("http://localhost:8080/userwallet/transactions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
};

  const payUPI = async () => {
  if (!upiName) {
    setUpiError("Verify UPI ID first");
    return;
  }

  await saveTransaction();
  window.location.href = upiLink;
  setPaymentSuccess(true);
};




  return (
    <div className="bg-[#020617] text-gray-200 min-h-screen flex flex-col md:flex-row">


      {/* ================= SIDEBAR ================= */}
      <div className="w-full md:w-[220px] bg-[#0f172a] p-4 md:p-5 border-b md:border-b-0 md:border-r border-[#1e293b] ">

        <h2 className="text-green-500 text-center mb-5 text-lg font-semibold">
          Wallet Menu
        </h2>

        <ul className="flex md:block gap-2 md:space-y-2 justify-center">

          <li
            onClick={() => setActiveTab("wallet")}
            className={`px-3 py-3 rounded-lg cursor-pointer font-semibold transition
              ${activeTab === "wallet"
                ? "bg-green-500 text-[#020617]"
                : "hover:bg-green-500 hover:text-[#020617]"}
            `}
          >
            Internship Wallet
          </li>

          <li
            onClick={() => setActiveTab("history")}
            className={`px-3 py-3 rounded-lg cursor-pointer font-semibold transition
              ${activeTab === "history"
                ? "bg-green-500 text-[#020617]"
                : "hover:bg-green-500 hover:text-[#020617]"}
            `}
          >
            Transaction History
          </li>
        </ul>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="flex-1 p-6 flex flex-col items-center">

        {/* ================= WALLET ================= */}
        {activeTab === "wallet" && (
          <div className="
  w-full
  max-w-full sm:max-w-[480px]
  bg-[#0f172a]
  rounded-[14px]
  p-4 sm:p-6
  mt-8 sm:mt-16
shadow-[0_15px_40px_rgba(0,0,0,0.6)]">


            <div className="text-center mb-5">
              <h2 className="text-[25px] font-semibold">
                Internship Wallet
              </h2>
              <p className="text-sm text-slate-400">
                Complete payment using UPI
              </p>
            </div>

            {/* Internship Card */}
            {loading ? (
  <p className="text-center">Loading...</p>
) : (
  <>
    <div className="text-center text-[13px] text-sky-400 mb-2">
      {walletData.name}
    </div>

    <div className="flex justify-between text-sm mb-2">
      <span>Internship Type</span>
      <span className="font-semibold">{walletData.type}</span>
    </div>

    <div className="flex justify-between text-sm mb-2">
      <span>Duration</span>
      <span className="font-semibold">{walletData.duration}</span>
    </div>

    <hr className="border-[#1e293b] my-3" />

    <div className="flex justify-between text-sm">
      <span>Total Amount</span>
      <span className="text-[22px] font-bold text-green-500">
        ₹{walletData.amount}
      </span>
    </div>
  </>
)}


            {/* Pay Buttons */}
            {/* Pay Using UPI App */}
            <button
            onClick={() => setActivePayment(activePayment === "upi" ? "" : "upi")}
            className={`mb-3 w-full py-4 text-base sm:text-[15px] rounded-xl border font-bold
                ${activePayment === "upi"
                ? "bg-green-500 text-[#020617] border-green-500"
                : "text-green-500 border-green-500 hover:bg-green-500 hover:text-[#020617]"
                }`}
            >
            Pay Using UPI App
            </button>

            {/* UPI Apps List */}
            {activePayment === "upi" && (
            <div className="space-y-2 mb-3">
                {["Google Pay", "PhonePe", "Paytm", "BHIM"].map((app) => (
                <div
                    key={app}
                    onClick={() => openUPI(app)}
                    className="bg-[#020617] border border-[#1e293b] p-3 rounded-xl text-center font-semibold cursor-pointer hover:bg-[#1e293b] hover:border-green-500"
                >
                    {app}
                </div>
                ))}
            </div>
            )}

            {/* Pay Using QR Code */}
            <button
            onClick={() => setActivePayment(activePayment === "qr" ? "" : "qr")}
            className={`w-full py-4 text-base sm:text-[15px] rounded-xl border font-bold
                ${activePayment === "qr"
                ? "bg-green-500 text-[#020617] border-green-500"
                : "text-green-500 border-green-500 hover:bg-green-500 hover:text-[#020617]"
                }`}
            >
            Pay Using QR Code
            </button>

            {/* QR Code */}
            {activePayment === "qr" && (
            <div className="mt-5 text-center">
                <p className="text-xs text-slate-400 mb-3">
                Scan this QR using any UPI app
                </p>
                <img src={qrUrl} className="w-[200px] mx-auto bg-white p-3 rounded-xl" />
            </div>
            )}


            <div className="mt-4 text-xs text-slate-400 text-center">
              Secure UPI payments • Instant confirmation
            </div>
          </div>
        )}



        {/* Desktop UPI Modal */}
        {showDesktopUPI && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-[#0f172a] p-6 rounded-xl w-full max-w-lg shadow-lg flex flex-col md:flex-row gap-4">
              {/* Left: Phone illustration 
              <div className="flex-1 flex justify-center items-center">
                <img
                  src="/mobile-illustration.png"
                  alt="Mobile"
                  className="w-36"
                />
              </div>*/}

              {/* Right: Payment form */}
              <div className="flex-1">
                {!paymentSuccess ? (
                  <>
                    <h2 className="text-lg font-semibold mb-4 text-black dark:text-gray-200">
                      Add new UPI ID
                    </h2>
                    <input
                      type="text"
                      placeholder="Enter your UPI ID"
                      className="w-full p-3 rounded-lg mb-2 border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-[#020617] text-black dark:text-gray-200 focus:outline-none"
                      value={upiInput}
                      onChange={(e) => setUpiInput(e.target.value)}
                    />
                    {upiError && <p className="text-red-500 text-sm mb-2">{upiError}</p>}
                    {upiName && (
                      <p className="text-green-500 mb-2 font-semibold">{upiName}</p>
                    )}
                    <div className="flex gap-2 mb-3">
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600"
                        onClick={verifyUPI}
                      >
                        Verify
                      </button>
                      <button
                        className="flex-1 bg-blue-500 text-white font-bold py-2 rounded-lg hover:bg-blue-600"
                        onClick={payUPI}
                      >
                        Pay ₹{amount}
                      </button>
                    </div>
                    <button
                      className="w-full mt-2 py-2 rounded-lg bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-black dark:text-gray-200"
                      onClick={() => setShowDesktopUPI(false)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <div className="text-center">
                    <p className="text-green-500 text-lg font-semibold mb-4">
                      Payment Successful!
                    </p>
                    <button
                      className="w-full bg-green-500 text-[#020617] py-3 rounded-lg font-bold hover:bg-green-600 transition"
                      onClick={() => setShowDesktopUPI(false)}
                    >
                      Close
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}


        {/* ================= TRANSACTION HISTORY ================= */}
        {activeTab === "history" && (
          <div className="w-full max-w-full md:max-w-[950px] mt-6 md:mt-10 overflow-x-auto">

            <h2 className="text-center font-semibold text-2xl mb-8">
              Transaction History
            </h2>

            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#1e293b] text-green-500">
                  <th className="border p-2">Transaction ID</th>
                  <th className="border p-2">Internship Name</th>
                  <th className="border p-2">Internship ID</th>
                  <th className="border p-2">Type</th>
                  <th className="border p-2">Amount</th>
                  <th className="border p-2">Date</th>
                  <th className="border p-2">Status</th>
                </tr>
              </thead>

              <tbody>
  {transactions.map((txn) => (
    <tr key={txn.id} className="bg-[#020617] text-center">
      <td className="border p-2">{txn.transactionId}</td>
      <td className="border p-2 text-sky-400">{walletData?.name}</td>
      <td className="border p-2">{txn.internshipId}</td>
      <td className="border p-2">{txn.type}</td>
      <td className="border p-2">
        ₹{Math.abs(txn.amount)}
      </td>
      <td className="border p-2">
        {new Date(txn.date).toLocaleDateString()}
      </td>
      <td
        className={`border p-2 font-semibold ${
          txn.status === "SUCCESS"
            ? "text-green-400"
            : "text-red-400"
        }`}
      >
        {txn.status}
      </td>
    </tr>
  ))}
</tbody>

            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default WalletUser
