import { useState } from 'react';

interface SettingsPageProps {
  sensitivity: number;
  onSensitivityChange: (value: number) => void;
}

export default function SettingsPage({ sensitivity, onSensitivityChange }: SettingsPageProps) {
  const [isMuted, setIsMuted] = useState(false);

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-zinc-400">Настройки системы</h1>
        <p className="text-gray-400 mt-1">Конфигурация триггеров защиты и кастомизация интерфейса.</p>
      </div>

      <div className="bg-darkCard border border-zinc-800 p-6 rounded-2xl space-y-6 shadow-[0_0_30px_rgba(0,0,0,0.2)]">
        {/* Интеграция Настроек (Пункт 1) */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-semibold text-white">Чувствительность AI-детектора</label>
            <span className="text-sm font-mono text-neonPurple font-bold">{sensitivity}%</span>
          </div>
          <input 
            type="range" 
            min="30" 
            max="95" 
            value={sensitivity} 
            onChange={(e) => onSensitivityChange(Number(e.target.value))}
            className="w-full accent-neonPurple h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
          />
          <p className="text-xs text-gray-500">
            Динамический фильтр: при повышении чувствительности система выводит в зону риска пользователей с меньшим индексом угрозы.
          </p>
        </div>

        <hr className="border-zinc-800/80" />

        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-semibold text-white">Звуковые алерты системы</label>
            <p className="text-xs text-gray-500 mt-0.5">Включить сирену в браузере при обнаружении атаки уровня Critical.</p>
          </div>
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`w-12 h-6 rounded-full transition-colors p-1 flex items-center ${isMuted ? 'bg-zinc-800 justify-start' : 'bg-neonPurple justify-end'}`}
          >
            <span className="w-4 h-4 rounded-full bg-white shadow-md block" />
          </button>
        </div>
      </div>
    </div>
  );
}