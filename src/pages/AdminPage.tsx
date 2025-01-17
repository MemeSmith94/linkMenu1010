import React from 'react';
import { useShop } from '../contexts/ShopContext';
import { Link } from 'react-router-dom';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';

function AdminPage() {
  const { shops, deleteShop } = useShop();

  const handleDelete = (shopId: string) => {
    if (window.confirm('Are you sure you want to delete this shop?')) {
      deleteShop(shopId);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shop Management</h1>
          <Link
            to="/admin/new"
            className="flex items-center bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            Add New Shop
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shops.map((shop) => (
            <div
              key={shop.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={shop.imageUrl}
                alt={shop.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {shop.name}
                </h2>
                <p className="text-gray-600 mb-4">{shop.description}</p>
                <div className="flex justify-between items-center">
                  <Link
                    to={`/admin/edit/${shop.id}`}
                    className="flex items-center text-purple-600 hover:text-purple-700"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(shop.id)}
                    className="flex items-center text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminPage;