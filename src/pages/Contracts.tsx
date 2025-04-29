
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { contracts, customers, vehicles, Contract } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { Plus, Search, FileText } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function Contracts() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [contractsList, setContractsList] = useState<Contract[]>(contracts);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);

  const form = useForm();

  const filteredContracts = contractsList.filter(contract => 
    contract.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleAddContract = () => {
    toast({
      title: "Feature in development",
      description: "Contract creation functionality will be available in the next update.",
    });
    setIsAddDialogOpen(false);
  };

  const handleViewContract = (contract: Contract) => {
    setSelectedContract(contract);
    setIsViewDialogOpen(true);
  };

  const getCustomerName = (customerId: string) => {
    const customer = customers.find(c => c.id === customerId);
    return customer ? `${customer.firstName} ${customer.lastName}` : 'Unknown';
  };

  const getVehicleName = (vehicleId: string) => {
    const vehicle = vehicles.find(v => v.id === vehicleId);
    return vehicle ? `${vehicle.year} ${vehicle.make} ${vehicle.model}` : 'Unknown';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">{t('contracts')}</h1>
          <p className="text-muted-foreground mt-1">
            {t('manageRentalContracts')}
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-1" size={16} />
              {t('newContract')}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>{t('createNewContract')}</DialogTitle>
              <DialogDescription>
                {t('enterContractDetails')}
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleAddContract)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="customer"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('customer')}</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={t('selectCustomer')} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {customers.map(customer => (
                              <SelectItem key={customer.id} value={customer.id}>
                                {customer.firstName} {customer.lastName}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="vehicle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('vehicle')}</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={t('selectVehicle')} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {vehicles.filter(v => v.status === 'available').map(vehicle => (
                              <SelectItem key={vehicle.id} value={vehicle.id}>
                                {vehicle.year} {vehicle.make} {vehicle.model}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('startDate')}</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('endDate')}</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="dailyRate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('dailyRate')}</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="deposit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('deposit')}</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <DialogFooter>
                  <Button type="submit">{t('createContract')}</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        {/* View Contract Dialog */}
        {selectedContract && (
          <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
            <DialogContent className="sm:max-w-[625px]">
              <DialogHeader>
                <DialogTitle>{t('contractDetails')}</DialogTitle>
                <DialogDescription>
                  {t('contractId')}: {selectedContract.id}
                </DialogDescription>
              </DialogHeader>
              <div className="py-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{t('customer')}</p>
                    <p className="text-base">{getCustomerName(selectedContract.customerId)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{t('vehicle')}</p>
                    <p className="text-base">{getVehicleName(selectedContract.vehicleId)}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{t('startDate')}</p>
                    <p className="text-base">{formatDate(selectedContract.startDate)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{t('endDate')}</p>
                    <p className="text-base">{formatDate(selectedContract.endDate)}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{t('status')}</p>
                    <Badge className={getStatusColor(selectedContract.status)}>
                      {t(selectedContract.status)}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{t('daysRented')}</p>
                    <p className="text-base">{selectedContract.daysRented}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{t('totalAmount')}</p>
                    <p className="text-base font-bold">${selectedContract.totalAmount.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{t('paymentStatus')}</p>
                    <p className="text-base">{t(selectedContract.paymentStatus)}</p>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </header>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>{t('rentalContracts')}</CardTitle>
          <div className="flex items-center mt-2">
            <Search className="absolute ml-2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder={t('searchContracts')}
              value={searchTerm}
              onChange={handleSearch}
              className="pl-8"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('contractId')}</TableHead>
                  <TableHead>{t('customer')}</TableHead>
                  <TableHead>{t('vehicle')}</TableHead>
                  <TableHead>{t('dates')}</TableHead>
                  <TableHead>{t('status')}</TableHead>
                  <TableHead>{t('amount')}</TableHead>
                  <TableHead className="text-right">{t('actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContracts.map((contract) => (
                  <TableRow key={contract.id}>
                    <TableCell className="font-medium">{contract.id}</TableCell>
                    <TableCell>{getCustomerName(contract.customerId)}</TableCell>
                    <TableCell>{getVehicleName(contract.vehicleId)}</TableCell>
                    <TableCell>
                      {formatDate(contract.startDate)} - {formatDate(contract.endDate)}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(contract.status)}>
                        {t(contract.status)}
                      </Badge>
                    </TableCell>
                    <TableCell>${contract.totalAmount.toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleViewContract(contract)}
                      >
                        <FileText className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
