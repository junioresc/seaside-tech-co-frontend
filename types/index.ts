// User & Auth Types
export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  role: 'customer' | 'technician' | 'admin';
  created_at: string;
}

export interface AuthTokens {
  access: string;
  refresh?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone: string;
}

// Repair Types
export type RepairStatus =
  | 'received'
  | 'diagnosing'
  | 'awaiting_approval'
  | 'approved'
  | 'repairing'
  | 'waiting_parts'
  | 'ready'
  | 'completed'
  | 'cancelled';

export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unit_price: string;
  total_price: string;
  is_labor: boolean;
}

export interface Repair {
  id: string;
  ticket_number: string;
  status: RepairStatus;
  customer: User;
  device_type: string;
  device_brand: string;
  device_model: string;
  issue_description: string;
  technician?: User;
  line_items: LineItem[];
  estimated_cost?: string;
  final_cost?: string;
  notes: string;
  created_at: string;
  updated_at: string;
  completed_at?: string;
}

// Appointment Types
export type AppointmentStatus = 'scheduled' | 'checked_in' | 'in_progress' | 'completed' | 'cancelled';

export interface Service {
  id: string;
  name: string;
  description: string;
  duration_minutes: number;
  price?: string;
  category: string;
}

export interface TimeSlot {
  start_time: string;
  end_time: string;
  available: boolean;
}

export interface Appointment {
  id: string;
  customer: User;
  service: Service;
  status: AppointmentStatus;
  scheduled_time: string;
  check_in_token?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

// Product Types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  brand: string;
  image_url?: string;
  stock_quantity: number;
  is_active: boolean;
  created_at: string;
}

// Cart Types
export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

export interface Cart {
  id: string;
  items: CartItem[];
  total: string;
  updated_at: string;
}

// Certification Types
export interface Certification {
  id: string;
  name: string;
  issuer: string;
  description: string;
  image_url?: string;
}

// API Response Types
export interface PaginatedResponse<T> {
  count: number;
  next?: string;
  previous?: string;
  results: T[];
}

export interface ApiError {
  detail?: string;
  message?: string;
  [key: string]: unknown;
}

