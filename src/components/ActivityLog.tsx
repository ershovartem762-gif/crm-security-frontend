import { useState, useEffect } from 'react';

interface Log {
  id: string;
  time: string;
  message: string;
  type: 'info' | 'warning' | 'critical';
}

const TEMPLATE_LOGS = [
  { message: "Авторизация пользователя #1248 с нового устройства", type: "info" },
  { message: "Превышен лимит запросов к API (IP: 185.220.101.5)", type: "warning" },
  { message: "Обновление конфигурации брандмауэра успешно завершено", type: "info" },
  { message: "Критический сбой сессии #0002942. Попытка SQL-инъекции?", type: "critical" },
  { message: "Пользователь Мария Смирнова: смена геолокации (Киев -> Варшава)", type: "warning" },
  { message: "Успешный бэкап базы данных пользователей", type: "info" },
];

export default function ActivityLog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [logs, setLogs] = useState<Log[]>([
    { id: '1', time: '17:02:11', message: "Система мониторинга успешно запущена.", type: "info" },
    { id: '2', time: '17:03:05', message: "Интеграция Tailwind v4 активна.", type: "info" },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomTemplate = TEMPLATE_LOGS[Math.floor(Math.random() * TEMPLATE_LOGS.length)];
      const now = new Date();
      const timeString = now.toTimeString().split(' ')[0];
      
      const newLog: Log = {
        id: Math.random().toString(),
        time: timeString,
        ...randomTemplate
      } as Log;

      setLogs(prev => [newLog, ...prev.slice(0, 4)]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Интерактивный поиск по логам (Пункт 3)
  const filteredLogs = logs.filter(log => 
    log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mt-6 bg-darkCard border border-zinc-800/60 p-6 rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.2)]">
      <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-neonGreen animate-ping" />
        Протокол событий
      </h3>
      
      {/* Поле поиска по логам */}
      <input 
        type="text"
        placeholder="Поиск по логам (напр. critical)..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full mb-4 px-3 py-1.5 text-xs bg-zinc-900 border border-zinc-800 rounded-xl text-gray-300 placeholder-gray-600 focus:outline-none focus:border-neonPurple/50 transition-colors"
      />

      <div className="space-y-2 font-mono text-xs">
        {filteredLogs.length === 0 ? (
          <div className="text-center text-gray-600 py-4">Логи не найдены...</div>
        ) : (
          filteredLogs.map(log => (
            <div key={log.id} className="flex items-start gap-3 p-2.5 rounded-lg bg-zinc-900/40 border border-zinc-800/40 transition-all duration-300">
              <span className="text-gray-500 whitespace-nowrap">{log.time}</span>
              <span className={`font-bold uppercase tracking-wider text-[10px] px-1.5 py-0.5 rounded ${
                log.type === 'critical' ? 'bg-red-950/40 text-neonRed border border-neonRed/30' :
                log.type === 'warning' ? 'bg-amber-950/30 text-amber-400' : 'text-neonGreen'
              }`}>
                [{log.type}]
              </span>
              <span className="text-gray-300">{log.message}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}