
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useLanguage } from "@/contexts/LanguageContext";
import { vehicles } from "@/data/mockData";
import { AlertTriangle, MapPin, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MaintenanceAlertsProps {
  className?: string;
}

export function MaintenanceAlerts({ className }: MaintenanceAlertsProps) {
  const { t } = useLanguage();
  
  // Filter vehicles that need maintenance soon (next 14 days) based on nextService
  const vehiclesNeedingMaintenance = vehicles.filter(vehicle => {
    if (!vehicle.nextService?.dueDate) return false;
    
    const nextMaintenanceDate = new Date(vehicle.nextService.dueDate);
    const today = new Date();
    const twoWeeksFromNow = new Date();
    twoWeeksFromNow.setDate(today.getDate() + 14);
    
    // Check if next maintenance is within the next 14 days
    return nextMaintenanceDate <= twoWeeksFromNow && nextMaintenanceDate >= today;
  });

  // Filter vehicles that need oil change based on mileage (every 5000 km)
  const vehiclesNeedingOilChange = vehicles.filter(vehicle => {
    return vehicle.currentMileage % 5000 >= 4500; // Oil change needed when within 500km of 5000km interval
  });
  
  const hasAlerts = vehiclesNeedingMaintenance.length > 0 || vehiclesNeedingOilChange.length > 0;

  if (!hasAlerts) return null;
  
  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle>{t('maintenanceAlerts')}</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px] pr-4">
          <div className="space-y-4">
            {vehiclesNeedingMaintenance.map((vehicle) => (
              <Alert key={`maintenance-${vehicle.id}`} variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle className="flex items-center gap-2">
                  {t('scheduledMaintenance')}
                  <Badge variant="outline" className="ml-2">
                    {new Date(vehicle.nextService.dueDate).toLocaleDateString()}
                  </Badge>
                </AlertTitle>
                <AlertDescription className="pt-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">
                        {vehicle.make} {vehicle.model} ({vehicle.licensePlate})
                      </p>
                      <div className="flex items-center gap-4 mt-1 text-sm">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" /> {vehicle.currentMileage} km
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {vehicle.year}
                        </span>
                      </div>
                    </div>
                    <Button size="sm">
                      {t('scheduleService')}
                    </Button>
                  </div>
                </AlertDescription>
              </Alert>
            ))}
            
            {vehiclesNeedingOilChange.map((vehicle) => (
              <Alert key={`oil-${vehicle.id}`}>
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle className="flex items-center gap-2">
                  {t('oilChangeRequired')}
                  <Badge variant="outline" className="ml-2">
                    {vehicle.currentMileage} km
                  </Badge>
                </AlertTitle>
                <AlertDescription className="pt-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">
                        {vehicle.make} {vehicle.model} ({vehicle.licensePlate})
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {t('oilChangeInterval')}: 5,000 km
                      </p>
                    </div>
                    <Button size="sm" variant="outline">
                      {t('scheduleOilChange')}
                    </Button>
                  </div>
                </AlertDescription>
              </Alert>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
