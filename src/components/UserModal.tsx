interface User {
  id: number;
  name: string;
  email: string;
  riskLevel: string;
  score: string;
  status: string;
}

interface UserModalProps {
  user: User | null;
  onClose: () => void;
  onAction: (userId: number, action: 'block' | 'approve') => void;
}

export default function UserModal({ user, onClose, onAction }: UserModalProps) {
  if (!user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      {/* Контейнер модалки */}
      <div className="bg-darkCard border border-zinc-800 w-full max-w-md rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(168,85,247,0.2)] animate-in fade-in zoom-in-95 duration-150">
        
        {/* Шапка */}
        <div className="p-6 border-b border-zinc-800 flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-white">Проверка безопасности</h3>
            <p className="text-xs text-gray-500 mt-1">ID сессии: #000{user.id}942</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white text-xl font-bold">
            ✕
          </button>
        </div>

        {/* Контент */}
        <div className="p-6 space-y-4">
          <div>
            <label className="text-xs text-gray-500 uppercase tracking-wider">Пользователь</label>
            <p className="text-base font-semibold text-white mt-0.5">{user.name}</p>
            <p className="text-sm text-gray-400">{user.email}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wider">Индекс угрозы</label>
              <p className="text-xl font-mono font-black text-neonRed mt-0.5">{user.score}</p>
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wider">Уровень риска</label>
              <p className="text-sm font-bold text-neonPurple mt-1">{user.riskLevel}</p>
            </div>
          </div>

          <div className="p-4 bg-zinc-900/50 border border-zinc-800/80 rounded-xl">
            <label className="text-xs text-neonPurple font-semibold uppercase tracking-wider">Причина триггера</label>
            <p className="text-sm text-gray-300 mt-1">{user.status}</p>
            <p className="text-xs text-gray-500 mt-2">
              Система зафиксировала 5 подозрительных запросов за последние 12 секунд. Заголовки пакетов изменены.
            </p>
          </div>
        </div>

        {/* Кнопки действий */}
        <div className="p-6 bg-zinc-900/20 border-t border-zinc-800 flex gap-3 justify-end">
          <button 
            onClick={() => onAction(user.id, 'approve')}
            className="px-4 py-2 text-xs font-semibold rounded-xl border border-zinc-700 text-gray-300 hover:bg-zinc-800 transition-all"
          >
            Оправдать
          </button>
          <button 
            onClick={() => onAction(user.id, 'block')}
            className="px-4 py-2 text-xs font-semibold rounded-xl bg-neonRed hover:bg-red-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.3)] transition-all"
          >
            Блокировать
          </button>
        </div>
      </div>
    </div>
  );
}