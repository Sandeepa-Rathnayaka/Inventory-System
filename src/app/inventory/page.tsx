import { Metadata } from 'next';
import Link from 'next/link';
import ItemsTable from '@/components/ItemsTable';
import supabase from '@/lib/supabase';
import { InventoryItem } from '@/lib/types';

export const metadata: Metadata = {
  title: 'Inventory List | Inventory Management System',
  description: 'View and manage your inventory items',
};

export const dynamic = 'force-dynamic';

async function getItems(): Promise<InventoryItem[]> {
  const { data, error } = await supabase
    .from('inventory_items')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching inventory items:', error);
    return [];
  }
  
  return data || [];
}

export default async function InventoryPage() {
  const items = await getItems();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Inventory Items</h1>
        <Link 
          href="/inventory/add" 
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add New Item
        </Link>
      </div>
      
      <ItemsTable items={items} />
    </div>
  );
}