import { useState } from "react";

const transactions = [
  {id:'INT-1023',name:'Full Stack Development',type:'Tech',student:'Rahul Patil',pay:'UPI-88991',amt:'₹5000',status:'Active',date:'2025-12-12'},
  {id:'INT-1023',name:'Full Stack Development',type:'Tech',student:'Aman Shah',pay:'UPI-88992',amt:'₹5000',status:'Completed',date:'2025-12-13'},
  {id:'INT-1023',name:'Full Stack Development',type:'Tech',student:'Sneha Joshi',pay:'UPI-88993',amt:'₹5000',status:'Active',date:'2025-12-14'},
  {id:'INT-2044',name:'AI Internship',type:'Tech',student:'Rohit Mehta',pay:'UPI-77881',amt:'₹6000',status:'Completed',date:'2025-12-10'},
  {id:'INT-3021',name:'Startup Management',type:'Tech',student:'Neha Kulkarni',pay:'UPI-77123',amt:'₹3000',status:'Active',date:'2025-11-13'},
  {id:'INT-4012',name:'Cloud Computing',type:'Tech',student:'Karan Desai',pay:'UPI-55112',amt:'₹7000',status:'Active',date:'2025-10-15'}
];

export default function MentorWallet() {
  const [sidebar, setSidebar] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [showAll, setShowAll] = useState(false);

  const now = new Date();

  const filtered = transactions.filter(t => {
    const textMatch = (t.student + t.name).toLowerCase().includes(search.toLowerCase());
    if (filter === "all") return textMatch;
    const diff = (now - new Date(t.date)) / (1000 * 60 * 60 * 24);
    return textMatch && diff <= filter;
  });

  const grouped = filtered.reduce((acc, t) => {
    if (!acc[t.id]) acc[t.id] = [];
    acc[t.id].push(t);
    return acc;
  }, {});

  const groups = Object.values(grouped);
  const visible = showAll ? groups : groups.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen bg-[#020617] text-gray-200">
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
        {sidebar && (
          <div className="w-[220px] border-r border-slate-800 p-5">
            <div className="block p-3 rounded-lg bg-slate-800 text-sky-400">
              Dashboard
            </div>
          </div>
        )}

        <div className="flex-1 p-8 overflow-auto">
          <h1 className="text-2xl font-semibold mb-6">Wallet Overview</h1>

          <div className="border border-slate-800 rounded-xl p-5 mb-8">
            Total Balance
            <b className="block text-2xl mt-2">₹1,25,000</b>
          </div>

          <h2 className="text-xl mb-4">Transactions</h2>

          <div className="flex flex-wrap gap-3 mb-6">
            <input
              placeholder="Search Student / Internship"
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

          {visible.map(group => (
            <div key={group[0].id} className="border border-slate-800 rounded-2xl mb-8 overflow-hidden">
              <div className="flex justify-between items-center px-5 py-4 border-b border-slate-800 text-sky-400 font-semibold">
                <span>{group[0].name}</span>
                <span className="text-sm text-slate-400">{group[0].id}</span>
              </div>

              <table className="w-full">
                <thead>
                  <tr className="text-slate-400 text-xs uppercase border-b border-slate-800">
                    <th className="text-left px-4 py-3">Student</th>
                    <th className="text-center">Type</th>
                    <th className="text-center">Payment ID</th>
                    <th className="text-right">Amount</th>
                    <th className="text-center">Status</th>
                    <th className="text-center">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {group.map((t, idx) => (
                    <tr key={idx} className="border-b border-slate-800 last:border-none">
                      <td className="px-4 py-3">{t.student}</td>
                      <td className="text-center">{t.type}</td>
                      <td className="text-center">{t.pay}</td>
                      <td className="text-right">{t.amt}</td>
                      <td className="text-center">{t.status}</td>
                      <td className="text-center">
                        {new Date(t.date).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}
