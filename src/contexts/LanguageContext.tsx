
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'fr' | 'ar';
type Direction = 'ltr' | 'rtl';

interface LanguageContextType {
  language: Language;
  direction: Direction;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    dashboard: 'Dashboard',
    vehicles: 'Vehicles',
    contracts: 'Contracts',
    customers: 'Customers',
    finances: 'Finances',
    reports: 'Reports',
    settings: 'Settings',
    logout: 'Logout',
    available: 'Available',
    rented: 'Rented',
    maintenance: 'Under Maintenance',
    reserved: 'Reserved',
    welcome: 'Welcome to your Fleet Management System',
    fleetSummary: 'Fleet Summary',
    revenueOverview: 'Revenue Overview',
    upcomingReturns: 'Upcoming Returns',
    recentActivity: 'Recent Activity',
    addVehicle: 'Add Vehicle',
    searchPlaceholder: 'Search...',
    totalVehicles: 'Total Vehicles',
    totalRevenue: 'Total Revenue',
    activeContracts: 'Active Contracts',
    utilizationRate: 'Utilization Rate',
    language: 'Language',
  },
  fr: {
    dashboard: 'Tableau de bord',
    vehicles: 'Véhicules',
    contracts: 'Contrats',
    customers: 'Clients',
    finances: 'Finances',
    reports: 'Rapports',
    settings: 'Paramètres',
    logout: 'Déconnexion',
    available: 'Disponible',
    rented: 'Loué',
    maintenance: 'En maintenance',
    reserved: 'Réservé',
    welcome: 'Bienvenue dans votre système de gestion de flotte',
    fleetSummary: 'Résumé de la flotte',
    revenueOverview: 'Aperçu des revenus',
    upcomingReturns: 'Retours à venir',
    recentActivity: 'Activité récente',
    addVehicle: 'Ajouter un véhicule',
    searchPlaceholder: 'Rechercher...',
    totalVehicles: 'Total des véhicules',
    totalRevenue: 'Revenu total',
    activeContracts: 'Contrats actifs',
    utilizationRate: 'Taux d\'utilisation',
    language: 'Langue',
  },
  ar: {
    dashboard: 'لوحة المعلومات',
    vehicles: 'المركبات',
    contracts: 'العقود',
    customers: 'العملاء',
    finances: 'المالية',
    reports: 'التقارير',
    settings: 'الإعدادات',
    logout: 'تسجيل الخروج',
    available: 'متاح',
    rented: 'مؤجر',
    maintenance: 'قيد الصيانة',
    reserved: 'محجوز',
    welcome: 'مرحباً بك في نظام إدارة الأسطول',
    fleetSummary: 'ملخص الأسطول',
    revenueOverview: 'نظرة عامة على الإيرادات',
    upcomingReturns: 'العائدات القادمة',
    recentActivity: 'النشاط الأخير',
    addVehicle: 'إضافة مركبة',
    searchPlaceholder: 'بحث...',
    totalVehicles: 'إجمالي المركبات',
    totalRevenue: 'إجمالي الإيرادات',
    activeContracts: 'العقود النشطة',
    utilizationRate: 'معدل الاستخدام',
    language: 'اللغة',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>('en');
  
  // Set direction based on language
  const direction: Direction = language === 'ar' ? 'rtl' : 'ltr';
  
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.body.className = lang === 'ar' ? 'rtl' : 'ltr';
  };
  
  const t = (key: string): string => {
    return translations[language][key] || key;
  };
  
  return (
    <LanguageContext.Provider value={{ language, direction, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  
  return context;
};
