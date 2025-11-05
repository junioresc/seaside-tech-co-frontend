import type { User } from './user';

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

