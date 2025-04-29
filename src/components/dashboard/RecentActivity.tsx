
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Car, UserCheck, Calendar, FileText } from "lucide-react";

interface Activity {
  id: string;
  type: 'contract' | 'vehicle' | 'customer' | 'maintenance';
  description: string;
  time: string;
}

interface RecentActivityProps {
  activities: Activity[];
  className?: string;
}

// Sample activities
const sampleActivities: Activity[] = [
  {
    id: 'a1',
    type: 'contract',
    description: 'New contract created for John Smith',
    time: '2 hours ago'
  },
  {
    id: 'a2',
    type: 'vehicle',
    description: 'Vehicle ABC-1234 marked as available',
    time: '3 hours ago'
  },
  {
    id: 'a3',
    type: 'maintenance',
    description: 'Scheduled maintenance for XYZ-5678',
    time: '5 hours ago'
  },
  {
    id: 'a4',
    type: 'customer',
    description: 'New customer Jane Doe registered',
    time: '1 day ago'
  },
  {
    id: 'a5',
    type: 'contract',
    description: 'Contract #C1003 completed and returned',
    time: '1 day ago'
  }
];

export function RecentActivity({ activities = sampleActivities, className }: RecentActivityProps) {
  const { t } = useLanguage();

  // Get icon based on activity type
  const getIcon = (type: Activity['type']) => {
    switch (type) {
      case 'contract':
        return <FileText className="h-5 w-5 text-blue-500" />;
      case 'vehicle':
        return <Car className="h-5 w-5 text-green-500" />;
      case 'customer':
        return <UserCheck className="h-5 w-5 text-purple-500" />;
      case 'maintenance':
        return <Calendar className="h-5 w-5 text-amber-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle>{t('recentActivity')}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <ScrollArea className="h-[320px]">
          <div className="space-y-4">
            {activities.map(activity => (
              <div key={activity.id} className="flex items-start gap-3 pb-3 border-b last:border-0">
                <div className="p-1.5 rounded-full bg-muted flex-shrink-0">
                  {getIcon(activity.type)}
                </div>
                <div>
                  <p className="text-sm">{activity.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
