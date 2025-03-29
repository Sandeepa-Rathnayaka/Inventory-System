import { Metadata } from 'next';
import ItemForm from '@/components/ItemForm';

export const metadata: Metadata = {
  title: 'Add Item | Inventory Management System',
  description: 'Add a new item to inventory',
};

export default function AddItemPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Add New Inventory Item</h1>
      <ItemForm />
    </div>
  );
}