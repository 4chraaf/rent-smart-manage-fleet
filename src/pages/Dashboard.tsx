
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { StatCard } from '@/components/dashboard/StatCard';
import { RevenueChart } from '@/components/dashboard/RevenueChart';
import { FleetStatusChart } from '@/components/dashboard/FleetStatusChart';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { UpcomingReturns } from '@/components/dashboard/UpcomingReturns';
import { dashboardStats } from '@/data/mockData';
import { Car, DollarSign, FileText, BarChart } from 'lucide-react';

export default function Dashboard() {
  const { t } = useLanguage();
  const { user } = useAuth();

  return (
    <div className="space-y-6 animate-fade-in">
      <header>
        <h1 className="text-3xl font-bold">{t('dashboard')}</h1>
        <p className="text-muted-foreground mt-1">
          {t('welcome')}
        </p>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title={t('totalVehicles')}
          value={dashboardStats.totalVehicles}
          icon={<Car className="h-5 w-5 text-primary" />}
          description={`${dashboardStats.availableVehicles} ${t('available')}`}
        />
        <StatCard
          title={t('totalRevenue')}
          value={`$${dashboardStats.totalRevenue.toLocaleString()}`}
          icon={<DollarSign className="h-5 w-5 text-primary" />}
          trend={{ value: 8.2, isPositive: true }}
        />
        <StatCard
          title={t('activeContracts')}
          value={dashboardStats.activeContracts}
          icon={<FileText className="h-5 w-5 text-primary" />}
        />
        <StatCard
          title={t('utilizationRate')}
          value={`${dashboardStats.utilizationRate}%`}
          icon={<BarChart className="h-5 w-5 text-primary" />}
          trend={{ value: 4.5, isPositive: true }}
        />
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RevenueChart
          data={dashboardStats.monthlyRevenue}
          className="lg:col-span-2"
        />
        <FleetStatusChart
          data={dashboardStats.vehicleStatusBreakdown}
          className="lg:col-span-1"
        />
      </div>

      {/* Activity and Upcoming Returns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity />
        <UpcomingReturns />
      </div>
    </div>
  );
}
