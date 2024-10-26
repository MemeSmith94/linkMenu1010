import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ShopPage from './pages/ShopPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import AdminPage from './pages/AdminPage';
import ShopFormPage from './pages/ShopFormPage';
import { ShopProvider } from './contexts/ShopContext';

function App() {
  return (
    <BrowserRouter>
      <ShopProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/new" element={<ShopFormPage />} />
          <Route path="/admin/edit/:shopId" element={<ShopFormPage />} />
          <Route path="/:shopId" element={<ShopPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ShopProvider>
    </BrowserRouter>
  );
}

export default App;