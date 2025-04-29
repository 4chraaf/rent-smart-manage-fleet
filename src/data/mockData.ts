export interface Vehicle {
  id: string;
  licensePlate: string;
  make: string;
  model: string;
  year: number;
  color: string;
  status: 'available' | 'rented' | 'maintenance' | 'reserved';
  fuelType: 'petrol' | 'diesel' | 'electric' | 'hybrid';
  transmission: 'manual' | 'automatic';
  mileage: number;
  dailyRate: number;
  image?: string;
  vin?: string;
  lastMaintenance?: string;
  nextMaintenance?: string;
  documents?: Document[];
  rentalHistory?: RentalHistory[];
}

export interface Document {
  id: string;
  name: string;
  type: 'insurance' | 'registration' | 'maintenance' | 'other';
  url: string;
  uploadDate: string;
  expiryDate?: string;
}

export interface RentalHistory {
  id: string;
  contractId: string;
  customerId: string;
  customerName: string;
  startDate: string;
  endDate: string;
  totalAmount: number;
  status: 'active' | 'completed' | 'cancelled';
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  licenseNumber: string;
  licenseExpiry: string;
  nationality: string;
  isBlacklisted: boolean;
  blacklistReason?: string;
  rentalCount: number;
  totalSpent: number;
  createdAt: string;
  avatar?: string;
}

export interface Contract {
  id: string;
  vehicleId: string;
  customerId: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'scheduled' | 'completed' | 'overdue';
  rentalAmount: number;
  deposit: number;
  isPaid: boolean;
  notes?: string;
  createdAt: string;
  createdBy: string;
}

// Sample vehicle data
export const vehicles: Vehicle[] = [
  {
    id: '1',
    licensePlate: 'ABC-1234',
    make: 'Toyota',
    model: 'Camry',
    year: 2022,
    color: 'Silver',
    status: 'available',
    fuelType: 'petrol',
    transmission: 'automatic',
    mileage: 15000,
    dailyRate: 75,
    image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80',
    vin: '1HGCM82633A123456',
    lastMaintenance: '2023-01-15',
    nextMaintenance: '2023-06-02', // Soon!
    documents: [
      { id: 'd1', name: 'Insurance Policy', type: 'insurance', url: '#', uploadDate: '2023-01-01', expiryDate: '2023-12-31' },
      { id: 'd2', name: 'Vehicle Registration', type: 'registration', url: '#', uploadDate: '2023-01-01', expiryDate: '2024-01-01' }
    ]
  },
  {
    id: '2',
    licensePlate: 'XYZ-5678',
    make: 'Honda',
    model: 'Accord',
    year: 2021,
    color: 'Black',
    status: 'rented',
    fuelType: 'petrol',
    transmission: 'automatic',
    mileage: 24500, // Close to 25000, needs oil change
    dailyRate: 70,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80',
    vin: '1HGCR2631GA123456',
    lastMaintenance: '2023-02-10',
    nextMaintenance: '2023-08-10',
    documents: [
      { id: 'd3', name: 'Insurance Policy', type: 'insurance', url: '#', uploadDate: '2023-01-15', expiryDate: '2023-12-31' },
      { id: 'd4', name: 'Vehicle Registration', type: 'registration', url: '#', uploadDate: '2023-01-15', expiryDate: '2024-01-15' }
    ]
  },
  {
    id: '3',
    licensePlate: 'DEF-9012',
    make: 'Nissan',
    model: 'Altima',
    year: 2020,
    color: 'White',
    status: 'maintenance',
    fuelType: 'petrol',
    transmission: 'automatic',
    mileage: 35000,
    dailyRate: 65,
    image: 'https://images.unsplash.com/photo-1549275301-c9d60941dc72?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80',
    vin: '1N4BL4EV5KC123456',
    lastMaintenance: '2023-03-05',
    nextMaintenance: '2023-09-05',
    documents: [
      { id: 'd5', name: 'Insurance Policy', type: 'insurance', url: '#', uploadDate: '2023-01-20', expiryDate: '2023-12-31' },
      { id: 'd6', name: 'Maintenance Record', type: 'maintenance', url: '#', uploadDate: '2023-03-05' }
    ]
  },
  {
    id: '4',
    licensePlate: 'GHI-3456',
    make: 'Ford',
    model: 'Fusion',
    year: 2022,
    color: 'Blue',
    status: 'reserved',
    fuelType: 'hybrid',
    transmission: 'automatic',
    mileage: 18000,
    dailyRate: 80,
    image: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80',
    vin: '3FA6P0G72KR123456',
    lastMaintenance: '2023-02-20',
    nextMaintenance: '2023-08-20',
    documents: [
      { id: 'd7', name: 'Insurance Policy', type: 'insurance', url: '#', uploadDate: '2023-01-10', expiryDate: '2023-12-31' },
      { id: 'd8', name: 'Vehicle Registration', type: 'registration', url: '#', uploadDate: '2023-01-10', expiryDate: '2024-01-10' }
    ]
  },
  {
    id: '5',
    licensePlate: 'JKL-7890',
    make: 'Chevrolet',
    model: 'Malibu',
    year: 2021,
    color: 'Red',
    status: 'available',
    fuelType: 'petrol',
    transmission: 'automatic',
    mileage: 25000,
    dailyRate: 68,
    image: 'https://images.unsplash.com/photo-1612911912304-5c9014ecbd48?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80',
    vin: '1G1ZD5ST3JF123456',
    lastMaintenance: '2023-03-15',
    nextMaintenance: '2023-09-15',
    documents: [
      { id: 'd9', name: 'Insurance Policy', type: 'insurance', url: '#', uploadDate: '2023-01-05', expiryDate: '2023-12-31' },
      { id: 'd10', name: 'Vehicle Registration', type: 'registration', url: '#', uploadDate: '2023-01-05', expiryDate: '2024-01-05' }
    ]
  }
];

// Sample customer data
export const customers: Customer[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '+1234567890',
    address: '123 Main St, Anytown, USA',
    licenseNumber: 'DL123456789',
    licenseExpiry: '2025-06-30',
    nationality: 'USA',
    isBlacklisted: false,
    rentalCount: 5,
    totalSpent: 1850,
    createdAt: '2022-10-15',
    avatar: 'https://randomuser.me/api/portraits/men/42.jpg'
  },
  {
    id: '2',
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    phone: '+1987654321',
    address: '456 Elm St, Somewhere, USA',
    licenseNumber: 'DL987654321',
    licenseExpiry: '2024-08-15',
    nationality: 'Canada',
    isBlacklisted: false,
    rentalCount: 3,
    totalSpent: 1120,
    createdAt: '2022-11-20',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg'
  },
  {
    id: '3',
    name: 'Robert Johnson',
    email: 'robert.j@example.com',
    phone: '+1567891234',
    address: '789 Oak St, Elsewhere, USA',
    licenseNumber: 'DL567891234',
    licenseExpiry: '2023-12-10',
    nationality: 'USA',
    isBlacklisted: true,
    blacklistReason: 'Damaged vehicle without reporting',
    rentalCount: 1,
    totalSpent: 450,
    createdAt: '2023-01-05',
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg'
  }
];

// Sample contract data
export const contracts: Contract[] = [
  {
    id: 'C1001',
    vehicleId: '2',
    customerId: '1',
    startDate: '2023-04-10',
    endDate: '2023-04-17',
    status: 'active',
    rentalAmount: 490,
    deposit: 200,
    isPaid: true,
    notes: 'Customer requested child seat',
    createdAt: '2023-04-09',
    createdBy: 'Agent Smith'
  },
  {
    id: 'C1002',
    vehicleId: '4',
    customerId: '2',
    startDate: '2023-04-15',
    endDate: '2023-04-20',
    status: 'scheduled',
    rentalAmount: 400,
    deposit: 200,
    isPaid: false,
    createdAt: '2023-04-01',
    createdBy: 'Agent Johnson'
  },
  {
    id: 'C1003',
    vehicleId: '5',
    customerId: '1',
    startDate: '2023-03-20',
    endDate: '2023-03-25',
    status: 'completed',
    rentalAmount: 340,
    deposit: 200,
    isPaid: true,
    createdAt: '2023-03-19',
    createdBy: 'Agent Smith'
  }
];

// Dashboard statistics data
export const dashboardStats = {
  totalVehicles: vehicles.length,
  availableVehicles: vehicles.filter(v => v.status === 'available').length,
  totalRevenue: 12500,
  activeContracts: contracts.filter(c => c.status === 'active').length,
  utilizationRate: 68,
  monthlyRevenue: [
    { month: 'Jan', revenue: 8200 },
    { month: 'Feb', revenue: 9100 },
    { month: 'Mar', revenue: 11500 },
    { month: 'Apr', revenue: 12500 },
  ],
  vehicleStatusBreakdown: [
    { status: 'available', count: vehicles.filter(v => v.status === 'available').length },
    { status: 'rented', count: vehicles.filter(v => v.status === 'rented').length },
    { status: 'maintenance', count: vehicles.filter(v => v.status === 'maintenance').length },
    { status: 'reserved', count: vehicles.filter(v => v.status === 'reserved').length },
  ],
  recentActivities: [
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
  ]
};
