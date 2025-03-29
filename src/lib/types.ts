export interface InventoryItem {
  id: string;
  item_code: string;
  item_name: string;
  weight_quantity: number;
  unit: string;
  quantity: number; // New field
  description: string;
  company: string;
  ref_name: string;
  contact_number: string;
  created_at: string;
  updated_at: string;
}