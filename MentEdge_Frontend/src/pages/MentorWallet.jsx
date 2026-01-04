import { useEffect, useState } from "react";

export default function MentorWallet() {
  const mentorId = 101; // later get from auth / params

  const [sidebar, setSidebar] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const [wallet, setWallet] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const now = new Date();

  /* ================= FETCH MENTOR WALLET ================= */
  useEffect(() => {
    fetch(`http://localhost:8080/mentor/wallet/${mentorId}`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch wallet");
        return res.json();
      })
      .then(data => {
        setWallet(data);
        setTransactions(data.transactions || []);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [mentorId]);

  /* ================= FILTER ================= */
  const filtered = transactions.filter(t => {
    const textMatch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.transactionId.toLowerCase().includes(search.toLowerCase());

    if (filter === "all") return textMatch;

    const diff =
      (now - new Date(t.date)) / (1000 * 60 * 60 * 24);

    return textMatch && diff <= filter;
  });

  if (loading) return <div className="p-10 text-gray-300">Loading wallet...</div>;
  if (error) return <div className="p-10 text-red-400">{error}</div>;

  return (
    <div className="flex flex-col min-h-screen bg-[#020617] text-gray-200">
      {/* ================= HEADER ================= */}
      <div className="h-[60px] flex items-center px-5 border-b border-slate-800">
        <button
          className="bg-slate-800 text-sky-400 px-3 py-1 rounded-md"
          onClick={() => setSidebar(!sidebar)}
        >
          ☰
        </button>
        <h1 className="ml-3 text-sky-400 text-lg font-semibold">
          Mentor Wallet
        </h1>
      </div>

      <div className="flex flex-1">
        {/* ================= SIDEBAR ================= */}
        {sidebar && (
          <div className="w-[220px] border-r border-slate-800 p-5">
            <div className="block p-3 rounded-lg bg-slate-800 text-sky-400">
              Dashboard
            </div>
          </div>
        )}

        {/* ================= MAIN ================= */}
        <div className="flex-1 p-8 overflow-auto">
          <h1 className="text-2xl font-semibold mb-6">Wallet Overview</h1>

          {/* ================= BALANCE ================= */}
          <div className="border border-slate-800 rounded-xl p-5 mb-8">
            Total Balance
            <b className="block text-2xl mt-2 text-green-400">
              ₹{wallet.totalBalance.toLocaleString()}
            </b>
          </div>

          {/* ================= FILTERS ================= */}
          <div className="flex flex-wrap gap-3 mb-6">
            <input
              placeholder="Search Student / Transaction ID"
              className="bg-[#020617] border border-slate-800 px-4 py-2 rounded-xl"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              className="bg-[#020617] border border-slate-800 px-4 py-2 rounded-xl"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Time</option>
              <option value="7">Last 7 Days</option>
              <option value="30">Last 30 Days</option>
              <option value="180">Last 6 Months</option>
              <option value="365">Last 1 Year</option>
            </select>
          </div>

          {/* ================= TRANSACTIONS ================= */}
          <div className="border border-slate-800 rounded-2xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="text-slate-400 text-xs uppercase border-b border-slate-800">
                  <th className="text-left px-4 py-3">Transaction ID</th>
                  <th className="text-left">Student</th>
                  <th className="text-center">Type</th>
                  <th className="text-right">Amount</th>
                  <th className="text-center">Status</th>
                  <th className="text-center">Date</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((t) => (
                  <tr
                    key={t.transactionId}
                    className="border-b border-slate-800 last:border-none"
                  >
                    <td className="px-4 py-3 text-sky-400">
                      {t.transactionId}
                    </td>
                    <td>{t.name}</td>
                    <td className="text-center capitalize">{t.type}</td>
                    <td
                      className={`text-right ${
                        t.amount < 0 ? "text-red-400" : "text-green-400"
                      }`}
                    >
                      ₹{Math.abs(t.amount)}
                    </td>
                    <td
                      className={`text-center ${
                        t.status === "SUCCESS"
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {t.status}
                    </td>
                    <td className="text-center">
                      {new Date(t.date).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filtered.length === 0 && (
              <div className="p-6 text-center text-slate-400">
                No transactions found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
