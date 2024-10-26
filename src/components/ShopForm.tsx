import React, { useState } from 'react';
import { ShopFormData, MenuItem } from '../types';
import { PlusCircle, Trash2, Save } from 'lucide-react';

interface ShopFormProps {
  initialData?: ShopFormData;
  onSubmit: (data: ShopFormData) => void;
}

const emptyMenuItem: MenuItem = {
  name: '',
  description: '',
  price: 0,
};

const emptyCategory = {
  categoryName: '',
  items: [{ ...emptyMenuItem }],
};

const ShopForm: React.FC<ShopFormProps> = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = useState<ShopFormData>(
    initialData || {
      name: '',
      description: '',
      imageUrl: '',
      hours: '',
      established: '',
      phone: '',
      orderUrl: '',
      locationUrl: '',
      social: {},
      menu: [{ ...emptyCategory }],
    }
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('social.')) {
      const socialField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        social: { ...prev.social, [socialField]: value },
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleCategoryChange = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      menu: prev.menu.map((cat, i) =>
        i === index ? { ...cat, categoryName: value } : cat
      ),
    }));
  };

  const handleMenuItemChange = (
    categoryIndex: number,
    itemIndex: number,
    field: keyof MenuItem,
    value: string | number
  ) => {
    setFormData(prev => ({
      ...prev,
      menu: prev.menu.map((cat, i) =>
        i === categoryIndex
          ? {
              ...cat,
              items: cat.items.map((item, j) =>
                j === itemIndex ? { ...item, [field]: value } : item
              ),
            }
          : cat
      ),
    }));
  };

  const addCategory = () => {
    setFormData(prev => ({
      ...prev,
      menu: [...prev.menu, { ...emptyCategory }],
    }));
  };

  const addMenuItem = (categoryIndex: number) => {
    setFormData(prev => ({
      ...prev,
      menu: prev.menu.map((cat, i) =>
        i === categoryIndex
          ? { ...cat, items: [...cat.items, { ...emptyMenuItem }] }
          : cat
      ),
    }));
  };

  const removeCategory = (index: number) => {
    setFormData(prev => ({
      ...prev,
      menu: prev.menu.filter((_, i) => i !== index),
    }));
  };

  const removeMenuItem = (categoryIndex: number, itemIndex: number) => {
    setFormData(prev => ({
      ...prev,
      menu: prev.menu.map((cat, i) =>
        i === categoryIndex
          ? { ...cat, items: cat.items.filter((_, j) => j !== itemIndex) }
          : cat
      ),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Basic Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Shop Name"
            value={formData.name}
            onChange={handleInputChange}
            className="input-field"
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleInputChange}
            className="input-field"
            required
          />
          <input
            type="url"
            name="imageUrl"
            placeholder="Image URL"
            value={formData.imageUrl}
            onChange={handleInputChange}
            className="input-field"
            required
          />
          <input
            type="text"
            name="hours"
            placeholder="Business Hours"
            value={formData.hours}
            onChange={handleInputChange}
            className="input-field"
            required
          />
          <input
            type="text"
            name="established"
            placeholder="Established Date"
            value={formData.established}
            onChange={handleInputChange}
            className="input-field"
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleInputChange}
            className="input-field"
            required
          />
          <input
            type="url"
            name="orderUrl"
            placeholder="Order URL"
            value={formData.orderUrl}
            onChange={handleInputChange}
            className="input-field"
            required
          />
          <input
            type="url"
            name="locationUrl"
            placeholder="Location URL"
            value={formData.locationUrl}
            onChange={handleInputChange}
            className="input-field"
            required
          />
        </div>
      </div>

      {/* Social Links */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Social Links</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="url"
            name="social.instagram"
            placeholder="Instagram URL"
            value={formData.social.instagram || ''}
            onChange={handleInputChange}
            className="input-field"
          />
          <input
            type="url"
            name="social.facebook"
            placeholder="Facebook URL"
            value={formData.social.facebook || ''}
            onChange={handleInputChange}
            className="input-field"
          />
          <input
            type="url"
            name="social.reviews"
            placeholder="Reviews URL"
            value={formData.social.reviews || ''}
            onChange={handleInputChange}
            className="input-field"
          />
        </div>
      </div>

      {/* Menu Builder */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Menu</h2>
          <button
            type="button"
            onClick={addCategory}
            className="flex items-center text-purple-600 hover:text-purple-700"
          >
            <PlusCircle className="w-4 h-4 mr-1" />
            Add Category
          </button>
        </div>

        {formData.menu.map((category, categoryIndex) => (
          <div key={categoryIndex} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <input
                type="text"
                placeholder="Category Name"
                value={category.categoryName}
                onChange={(e) => handleCategoryChange(categoryIndex, e.target.value)}
                className="input-field"
                required
              />
              <button
                type="button"
                onClick={() => removeCategory(categoryIndex)}
                className="text-red-500 hover:text-red-600"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {category.items.map((item, itemIndex) => (
              <div key={itemIndex} className="grid grid-cols-12 gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Item Name"
                  value={item.name}
                  onChange={(e) =>
                    handleMenuItemChange(categoryIndex, itemIndex, 'name', e.target.value)
                  }
                  className="col-span-3 input-field"
                  required
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={item.description}
                  onChange={(e) =>
                    handleMenuItemChange(
                      categoryIndex,
                      itemIndex,
                      'description',
                      e.target.value
                    )
                  }
                  className="col-span-6 input-field"
                  required
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={item.price}
                  onChange={(e) =>
                    handleMenuItemChange(
                      categoryIndex,
                      itemIndex,
                      'price',
                      parseFloat(e.target.value)
                    )
                  }
                  className="col-span-2 input-field"
                  required
                />
                <button
                  type="button"
                  onClick={() => removeMenuItem(categoryIndex, itemIndex)}
                  className="col-span-1 text-red-500 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={() => addMenuItem(categoryIndex)}
              className="flex items-center text-purple-600 hover:text-purple-700 mt-2"
            >
              <PlusCircle className="w-4 h-4 mr-1" />
              Add Item
            </button>
          </div>
        ))}
      </div>

      <button
        type="submit"
        className="flex items-center justify-center w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
      >
        <Save className="w-4 h-4 mr-2" />
        Save Shop
      </button>
    </form>
  );
};

export default ShopForm;