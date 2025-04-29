
import { vehicles, customers, contracts } from '@/data/mockData';

// Local storage keys
const STORAGE_KEYS = {
  VEHICLES: 'rent-smart-vehicles',
  CUSTOMERS: 'rent-smart-customers',
  CONTRACTS: 'rent-smart-contracts',
  USER_SETTINGS: 'rent-smart-user-settings',
};

// Initialize local storage with data if it doesn't exist
export const initLocalStorage = () => {
  if (!localStorage.getItem(STORAGE_KEYS.VEHICLES)) {
    localStorage.setItem(STORAGE_KEYS.VEHICLES, JSON.stringify(vehicles));
  }
  
  if (!localStorage.getItem(STORAGE_KEYS.CUSTOMERS)) {
    localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(customers));
  }
  
  if (!localStorage.getItem(STORAGE_KEYS.CONTRACTS)) {
    localStorage.setItem(STORAGE_KEYS.CONTRACTS, JSON.stringify(
      contracts.map(contract => ({
        ...contract,
        startDate: contract.startDate.toISOString(),
        endDate: contract.endDate.toISOString(),
        createdAt: contract.createdAt.toISOString()
      }))
    ));
  }
};

// Get data from local storage
export const getLocalData = (key: keyof typeof STORAGE_KEYS) => {
  const data = localStorage.getItem(STORAGE_KEYS[key]);
  return data ? JSON.parse(data) : null;
};

// Save data to local storage
export const saveLocalData = (key: keyof typeof STORAGE_KEYS, data: any) => {
  localStorage.setItem(STORAGE_KEYS[key], JSON.stringify(data));
};

// Export/Download data as Excel (CSV format)
export const exportToCSV = (key: keyof typeof STORAGE_KEYS) => {
  const data = getLocalData(key);
  if (!data || data.length === 0) return;

  // Convert data to CSV format
  const headers = Object.keys(data[0]).join(',');
  const rows = data.map((item: any) => 
    Object.values(item).map(value => 
      typeof value === 'string' ? `"${value}"` : value
    ).join(',')
  ).join('\n');
  const csvContent = `${headers}\n${rows}`;

  // Create a blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${key}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Import data from CSV file
export const importFromCSV = async (key: keyof typeof STORAGE_KEYS, file: File): Promise<boolean> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        const csvData = event.target?.result as string;
        const lines = csvData.split('\n');
        const headers = lines[0].split(',');
        
        const result = [];
        for (let i = 1; i < lines.length; i++) {
          if (!lines[i].trim()) continue;
          
          const obj: Record<string, any> = {};
          const currentLine = lines[i].split(',');
          
          for (let j = 0; j < headers.length; j++) {
            let value = currentLine[j];
            // Remove quotes if present
            if (value.startsWith('"') && value.endsWith('"')) {
              value = value.substring(1, value.length - 1);
            }
            // Try to parse numbers and booleans
            if (!isNaN(Number(value))) {
              obj[headers[j]] = Number(value);
            } else if (value === 'true' || value === 'false') {
              obj[headers[j]] = value === 'true';
            } else {
              obj[headers[j]] = value;
            }
          }
          result.push(obj);
        }
        
        saveLocalData(key, result);
        resolve(true);
      } catch (error) {
        console.error("Failed to import CSV:", error);
        resolve(false);
      }
    };
    
    reader.readAsText(file);
  });
};
