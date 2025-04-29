
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { exportToCSV, importFromCSV } from '@/utils/localStorageManager';
import { Download, Upload, FileSpreadsheet, AlertCircle } from 'lucide-react';

export default function DataManagement() {
  const { t } = useLanguage();
  const [selectedDataType, setSelectedDataType] = useState<'VEHICLES' | 'CUSTOMERS' | 'CONTRACTS'>('VEHICLES');
  const [isUploading, setIsUploading] = useState(false);

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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileSpreadsheet className="h-5 w-5" />
          {t('offlineDataManagement')}
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
      </CardContent>
    </Card>
  );
}
