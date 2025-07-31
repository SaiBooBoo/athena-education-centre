import  { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, PointElement, LineElement } from 'chart.js';
import { Pie, Bar, Line } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  ArcElement, Tooltip, Legend, CategoryScale, 
  LinearScale, BarElement, Title, PointElement, LineElement
);

export default function AdminDashboardComponent() {
  const [selectedYear, setSelectedYear] = useState('2024-2025');
  const [dashboardData, setDashboardData] = useState(null);
  
  // Academic years data
  const academicYears = [
    { id: '2021-2022', label: '2021/2022' },
    { id: '2022-2023', label: '2022/2023' },
    { id: '2023-2024', label: '2023/2024' },
    { id: '2024-2025', label: '2024/2025' }
  ];
  
  // Mock data for each academic year
  const yearData = {
    '2021-2022': {
      totalRevenue: 185000,
      totalExpenses: 165000,
      netIncome: 20000,
      revenueSources: {
        tuition: 125000,
        uniforms: 35000,
        textbooks: 25000
      },
      expenses: {
        salaries: 105000,
        facilities: 40000,
        supplies: 20000
      },
      monthlyRevenue: [12000, 13500, 14200, 15500, 16800, 17500, 16200, 17800, 18500, 19200, 20000, 21000],
      monthlyExpenses: [11000, 11200, 11800, 12500, 13200, 14000, 14500, 13800, 14200, 14800, 15500, 16000]
    },
    '2022-2023': {
      totalRevenue: 210000,
      totalExpenses: 185000,
      netIncome: 25000,
      revenueSources: {
        tuition: 145000,
        uniforms: 40000,
        textbooks: 25000
      },
      expenses: {
        salaries: 115000,
        facilities: 45000,
        supplies: 25000
      },
      monthlyRevenue: [14000, 15200, 15800, 16800, 17800, 18500, 17500, 18800, 19500, 20200, 21000, 22000],
      monthlyExpenses: [12000, 12500, 13000, 13800, 14500, 15200, 15800, 15000, 15500, 16200, 17000, 17500]
    },
    '2023-2024': {
      totalRevenue: 240000,
      totalExpenses: 210000,
      netIncome: 30000,
      revenueSources: {
        tuition: 165000,
        uniforms: 45000,
        textbooks: 30000
      },
      expenses: {
        salaries: 130000,
        facilities: 50000,
        supplies: 30000
      },
      monthlyRevenue: [16000, 17200, 17800, 18800, 19800, 20500, 19500, 20800, 21500, 22200, 23000, 24000],
      monthlyExpenses: [13500, 14000, 14500, 15300, 16000, 16700, 17300, 16500, 17000, 17700, 18500, 19000]
    },
    '2024-2025': {
      totalRevenue: 275000,
      totalExpenses: 235000,
      netIncome: 40000,
      revenueSources: {
        tuition: 190000,
        uniforms: 50000,
        textbooks: 35000
      },
      expenses: {
        salaries: 150000,
        facilities: 55000,
        supplies: 30000
      },
      monthlyRevenue: [18500, 19500, 20200, 21200, 22200, 23000, 22500, 23800, 24500, 25200, 26000, 27000],
      monthlyExpenses: [15000, 15500, 16000, 16800, 17500, 18200, 18800, 18000, 18500, 19200, 20000, 20500]
    }
  };

  // Load data for selected year
  useEffect(() => {
    setDashboardData(yearData[selectedYear]);
  }, [selectedYear]);

  if (!dashboardData) return <div>Loading...</div>;

  // Prepare chart data
  const revenueSourcesData = {
    labels: ['Tuition Fees', 'Uniform Sales', 'Textbook Sales'],
    datasets: [
      {
        data: [
          dashboardData.revenueSources.tuition,
          dashboardData.revenueSources.uniforms,
          dashboardData.revenueSources.textbooks
        ],
        backgroundColor: [
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 99, 132, 0.7)',
          'rgba(75, 192, 192, 0.7)'
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(75, 192, 192, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  const expensesData = {
    labels: ['Salaries', 'Facilities', 'Supplies'],
    datasets: [
      {
        label: 'Expenses Breakdown',
        data: [
          dashboardData.expenses.salaries,
          dashboardData.expenses.facilities,
          dashboardData.expenses.supplies
        ],
        backgroundColor: [
          'rgba(255, 159, 64, 0.7)',
          'rgba(153, 102, 255, 0.7)',
          'rgba(201, 203, 207, 0.7)'
        ],
        borderColor: [
          'rgba(255, 159, 64, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(201, 203, 207, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  const monthlyPerformanceData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Revenue',
        data: dashboardData.monthlyRevenue,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.3,
        fill: true
      },
      {
        label: 'Expenses',
        data: dashboardData.monthlyExpenses,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        tension: 0.3,
        fill: true
      }
    ],
  };

  // Chart options
  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: {
            size: 12
          }
        }
      }
    }
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: {
            size: 12
          }
        }
      }
    }
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: {
            size: 12
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return '$' + value.toLocaleString();
          }
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--bg-dark)] via-[var(--bg)] to-[var(--bg-light)] p-4 relative">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-1/4 w-40 h-40 bg-[var(--primary)] rounded-full mix-blend-soft-light"></div>
        <div className="absolute bottom-20 right-1/3 w-60 h-60 bg-[var(--secondary)] rounded-full mix-blend-soft-light"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-[var(--highlight)] rounded-full mix-blend-soft-light"></div>
      </div>

      <div className="max-w-7xl mx-auto py-8 z-10 relative">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--text)] mb-2">Administrator Dashboard</h1>
            <p className="text-[var(--text-light)]">Comprehensive overview of school performance and finances</p>
          </div>
          
          {/* Year Selector */}
          <div className="mt-4 md:mt-0 bg-[var(--bg-light)] rounded-xl border border-[var(--border)] p-1">
            <div className="flex space-x-1">
              {academicYears.map(year => (
                <button
                  key={year.id}
                  onClick={() => setSelectedYear(year.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedYear === year.id 
                      ? 'bg-[var(--primary)] text-white' 
                      : 'bg-[var(--bg)] text-[var(--text)] hover:bg-[var(--border)]'
                  }`}
                >
                  {year.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-[var(--bg-light)] rounded-2xl shadow-md border border-[var(--border)] p-6">
            <div className="flex items-center">
              <div className="bg-[var(--primary-light)] p-3 rounded-xl mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-[var(--text-light)]">Total Revenue</p>
                <h3 className="text-2xl font-bold text-[var(--text)]">${dashboardData.totalRevenue.toLocaleString()}</h3>
              </div>
            </div>
          </div>
          
          <div className="bg-[var(--bg-light)] rounded-2xl shadow-md border border-[var(--border)] p-6">
            <div className="flex items-center">
              <div className="bg-[var(--primary-light)] p-3 rounded-xl mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <p className="text-[var(--text-light)]">Total Expenses</p>
                <h3 className="text-2xl font-bold text-[var(--text)]">${dashboardData.totalExpenses.toLocaleString()}</h3>
              </div>
            </div>
          </div>
          
          <div className="bg-[var(--bg-light)] rounded-2xl shadow-md border border-[var(--border)] p-6">
            <div className="flex items-center">
              <div className="bg-[var(--primary-light)] p-3 rounded-xl mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z" />
                </svg>
              </div>
              <div>
                <p className="text-[var(--text-light)]">Net Income</p>
                <h3 className={`text-2xl font-bold ${
                  dashboardData.netIncome >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  ${dashboardData.netIncome.toLocaleString()}
                </h3>
              </div>
            </div>
          </div>
          
          <div className="bg-[var(--bg-light)] rounded-2xl shadow-md border border-[var(--border)] p-6">
            <div className="flex items-center">
              <div className="bg-[var(--primary-light)] p-3 rounded-xl mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <p className="text-[var(--text-light)]">Total Teachers</p>
                <h3 className="text-2xl font-bold text-[var(--text)]">8</h3>
              </div>
            </div>
          </div>
          
          <div className="bg-[var(--bg-light)] rounded-2xl shadow-md border border-[var(--border)] p-6">
            <div className="flex items-center">
              <div className="bg-[var(--primary-light)] p-3 rounded-xl mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div>
                <p className="text-[var(--text-light)]">Total Students</p>
                <h3 className="text-2xl font-bold text-[var(--text)]">14</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Revenue Sources Pie Chart */}
          <div className="bg-[var(--bg-light)] rounded-2xl shadow-xl border border-[var(--border)] p-6">
            <h3 className="text-xl font-bold text-[var(--text)] mb-4">Revenue Sources</h3>
            <div className="h-80">
              <Pie data={revenueSourcesData} options={pieOptions} />
            </div>
          </div>
          
          {/* Expenses Breakdown Bar Chart */}
          <div className="bg-[var(--bg-light)] rounded-2xl shadow-xl border border-[var(--border)] p-6">
            <h3 className="text-xl font-bold text-[var(--text)] mb-4">Expenses Breakdown</h3>
            <div className="h-80">
              <Bar data={expensesData} options={barOptions} />
            </div>
          </div>
        </div>

        {/* Monthly Performance Chart */}
        <div className="bg-[var(--bg-light)] rounded-2xl shadow-xl border border-[var(--border)] p-6 mb-8">
          <h3 className="text-xl font-bold text-[var(--text)] mb-4">Monthly Performance ({selectedYear})</h3>
          <div className="h-96">
            <Line data={monthlyPerformanceData} options={lineOptions} />
          </div>
        </div>

        {/* Detailed Financials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Revenue Details */}
          <div className="bg-[var(--bg-light)] rounded-2xl shadow-md border border-[var(--border)] p-6">
            <h3 className="text-xl font-bold text-[var(--text)] mb-4">Revenue Details</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-[var(--border)]">
                <span className="text-[var(--text)]">Tuition Fees</span>
                <span className="font-bold">${dashboardData.revenueSources.tuition.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-[var(--border)]">
                <span className="text-[var(--text)]">Uniform Sales</span>
                <span className="font-bold">${dashboardData.revenueSources.uniforms.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-[var(--border)]">
                <span className="text-[var(--text)]">Textbook Sales</span>
                <span className="font-bold">${dashboardData.revenueSources.textbooks.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-lg font-bold text-[var(--text)]">Total Revenue</span>
                <span className="text-lg font-bold">${dashboardData.totalRevenue.toLocaleString()}</span>
              </div>
            </div>
          </div>
          
          {/* Expense Details */}
          <div className="bg-[var(--bg-light)] rounded-2xl shadow-md border border-[var(--border)] p-6">
            <h3 className="text-xl font-bold text-[var(--text)] mb-4">Expense Details</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-[var(--border)]">
                <span className="text-[var(--text)]">Teacher Salaries</span>
                <span className="font-bold">${dashboardData.expenses.salaries.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-[var(--border)]">
                <span className="text-[var(--text)]">Facilities Maintenance</span>
                <span className="font-bold">${dashboardData.expenses.facilities.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-[var(--border)]">
                <span className="text-[var(--text)]">Teaching Supplies</span>
                <span className="font-bold">${dashboardData.expenses.supplies.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-lg font-bold text-[var(--text)]">Total Expenses</span>
                <span className="text-lg font-bold">${dashboardData.totalExpenses.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
        
      
        
      </div>
    </div>
  );
}