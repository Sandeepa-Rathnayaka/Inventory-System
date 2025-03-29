'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { InventoryItem } from '@/lib/types';

interface ItemFormProps {
  initialData?: InventoryItem;
  isEditing?: boolean;
}

const ItemForm = ({ initialData, isEditing = false }: ItemFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    item_name: initialData?.item_name || '',
    weight_quantity: initialData?.weight_quantity || 0,
    unit: initialData?.unit || 'kg',
    quantity: initialData?.quantity || 0, // New field
    description: initialData?.description || '',
    company: initialData?.company || '',
    ref_name: initialData?.ref_name || '',
    contact_number: initialData?.contact_number || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: name === 'weight_quantity' 
        ? parseFloat(value) >= 0 ? parseFloat(value) : 0 
        : name === 'quantity' 
          ? parseInt(value) >= 0 ? parseInt(value) : 0 
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const url = isEditing 
        ? `/api/items/${initialData?.id}` 
        : '/api/items';
      
      const method = isEditing ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to save item');
      }
      
      toast.success(isEditing ? 'Item updated successfully!' : 'Item added successfully!');
      router.push('/inventory');
      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mt-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        {isEditing ? 'Edit Inventory Item' : 'Add New Inventory Item'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="item_name" className="block text-sm font-medium text-gray-900">
              Item Name *
            </label>
            <input
              type="text"
              name="item_name"
              id="item_name"
              required
              value={formData.item_name}
              onChange={handleChange}
              className="text-gray-700 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="Enter item name"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="weight_quantity" className="block text-sm font-medium text-gray-900">
                Weight *
              </label>
              <input
                type="number"
                name="weight_quantity"
                id="weight_quantity"
                required
                min="0"
                step="0.05"
                value={formData.weight_quantity}
                onChange={handleChange}
                className="text-gray-700 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="0.00"
              />
            </div>
            
            <div>
              <label htmlFor="unit" className="block text-sm font-medium text-gray-900">
                Unit *
              </label>
              <select
                name="unit"
                id="unit"
                required
                value={formData.unit}
                onChange={handleChange}
                className="text-gray-700 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="kg">kg</option>
                <option value="g">g</option>
                <option value="l">l</option>
                <option value="ml">ml</option>
                <option value="units">units</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* New Quantity Field */}
        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-900">
            Quantity *
          </label>
          <input
            type="number"
            name="quantity"
            id="quantity"
            required
            min="0"
            step="1" // Only whole numbers
            value={formData.quantity}
            onChange={handleChange}
            className="text-gray-700 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="0"
          />
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-900">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            rows={3}
            value={formData.description}
            onChange={handleChange}
            className="text-gray-700 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="Enter item description (optional)"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-900">
              Company *
            </label>
            <input
              type="text"
              name="company"
              id="company"
              required
              value={formData.company}
              onChange={handleChange}
              className="text-gray-700 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="Enter company name"
            />
          </div>
          
          <div>
            <label htmlFor="ref_name" className="block text-sm font-medium text-gray-900">
              Ref Name
            </label>
            <input
              type="text"
              name="ref_name"
              id="ref_name"
              value={formData.ref_name}
              onChange={handleChange}
              className="text-gray-700 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="Enter ref name (optional)"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="contact_number" className="block text-sm font-medium text-gray-900">
            Contact Number
          </label>
          <input
            type="text"
            name="contact_number"
            id="contact_number"
            value={formData.contact_number}
            onChange={handleChange}
            className="text-gray-700 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="Enter contact number (optional)"
          />
        </div>
        
        <div className="flex justify-end space-x-3 pt-5">
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-colors duration-200"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {isEditing ? 'Updating...' : 'Adding...'}
              </>
            ) : (
              isEditing ? 'Update Item' : 'Add Item'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ItemForm;