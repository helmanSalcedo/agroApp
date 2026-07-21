/**
 * Cálculos agrícolas: rentabilidad, costos, ROI
 */

export function calculateROI(
  grossIncome: number,
  totalExpenses: number,
): number {
  if (totalExpenses === 0) return 0;
  return ((grossIncome - totalExpenses) / totalExpenses) * 100;
}

export function calculateNetIncome(
  grossIncome: number,
  totalExpenses: number,
): number {
  return grossIncome - totalExpenses;
}

export function calculateYieldPerHectare(
  totalQuantity: number,
  areaHectares: number,
): number {
  if (areaHectares === 0) return 0;
  return totalQuantity / areaHectares;
}

export function calculateCostPerKg(
  totalExpenses: number,
  totalQuantity: number,
): number {
  if (totalQuantity === 0) return 0;
  return totalExpenses / totalQuantity;
}

export function calculateProfitMargin(
  grossIncome: number,
  totalExpenses: number,
): number {
  if (grossIncome === 0) return 0;
  return ((grossIncome - totalExpenses) / grossIncome) * 100;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(value: number, decimals: number = 2): string {
  return value.toLocaleString('es-CO', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function formatPercentage(value: number, decimals: number = 1): string {
  return `${formatNumber(value, decimals)}%`;
}
