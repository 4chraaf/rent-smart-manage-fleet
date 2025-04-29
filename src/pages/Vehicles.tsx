
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { vehicles, Vehicle } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function Vehicles() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [vehiclesList, setVehiclesList] = useState<Vehicle[]>(vehicles);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  const form = useForm();

  const filteredVehicles = vehiclesList.filter(vehicle => 
    vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.licensePlate.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleAddVehicle = () => {
    // In a real app, this would create a vehicle in the database
    toast({
      title: "Feature in development",
      description: "Vehicle creation functionality will be available in the next update.",
    });
    setIsAddDialogOpen(false);
  };

  const handleEditVehicle = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setIsEditDialogOpen(true);
  };

  const handleUpdateVehicle = () => {
    // In a real app, this would update the vehicle in the database
    toast({
      title: "Feature in development",
      description: "Vehicle update functionality will be available in the next update.",
    });
    setIsEditDialogOpen(false);
  };

  const handleDeleteVehicle = (vehicleId: string) => {
    // In a real app, this would delete from the database
    const updatedList = vehiclesList.filter(v => v.id !== vehicleId);
    setVehiclesList(updatedList);
    
    toast({
      title: "Vehicle deleted",
      description: "The vehicle has been removed successfully.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'rented': return 'bg-blue-100 text-blue-800';
      case 'maintenance': return 'bg-orange-100 text-orange-800';
      case 'reserved': return 'bg-purple-100 text-purple-800';
      case 'sold': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">{t('vehicles')}</h1>
          <p className="text-muted-foreground mt-1">
            {t('manageYourFleet')}
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-1" size={16} />
              {t('addVehicle')}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>{t('addNewVehicle')}</DialogTitle>
              <DialogDescription>
                {t('enterVehicleDetails')}
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleAddVehicle)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="make"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('make')}</FormLabel>
                        <FormControl>
                          <Input placeholder="Toyota" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="model"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('model')}</FormLabel>
                        <FormControl>
                          <Input placeholder="Camry" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('year')}</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="2022" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="licensePlate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('licensePlate')}</FormLabel>
                        <FormControl>
                          <Input placeholder="ABC123" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="vin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('vinNumber')}</FormLabel>
                      <FormControl>
                        <Input placeholder="1HGCM82633A123456" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="dailyRate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('dailyRate')}</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="65" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="currentMileage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('currentMileage')}</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="5000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <DialogFooter>
                  <Button type="submit">{t('addVehicle')}</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        {/* Edit Vehicle Dialog */}
        {selectedVehicle && (
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>{t('editVehicle')}</DialogTitle>
                <DialogDescription>
                  {t('updateVehicleDetails')}
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleUpdateVehicle)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="make"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t('make')}</FormLabel>
                            <FormControl>
                              <Input defaultValue={selectedVehicle.make} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="model"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t('model')}</FormLabel>
                            <FormControl>
                              <Input defaultValue={selectedVehicle.model} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <DialogFooter>
                      <Button type="submit">{t('updateVehicle')}</Button>
                    </DialogFooter>
                  </form>
                </Form>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </header>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>{t('fleetInventory')}</CardTitle>
          <div className="flex items-center mt-2">
            <Search className="absolute ml-2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder={t('searchVehicles')}
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
                  <TableHead>{t('vehicle')}</TableHead>
                  <TableHead>{t('licensePlate')}</TableHead>
                  <TableHead>{t('status')}</TableHead>
                  <TableHead>{t('mileage')}</TableHead>
                  <TableHead>{t('dailyRate')}</TableHead>
                  <TableHead className="text-right">{t('actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVehicles.map((vehicle) => (
                  <TableRow key={vehicle.id}>
                    <TableCell className="font-medium">
                      {vehicle.year} {vehicle.make} {vehicle.model}
                    </TableCell>
                    <TableCell>{vehicle.licensePlate}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(vehicle.status)}>
                        {t(vehicle.status)}
                      </Badge>
                    </TableCell>
                    <TableCell>{vehicle.currentMileage.toLocaleString()}</TableCell>
                    <TableCell>${vehicle.dailyRate}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleEditVehicle(vehicle)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleDeleteVehicle(vehicle.id)}
                        >
                          <Trash2 className="h-4 w-4" />
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
