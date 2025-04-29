
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Download, ChevronDown, FileText, Download as DownloadIcon } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DateRangeFilter } from '@/components/reports/DateRangeFilter';
import { getLocalData } from '@/utils/localStorageManager';
import { exportToCSV } from '@/utils/localStorageManager';
import { exportToGoogleSheets } from '@/utils/googleSheetsApi';
import { toast } from '@/hooks/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface ReportData {
  type: string;
  title: string;
  data: any[];
}

export default function Reports() {
  const { t } = useLanguage();
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [exportType, setExportType] = useState<string>("csv");

  const handleDateFilter = (start: Date | undefined, end: Date | undefined) => {
    setStartDate(start);
    setEndDate(end);
    
    // If we have active report data, filter it again with new dates
    if (reportData) {
      generateReport(reportData.type);
    }
  };

  const generateFinancialReport = () => {
    // Get contracts data
    const contracts = getLocalData('CONTRACTS');
    
    if (!contracts || contracts.length === 0) {
      toast({
        title: "No Data",
        description: "There are no contracts to generate a report from",
        variant: "destructive",
      });
      return null;
    }
    
    // Filter contracts by date range if provided
    let filteredContracts = [...contracts];
    
    if (startDate || endDate) {
      filteredContracts = filteredContracts.filter(contract => {
        const contractEndDate = new Date(contract.endDate);
        const contractStartDate = new Date(contract.startDate);
        
        if (startDate && endDate) {
          return contractStartDate >= startDate && contractEndDate <= endDate;
        } else if (startDate) {
          return contractStartDate >= startDate;
        } else if (endDate) {
          return contractEndDate <= endDate;
        }
        return true;
      });
    }

    // Calculate total revenue
    let totalRevenue = 0;
    let totalTaxes = 0;
    
    filteredContracts.forEach(contract => {
      totalRevenue += contract.total;
      totalTaxes += contract.taxes;
    });
    
    // Format data for the report
    const reportSummary = [
      {
        metric: 'Total Contracts',
        value: filteredContracts.length
      },
      {
        metric: 'Total Revenue',
        value: `$${totalRevenue.toFixed(2)}`
      },
      {
        metric: 'Total Taxes',
        value: `$${totalTaxes.toFixed(2)}`
      },
      {
        metric: 'Net Revenue',
        value: `$${(totalRevenue - totalTaxes).toFixed(2)}`
      }
    ];
    
    return {
      type: 'financial',
      title: 'Financial Summary Report',
      data: reportSummary,
      rawData: filteredContracts
    };
  };

  const generateVehicleReport = () => {
    const vehicles = getLocalData('VEHICLES');
    const contracts = getLocalData('CONTRACTS');
    
    if (!vehicles || vehicles.length === 0) {
      toast({
        title: "No Data",
        description: "There are no vehicles to generate a report from",
        variant: "destructive",
      });
      return null;
    }
    
    // Filter contracts by date range if provided
    let filteredContracts = contracts ? [...contracts] : [];
    
    if (startDate || endDate) {
      filteredContracts = filteredContracts.filter(contract => {
        const contractEndDate = new Date(contract.endDate);
        const contractStartDate = new Date(contract.startDate);
        
        if (startDate && endDate) {
          return contractStartDate >= startDate && contractEndDate <= endDate;
        } else if (startDate) {
          return contractStartDate >= startDate;
        } else if (endDate) {
          return contractEndDate <= endDate;
        }
        return true;
      });
    }
    
    // Calculate rental frequency for each vehicle
    const vehicleStats = vehicles.map(vehicle => {
      const vehicleContracts = filteredContracts.filter(contract => 
        contract.vehicleId === vehicle.id
      );
      
      const rentalCount = vehicleContracts.length;
      const totalRevenue = vehicleContracts.reduce((sum, contract) => sum + contract.total, 0);
      const utilizationDays = vehicleContracts.reduce((sum, contract) => sum + contract.daysRented, 0);
      
      // Calculate utilization rate (percentage of days the vehicle was rented)
      let utilizationRate = 0;
      if (startDate && endDate) {
        const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
        utilizationRate = totalDays > 0 ? (utilizationDays / totalDays) * 100 : 0;
      }
      
      return {
        id: vehicle.id,
        make: vehicle.make,
        model: vehicle.model,
        licensePlate: vehicle.licensePlate,
        rentalCount,
        totalRevenue: `$${totalRevenue.toFixed(2)}`,
        utilizationDays,
        utilizationRate: utilizationRate > 0 ? `${utilizationRate.toFixed(1)}%` : 'N/A'
      };
    });
    
    return {
      type: 'vehicle',
      title: 'Vehicle Performance Report',
      data: vehicleStats.sort((a, b) => b.rentalCount - a.rentalCount),
      rawData: vehicleStats
    };
  };

  const generateCustomerReport = () => {
    const customers = getLocalData('CUSTOMERS');
    const contracts = getLocalData('CONTRACTS');
    
    if (!customers || customers.length === 0 || !contracts || contracts.length === 0) {
      toast({
        title: "No Data",
        description: "There are no customers or contracts to generate a report from",
        variant: "destructive",
      });
      return null;
    }
    
    // Filter contracts by date range if provided
    let filteredContracts = [...contracts];
    
    if (startDate || endDate) {
      filteredContracts = filteredContracts.filter(contract => {
        const contractEndDate = new Date(contract.endDate);
        const contractStartDate = new Date(contract.startDate);
        
        if (startDate && endDate) {
          return contractStartDate >= startDate && contractEndDate <= endDate;
        } else if (startDate) {
          return contractStartDate >= startDate;
        } else if (endDate) {
          return contractEndDate <= endDate;
        }
        return true;
      });
    }
    
    // Calculate stats for each customer
    const customerStats = customers.map(customer => {
      const customerContracts = filteredContracts.filter(contract => 
        contract.customerId === customer.id
      );
      
      const rentalCount = customerContracts.length;
      const totalSpent = customerContracts.reduce((sum, contract) => sum + contract.total, 0);
      
      return {
        id: customer.id,
        name: `${customer.firstName} ${customer.lastName}`,
        email: customer.email,
        rentalCount,
        totalSpent: `$${totalSpent.toFixed(2)}`,
        lastRental: rentalCount > 0 
          ? new Date(Math.max(...customerContracts.map(c => new Date(c.endDate).getTime()))).toLocaleDateString()
          : 'N/A'
      };
    });
    
    return {
      type: 'customer',
      title: 'Customer Behavior Report',
      data: customerStats.sort((a, b) => b.rentalCount - a.rentalCount),
      rawData: customerStats
    };
  };

  const generateReport = (type: string) => {
    setIsGenerating(true);
    
    setTimeout(() => {
      let reportResult: ReportData | null = null;
      
      switch (type) {
        case 'financial':
          reportResult = generateFinancialReport();
          break;
        case 'vehicle':
          reportResult = generateVehicleReport();
          break;
        case 'customer':
          reportResult = generateCustomerReport();
          break;
        default:
          break;
      }
      
      setReportData(reportResult);
      setIsGenerating(false);
      
      if (reportResult) {
        toast({
          title: "Report Generated",
          description: `${reportResult.title} with ${reportResult.data.length} records`,
        });
      }
    }, 500); // Small delay to show loading state
  };

  const handleExportReport = async () => {
    if (!reportData || !reportData.rawData || reportData.rawData.length === 0) {
      toast({
        title: "No Data",
        description: "Generate a report first before exporting",
        variant: "destructive",
      });
      return;
    }
    
    // Create a temporary storage key for the report data
    const tempKey = `TEMP_REPORT_${reportData.type.toUpperCase()}`;
    
    // Save report data to local storage
    localStorage.setItem(tempKey, JSON.stringify(reportData.rawData));
    
    try {
      if (exportType === "csv") {
        // Export to CSV
        exportToCSV(tempKey as any);
        
        toast({
          title: "Export Successful",
          description: "Report exported to CSV",
        });
      } else if (exportType === "sheets") {
        // Export to Google Sheets
        const success = await exportToGoogleSheets(
          reportData.rawData, 
          `Report_${reportData.type}_${new Date().toISOString().split('T')[0]}`
        );
        
        if (!success) {
          toast({
            title: "Export Failed",
            description: "Could not export to Google Sheets. Check your API key and Sheet ID.",
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      console.error("Export error:", error);
      toast({
        title: "Export Failed",
        description: "An error occurred during export",
        variant: "destructive",
      });
    } finally {
      // Remove temporary storage
      localStorage.removeItem(tempKey);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString();
  };

  const renderReportTable = () => {
    if (!reportData || !reportData.data || reportData.data.length === 0) {
      return <p className="text-center text-muted-foreground py-8">Generate a report to see data</p>;
    }

    const data = reportData.data;
    const headers = Object.keys(data[0]);

    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {headers.map((header, index) => (
                <TableHead key={index} className="whitespace-nowrap">
                  {header.charAt(0).toUpperCase() + header.slice(1).replace(/([A-Z])/g, ' $1')}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {headers.map((header, cellIndex) => (
                  <TableCell key={cellIndex}>
                    {row[header]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  };

  const dateRangeText = () => {
    if (startDate && endDate) {
      return `Date range: ${formatDate(startDate)} to ${formatDate(endDate)}`;
    } else if (startDate) {
      return `From ${formatDate(startDate)}`;
    } else if (endDate) {
      return `Until ${formatDate(endDate)}`;
    }
    return 'All dates';
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <header>
        <h1 className="text-3xl font-bold">{t('reports')}</h1>
        <p className="text-muted-foreground mt-1">
          {t('generateAndDownload')}
        </p>
      </header>

      <DateRangeFilter onFilter={handleDateFilter} />

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
              
              <Button 
                className="mt-4 w-full" 
                onClick={() => generateReport('financial')}
                disabled={isGenerating}
              >
                {isGenerating && reportData?.type === 'financial' ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t('generating')}
                  </span>
                ) : (
                  <>
                    {t('generateReport')}
                    <FileText className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
          
          {reportData && reportData.type === 'financial' && (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>{reportData.title}</CardTitle>
                  <span className="text-sm text-muted-foreground">{dateRangeText()}</span>
                </div>
              </CardHeader>
              <CardContent>
                {renderReportTable()}
                
                <div className="mt-4 flex flex-col sm:flex-row items-center gap-3">
                  <div className="w-full sm:w-auto sm:flex-1">
                    <Select value={exportType} onValueChange={setExportType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select export type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="csv">Export to CSV</SelectItem>
                        <SelectItem value="sheets">Export to Google Sheets</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleExportReport} className="w-full sm:w-auto">
                    <DownloadIcon className="mr-2 h-4 w-4" />
                    {exportType === "csv" ? "Download CSV" : "Export to Google Sheets"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="vehicle" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('vehiclePerformance')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{t('vehiclePerformanceDescription')}</p>
              
              <Button 
                className="mt-4 w-full" 
                onClick={() => generateReport('vehicle')}
                disabled={isGenerating}
              >
                {isGenerating && reportData?.type === 'vehicle' ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t('generating')}
                  </span>
                ) : (
                  <>
                    {t('generateReport')}
                    <FileText className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
          
          {reportData && reportData.type === 'vehicle' && (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>{reportData.title}</CardTitle>
                  <span className="text-sm text-muted-foreground">{dateRangeText()}</span>
                </div>
              </CardHeader>
              <CardContent>
                {renderReportTable()}
                
                <div className="mt-4 flex flex-col sm:flex-row items-center gap-3">
                  <div className="w-full sm:w-auto sm:flex-1">
                    <Select value={exportType} onValueChange={setExportType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select export type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="csv">Export to CSV</SelectItem>
                        <SelectItem value="sheets">Export to Google Sheets</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleExportReport} className="w-full sm:w-auto">
                    <DownloadIcon className="mr-2 h-4 w-4" />
                    {exportType === "csv" ? "Download CSV" : "Export to Google Sheets"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="customer" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('customerBehavior')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{t('customerBehaviorDescription')}</p>
              
              <Button 
                className="mt-4 w-full" 
                onClick={() => generateReport('customer')}
                disabled={isGenerating}
              >
                {isGenerating && reportData?.type === 'customer' ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t('generating')}
                  </span>
                ) : (
                  <>
                    {t('generateReport')}
                    <FileText className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
          
          {reportData && reportData.type === 'customer' && (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>{reportData.title}</CardTitle>
                  <span className="text-sm text-muted-foreground">{dateRangeText()}</span>
                </div>
              </CardHeader>
              <CardContent>
                {renderReportTable()}
                
                <div className="mt-4 flex flex-col sm:flex-row items-center gap-3">
                  <div className="w-full sm:w-auto sm:flex-1">
                    <Select value={exportType} onValueChange={setExportType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select export type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="csv">Export to CSV</SelectItem>
                        <SelectItem value="sheets">Export to Google Sheets</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleExportReport} className="w-full sm:w-auto">
                    <DownloadIcon className="mr-2 h-4 w-4" />
                    {exportType === "csv" ? "Download CSV" : "Export to Google Sheets"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
