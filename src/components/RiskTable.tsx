import { useState } from 'react';

// Убеждаемся, что здесь интерфейс строго совпадает с App.tsx
interface User {
  id: number;
  name: string;
  email: string;
  riskLevel: string;
  score: string;
  status: string;
  numericScore: number; 
}

interface RiskTableProps {
  users: User[];
  onOpenModal: (user: User | null) => void; // Изменили тип здесь, чтобы разрешить null
}

export default function RiskTable({ users, onOpenModal }: RiskTableProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Исправленная функция экспорта CSV
  const handleExportCSV = () => {
    const headers = ['ID', 'Имя', 'Email', 'Уровень риска', 'Угроза', 'Статус'];
    const rows = filteredUsers.map(u => [u.id, u.name, u.email, u.riskLevel, u.score, u.status]);
    
    // Превращаем массив массивов в одну большую CSV-строку
    const csvContent = [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    
    // Обертываем строго в строку, чтобы Blob не ругался
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'security_risk_report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="mt-6 bg-darkCard border border-zinc-800 p-6 rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.2)]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h3 className="text-xl font-bold text-white tracking-tight">Пользователи в зоне риска</h3>
          <p className="text-gray-400 text-xs mt-0.5">Требуется верификация аномальной активности.</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Поиск по имени или email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 text-xs bg-zinc-900 border border-zinc-800 rounded-xl text-gray-300 focus:outline-none focus:border-neonPurple/50 transition-colors w-full sm:w-64"
          />
          <button
            onClick={handleExportCSV}
            className="px-4 py-2 text-xs font-bold bg-zinc-900 border border-zinc-800 text-gray-300 rounded-xl hover:bg-zinc-800 hover:text-white transition-all whitespace-nowrap"
          >
            📥 Экспорт CSV
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-zinc-800 text-gray-500 font-semibold uppercase tracking-wider">
              <th className="pb-3 font-medium">Пользователь</th>
              <th className="pb-3 font-medium">Уровень риска</th>
              <th className="pb-3 font-medium">Индекс угрозы</th>
              <th className="pb-3 font-medium">Статус триггера</th>
              <th className="pb-3 text-right font-medium">Действие</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/50">
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-gray-600 font-medium">
                  Активных угроз не обнаружено. Система стабильна.
                </td>
              </tr>
            ) : (
              filteredUsers.map(user => (
                <tr key={user.id} className="group hover:bg-zinc-900/30 transition-colors">
                  <td className="py-4">
                    <div className="font-semibold text-white group-hover:text-neonPurple transition-colors">{user.name}</div>
                    <div className="text-gray-500 font-mono text-[11px]">{user.email}</div>
                  </td>
                  <td className="py-4">
                    <span className={`px-2 py-0.5 rounded-full font-medium text-[10px] ${
                      user.riskLevel === 'Высокий' ? 'bg-red-950/40 text-neonRed border border-neonRed/20' : 'bg-amber-950/40 text-amber-400 border border-amber-500/20'
                    } border`}>
                      {user.riskLevel}
                    </span>
                  </td>
                  <td className="py-4 font-mono font-bold text-gray-300">{user.score}</td>
                  <td className="py-4 text-gray-400">{user.status}</td>
                  <td className="py-4 text-right">
                    <button
                      onClick={() => onOpenModal(user)}
                      className="px-3 py-1.5 font-bold rounded-lg bg-zinc-900 hover:bg-neonPurple hover:text-white border border-zinc-800 hover:border-neonPurple transition-all"
                    >
                      Аудит
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}