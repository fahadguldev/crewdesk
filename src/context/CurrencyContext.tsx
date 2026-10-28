import React, { createContext, useContext, useState, useEffect } from 'react';

export type Currency = 'pkr' | 'usd';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatPrice: (pkrAmount: number) => { amount: number; formatted: string; symbol: string; label: string };
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

// Exchange rate matching content.ts (~1 USD = 280 PKR)
const PKR_TO_USD_RATE = 280;

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<Currency>(() => {
    const saved = localStorage.getItem('dh-currency');
    return saved === 'usd' ? 'usd' : 'pkr';
  });

  useEffect(() => {
    localStorage.setItem('dh-currency', currency);
  }, [currency]);

  const formatPrice = (pkrAmount: number) => {
    if (currency === 'usd') {
      const usdVal = Math.round(pkrAmount / PKR_TO_USD_RATE);
      return {
        amount: usdVal,
        formatted: `$${usdVal.toLocaleString()}`,
        symbol: '$',
        label: 'USD'
      };
    }
    return {
      amount: pkrAmount,
      formatted: `PKR ${pkrAmount.toLocaleString()}`,
      symbol: 'PKR',
      label: 'PKR'
    };
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
