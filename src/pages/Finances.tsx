
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { finances, vehicles } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useForm } from 'react-hook-form';
import { Plus, DollarSign, Search, TrendingUp, TrendingDown } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Finances() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddIncomeOpen, setIsAddIncomeOpen] = useState(false);
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);

  const form = useForm();

  const filteredIncome = finances.income.filter(item => 
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredExpenses = finances.expenses.filter(item => 
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleAddIncome = () => {
    toast({
      title: "Feature in development",
      description: "Income recording functionality will be available in the next update.",
    });
    setIsAddIncomeOpen(false);
  };

  const handleAddExpense = () => {
    toast({
      title: "Feature in development",
      description: "Expense recording functionality will be available in the next update.",
    });
    setIsAddExpenseOpen(false);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString();
  };

  const formatCurrency = (amount: number) => {
    return `$${amount.toFixed(2)}`;
  };

  // Create monthly financial data for the chart
  const chartData = [
    { month: 'Jan', income: 3200, expenses: 2800 },
    { month: 'Feb', income: 4100, expenses: 3200 },
    { month: 'Mar', income: 3800, expenses: 3100 },
    { month: 'Apr', income: 4300, expenses: 3600 },
    { month: 'May', income: finances.summary.previousMonth.totalIncome, expenses: finances.summary.previousMonth.totalExpenses },
    { month: 'Jun', income: finances.summary.currentMonth.totalIncome, expenses: finances.summary.currentMonth.totalExpenses },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">{t('finances')}</h1>
          <p className="text-muted-foreground mt-1">
            {t('manageFinances')}
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isAddIncomeOpen} onOpenChange={setIsAddIncomeOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <TrendingUp className="mr-1" size={16} />
                {t('recordIncome')}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>{t('recordNewIncome')}</DialogTitle>
                <DialogDescription>
                  {t('enterIncomeDetails')}
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleAddIncome)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('amount')}</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.01" placeholder="0.00" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('date')}</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('category')}</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder={t('selectCategory')} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="rental_fee">{t('rentalFee')}</SelectItem>
                              <SelectItem value="deposit">{t('deposit')}</SelectItem>
                              <SelectItem value="late_fee">{t('lateFee')}</SelectItem>
                              <SelectItem value="sale">{t('vehicleSale')}</SelectItem>
                              <SelectItem value="other">{t('other')}</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('description')}</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <DialogFooter>
                    <Button type="submit">{t('recordIncome')}</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
          
          <Dialog open={isAddExpenseOpen} onOpenChange={setIsAddExpenseOpen}>
            <DialogTrigger asChild>
              <Button>
                <TrendingDown className="mr-1" size={16} />
                {t('recordExpense')}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>{t('recordNewExpense')}</DialogTitle>
                <DialogDescription>
                  {t('enterExpenseDetails')}
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleAddExpense)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('amount')}</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.01" placeholder="0.00" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('date')}</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('category')}</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder={t('selectCategory')} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="maintenance">{t('maintenance')}</SelectItem>
                              <SelectItem value="insurance">{t('insurance')}</SelectItem>
                              <SelectItem value="fuel">{t('fuel')}</SelectItem>
                              <SelectItem value="parking">{t('parking')}</SelectItem>
                              <SelectItem value="salary">{t('salary')}</SelectItem>
                              <SelectItem value="other">{t('other')}</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="vehicle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('associatedVehicle')}</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={t('selectVehicle')} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="none">{t('none')}</SelectItem>
                            {vehicles.map(vehicle => (
                              <SelectItem key={vehicle.id} value={vehicle.id}>
                                {vehicle.year} {vehicle.make} {vehicle.model} ({vehicle.licensePlate})
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
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('description')}</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <DialogFooter>
                    <Button type="submit">{t('recordExpense')}</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{t('currentMonthSummary')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">{t('income')}:</span>
                <span className="font-medium text-green-600">
                  {formatCurrency(finances.summary.currentMonth.totalIncome)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">{t('expenses')}:</span>
                <span className="font-medium text-red-600">
                  {formatCurrency(finances.summary.currentMonth.totalExpenses)}
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t">
                <span className="font-medium">{t('netProfit')}:</span>
                <span className={`font-bold ${finances.summary.currentMonth.netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(finances.summary.currentMonth.netProfit)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{t('previousMonthSummary')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">{t('income')}:</span>
                <span className="font-medium text-green-600">
                  {formatCurrency(finances.summary.previousMonth.totalIncome)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">{t('expenses')}:</span>
                <span className="font-medium text-red-600">
                  {formatCurrency(finances.summary.previousMonth.totalExpenses)}
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t">
                <span className="font-medium">{t('netProfit')}:</span>
                <span className={`font-bold ${finances.summary.previousMonth.netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(finances.summary.previousMonth.netProfit)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{t('yearToDateSummary')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">{t('income')}:</span>
                <span className="font-medium text-green-600">
                  {formatCurrency(finances.summary.yearToDate.totalIncome)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">{t('expenses')}:</span>
                <span className="font-medium text-red-600">
                  {formatCurrency(finances.summary.yearToDate.totalExpenses)}
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t">
                <span className="font-medium">{t('netProfit')}:</span>
                <span className={`font-bold ${finances.summary.yearToDate.netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(finances.summary.yearToDate.netProfit)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('financialOverview')}</CardTitle>
          <CardDescription>{t('monthlyIncomeExpenses')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
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
                <Line type="monotone" dataKey="income" stroke="#10b981" name={t('income')} />
                <Line type="monotone" dataKey="expenses" stroke="#ef4444" name={t('expenses')} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>{t('transactionHistory')}</CardTitle>
          <div className="flex items-center mt-2">
            <Search className="absolute ml-2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder={t('searchTransactions')}
              value={searchTerm}
              onChange={handleSearch}
              className="pl-8"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">{t('all')}</TabsTrigger>
              <TabsTrigger value="income">{t('income')}</TabsTrigger>
              <TabsTrigger value="expenses">{t('expenses')}</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <div className="rounded-md border mt-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('date')}</TableHead>
                      <TableHead>{t('description')}</TableHead>
                      <TableHead>{t('category')}</TableHead>
                      <TableHead>{t('amount')}</TableHead>
                      <TableHead>{t('type')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[...filteredIncome, ...filteredExpenses]
                      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                      .map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell>{formatDate(transaction.date)}</TableCell>
                          <TableCell className="font-medium">{transaction.description}</TableCell>
                          <TableCell>{transaction.category}</TableCell>
                          <TableCell className={transaction.type === 'rental' ? 'text-green-600' : 'text-red-600'}>
                            {transaction.type === 'rental' ? '+' : '-'}{formatCurrency(transaction.amount)}
                          </TableCell>
                          <TableCell>{t(transaction.type)}</TableCell>
                        </TableRow>
                      ))
                    }
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="income">
              <div className="rounded-md border mt-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('date')}</TableHead>
                      <TableHead>{t('description')}</TableHead>
                      <TableHead>{t('category')}</TableHead>
                      <TableHead>{t('amount')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredIncome
                      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                      .map((income) => (
                        <TableRow key={income.id}>
                          <TableCell>{formatDate(income.date)}</TableCell>
                          <TableCell className="font-medium">{income.description}</TableCell>
                          <TableCell>{income.category}</TableCell>
                          <TableCell className="text-green-600">
                            +{formatCurrency(income.amount)}
                          </TableCell>
                        </TableRow>
                      ))
                    }
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="expenses">
              <div className="rounded-md border mt-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('date')}</TableHead>
                      <TableHead>{t('description')}</TableHead>
                      <TableHead>{t('category')}</TableHead>
                      <TableHead>{t('amount')}</TableHead>
                      <TableHead>{t('vendor')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredExpenses
                      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                      .map((expense) => (
                        <TableRow key={expense.id}>
                          <TableCell>{formatDate(expense.date)}</TableCell>
                          <TableCell className="font-medium">{expense.description}</TableCell>
                          <TableCell>{expense.category}</TableCell>
                          <TableCell className="text-red-600">
                            -{formatCurrency(expense.amount)}
                          </TableCell>
                          <TableCell>{expense.vendor}</TableCell>
                        </TableRow>
                      ))
                    }
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
