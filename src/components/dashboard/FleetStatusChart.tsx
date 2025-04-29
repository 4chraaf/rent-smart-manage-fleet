
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface StatusData {
  status: string;
  count: number;
}

interface FleetStatusChartProps {
  data: StatusData[];
  className?: string;
}

// Status colors
const COLORS = {
  available: '#10b981', // green
  rented: '#f59e0b',    // amber
  maintenance: '#ef4444', // red
  reserved: '#6366f1',   // indigo
};

export function FleetStatusChart({ data, className }: FleetStatusChartProps) {
  const { t } = useLanguage();
  
  // Translate statuses
  const translatedData = data.map(item => ({
    ...item,
    statusTranslated: t(item.status)
  }));
  
  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle>{t('fleetSummary')}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={translatedData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              innerRadius={50}
              fill="#8884d8"
              dataKey="count"
              nameKey="statusTranslated"
            >
              {translatedData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[entry.status as keyof typeof COLORS]} 
                />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value, name) => [value, name]}
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
              }}
            />
            <Legend 
              layout="horizontal" 
              verticalAlign="bottom" 
              align="center" 
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
