
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { dashboardStats, vehicles, finances } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Download, BarChart as BarChartIcon, FileSpreadsheet, FileText } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useForm } from 'react-hook-form';

export default function Reports() {
  const { t } = useLanguage();
  const form = useForm();
  
  const [selectedReportType, setSelectedReportType] = useState('profitability');
  const [selectedTimeframe, setSelectedTimeframe] = useState('month');
  
  const handleGenerateReport = () => {
    toast({
      title: t('reportGenerated'),
      description: t('reportDownloadReady'),
    });
  };
  
  const handleExportReport = (format: string) => {
    toast({
      title: t('exportingReport'),
      description: t('reportExportedAs', { format: format.toUpperCase() }),
    });
  };
  
  // Mock data for vehicle profitability report
  const vehicleProfitabilityData = [
    { name: 'Toyota Camry', revenue: 3200, expenses: 800, profit: 2400 },
    { name: 'Honda Civic', revenue: 2800, expenses: 950, profit: 1850 },
    { name: 'Ford Escape', revenue: 3500, expenses: 1200, profit: 2300 },
  ];
  
  // Utilization rate data
  const utilizationRateData = [
    { name: 'Toyota Camry', rate: 85 },
    { name: 'Honda Civic', rate: 72 },
    { name: 'Ford Escape', rate: 65 },
  ];
  
  // Revenue trends
  const revenueTrendsData = [
    { month: 'Jan', revenue: 8200, expenses: 5800 },
    { month: 'Feb', revenue: 9100, expenses: 6200 },
    { month: 'Mar', revenue: 8800, expenses: 6100 },
    { month: 'Apr', revenue: 9300, expenses: 6600 },
    { month: 'May', revenue: 10200, expenses: 7100 },
    { month: 'Jun', revenue: 11500, expenses: 7800 },
  ];
  
  // Expenses breakdown
  const expensesBreakdownData = [
    { name: t('maintenance'), value: 35 },
    { name: t('insurance'), value: 25 },
    { name: t('fuel'), value: 15 },
    { name: t('parking'), value: 10 },
    { name: t('other'), value: 15 },
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A569BD'];
  
  return (
    <div className="space-y-6 animate-fade-in">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">{t('reports')}</h1>
          <p className="text-muted-foreground mt-1">
            {t('generateAndExportReports')}
          </p>
        </div>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>{t('reportGenerator')}</CardTitle>
          <CardDescription>{t('selectReportOptions')}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="reportType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('reportType')}</FormLabel>
                      <Select 
                        onValueChange={(value) => {
                          setSelectedReportType(value);
                          field.onChange(value);
                        }} 
                        defaultValue="profitability"
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t('selectReportType')} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="profitability">{t('vehicleProfitability')}</SelectItem>
                          <SelectItem value="utilization">{t('utilizationRates')}</SelectItem>
                          <SelectItem value="revenue">{t('revenueTrends')}</SelectItem>
                          <SelectItem value="expenses">{t('expensesBreakdown')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="timeframe"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('timeframe')}</FormLabel>
                      <Select 
                        onValueChange={(value) => {
                          setSelectedTimeframe(value);
                          field.onChange(value);
                        }}
                        defaultValue="month"
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t('selectTimeframe')} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="month">{t('currentMonth')}</SelectItem>
                          <SelectItem value="quarter">{t('currentQuarter')}</SelectItem>
                          <SelectItem value="year">{t('currentYear')}</SelectItem>
                          <SelectItem value="custom">{t('customRange')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                
                <div className="flex items-end gap-2">
                  <Button onClick={handleGenerateReport} className="flex-1">
                    <BarChartIcon className="mr-2 h-4 w-4" />
                    {t('generateReport')}
                  </Button>
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex justify-end gap-2 mb-6">
                  <Button variant="outline" onClick={() => handleExportReport('pdf')}>
                    <FileText className="mr-2 h-4 w-4" />
                    {t('exportAsPDF')}
                  </Button>
                  <Button variant="outline" onClick={() => handleExportReport('excel')}>
                    <FileSpreadsheet className="mr-2 h-4 w-4" />
                    {t('exportAsExcel')}
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            {selectedReportType === 'profitability' && t('vehicleProfitabilityReport')}
            {selectedReportType === 'utilization' && t('vehicleUtilizationReport')}
            {selectedReportType === 'revenue' && t('revenueTrendsReport')}
            {selectedReportType === 'expenses' && t('expensesBreakdownReport')}
          </CardTitle>
          <CardDescription>
            {t('timeframeLabel')}: {t(selectedTimeframe)}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            {selectedReportType === 'profitability' && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={vehicleProfitabilityData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, '']} />
                  <Legend />
                  <Bar dataKey="revenue" name={t('revenue')} fill="#3b82f6" />
                  <Bar dataKey="expenses" name={t('expenses')} fill="#ef4444" />
                  <Bar dataKey="profit" name={t('profit')} fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            )}

            {selectedReportType === 'utilization' && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={utilizationRateData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value}%`, '']} />
                  <Legend />
                  <Bar dataKey="rate" name={t('utilizationRate')} fill="#6366f1" />
                </BarChart>
              </ResponsiveContainer>
            )}

            {selectedReportType === 'revenue' && (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={revenueTrendsData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, '']} />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" name={t('revenue')} stroke="#3b82f6" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="expenses" name={t('expenses')} stroke="#ef4444" />
                </LineChart>
              </ResponsiveContainer>
            )}

            {selectedReportType === 'expenses' && (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={expensesBreakdownData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {expensesBreakdownData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, '']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('savedReports')}</CardTitle>
          <CardDescription>{t('previouslyGeneratedReports')}</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="profitability">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profitability">{t('profitability')}</TabsTrigger>
              <TabsTrigger value="utilization">{t('utilization')}</TabsTrigger>
              <TabsTrigger value="revenue">{t('revenue')}</TabsTrigger>
              <TabsTrigger value="expenses">{t('expenses')}</TabsTrigger>
            </TabsList>
            <TabsContent value="profitability" className="mt-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">{t('monthlyVehicleProfitability')}</p>
                    <p className="text-sm text-muted-foreground">{t('generated')}: 2025-04-15</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    {t('download')}
                  </Button>
                </div>
                <div className="flex justify-between items-center p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">{t('quarterlyVehicleProfitability')}</p>
                    <p className="text-sm text-muted-foreground">{t('generated')}: 2025-03-31</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    {t('download')}
                  </Button>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="utilization" className="mt-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">{t('fleetUtilizationQ1')}</p>
                    <p className="text-sm text-muted-foreground">{t('generated')}: 2025-04-01</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    {t('download')}
                  </Button>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="revenue" className="mt-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">{t('annualRevenueTrends')}</p>
                    <p className="text-sm text-muted-foreground">{t('generated')}: 2025-01-15</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    {t('download')}
                  </Button>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="expenses" className="mt-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">{t('quarterlyExpensesBreakdown')}</p>
                    <p className="text-sm text-muted-foreground">{t('generated')}: 2025-04-10</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    {t('download')}
                  </Button>
                </div>
                <div className="flex justify-between items-center p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">{t('monthlyExpensesDetail')}</p>
                    <p className="text-sm text-muted-foreground">{t('generated')}: 2025-04-05</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    {t('download')}
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
