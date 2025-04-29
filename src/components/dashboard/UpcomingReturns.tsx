
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { contracts, vehicles, customers } from "@/data/mockData";

interface Return {
  contractId: string;
  vehicleName: string;
  customerName: string;
  returnDate: string;
  daysLeft: number;
}

// Process data from mock data
const upcomingReturns: Return[] = contracts
  .filter(contract => contract.status === 'active')
  .map(contract => {
    const vehicle = vehicles.find(v => v.id === contract.vehicleId);
    const customer = customers.find(c => c.id === contract.customerId);
    const returnDate = new Date(contract.endDate);
    const today = new Date();
    const daysLeft = Math.ceil((returnDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    return {
      contractId: contract.id,
      vehicleName: vehicle ? `${vehicle.make} ${vehicle.model} (${vehicle.licensePlate})` : 'Unknown Vehicle',
      customerName: customer ? `${customer.firstName} ${customer.lastName}` : 'Unknown Customer',
      returnDate: contract.endDate.toLocaleDateString(),
      daysLeft: daysLeft,
    };
  })
  .sort((a, b) => a.daysLeft - b.daysLeft)
  .slice(0, 5);

export function UpcomingReturns({ className }: { className?: string }) {
  const { t } = useLanguage();

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle>{t('upcomingReturns')}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <ScrollArea className="h-[320px]">
          <div className="space-y-4">
            {upcomingReturns.map(item => (
              <div 
                key={item.contractId} 
                className="p-3 rounded-lg border bg-background flex flex-col gap-2"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-sm">{item.vehicleName}</h4>
                    <p className="text-xs text-muted-foreground">{item.customerName}</p>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={
                      item.daysLeft <= 1 ? "bg-red-50 text-red-700 border-red-200" : 
                      item.daysLeft <= 3 ? "bg-amber-50 text-amber-700 border-amber-200" : 
                      "bg-blue-50 text-blue-700 border-blue-200"
                    }
                  >
                    {item.daysLeft === 0 
                      ? "Today" 
                      : item.daysLeft === 1 
                        ? "Tomorrow"
                        : `${item.daysLeft} days`
                    }
                  </Badge>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <div className="text-xs">
                    <span className="text-muted-foreground">Return date: </span>
                    <span className="font-medium">{item.returnDate}</span>
                  </div>
                  <Button variant="ghost" size="sm" className="text-xs h-7">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
            
            {upcomingReturns.length === 0 && (
              <div className="py-8 text-center text-muted-foreground">
                No upcoming returns
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
