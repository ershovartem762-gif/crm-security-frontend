interface DashboardCardsProps {
  riskCount: number;
}

export default function DashboardCards({ riskCount }: DashboardCardsProps) {
  const stats = [
    {
      title: "Всего пользователей",
      value: "1,248",
      change: "+12% за неделю",
      color: "border-neonPurple/20 text-neonPurple",
      bg: "bg-purple-950/10",
    },
    {
      title: "Активные сессии",
      value: "842",
      change: "Стабильно",
      color: "border-neonGreen/20 text-neonGreen",
      bg: "bg-emerald-950/10",
    },
    {
      title: "Пользователи в зоне риска",
      value: riskCount.toString(), // Выводим реальное динамическое число!
      change: riskCount > 0 ? "Требует проверки" : "Все чисты",
      color: "border-neonRed/30 text-neonRed",
      bg: "bg-red-950/20",
      alert: riskCount > 0,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      {stats.map((card, index) => (
        <div
          key={index}
          className={`bg-darkCard border ${card.color} ${card.bg} p-6 rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(0,0,0,0.4)]`}
        >
          <p className="text-sm font-medium text-gray-400">{card.title}</p>
          <div className="flex items-baseline gap-4 mt-2">
            <span className="text-4xl font-black tracking-tight text-white">
              {card.value}
            </span>
            <span className={`text-xs font-semibold ${card.alert ? 'text-neonRed animate-pulse' : 'text-gray-500'}`}>
              {card.change}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}