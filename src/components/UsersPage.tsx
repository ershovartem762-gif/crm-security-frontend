import { useState } from 'react';

interface FullUser {
  id: number;
  name: string;
  email: string;
  role: string;
  riskLevel: 'Высокий' | 'Средний' | 'Низкий' | 'Нет риска';
  regDate: string;
}

// Фейковая база данных всех пользователей системы для демонстрации
const ALL_USERS: FullUser[] = [
  { id: 1, name: "Иван Иванов", email: "ivan@example.com", role: "Пользователь", riskLevel: "Высокий", regDate: "12.05.2026" },
  { id: 2, name: "Дарья Петрова", email: "dasha@example.com", role: "Модератор", riskLevel: "Средний", regDate: "10.04.2026" },
  { id: 3, name: "Алексей Сидоров", email: "alex@example.com", role: "Пользователь", riskLevel: "Высокий", regDate: "01.05.2026" },
  { id: 4, name: "Мария Смирнова", email: "masha@example.com", role: "Пользователь", riskLevel: "Низкий", regDate: "28.04.2026" },
  { id: 5, name: "Владимир Кот", email: "vlad@example.com", role: "Пользователь", riskLevel: "Нет риска", regDate: "15.05.2026" },
  { id: 6, name: "Елена Романова", email: "elena@example.com", role: "Админ", riskLevel: "Нет риска", regDate: "20.02.2026" },
];

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRisk, setFilterRisk] = useState<string>('All');

  // Живая фильтрация массива прямо при вводе текста или смене фильтра!
  const filteredUsers = ALL_USERS.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterRisk === 'All' || user.riskLevel === filterRisk;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-neonPurple">База пользователей</h1>
        <p className="text-gray-400 mt-1">Управление учетными записями и аудит уровней доступа.</p>
      </div>

      {/* Панель инструментов: Поиск + Фильтр */}
      <div className="flex flex-col sm:flex-row gap-4 bg-darkCard p-4 rounded-xl border border-zinc-800/60">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Поиск по имени или email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-neonPurple transition-colors"
          />
        </div>
        <div className="w-full sm:w-48">
          <select
            value={filterRisk}
            onChange={(e) => setFilterRisk(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-neonPurple transition-colors appearance-none cursor-pointer"
          >
            <option value="All">Все уровни риска</option>
            <option value="Высокий">Высокий</option>
            <option value="Средний">Средний</option>
            <option value="Низкий">Низкий</option>
            <option value="Нет риска">Нет риска</option>
          </select>
        </div>
      </div>

      {/* Таблица всех пользователей */}
      <div className="bg-darkCard border border-zinc-800/80 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.3)]">
        <div className="overflow-x-auto">
          {filteredUsers.length === 0 ? (
            <div className="p-12 text-center text-gray-500 font-medium">
              🔍 Никого не найдено по таким критериям.
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 text-gray-400 text-xs uppercase tracking-wider bg-zinc-900/30">
                  <th className="py-4 px-6">Имя / Email</th>
                  <th className="py-4 px-6">Роль</th>
                  <th className="py-4 px-6">Статус безопасности</th>
                  <th className="py-4 px-6">Дата регистрации</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50 text-sm">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-zinc-900/10 transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-semibold text-white">{user.name}</div>
                      <div className="text-xs text-gray-500">{user.email}</div>
                    </td>
                    <td className="py-4 px-6 text-zinc-300">
                      {user.role}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${
                        user.riskLevel === 'Высокий' ? 'bg-red-950/20 text-neonRed border-neonRed/20' :
                        user.riskLevel === 'Средний' ? 'bg-purple-950/20 text-neonPurple border-neonPurple/20' :
                        user.riskLevel === 'Низкий' ? 'bg-amber-950/20 text-amber-400 border-amber-500/20' :
                        'bg-zinc-900 text-gray-400 border-zinc-800'
                      }`}>
                        {user.riskLevel}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-500 font-mono">
                      {user.regDate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}