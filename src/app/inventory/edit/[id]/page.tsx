import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ItemForm from '@/components/ItemForm';
import supabase from '@/lib/supabase';
import { InventoryItem } from '@/lib/types';

export const metadata: Metadata = {
  title: 'Edit Item | Inventory Management System',
  description: 'Edit an existing inventory item',
};

export const dynamic = 'force-dynamic';

async function getItem(id: string): Promise<InventoryItem | null> {
  const { data, error } = await supabase
    .from('inventory_items')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error fetching item:', error);
    return null;
  }
  
  return data;
}

export default async function EditItemPage({ params }: { params: { id: string } }) {
  const item = await getItem(params.id);
  
  if (!item) {
    notFound();
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Edit Inventory Item</h1>
      <p className="text-gray-600 mb-6">
        Item Code: <span className="font-medium">{item.item_code}</span>
      </p>
      <ItemForm initialData={item} isEditing={true} />
    </div>
  );
}