import React, { createContext, useContext, ReactNode, useState } from 'react';
import { Shop, ShopFormData } from '../types';
import { mockShops } from '../data/mockData';

interface ShopContextType {
  getShopById: (id: string) => Shop | undefined;
  shops: Shop[];
  addShop: (shopData: ShopFormData) => void;
  deleteShop: (shopId: string) => void;
  updateShop: (shopId: string, shopData: ShopFormData) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export function ShopProvider({ children }: { children: ReactNode }) {
  const [shops, setShops] = useState<Shop[]>(mockShops);

  const getShopById = (id: string) => {
    return shops.find(shop => shop.id === id);
  };

  const addShop = (shopData: ShopFormData) => {
    const id = shopData.name.toLowerCase().replace(/\s+/g, '-');
    const menu = shopData.menu.reduce((acc, category) => {
      acc[category.categoryName] = category.items;
      return acc;
    }, {} as Record<string, MenuItem[]>);

    const newShop: Shop = {
      ...shopData,
      id,
      menu,
    };

    setShops(prev => [...prev, newShop]);
  };

  const deleteShop = (shopId: string) => {
    setShops(prev => prev.filter(shop => shop.id !== shopId));
  };

  const updateShop = (shopId: string, shopData: ShopFormData) => {
    const menu = shopData.menu.reduce((acc, category) => {
      acc[category.categoryName] = category.items;
      return acc;
    }, {} as Record<string, MenuItem[]>);

    setShops(prev =>
      prev.map(shop =>
        shop.id === shopId
          ? {
              ...shopData,
              id: shopId,
              menu,
            }
          : shop
      )
    );
  };

  return (
    <ShopContext.Provider value={{ getShopById, shops, addShop, deleteShop, updateShop }}>
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
}