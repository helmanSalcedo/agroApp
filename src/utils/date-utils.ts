/**
 * Utilidades para manejo de fechas agrícolas
 */

export function calculateDaysToHarvest(expectedHarvestDate: Date | null): number | null {
  if (!expectedHarvestDate) return null;
  const today = new Date();
  const diffTime = expectedHarvestDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 0;
}

export function calculateDaysSinceSowing(sowingDate: Date | null): number | null {
  if (!sowingDate) return null;
  const today = new Date();
  const diffTime = today.getTime() - sowingDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays >= 0 ? diffDays : 0;
}

export function calculateLotProgress(
  sowingDate: Date | null,
  expectedHarvestDate: Date | null,
): number {
  if (!sowingDate || !expectedHarvestDate) return 0;

  const today = new Date();
  const totalDays = expectedHarvestDate.getTime() - sowingDate.getTime();
  const elapsedDays = today.getTime() - sowingDate.getTime();

  if (totalDays <= 0) return 0;

  const progress = Math.min((elapsedDays / totalDays) * 100, 100);
  return Math.round(progress);
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatDateShort(date: Date): string {
  return date.toLocaleDateString('es-CO', {
    month: '2-digit',
    day: '2-digit',
    year: '2-digit',
  });
}

export function formatDateISO(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function getMonthYear(date: Date): string {
  return date.toLocaleDateString('es-CO', {
    month: 'long',
    year: 'numeric',
  });
}

export function isToday(date: Date): boolean {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

export function isThisMonth(date: Date): boolean {
  const today = new Date();
  return (
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

export function getWeekStart(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(d.setDate(diff));
}
