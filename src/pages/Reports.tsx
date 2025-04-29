import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Download, ChevronDown, FileText } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Reports() {
  const { t } = useLanguage();

  const formatDate = (date: Date) => {
    return date.toLocaleDateString();
  };

  const today = new Date();
  const lastWeek = new Date(today);
  lastWeek.setDate(today.getDate() - 7);

  const handleGenerateReport = (type: string) => {
    // For demo purposes, just show a toast
    console.log(`Generating ${type} report`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <header>
        <h1 className="text-3xl font-bold">{t('reports')}</h1>
        <p className="text-muted-foreground mt-1">
          {t('generateAndDownload')}
        </p>
      </header>

      <Tabs defaultValue="financial" className="space-y-4">
        <TabsList>
          <TabsTrigger value="financial">{t('financialReports')}</TabsTrigger>
          <TabsTrigger value="vehicle">{t('vehicleReports')}</TabsTrigger>
          <TabsTrigger value="customer">{t('customerReports')}</TabsTrigger>
        </TabsList>
        <TabsContent value="financial" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('financialSummary')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{t('financialSummaryDescription')}</p>
              <div className="mt-4 flex items-center justify-between">
                <Label htmlFor="financial-period">{t('selectPeriod')}</Label>
                <Select>
                  <SelectTrigger id="financial-period">
                    <SelectValue placeholder={t('lastMonth')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="last-month">{t('lastMonth')}</SelectItem>
                    <SelectItem value="last-quarter">{t('lastQuarter')}</SelectItem>
                    <SelectItem value="last-year">{t('lastYear')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="mt-4 w-full" onClick={() => handleGenerateReport('financial')}>
                {t('generateReport')}
                <Download className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vehicle" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('vehiclePerformance')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{t('vehiclePerformanceDescription')}</p>
              <div className="mt-4 flex items-center justify-between">
                <Label htmlFor="vehicle-type">{t('selectVehicleType')}</Label>
                <Select>
                  <SelectTrigger id="vehicle-type">
                    <SelectValue placeholder={t('allVehicles')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t('allVehicles')}</SelectItem>
                    <SelectItem value="sedan">{t('sedan')}</SelectItem>
                    <SelectItem value="suv">{t('SUV')}</SelectItem>
                    <SelectItem value="truck">{t('truck')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="mt-4 w-full" onClick={() => handleGenerateReport('vehicle')}>
                {t('generateReport')}
                <Download className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customer" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('customerBehavior')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{t('customerBehaviorDescription')}</p>
              <div className="mt-4 flex items-center justify-between">
                <Label htmlFor="customer-segment">{t('selectSegment')}</Label>
                <Select>
                  <SelectTrigger id="customer-segment">
                    <SelectValue placeholder={t('allCustomers')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t('allCustomers')}</SelectItem>
                    <SelectItem value="frequent">{t('frequentRenters')}</SelectItem>
                    <SelectItem value="new">{t('newCustomers')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="mt-4 w-full" onClick={() => handleGenerateReport('customer')}>
                {t('generateReport')}
                <Download className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
