import { createContext, useContext, useState, useEffect } from 'react'

const CURRENCIES = {
  INR: { symbol: '₹', code: 'INR', rate: 1, locale: 'en-IN' },
  USD: { symbol: '$', code: 'USD', rate: 0.012, locale: 'en-US' },
  EUR: { symbol: '€', code: 'EUR', rate: 0.011, locale: 'de-DE' },
  GBP: { symbol: '£', code: 'GBP', rate: 0.0095, locale: 'en-GB' },
  AED: { symbol: 'د.إ', code: 'AED', rate: 0.044, locale: 'ar-AE' },
  JPY: { symbol: '¥', code: 'JPY', rate: 1.78, locale: 'ja-JP' },
  SGD: { symbol: 'S$', code: 'SGD', rate: 0.016, locale: 'en-SG' },
}

// Map browser language to currency
const LOCALE_TO_CURRENCY = {
  'en-IN': 'INR', 'hi': 'INR', 'hi-IN': 'INR',
  'en-US': 'USD', 'es-US': 'USD',
  'en-GB': 'GBP',
  'de': 'EUR', 'fr': 'EUR', 'it': 'EUR', 'es': 'EUR',
  'ar-AE': 'AED', 'ar': 'AED',
  'ja': 'JPY', 'ja-JP': 'JPY',
  'en-SG': 'SGD', 'zh-SG': 'SGD',
}

const CurrencyContext = createContext()

export function CurrencyProvider({ children }) {
  const [currencyCode, setCurrencyCode] = useState(() => {
    // Check saved preference
    const saved = localStorage.getItem('nexfly-currency')
    if (saved && CURRENCIES[saved]) return saved

    // Detect from browser locale
    const lang = navigator.language || 'en-IN'
    return LOCALE_TO_CURRENCY[lang] || LOCALE_TO_CURRENCY[lang.split('-')[0]] || 'INR'
  })

  useEffect(() => {
    localStorage.setItem('nexfly-currency', currencyCode)
  }, [currencyCode])

  const currency = CURRENCIES[currencyCode]

  // Convert from INR base price to target currency
  const formatPrice = (inrAmount) => {
    const converted = inrAmount * currency.rate
    return new Intl.NumberFormat(currency.locale, {
      style: 'currency',
      currency: currency.code,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Math.round(converted))
  }

  return (
    <CurrencyContext.Provider value={{ currencyCode, setCurrencyCode, currency, formatPrice, currencies: CURRENCIES }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export const useCurrency = () => useContext(CurrencyContext)
