
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Product } from '../types';

interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'updatedAt'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  isLoading: boolean;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const INITIAL_PRODUCTS: Product[] = [
  { id: '1', name: 'Nexus X1 Laptop', category: 'Electronics', price: 1299.99, stock: 45, description: 'High-performance workstation.', status: 'active', updatedAt: new Date().toISOString() },
  { id: '2', name: 'Quantum Mouse', category: 'Peripherals', price: 89.00, stock: 120, description: 'Ultra-fast gaming mouse.', status: 'active', updatedAt: new Date().toISOString() },
  { id: '3', name: 'Nebula Keyboard', category: 'Peripherals', price: 159.50, stock: 85, description: 'Mechanical RGB keyboard.', status: 'active', updatedAt: new Date().toISOString() },
  { id: '4', name: 'Titan Monitor 4K', category: 'Electronics', price: 499.00, stock: 12, description: 'Crystal clear display.', status: 'draft', updatedAt: new Date().toISOString() },
];

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [isLoading, setIsLoading] = useState(false);

  const addProduct = useCallback((newProd: Omit<Product, 'id' | 'updatedAt'>) => {
    const product: Product = {
      ...newProd,
      id: Math.random().toString(36).substr(2, 9),
      updatedAt: new Date().toISOString()
    };
    setProducts(prev => [product, ...prev]);
  }, []);

  const updateProduct = useCallback((id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p));
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  }, []);

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct, isLoading }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error('useProducts must be used within a ProductProvider');
  return context;
};
