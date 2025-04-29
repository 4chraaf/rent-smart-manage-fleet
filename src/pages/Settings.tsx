
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { users, User } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { Plus, UserPlus, Trash2, Settings as SettingsIcon } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function Settings() {
  const { t, setLanguage, language } = useLanguage();
  const { user } = useAuth();
  const [usersList, setUsersList] = useState<User[]>(users);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);

  const form = useForm();

  const handleAddUser = () => {
    toast({
      title: "Feature in development",
      description: "User creation functionality will be available in the next update.",
    });
    setIsAddUserOpen(false);
  };

  const handleDeleteUser = (userId: string) => {
    // In a real app, this would delete from the database
    const updatedList = usersList.filter(u => u.id !== userId);
    setUsersList(updatedList);
    
    toast({
      title: t('userDeleted'),
      description: t('userDeletedMessage'),
    });
  };

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    toast({
      title: t('languageChanged'),
      description: t('languageChangedMessage'),
    });
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString();
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-purple-100 text-purple-800';
      case 'manager': return 'bg-blue-100 text-blue-800';
      case 'agent': return 'bg-green-100 text-green-800';
      case 'accountant': return 'bg-yellow-100 text-yellow-800';
      case 'mechanic': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <header>
        <h1 className="text-3xl font-bold">{t('settings')}</h1>
        <p className="text-muted-foreground mt-1">
          {t('manageSystemSettings')}
        </p>
      </header>

      <Tabs defaultValue="general">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">{t('general')}</TabsTrigger>
          <TabsTrigger value="users">{t('userManagement')}</TabsTrigger>
          <TabsTrigger value="company">{t('companySettings')}</TabsTrigger>
          <TabsTrigger value="notifications">{t('notifications')}</TabsTrigger>
        </TabsList>
        
        {/* General Settings Tab */}
        <TabsContent value="general" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('generalSettings')}</CardTitle>
              <CardDescription>{t('configureGeneralSettings')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Language Settings */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">{t('languageSettings')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card 
                    className={`cursor-pointer border hover:border-primary ${language === 'en' ? 'border-primary bg-primary/5' : ''}`}
                    onClick={() => handleLanguageChange('en')}
                  >
                    <CardContent className="p-4 flex flex-col items-center justify-center">
                      <div className="w-10 h-10 rounded-full overflow-hidden mb-2">
                        <img 
                          src="https://flagcdn.com/w80/us.png"
                          alt="English" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="font-medium">English</p>
                    </CardContent>
                  </Card>
                  
                  <Card 
                    className={`cursor-pointer border hover:border-primary ${language === 'fr' ? 'border-primary bg-primary/5' : ''}`}
                    onClick={() => handleLanguageChange('fr')}
                  >
                    <CardContent className="p-4 flex flex-col items-center justify-center">
                      <div className="w-10 h-10 rounded-full overflow-hidden mb-2">
                        <img 
                          src="https://flagcdn.com/w80/fr.png"
                          alt="Français" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="font-medium">Français</p>
                    </CardContent>
                  </Card>
                  
                  <Card 
                    className={`cursor-pointer border hover:border-primary ${language === 'ar' ? 'border-primary bg-primary/5' : ''}`}
                    onClick={() => handleLanguageChange('ar')}
                  >
                    <CardContent className="p-4 flex flex-col items-center justify-center">
                      <div className="w-10 h-10 rounded-full overflow-hidden mb-2">
                        <img 
                          src="https://flagcdn.com/w80/sa.png"
                          alt="العربية" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="font-medium">العربية</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              {/* Currency Settings */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">{t('currencySettings')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <FormLabel>{t('defaultCurrency')}</FormLabel>
                    <Select defaultValue="usd">
                      <SelectTrigger>
                        <SelectValue placeholder={t('selectCurrency')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="usd">USD - US Dollar</SelectItem>
                        <SelectItem value="eur">EUR - Euro</SelectItem>
                        <SelectItem value="gbp">GBP - British Pound</SelectItem>
                        <SelectItem value="cad">CAD - Canadian Dollar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <FormLabel>{t('currencyFormat')}</FormLabel>
                    <Select defaultValue="symbol_first">
                      <SelectTrigger>
                        <SelectValue placeholder={t('selectFormat')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="symbol_first">$100.00</SelectItem>
                        <SelectItem value="symbol_last">100.00$</SelectItem>
                        <SelectItem value="code_first">USD 100.00</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              {/* Date & Time Settings */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">{t('dateAndTimeSettings')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <FormLabel>{t('dateFormat')}</FormLabel>
                    <Select defaultValue="mm-dd-yyyy">
                      <SelectTrigger>
                        <SelectValue placeholder={t('selectDateFormat')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mm-dd-yyyy">MM-DD-YYYY</SelectItem>
                        <SelectItem value="dd-mm-yyyy">DD-MM-YYYY</SelectItem>
                        <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <FormLabel>{t('timeFormat')}</FormLabel>
                    <Select defaultValue="12h">
                      <SelectTrigger>
                        <SelectValue placeholder={t('selectTimeFormat')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="12h">12-hour (AM/PM)</SelectItem>
                        <SelectItem value="24h">24-hour</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button>
                  {t('saveSettings')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* User Management Tab */}
        <TabsContent value="users" className="mt-6 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>{t('userManagement')}</CardTitle>
                <CardDescription>{t('manageSystemUsers')}</CardDescription>
              </div>
              <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <UserPlus className="mr-1" size={16} />
                    {t('addUser')}
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[625px]">
                  <DialogHeader>
                    <DialogTitle>{t('addNewUser')}</DialogTitle>
                    <DialogDescription>
                      {t('enterUserDetails')}
                    </DialogDescription>
                  </DialogHeader>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleAddUser)} className="space-y-4">
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
                        name="role"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t('role')}</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder={t('selectRole')} />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="admin">{t('adminRole')}</SelectItem>
                                <SelectItem value="manager">{t('managerRole')}</SelectItem>
                                <SelectItem value="agent">{t('agentRole')}</SelectItem>
                                <SelectItem value="accountant">{t('accountantRole')}</SelectItem>
                                <SelectItem value="mechanic">{t('mechanicRole')}</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <DialogFooter>
                        <Button type="submit">{t('addUser')}</Button>
                      </DialogFooter>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('name')}</TableHead>
                      <TableHead>{t('email')}</TableHead>
                      <TableHead>{t('role')}</TableHead>
                      <TableHead>{t('lastLogin')}</TableHead>
                      <TableHead>{t('status')}</TableHead>
                      <TableHead className="text-right">{t('actions')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {usersList.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">
                          {user.firstName} {user.lastName}
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                            {t(`${user.role}Role`)}
                          </span>
                        </TableCell>
                        <TableCell>{formatDate(user.lastLogin)}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {t(user.status)}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDeleteUser(user.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('rolePermissions')}</CardTitle>
              <CardDescription>{t('configureRoleAccess')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('module')}</TableHead>
                      <TableHead className="text-center">{t('adminRole')}</TableHead>
                      <TableHead className="text-center">{t('managerRole')}</TableHead>
                      <TableHead className="text-center">{t('agentRole')}</TableHead>
                      <TableHead className="text-center">{t('accountantRole')}</TableHead>
                      <TableHead className="text-center">{t('mechanicRole')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">{t('dashboard')}</TableCell>
                      <TableCell className="text-center">✓</TableCell>
                      <TableCell className="text-center">✓</TableCell>
                      <TableCell className="text-center">✓</TableCell>
                      <TableCell className="text-center">✓</TableCell>
                      <TableCell className="text-center">✓</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">{t('vehicles')}</TableCell>
                      <TableCell className="text-center">✓</TableCell>
                      <TableCell className="text-center">✓</TableCell>
                      <TableCell className="text-center">✓</TableCell>
                      <TableCell className="text-center">-</TableCell>
                      <TableCell className="text-center">✓</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">{t('contracts')}</TableCell>
                      <TableCell className="text-center">✓</TableCell>
                      <TableCell className="text-center">✓</TableCell>
                      <TableCell className="text-center">✓</TableCell>
                      <TableCell className="text-center">-</TableCell>
                      <TableCell className="text-center">-</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">{t('customers')}</TableCell>
                      <TableCell className="text-center">✓</TableCell>
                      <TableCell className="text-center">✓</TableCell>
                      <TableCell className="text-center">✓</TableCell>
                      <TableCell className="text-center">-</TableCell>
                      <TableCell className="text-center">-</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">{t('finances')}</TableCell>
                      <TableCell className="text-center">✓</TableCell>
                      <TableCell className="text-center">✓</TableCell>
                      <TableCell className="text-center">-</TableCell>
                      <TableCell className="text-center">✓</TableCell>
                      <TableCell className="text-center">-</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">{t('reports')}</TableCell>
                      <TableCell className="text-center">✓</TableCell>
                      <TableCell className="text-center">✓</TableCell>
                      <TableCell className="text-center">-</TableCell>
                      <TableCell className="text-center">✓</TableCell>
                      <TableCell className="text-center">-</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">{t('settings')}</TableCell>
                      <TableCell className="text-center">✓</TableCell>
                      <TableCell className="text-center">-</TableCell>
                      <TableCell className="text-center">-</TableCell>
                      <TableCell className="text-center">-</TableCell>
                      <TableCell className="text-center">-</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Company Settings Tab */}
        <TabsContent value="company" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('companyInformation')}</CardTitle>
              <CardDescription>{t('manageCompanyDetails')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <FormLabel>{t('companyName')}</FormLabel>
                  <Input defaultValue="Acme Car Rentals" />
                </div>
                <div>
                  <FormLabel>{t('taxId')}</FormLabel>
                  <Input defaultValue="123-45-6789" />
                </div>
              </div>
              
              <div>
                <FormLabel>{t('address')}</FormLabel>
                <Input defaultValue="123 Main Street, Anytown, ST 12345" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <FormLabel>{t('phone')}</FormLabel>
                  <Input defaultValue="(555) 123-4567" />
                </div>
                <div>
                  <FormLabel>{t('email')}</FormLabel>
                  <Input defaultValue="contact@acmerentals.com" />
                </div>
                <div>
                  <FormLabel>{t('website')}</FormLabel>
                  <Input defaultValue="www.acmerentals.com" />
                </div>
              </div>
              
              <div>
                <FormLabel>{t('companyLogo')}</FormLabel>
                <div className="mt-1 flex items-center gap-4">
                  <div className="w-24 h-24 rounded border flex items-center justify-center bg-muted">
                    <SettingsIcon className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <Button variant="outline" size="sm">
                    {t('uploadLogo')}
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button>
                  {t('saveCompanyInfo')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Notifications Tab */}
        <TabsContent value="notifications" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('notificationSettings')}</CardTitle>
              <CardDescription>{t('configureNotifications')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">{t('emailNotifications')}</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{t('newContractCreated')}</p>
                      <p className="text-sm text-muted-foreground">{t('notifyNewContracts')}</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{t('contractEnding')}</p>
                      <p className="text-sm text-muted-foreground">{t('notifyContractsEnding')}</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{t('maintenanceAlerts')}</p>
                      <p className="text-sm text-muted-foreground">{t('notifyMaintenance')}</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{t('paymentReceived')}</p>
                      <p className="text-sm text-muted-foreground">{t('notifyPayments')}</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">{t('systemNotifications')}</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{t('lowUtilizationAlert')}</p>
                      <p className="text-sm text-muted-foreground">{t('alertLowUtilization')}</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{t('overdueReturns')}</p>
                      <p className="text-sm text-muted-foreground">{t('alertOverdueReturns')}</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{t('inventoryAlerts')}</p>
                      <p className="text-sm text-muted-foreground">{t('alertLowInventory')}</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button>
                  {t('saveNotificationSettings')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
