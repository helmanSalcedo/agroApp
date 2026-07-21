export interface PriceAnalysis {
  averagePrice: number;
  priceChange: number;
  priceChangePercent: number;
  totalHistoricalSales: number;
  lastPrice: number | null;
}

export interface ProfitAnalysis {
  pricePerUnit: number;
  averagePrice: number;
  profitPerUnit: number;
  profitPercentage: number;
  totalQuantity: number;
  totalProfit: number;
  isProfit: boolean;
}

export function analyzePrices(
  productName: string,
  historicalSales: Array<{ pricePerUnit: number; quantity: number; date: Date }>
): PriceAnalysis {
  if (historicalSales.length === 0) {
    return {
      averagePrice: 0,
      priceChange: 0,
      priceChangePercent: 0,
      totalHistoricalSales: 0,
      lastPrice: null,
    };
  }

  const totalPrice = historicalSales.reduce((sum, sale) => sum + sale.pricePerUnit, 0);
  const averagePrice = totalPrice / historicalSales.length;
  const lastPrice = historicalSales[historicalSales.length - 1].pricePerUnit;
  const priceChange = lastPrice - averagePrice;
  const priceChangePercent = (priceChange / averagePrice) * 100;

  return {
    averagePrice,
    priceChange,
    priceChangePercent,
    totalHistoricalSales: historicalSales.length,
    lastPrice,
  };
}

export function analyzeProfitProjection(
  currentPrice: number,
  quantity: number,
  averageHistoricalPrice: number
): ProfitAnalysis {
  const profitPerUnit = currentPrice - averageHistoricalPrice;
  const profitPercentage = averageHistoricalPrice > 0
    ? (profitPerUnit / averageHistoricalPrice) * 100
    : 0;
  const totalProfit = profitPerUnit * quantity;
  const isProfit = totalProfit >= 0;

  return {
    pricePerUnit: currentPrice,
    averagePrice: averageHistoricalPrice,
    profitPerUnit,
    profitPercentage,
    totalQuantity: quantity,
    totalProfit,
    isProfit,
  };
}

export function getMarketPriceSuggestion(historicalPrices: number[]): number {
  if (historicalPrices.length === 0) return 0;

  const sorted = [...historicalPrices].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);

  if (sorted.length % 2 !== 0) {
    return sorted[middle];
  }

  return (sorted[middle - 1] + sorted[middle]) / 2;
}
