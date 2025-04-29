
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { customers, Customer } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Plus, Search, Edit, User } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Customers() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [customersList, setCustomersList] = useState<Customer[]>(customers);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const form = useForm();

  const filteredCustomers = customersList.filter(customer => 
    customer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleAddCustomer = () => {
    toast({
      title: "Feature in development",
      description: "Customer creation functionality will be available in the next update.",
    });
    setIsAddDialogOpen(false);
  };

  const handleViewCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsViewDialogOpen(true);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">{t('customers')}</h1>
          <p className="text-muted-foreground mt-1">
            {t('manageCustomers')}
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-1" size={16} />
              {t('addCustomer')}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>{t('addNewCustomer')}</DialogTitle>
              <DialogDescription>
                {t('enterCustomerDetails')}
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleAddCustomer)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('firstName')}</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('lastName')}</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('email')}</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('phone')}</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('address')}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="licenseNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('licenseNumber')}</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="licenseExpiry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('licenseExpiry')}</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <DialogFooter>
                  <Button type="submit">{t('addCustomer')}</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        {/* View Customer Dialog */}
        {selectedCustomer && (
          <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
            <DialogContent className="sm:max-w-[625px]">
              <DialogHeader>
                <DialogTitle>{t('customerDetails')}</DialogTitle>
                <DialogDescription>
                  {t('customerId')}: {selectedCustomer.id}
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <Tabs defaultValue="details">
                  <TabsList>
                    <TabsTrigger value="details">{t('details')}</TabsTrigger>
                    <TabsTrigger value="history">{t('rentalHistory')}</TabsTrigger>
                    <TabsTrigger value="documents">{t('documents')}</TabsTrigger>
                  </TabsList>
                  <TabsContent value="details">
                    <div className="space-y-4 mt-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">{t('name')}</p>
                          <p className="text-base">{selectedCustomer.firstName} {selectedCustomer.lastName}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">{t('status')}</p>
                          <p className="text-base">{selectedCustomer.status}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">{t('email')}</p>
                          <p className="text-base">{selectedCustomer.email}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">{t('phone')}</p>
                          <p className="text-base">{selectedCustomer.phone}</p>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{t('address')}</p>
                        <p className="text-base">{selectedCustomer.address}</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">{t('licenseNumber')}</p>
                          <p className="text-base">{selectedCustomer.licenseNumber}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">{t('licenseExpiry')}</p>
                          <p className="text-base">{formatDate(selectedCustomer.licenseExpiry)}</p>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{t('notes')}</p>
                        <p className="text-base">{selectedCustomer.notes}</p>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="history">
                    <div className="mt-4">
                      <h3 className="text-lg font-medium mb-2">{t('rentalHistory')}</h3>
                      {selectedCustomer.rentalHistory.length > 0 ? (
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>{t('startDate')}</TableHead>
                              <TableHead>{t('endDate')}</TableHead>
                              <TableHead>{t('returned')}</TableHead>
                              <TableHead>{t('condition')}</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {selectedCustomer.rentalHistory.map((rental) => (
                              <TableRow key={rental.id}>
                                <TableCell>{formatDate(rental.startDate)}</TableCell>
                                <TableCell>{formatDate(rental.endDate)}</TableCell>
                                <TableCell>{rental.returned ? t('yes') : t('no')}</TableCell>
                                <TableCell>{rental.condition ? t(rental.condition) : '-'}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      ) : (
                        <p>{t('noRentalsFound')}</p>
                      )}
                    </div>
                  </TabsContent>
                  <TabsContent value="documents">
                    <div className="mt-4">
                      <h3 className="text-lg font-medium mb-2">{t('documents')}</h3>
                      {selectedCustomer.documents.length > 0 ? (
                        <ul className="space-y-2">
                          {selectedCustomer.documents.map((doc) => (
                            <li key={doc.id} className="flex items-center gap-2 p-2 border rounded-md">
                              <FileText className="h-5 w-5 text-muted-foreground" />
                              <span>{doc.name}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>{t('noDocumentsFound')}</p>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </header>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>{t('customerDirectory')}</CardTitle>
          <div className="flex items-center mt-2">
            <Search className="absolute ml-2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder={t('searchCustomers')}
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
                  <TableHead>{t('name')}</TableHead>
                  <TableHead>{t('email')}</TableHead>
                  <TableHead>{t('phone')}</TableHead>
                  <TableHead>{t('licenseNumber')}</TableHead>
                  <TableHead>{t('joinDate')}</TableHead>
                  <TableHead className="text-right">{t('actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell className="font-medium">
                      {customer.firstName} {customer.lastName}
                    </TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.phone}</TableCell>
                    <TableCell>{customer.licenseNumber}</TableCell>
                    <TableCell>{formatDate(customer.joinDate)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewCustomer(customer)}
                        >
                          <User className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
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
