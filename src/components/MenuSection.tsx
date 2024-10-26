import React from 'react';
import { MenuItem } from '../types';

interface MenuSectionProps {
  category: string;
  items: MenuItem[];
}

const MenuSection: React.FC<MenuSectionProps> = ({ category, items }) => {
  return (
    <div className="mb-8 last:mb-0">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">{category}</h3>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.name} className="flex justify-between items-start">
            <div>
              <h4 className="font-medium text-gray-800">{item.name}</h4>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
            <span className="font-medium text-orange-600 ml-4">${item.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuSection;