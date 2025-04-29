// Mock data for testing and development

export const dashboardStats = {
  totalVehicles: 24,
  availableVehicles: 16,
  totalRevenue: 38420,
  activeContracts: 8,
  utilizationRate: 67,
  
  // Revenue data for charts
  monthlyRevenue: [
    { month: 'Jan', revenue: 4200 },
    { month: 'Feb', revenue: 3800 },
    { month: 'Mar', revenue: 5100 },
    { month: 'Apr', revenue: 4800 },
    { month: 'May', revenue: 5600 },
    { month: 'Jun', revenue: 6200 },
  ],
  
  // Vehicle status breakdown
  vehicleStatusBreakdown: [
    { status: 'available', count: 16 },
    { status: 'rented', count: 8 },
    { status: 'maintenance', count: 3 },
    { status: 'reserved', count: 2 },
  ],

  // Sample recent activities
  recentActivities: [
    { 
      id: '1',
      type: 'contract' as const, 
      description: 'New rental contract created for Toyota Camry', 
      time: '2 hours ago' 
    },
    { 
      id: '2', 
      type: 'vehicle' as const, 
      description: 'Chevrolet Cruze returned from maintenance', 
      time: '4 hours ago' 
    },
    { 
      id: '3', 
      type: 'maintenance' as const, 
      description: 'Oil change scheduled for Nissan Altima', 
      time: '6 hours ago' 
    },
    { 
      id: '4', 
      type: 'customer' as const, 
      description: 'New customer John Doe registered', 
      time: '1 day ago' 
    },
  ],

  // Vehicle maintenance alerts
  maintenanceAlerts: [
    {
      id: 'maint1',
      vehicleId: 'v001',
      vehicleName: 'Toyota Camry 2020',
      licensePlate: 'ABC123',
      alertType: 'oil',
      currentMileage: 9800,
      serviceDueMileage: 10000,
      status: 'upcoming',
      dueDate: new Date(2025, 4, 10) // May 10, 2025
    },
    {
      id: 'maint2',
      vehicleId: 'v002',
      vehicleName: 'Honda Civic 2021',
      licensePlate: 'XYZ789',
      alertType: 'tire',
      currentMileage: 20400,
      serviceDueMileage: 20000,
      status: 'overdue',
      dueDate: new Date(2025, 4, 2) // May 2, 2025
    },
    {
      id: 'maint3',
      vehicleId: 'v003',
      vehicleName: 'Ford Escape 2019',
      licensePlate: 'LMN456',
      alertType: 'brake',
      currentMileage: 15200,
      serviceDueMileage: 15000,
      status: 'overdue',
      dueDate: new Date(2025, 4, 5) // May 5, 2025
    }
  ]
};

// Define types for our models
export type VehicleStatus = 'available' | 'rented' | 'maintenance' | 'reserved' | 'sold';
export type ActivityType = 'maintenance' | 'contract' | 'vehicle' | 'customer';

export interface Activity {
  id: string;
  type: ActivityType;
  description: string;
  time: string;
}

export type MaintenanceAlertType = 'oil' | 'tire' | 'brake' | 'general' | 'inspection';
export type MaintenanceAlertStatus = 'upcoming' | 'overdue' | 'scheduled';

export interface MaintenanceAlert {
  id: string;
  vehicleId: string;
  vehicleName: string;
  licensePlate: string;
  alertType: MaintenanceAlertType;
  currentMileage: number;
  serviceDueMileage: number;
  status: MaintenanceAlertStatus;
  dueDate: Date;
}

export interface MaintenanceRecord {
  id: string;
  type: string;
  description: string;
  date: Date;
  mileage: number;
  cost: number;
  provider: string;
}

export interface Document {
  id: string;
  name: string;
  url: string;
  type: string;
}

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  vin: string;
  status: VehicleStatus;
  currentMileage: number;
  purchaseDate: Date;
  purchasePrice: number;
  currentValue: number;
  dailyRate: number;
  weeklyRate: number;
  monthlyRate: number;
  fuelType: string;
  transmission: string;
  category: string;
  seats: number;
  color: string;
  photos: string[];
  documents: Document[];
  maintenanceHistory: MaintenanceRecord[];
  nextService: {
    type: string;
    dueMileage: number;
    dueDate: Date;
  };
}

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  licenseNumber: string;
  licenseState: string;
  licenseExpiry: Date;
  dateOfBirth: Date;
  joinDate: Date;
  status: string;
  documents: Document[];
  notes: string;
  rentalHistory: RentalHistoryItem[];
}

export interface RentalHistoryItem {
  id: string;
  vehicleId: string;
  contractId: string;
  startDate: Date;
  endDate: Date;
  returned: boolean;
  onTime: boolean | null;
  condition: string | null;
}

export interface Contract {
  id: string;
  customerId: string;
  vehicleId: string;
  startDate: Date;
  endDate: Date;
  status: string;
  baseRate: number;
  dailyRate: number;
  daysRented: number;
  subtotal: number;
  taxes: number;
  fees: number;
  discounts: number;
  totalAmount: number;
  depositAmount: number;
  depositReturned: boolean;
  paymentMethod: string;
  paymentStatus: string;
  mileageOut: number;
  mileageIn: number | null;
  fuelOut: string;
  fuelIn: string | null;
  notes: string;
  documents: Document[];
}

export interface FinancialTransaction {
  id: string;
  date: Date;
  amount: number;
  type: string;
  description: string;
  vehicleId: string | null;
  recorded_by: string;
}

export interface Income extends FinancialTransaction {
  contractId: string;
  customerId: string;
  paymentMethod: string;
  category: string;
}

export interface Expense extends FinancialTransaction {
  vendor: string;
  receiptUrl: string;
  category: string;
  isRecurring: boolean;
  recurringFrequency?: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  lastLogin: Date;
  status: string;
}

// Vehicle mock data
export const vehicles: Vehicle[] = [
  {
    id: 'v001',
    make: 'Toyota',
    model: 'Camry',
    year: 2020,
    licensePlate: 'ABC123',
    vin: '1HGCM82633A123456',
    status: 'available',
    currentMileage: 9800,
    purchaseDate: new Date(2019, 11, 15),
    purchasePrice: 28000,
    currentValue: 22400,
    dailyRate: 65,
    weeklyRate: 390,
    monthlyRate: 1500,
    fuelType: 'gasoline',
    transmission: 'automatic',
    category: 'sedan',
    seats: 5,
    color: 'silver',
    photos: ['/vehicles/camry-1.jpg', '/vehicles/camry-2.jpg'],
    documents: [
      { id: 'd001', name: 'Registration', url: '/documents/camry-reg.pdf', type: 'registration' },
      { id: 'd002', name: 'Insurance', url: '/documents/camry-ins.pdf', type: 'insurance' }
    ],
    maintenanceHistory: [
      {
        id: 'mh001',
        type: 'oil',
        description: 'Oil and filter change',
        date: new Date(2025, 1, 15),
        mileage: 7500,
        cost: 45,
        provider: 'QuickLube Service'
      },
      {
        id: 'mh002',
        type: 'tire',
        description: 'Tire rotation',
        date: new Date(2025, 3, 10),
        mileage: 9000,
        cost: 30,
        provider: 'City Tire Shop'
      }
    ],
    nextService: {
      type: 'oil',
      dueMileage: 10000,
      dueDate: new Date(2025, 4, 10)
    }
  },
  {
    id: 'v002',
    make: 'Honda',
    model: 'Civic',
    year: 2021,
    licensePlate: 'XYZ789',
    vin: '2HGES16536H123456',
    status: 'rented',
    currentMileage: 20400,
    purchaseDate: new Date(2020, 9, 5),
    purchasePrice: 23000,
    currentValue: 19550,
    dailyRate: 55,
    weeklyRate: 330,
    monthlyRate: 1300,
    fuelType: 'gasoline',
    transmission: 'automatic',
    category: 'compact',
    seats: 5,
    color: 'blue',
    photos: ['/vehicles/civic-1.jpg', '/vehicles/civic-2.jpg'],
    documents: [
      { id: 'd003', name: 'Registration', url: '/documents/civic-reg.pdf', type: 'registration' },
      { id: 'd004', name: 'Insurance', url: '/documents/civic-ins.pdf', type: 'insurance' }
    ],
    maintenanceHistory: [
      {
        id: 'mh003',
        type: 'oil',
        description: 'Oil and filter change',
        date: new Date(2025, 2, 5),
        mileage: 17500,
        cost: 45,
        provider: 'Honda Dealership'
      }
    ],
    nextService: {
      type: 'tire',
      dueMileage: 20000,
      dueDate: new Date(2025, 4, 2)
    }
  },
  {
    id: 'v003',
    make: 'Ford',
    model: 'Escape',
    year: 2019,
    licensePlate: 'LMN456',
    vin: '1FMCU0F70DUB12345',
    status: 'maintenance',
    currentMileage: 15200,
    purchaseDate: new Date(2018, 7, 22),
    purchasePrice: 31000,
    currentValue: 18600,
    dailyRate: 75,
    weeklyRate: 450,
    monthlyRate: 1700,
    fuelType: 'hybrid',
    transmission: 'automatic',
    category: 'suv',
    seats: 5,
    color: 'red',
    photos: ['/vehicles/escape-1.jpg', '/vehicles/escape-2.jpg'],
    documents: [
      { id: 'd005', name: 'Registration', url: '/documents/escape-reg.pdf', type: 'registration' },
      { id: 'd006', name: 'Insurance', url: '/documents/escape-ins.pdf', type: 'insurance' }
    ],
    maintenanceHistory: [
      {
        id: 'mh004',
        type: 'oil',
        description: 'Oil and filter change',
        date: new Date(2025, 1, 10),
        mileage: 12000,
        cost: 55,
        provider: 'Ford Dealership'
      }
    ],
    nextService: {
      type: 'brake',
      dueMileage: 15000,
      dueDate: new Date(2025, 4, 5)
    }
  }
];

// Customer mock data
export const customers = [
  {
    id: 'c001',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '555-123-4567',
    address: '123 Main St, Anytown, ST 12345',
    licenseNumber: 'DL1234567',
    licenseState: 'CA',
    licenseExpiry: new Date(2026, 6, 15),
    dateOfBirth: new Date(1985, 5, 12),
    joinDate: new Date(2023, 1, 10),
    status: 'active',
    documents: [
      { id: 'cd001', name: 'Driver License', url: '/documents/john-dl.pdf', type: 'license' },
      { id: 'cd002', name: 'Insurance Card', url: '/documents/john-insurance.pdf', type: 'insurance' }
    ],
    notes: 'Preferred customer, always returns vehicles on time.',
    rentalHistory: [
      {
        id: 'r001',
        vehicleId: 'v001',
        contractId: 'co001',
        startDate: new Date(2024, 1, 5),
        endDate: new Date(2024, 1, 8),
        returned: true,
        onTime: true,
        condition: 'good'
      }
    ]
  },
  {
    id: 'c002',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    phone: '555-987-6543',
    address: '456 Oak Ave, Othertown, ST 67890',
    licenseNumber: 'DL7654321',
    licenseState: 'NY',
    licenseExpiry: new Date(2025, 9, 20),
    dateOfBirth: new Date(1990, 8, 23),
    joinDate: new Date(2023, 4, 15),
    status: 'active',
    documents: [
      { id: 'cd003', name: 'Driver License', url: '/documents/jane-dl.pdf', type: 'license' }
    ],
    notes: 'Corporate account client',
    rentalHistory: [
      {
        id: 'r002',
        vehicleId: 'v002',
        contractId: 'co002',
        startDate: new Date(2025, 3, 10),
        endDate: new Date(2025, 3, 20),
        returned: false,
        onTime: null,
        condition: null
      }
    ]
  }
];

// Contract mock data
export const contracts = [
  {
    id: 'co001',
    customerId: 'c001',
    vehicleId: 'v001',
    startDate: new Date(2024, 1, 5),
    endDate: new Date(2024, 1, 8),
    status: 'completed',
    baseRate: 65,
    dailyRate: 65,
    daysRented: 3,
    subtotal: 195,
    taxes: 15.60,
    fees: 25,
    discounts: 0,
    totalAmount: 235.60,
    depositAmount: 200,
    depositReturned: true,
    paymentMethod: 'credit',
    paymentStatus: 'paid',
    mileageOut: 9500,
    mileageIn: 9800,
    fuelOut: 'full',
    fuelIn: 'full',
    notes: 'Vehicle returned in good condition',
    documents: [
      { id: 'cod001', name: 'Rental Agreement', url: '/contracts/co001-agreement.pdf', type: 'agreement' },
      { id: 'cod002', name: 'Vehicle Inspection', url: '/contracts/co001-inspection.pdf', type: 'inspection' }
    ]
  },
  {
    id: 'co002',
    customerId: 'c002',
    vehicleId: 'v002',
    startDate: new Date(2025, 3, 10),
    endDate: new Date(2025, 3, 20),
    status: 'active',
    baseRate: 55,
    dailyRate: 55,
    daysRented: 10,
    subtotal: 550,
    taxes: 44,
    fees: 35,
    discounts: 50,
    totalAmount: 579,
    depositAmount: 300,
    depositReturned: false,
    paymentMethod: 'credit',
    paymentStatus: 'paid',
    mileageOut: 20000,
    mileageIn: null,
    fuelOut: 'full',
    fuelIn: null,
    notes: 'Corporate rental',
    documents: [
      { id: 'cod003', name: 'Rental Agreement', url: '/contracts/co002-agreement.pdf', type: 'agreement' }
    ]
  }
];

// Financial transactions mock data
export const finances = {
  income: [
    {
      id: 'i001',
      date: new Date(2025, 1, 8),
      amount: 235.60,
      type: 'rental',
      description: 'Payment for contract #CO001',
      contractId: 'co001',
      vehicleId: 'v001',
      customerId: 'c001',
      paymentMethod: 'credit',
      category: 'rental_fee',
      recorded_by: 'user1'
    },
    {
      id: 'i002',
      date: new Date(2025, 3, 10),
      amount: 579,
      type: 'rental',
      description: 'Payment for contract #CO002',
      contractId: 'co002',
      vehicleId: 'v002',
      customerId: 'c002',
      paymentMethod: 'credit',
      category: 'rental_fee',
      recorded_by: 'user1'
    }
  ],
  expenses: [
    {
      id: 'e001',
      date: new Date(2025, 1, 15),
      amount: 45,
      type: 'maintenance',
      description: 'Oil change for Toyota Camry',
      vehicleId: 'v001',
      vendor: 'QuickLube Service',
      receiptUrl: '/expenses/e001-receipt.pdf',
      category: 'maintenance',
      isRecurring: false,
      recorded_by: 'user1'
    },
    {
      id: 'e002',
      date: new Date(2025, 3, 1),
      amount: 1200,
      type: 'insurance',
      description: 'Monthly fleet insurance payment',
      vehicleId: null, // General expense, not tied to specific vehicle
      vendor: 'ABC Insurance',
      receiptUrl: '/expenses/e002-receipt.pdf',
      category: 'insurance',
      isRecurring: true,
      recurringFrequency: 'monthly',
      recorded_by: 'user1'
    }
  ],
  summary: {
    currentMonth: {
      totalIncome: 579,
      totalExpenses: 1200,
      netProfit: -621
    },
    previousMonth: {
      totalIncome: 235.60,
      totalExpenses: 45,
      netProfit: 190.60
    },
    yearToDate: {
      totalIncome: 814.60,
      totalExpenses: 1245,
      netProfit: -430.40
    }
  }
};

// Users mock data
export const users = [
  {
    id: 'user1',
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@example.com',
    role: 'admin',
    lastLogin: new Date(2025, 3, 29, 8, 30),
    status: 'active'
  },
  {
    id: 'user2',
    firstName: 'Manager',
    lastName: 'User',
    email: 'manager@example.com',
    role: 'manager',
    lastLogin: new Date(2025, 3, 28, 17, 15),
    status: 'active'
  },
  {
    id: 'user3',
    firstName: 'Agent',
    lastName: 'User',
    email: 'agent@example.com',
    role: 'agent',
    lastLogin: new Date(2025, 3, 29, 10, 45),
    status: 'active'
  }
];
