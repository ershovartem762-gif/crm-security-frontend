type NavItem = 'dashboard' | 'users' | 'risks' | 'settings';

// Описываем, какие пропсы Sidebar теперь принимает сверху
interface SidebarProps {
  activeTab: NavItem;
  setActiveTab: (tab: NavItem) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard' as NavItem, label: 'Главная', icon: '📊' },
    { id: 'users' as NavItem, label: 'Пользователи', icon: '👥' },
    { id: 'risks' as NavItem, label: 'Зона риска', icon: '🚨', badged: true },
    { id: 'settings' as NavItem, label: 'Настройки', icon: '⚙️' },
  ];

  return (
    <aside className="w-64 bg-darkCard border-r border-purple-900/30 flex flex-col justify-between p-4 h-screen sticky top-0">
      <div>
        {/* Логотип */}
        <div className="flex items-center gap-3 px-2 py-4 mb-6">
          <div className="w-8 h-8 rounded-lg bg-neonPurple flex items-center justify-center font-bold shadow-[0_0_15px_rgba(168,85,247,0.5)]">
            C
          </div>
          <span className="text-xl font-black tracking-wider text-white">
            NEON<span className="text-neonPurple">.CRM</span>
          </span>
        </div>

        {/* Навигация */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)} // При клике меняем страницу во всем приложении!
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-purple-950/40 text-neonPurple border border-neonPurple/30 shadow-[0_0_15px_rgba(168,85,247,0.15)]'
                    : 'text-gray-400 hover:bg-zinc-900 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-base">{item.icon}</span>
                  <span>{item.label}</span>
                </div>
                
                {/* Пульсирующий красный огонёк */}
                {item.badged && (
                  <span className="w-2 h-2 rounded-full bg-neonRed animate-pulse shadow-[0_0_8px_#ef4444]" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Профиль */}
      <div className="border-t border-zinc-800 pt-4 flex items-center gap-3 px-2">
        <div className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center font-semibold text-neonGreen">
          OP
        </div>
        <div>
          <div className="text-sm font-medium text-white">Артем</div>
          <div className="text-xs text-gray-500">Администратор</div>
        </div>
      </div>
    </aside>
  );
}