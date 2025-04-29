
import { toast } from "@/hooks/use-toast";

// Define API key storage key
const API_KEY_STORAGE = 'rent-smart-google-sheets-api-key';
const SHEET_ID_STORAGE = 'rent-smart-google-sheets-id';

// Function to save API key to localStorage
export const saveGoogleApiKey = (apiKey: string): void => {
  localStorage.setItem(API_KEY_STORAGE, apiKey);
};

// Function to get API key from localStorage
export const getGoogleApiKey = (): string | null => {
  return localStorage.getItem(API_KEY_STORAGE);
};

// Function to save Sheet ID to localStorage
export const saveSheetId = (sheetId: string): void => {
  localStorage.setItem(SHEET_ID_STORAGE, sheetId);
};

// Function to get Sheet ID from localStorage
export const getSheetId = (): string | null => {
  return localStorage.getItem(SHEET_ID_STORAGE);
};

// Interface for Sheet data
interface SheetData {
  range: string;
  values: any[][];
}

// Function to export data to Google Sheets
export const exportToGoogleSheets = async (data: any[], sheetName: string): Promise<boolean> => {
  const apiKey = getGoogleApiKey();
  const sheetId = getSheetId();
  
  if (!apiKey || !sheetId) {
    toast({
      title: "Configuration Missing",
      description: "Please set your Google Sheets API key and Sheet ID in settings",
      variant: "destructive",
    });
    return false;
  }

  try {
    // First, prepare the headers (column names)
    const headers = Object.keys(data[0]);
    
    // Then prepare the rows with values
    const rows = data.map(item => Object.values(item));
    
    // Combine headers and rows
    const values = [headers, ...rows];
    
    // Clear existing data in the sheet first
    const clearUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}!A1:Z1000:clear`;
    await fetch(clearUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      }
    });
    
    // Now update with new data
    const updateUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}!A1:Z${values.length}?valueInputOption=RAW`;
    const response = await fetch(updateUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values: values,
      }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update Google Sheet');
    }
    
    toast({
      title: "Export Successful",
      description: `Data exported to Google Sheets (${sheetName})`,
    });
    
    return true;
  } catch (error) {
    console.error("Error exporting to Google Sheets:", error);
    toast({
      title: "Export Failed",
      description: "Could not export data to Google Sheets. Check your API key and Sheet ID.",
      variant: "destructive",
    });
    return false;
  }
};

// Function to import data from Google Sheets
export const importFromGoogleSheets = async (sheetName: string): Promise<any[] | null> => {
  const apiKey = getGoogleApiKey();
  const sheetId = getSheetId();
  
  if (!apiKey || !sheetId) {
    toast({
      title: "Configuration Missing",
      description: "Please set your Google Sheets API key and Sheet ID in settings",
      variant: "destructive",
    });
    return null;
  }
  
  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}?key=${apiKey}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Failed to fetch data from Google Sheets');
    }
    
    const data: SheetData = await response.json();
    
    if (!data.values || data.values.length < 2) {
      toast({
        title: "Import Failed",
        description: "No data or insufficient data found in the sheet",
        variant: "destructive",
      });
      return null;
    }
    
    // Extract headers and rows
    const headers = data.values[0];
    const rows = data.values.slice(1);
    
    // Convert rows to objects
    const result = rows.map(row => {
      const obj: Record<string, any> = {};
      headers.forEach((header, index) => {
        let value = row[index] || '';
        // Try to parse numbers and booleans
        if (!isNaN(Number(value)) && value !== '') {
          obj[header] = Number(value);
        } else if (value === 'true' || value === 'false') {
          obj[header] = value === 'true';
        } else {
          obj[header] = value;
        }
      });
      return obj;
    });
    
    toast({
      title: "Import Successful",
      description: `${result.length} records imported from Google Sheets`,
    });
    
    return result;
  } catch (error) {
    console.error("Error importing from Google Sheets:", error);
    toast({
      title: "Import Failed",
      description: "Could not import data from Google Sheets. Check your API key and Sheet ID.",
      variant: "destructive",
    });
    return null;
  }
};
