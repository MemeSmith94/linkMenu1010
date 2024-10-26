import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useShop } from '../contexts/ShopContext';
import ShopForm from '../components/ShopForm';
import { ShopFormData } from '../types';

function ShopFormPage() {
  const navigate = useNavigate();
  const { shopId } = useParams();
  const { getShopById, addShop, updateShop } = useShop();

  const shop = shopId ? getShopById(shopId) : undefined;
  const initialData = shop
    ? {
        ...shop,
        menu: Object.entries(shop.menu).map(([categoryName, items]) => ({
          categoryName,
          items,
        })),
      }
    : undefined;

  const handleSubmit = (data: ShopFormData) => {
    if (shopId) {
      updateShop(shopId, data);
    } else {
      addShop(data);
    }
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          {shopId ? 'Edit Shop' : 'Create New Shop'}
        </h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <ShopForm initialData={initialData} onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
}

export default ShopFormPage;