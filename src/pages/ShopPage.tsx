import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Menu, Instagram, Facebook, Star, DollarSign, Phone, MapPin, Clock, ChefHat } from 'lucide-react';
import { useShop } from '../contexts/ShopContext';
import MenuSection from '../components/MenuSection';
import LinkButton from '../components/LinkButton';

function ShopPage() {
  const { shopId } = useParams();
  const { getShopById } = useShop();
  const shop = shopId ? getShopById(shopId) : undefined;

  if (!shop) {
    return <Navigate to="/404" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden shadow-lg">
            <img 
              src={shop.imageUrl}
              alt={shop.name}
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{shop.name}</h1>
          <p className="text-gray-600 mb-4">{shop.description}</p>
          
          {/* Quick Info */}
          <div className="flex justify-center space-x-4 mb-6">
            <span className="flex items-center text-gray-600">
              <Clock className="w-4 h-4 mr-1" /> {shop.hours}
            </span>
            <span className="flex items-center text-gray-600">
              <ChefHat className="w-4 h-4 mr-1" /> {shop.established}
            </span>
          </div>
        </div>

        {/* Primary Actions */}
        <div className="space-y-3 mb-8">
          <LinkButton 
            icon={<Menu />}
            text="View Full Menu"
            href="#menu"
            primary
          />
          <LinkButton 
            icon={<DollarSign />}
            text="Order Online"
            href={shop.orderUrl}
          />
          <LinkButton 
            icon={<MapPin />}
            text="Get Directions"
            href={shop.locationUrl}
          />
          <LinkButton 
            icon={<Phone />}
            text="Call Us"
            href={`tel:${shop.phone}`}
          />
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-4 mb-8">
          {shop.social.instagram && (
            <a href={shop.social.instagram} className="p-2 text-pink-600 hover:text-pink-700">
              <Instagram className="w-6 h-6" />
            </a>
          )}
          {shop.social.facebook && (
            <a href={shop.social.facebook} className="p-2 text-blue-600 hover:text-blue-700">
              <Facebook className="w-6 h-6" />
            </a>
          )}
          {shop.social.reviews && (
            <a href={shop.social.reviews} className="p-2 text-yellow-500 hover:text-yellow-600">
              <Star className="w-6 h-6" />
            </a>
          )}
        </div>

        {/* Menu Preview */}
        <div id="menu" className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Popular Items</h2>
          {Object.entries(shop.menu).map(([category, items]) => (
            <MenuSection key={category} category={category} items={items} />
          ))}
        </div>

        {/* Footer */}
        <footer className="text-center text-gray-600 text-sm mt-8">
          <p>© 2024 {shop.name}. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default ShopPage;