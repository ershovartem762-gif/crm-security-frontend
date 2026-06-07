import { useState } from 'react';
import Sidebar from './components/Sidebar';
import DashboardCards from './components/DashboardCards';
import RiskTable from './components/RiskTable';
import UserModal from './components/UserModal';
import UsersPage from './components/UsersPage';
import RiskChart from './components/RiskChart';
import ActivityLog from './components/ActivityLog';
import SettingsPage from './components/SettingsPage';

type Page = 'dashboard' | 'users' | 'risks' | 'settings';

interface User {
  id: number;
  name: string;
  email: string;
  riskLevel: string;
  score: string;
  status: string;
  numericScore: number; // Добавили числовое значение для фильтрации AI
}

const INITIAL_USERS: User[] = [
  { id: 1, name: "Иван Иванов", email: "ivan@example.com", riskLevel: "Высокий", score: "92%", numericScore: 92, status: "Подозрительный IP" },
  { id: 2, name: "Дарья Петрова", email: "dasha@example.com", riskLevel: "Средний", score: "65%", numericScore: 65, status: "Частая смена пароля" },
  { id: 3, name: "Алексей Сидоров", email: "alex@example.com", riskLevel: "Высокий", score: "88%", numericScore: 88, status: "Брутфорс авторизации" },
  { id: 4, name: "Мария Смирнова", email: "masha@example.com", riskLevel: "Низкий", score: "34%", numericScore: 34, status: "Вход из необычной локации" },
];

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  
  // Глобальный стейт чувствительности AI (Пункт 1)
  const [sensitivity, setSensitivity] = useState(50);

  const handleUserAction = (userId: number, action: 'block' | 'approve') => {
    setUsers(prevUsers => prevUsers.filter(u => u.id !== userId));
    setSelectedUser(null);
    console.log(`Пользователь #${userId} обработан. Решение: ${action === 'block' ? 'БЛОКИРОВКА' : 'ОПРАВДАНИЕ'}`);
  };

  // Фильтрация пользователей по уровню чувствительности AI:
  // Если у пользователя индекс угрозы (numericScore) выше, чем 100 - sensitivity, он попадает в список рисков.
  const displayedUsers = users.filter(user => user.numericScore >= (100 - sensitivity));

  // Функция красивой печати в PDF (Пункт 2)
  const handlePrintPDF = () => {
    window.print();
  };

  return (
    <div className="flex min-h-screen bg-darkBg text-white">
      {/* Класс print:hidden скроет боковое меню при печати */}
      <div className="print:hidden">
        <Sidebar activeTab={currentPage} setActiveTab={setCurrentPage} />
      </div>

      <main className="flex-1 p-8 print:p-0 print:bg-white print:text-black">
        {currentPage === 'dashboard' && (
          <>
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-neonPurple to-neonGreen print:text-black print:bg-none">
                  Панель управления CRM
                </h1>
                <p className="text-gray-400 mt-1 print:text-gray-600">Система мониторинга рисков. Чувствительность AI: {sensitivity}%</p>
              </div>
              
              {/* Кнопка экспорта в PDF */}
              <button 
                onClick={handlePrintPDF}
                className="print:hidden px-4 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-neonPurple to-purple-600 hover:opacity-90 transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)]"
              >
                📄 Скачать PDF-отчет
              </button>
            </div>
            
            <DashboardCards riskCount={displayedUsers.length} />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 print:block">
              <div className="lg:col-span-2">
                <RiskChart />
              </div>
              <div className="print:hidden">
                <ActivityLog />
              </div>
            </div>

            <RiskTable users={displayedUsers} onOpenModal={setSelectedUser} />
          </>
        )}

        {currentPage === 'users' && (
          <UsersPage />
        )}

        {currentPage === 'risks' && (
          <div>
            <h1 className="text-3xl font-black tracking-tight text-neonRed">Критический уровень угроз</h1>
            <p className="text-gray-400 mt-1">Требуется немедленная реакция администратора.</p>
            <RiskTable users={displayedUsers} onOpenModal={setSelectedUser} />
          </div>
        )}

        {currentPage === 'settings' && (
          <SettingsPage sensitivity={sensitivity} onSensitivityChange={setSensitivity} />
        )}
      </main>

      <UserModal 
        user={selectedUser} 
        onClose={() => setSelectedUser(null)} 
        onAction={handleUserAction}
      />
    </div>
  );
}

export default App;