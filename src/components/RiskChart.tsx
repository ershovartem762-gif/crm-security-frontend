export default function RiskChart() {
  // Фейковые данные активности угроз по дням недели для красивого визуала
  const data = [
    { day: 'Пн', value: 20 },
    { day: 'Вт', value: 45 },
    { day: 'Ср', value: 30 },
    { day: 'Чт', value: 85 }, // Пик угрозы
    { day: 'Пт', value: 55 },
    { day: 'Сб', value: 70 },
    { day: 'Вс', value: 40 },
  ];

  // Настройки для построения SVG путей
  const width = 500;
  const height = 150;
  const padding = 20;

  // Рассчитываем координаты точек для плавной неоновой линии
  const points = data.map((d, i) => {
    const x = padding + (i * (width - padding * 2)) / (data.length - 1);
    const y = height - padding - (d.value * (height - padding * 2)) / 100;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="mt-6 bg-darkCard border border-zinc-800/60 p-6 rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.2)]">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-bold text-white">Мониторинг сетевых атак</h3>
          <p className="text-xs text-gray-400 mt-0.5">Динамика триггеров системы безопасности за неделю</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-neonPurple font-semibold bg-purple-950/20 px-3 py-1 rounded-lg border border-neonPurple/20">
          <span className="w-2 h-2 rounded-full bg-neonPurple animate-pulse" /> Live-аналитика
        </div>
      </div>

      {/* Сам SVG График */}
      <div className="w-full overflow-hidden">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
          <defs>
            {/* Градиент под графиком для эффекта свечения */}
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#a855f7" stopOpacity="0.2"/>
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0"/>
            </linearGradient>
            {/* Неоновый фильтр размытия */}
            <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Сетка (горизонтальные линии на заднем фоне) */}
          <line x1={padding} y1={padding} x2={width - padding} y2={padding} stroke="#27272a" strokeWidth="1" strokeDasharray="4 4" />
          <line x1={padding} y1={height / 2} x2={width - padding} y2={height / 2} stroke="#27272a" strokeWidth="1" strokeDasharray="4 4" />
          <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#27272a" strokeWidth="1" />

          {/* Заливка под линией графика */}
          <path
            d={`M ${padding},${height - padding} L ${points} L ${width - padding},${height - padding} Z`}
            fill="url(#chartGradient)"
          />

          {/* Основная светящаяся неоновая линия */}
          <polyline
            fill="none"
            stroke="#a855f7"
            strokeWidth="3"
            points={points}
            filter="url(#neonGlow)"
            className="transition-all duration-500"
          />

          {/* Точки на графике с эффектом пульсации */}
          {data.map((d, i) => {
            const x = padding + (i * (width - padding * 2)) / (data.length - 1);
            const y = height - padding - (d.value * (height - padding * 2)) / 100;
            return (
              <g key={i} className="group cursor-pointer">
                <circle cx={x} cy={y} r="6" fill="#09090b" stroke="#a855f7" strokeWidth="2" />
                <circle cx={x} cy={y} r="3" fill="#22c55e" className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </g>
            );
          })}
        </svg>
      </div>

      {/* Подписи дней недели снизу */}
      <div className="flex justify-between px-4 mt-2 text-xs font-mono text-gray-500">
        {data.map((d, i) => (
          <span key={i}>{d.day}</span>
        ))}
      </div>
    </div>
  );
}