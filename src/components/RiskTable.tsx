interface User {
  id: number;
  name: string;
  email: string;
  riskLevel: string;
  score: string;
  status: string;
}

interface RiskTableProps {
  users: User[];
  onOpenModal: (user: User) => void;
}

export default function RiskTable({ users, onOpenModal }: RiskTableProps) {
  
  const exportToCSV = () => {
    if (users.length === 0) return;
    const headers = ["ID,Имя,Email,Уровень Риска,Индекс Угрозы,Причина\n"];
    const rows = users.map(u => `${u.id},${u.name},${u.email},${u.riskLevel},${u.score},${u.status}\n`);
    const blob = new Blob([headers, ...rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `audit_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="mt-8 bg-darkCard border border-zinc-800/80 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.3)]">
      <div className="p-6 border-b border-zinc-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-white">Подозрительная активность</h3>
          <p className="text-sm text-gray-400 mt-1">Список пользователей, превысивших лимит уровня угрозы.</p>
        </div>
        
        {users.length > 0 && (
          <button
            onClick={exportToCSV}
            className="px-4 py-2 text-xs font-semibold rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-gray-300 hover:text-white transition-all flex items-center gap-2 self-start sm:self-center"
          >
            📥 Экспорт отчета (.CSV)
          </button>
        )}
      </div>
      
      <div className="overflow-x-auto">
        {users.length === 0 ? (
          <div className="p-12 text-center text-gray-500 font-medium">
            🚨 Сигналов угрозы не зафиксировано. Система в безопасности!
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-800 text-gray-400 text-xs uppercase tracking-wider bg-zinc-900/30">
                <th className="py-4 px-6">Пользователь</th>
                <th className="py-4 px-6">Уровень риска</th>
                <th className="py-4 px-6">Индекс угрозы</th>
                <th className="py-4 px-6">Триггер</th>
                <th className="py-4 px-6 text-right">Действие</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50 text-sm">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-zinc-900/20 transition-colors duration-150">
                  <td className="py-4 px-6">
                    <div className="font-semibold text-white">{user.name}</div>
                    <div className="text-xs text-gray-500">{user.email}</div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${
                      user.riskLevel === 'Высокий' 
                        ? 'bg-red-950/20 text-neonRed border-neonRed/30 shadow-[0_0_10px_rgba(239,68,68,0.1)]' 
                        : user.riskLevel === 'Средний'
                        ? 'bg-purple-950/20 text-neonPurple border-neonPurple/30'
                        : 'bg-emerald-950/20 text-neonGreen border-neonGreen/30'
                    }`}>
                      {user.riskLevel}
                    </span>
                  </td>
                  <td className="py-4 px-6 font-mono text-zinc-300 font-bold">{user.score}</td>
                  <td className="py-4 px-6 text-gray-400">{user.status}</td>
                  <td className="py-4 px-6 text-right">
                    <button 
                      onClick={() => onOpenModal(user)}
                      className="px-3 py-1.5 text-xs font-medium rounded-lg border border-purple-500/30 text-neonPurple hover:bg-neonPurple hover:text-white transition-all duration-200"
                    >
                      Проверить
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}