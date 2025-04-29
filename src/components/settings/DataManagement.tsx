
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import { exportToCSV, importFromCSV, getLocalData, saveLocalData } from '@/utils/localStorageManager';
import { 
  exportToGoogleSheets, 
  importFromGoogleSheets, 
  saveGoogleApiKey, 
  getGoogleApiKey,
  saveSheetId,
  getSheetId
} from '@/utils/googleSheetsApi';
import { 
  Download, 
  Upload, 
  FileSpreadsheet, 
  AlertCircle, 
  RefreshCw, 
  Settings2,
  Table
} from 'lucide-react';

export default function DataManagement() {
  const { t } = useLanguage();
  const [selectedDataType, setSelectedDataType] = useState<'VEHICLES' | 'CUSTOMERS' | 'CONTRACTS'>('VEHICLES');
  const [isUploading, setIsUploading] = useState(false);
  const [apiKey, setApiKey] = useState(getGoogleApiKey() || '');
  const [sheetId, setSheetId] = useState(getSheetId() || '');
  const [isImporting, setIsImporting] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    exportToCSV(selectedDataType);
    toast({
      title: t('exportSuccess'),
      description: t('fileDownloaded'),
    });
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const success = await importFromCSV(selectedDataType, file);
      
      if (success) {
        toast({
          title: t('importSuccess'),
          description: t('dataImported'),
        });
      } else {
        toast({
          title: t('importFailed'),
          description: t('invalidFileFormat'),
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: t('importFailed'),
        description: t('errorProcessingFile'),
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
      // Reset the file input
      e.target.value = '';
    }
  };

  const handleSaveGoogleConfig = () => {
    if (!apiKey || !sheetId) {
      toast({
        title: "Missing Information",
        description: "Please enter both API key and Sheet ID",
        variant: "destructive",
      });
      return;
    }

    saveGoogleApiKey(apiKey);
    saveSheetId(sheetId);

    toast({
      title: "Configuration Saved",
      description: "Google Sheets API configuration has been saved",
    });
  };

  const handleExportToGoogleSheets = async () => {
    setIsExporting(true);
    try {
      const data = getLocalData(selectedDataType);
      if (!data || data.length === 0) {
        toast({
          title: "No Data",
          description: "There is no data to export",
          variant: "destructive",
        });
        return;
      }

      // Use the selectedDataType as the sheet name
      await exportToGoogleSheets(data, selectedDataType);
    } catch (error) {
      console.error("Error exporting to Google Sheets:", error);
      toast({
        title: "Export Failed",
        description: "An error occurred while exporting to Google Sheets",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleImportFromGoogleSheets = async () => {
    setIsImporting(true);
    try {
      const data = await importFromGoogleSheets(selectedDataType);
      if (data && data.length > 0) {
        saveLocalData(selectedDataType, data);
        toast({
          title: "Import Successful",
          description: `${data.length} records imported from Google Sheets`,
        });
      }
    } catch (error) {
      console.error("Error importing from Google Sheets:", error);
      toast({
        title: "Import Failed",
        description: "An error occurred while importing from Google Sheets",
        variant: "destructive",
      });
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileSpreadsheet className="h-5 w-5" />
          {t('dataManagement')}
        </CardTitle>
        <CardDescription>
          {t('manageLocalDataAndExcelExports')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-md flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-amber-800">{t('offlineAppNotice')}</h4>
              <p className="text-sm text-amber-700 mt-1">
                {t('offlineAppDescription')}
              </p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="local" className="space-y-4">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="local" className="flex items-center gap-2">
              <Table className="h-4 w-4" />
              Local Storage
            </TabsTrigger>
            <TabsTrigger value="google" className="flex items-center gap-2">
              <FileSpreadsheet className="h-4 w-4" />
              Google Sheets
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="local" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-medium">{t('exportData')}</h3>
                <div className="space-y-2">
                  <Label htmlFor="exportDataType">{t('selectDataToExport')}</Label>
                  <Select
                    value={selectedDataType}
                    onValueChange={(value) => setSelectedDataType(value as any)}
                  >
                    <SelectTrigger id="exportDataType">
                      <SelectValue placeholder={t('selectDataType')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="VEHICLES">{t('vehicles')}</SelectItem>
                      <SelectItem value="CUSTOMERS">{t('customers')}</SelectItem>
                      <SelectItem value="CONTRACTS">{t('contracts')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleExport} className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  {t('exportToExcel')}
                </Button>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">{t('importData')}</h3>
                <div className="space-y-2">
                  <Label htmlFor="importDataType">{t('selectDataToImport')}</Label>
                  <Select
                    value={selectedDataType}
                    onValueChange={(value) => setSelectedDataType(value as any)}
                  >
                    <SelectTrigger id="importDataType">
                      <SelectValue placeholder={t('selectDataType')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="VEHICLES">{t('vehicles')}</SelectItem>
                      <SelectItem value="CUSTOMERS">{t('customers')}</SelectItem>
                      <SelectItem value="CONTRACTS">{t('contracts')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    id="importFile"
                    type="file"
                    accept=".csv"
                    onChange={handleImport}
                    disabled={isUploading}
                    className="flex-1"
                  />
                  <Label
                    htmlFor="importFile"
                    className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md inline-flex items-center"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    {t('import')}
                  </Label>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="google" className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-medium">Google Sheets Configuration</h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="apiKey">Google Sheets API Key</Label>
                  <Input
                    id="apiKey"
                    type="text"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Enter your Google Sheets API key"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sheetId">Google Sheet ID</Label>
                  <Input
                    id="sheetId"
                    type="text"
                    value={sheetId}
                    onChange={(e) => setSheetId(e.target.value)}
                    placeholder="Enter your Google Sheet ID"
                  />
                </div>
                <Button onClick={handleSaveGoogleConfig} className="w-full">
                  <Settings2 className="mr-2 h-4 w-4" />
                  Save Configuration
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-medium">Export to Google Sheets</h3>
                <div className="space-y-2">
                  <Label htmlFor="gsExportDataType">Select data to export</Label>
                  <Select
                    value={selectedDataType}
                    onValueChange={(value) => setSelectedDataType(value as any)}
                  >
                    <SelectTrigger id="gsExportDataType">
                      <SelectValue placeholder="Select data type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="VEHICLES">Vehicles</SelectItem>
                      <SelectItem value="CUSTOMERS">Customers</SelectItem>
                      <SelectItem value="CONTRACTS">Contracts</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  onClick={handleExportToGoogleSheets} 
                  disabled={isExporting || !apiKey || !sheetId}
                  className="w-full"
                >
                  {isExporting ? (
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Download className="mr-2 h-4 w-4" />
                  )}
                  Export to Google Sheets
                </Button>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Import from Google Sheets</h3>
                <div className="space-y-2">
                  <Label htmlFor="gsImportDataType">Select data to import</Label>
                  <Select
                    value={selectedDataType}
                    onValueChange={(value) => setSelectedDataType(value as any)}
                  >
                    <SelectTrigger id="gsImportDataType">
                      <SelectValue placeholder="Select data type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="VEHICLES">Vehicles</SelectItem>
                      <SelectItem value="CUSTOMERS">Customers</SelectItem>
                      <SelectItem value="CONTRACTS">Contracts</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  onClick={handleImportFromGoogleSheets}
                  disabled={isImporting || !apiKey || !sheetId}
                  className="w-full"
                >
                  {isImporting ? (
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Upload className="mr-2 h-4 w-4" />
                  )}
                  Import from Google Sheets
                </Button>
              </div>
            </div>

            <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-sm text-blue-700">
                <strong>Note:</strong> To use Google Sheets integration, you need to:
                <ol className="list-decimal pl-5 mt-2 space-y-1">
                  <li>Create a Google Cloud project</li>
                  <li>Enable the Google Sheets API</li>
                  <li>Create an API key</li>
                  <li>Share your spreadsheet with your application</li>
                  <li>Enter your API Key and Sheet ID above</li>
                </ol>
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
