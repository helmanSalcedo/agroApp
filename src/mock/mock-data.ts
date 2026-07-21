/**
 * Datos Mock - Ejemplos realistas para Café en Cundinamarca
 * Basados en ciclos reales de cultivo y costos agrícolas
 */

import {
  AuthUser,
  Farm,
  Lot,
  Activity,
  Expense,
  Production,
  Contractor,
  WorkRecord,
  Notification,
  CropType,
  LotStatus,
  ActivityType,
  ExpenseCategory,
  QualityRating,
  NotificationType,
  ProductionType,
} from '@/types/domain';

// ============================================================================
// USUARIO ACTUAL
// ============================================================================

export const MOCK_CURRENT_USER: AuthUser = {
  id: 'user_001',
  name: 'Sebastián Salcedo',
  phone: '+57 300 123 4567',
  email: 'sebastian@agrochile.com',
  role: 'farmer',
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-07-09'),
};

// ============================================================================
// FINCAS (GRANJAS)
// ============================================================================

export const MOCK_FARMS: Farm[] = [
  {
    id: 'farm_001',
    userId: 'user_001',
    name: 'Finca Los Alpes',
    location: 'Cundinamarca, Quetame',
    totalArea: 25, // hectáreas
    productionType: ProductionType.CROPS,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-07-09'),
  },
  {
    id: 'farm_002',
    userId: 'user_001',
    name: 'Finca El Palmar',
    location: 'Cundinamarca, Sosacon',
    totalArea: 18,
    productionType: ProductionType.CROPS,
    createdAt: new Date('2024-03-10'),
    updatedAt: new Date('2024-07-09'),
  },
];

// ============================================================================
// LOTES DE CULTIVO
// ============================================================================

const today = new Date();
const threeMonthsAgo = new Date(today.getTime() - 90 * 24 * 60 * 60 * 1000);
const twoMonthsAgo = new Date(today.getTime() - 60 * 24 * 60 * 60 * 1000);
const oneMonthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
const twoMonthsFromNow = new Date(today.getTime() + 60 * 24 * 60 * 60 * 1000);
const threeMonthsFromNow = new Date(today.getTime() + 90 * 24 * 60 * 60 * 1000);

export const MOCK_LOTS: Lot[] = [
  {
    id: 'lot_001',
    farmId: 'farm_001',
    name: 'Sector Norte A',
    crop: CropType.COFFEE,
    area: 8,
    status: LotStatus.ACTIVE,
    sowingDate: threeMonthsAgo,
    expectedHarvestDate: twoMonthsFromNow,
    actualHarvestDate: null,
    daysToHarvest: 52,
    createdAt: threeMonthsAgo,
    updatedAt: today,
  },
  {
    id: 'lot_002',
    farmId: 'farm_001',
    name: 'Sector Sur B',
    crop: CropType.COFFEE,
    area: 12,
    status: LotStatus.ACTIVE,
    sowingDate: twoMonthsAgo,
    expectedHarvestDate: threeMonthsFromNow,
    actualHarvestDate: null,
    daysToHarvest: 83,
    createdAt: twoMonthsAgo,
    updatedAt: today,
  },
  {
    id: 'lot_003',
    farmId: 'farm_002',
    name: 'Lote Principal',
    crop: CropType.COFFEE,
    area: 10,
    status: LotStatus.ACTIVE,
    sowingDate: oneMonthAgo,
    expectedHarvestDate: new Date(today.getTime() + 120 * 24 * 60 * 60 * 1000),
    actualHarvestDate: null,
    daysToHarvest: 120,
    createdAt: oneMonthAgo,
    updatedAt: today,
  },
];

// ============================================================================
// ACTIVIDADES REGISTRADAS
// ============================================================================

export const MOCK_ACTIVITIES: Activity[] = [
  {
    id: 'act_001',
    lotId: 'lot_001',
    type: ActivityType.IRRIGATION,
    date: new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000),
    description: 'Riego profundo sistema goteo',
    completed: true,
    notes: '45mm aplicados. Condiciones óptimas.',
    workersAssigned: 2,
    createdAt: new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'act_002',
    lotId: 'lot_001',
    type: ActivityType.PEST_CONTROL,
    date: new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000),
    description: 'Control de broca del café',
    completed: true,
    notes: 'Aplicación de fungicida orgánico. Cobertura 100%.',
    workersAssigned: 3,
    createdAt: new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'act_003',
    lotId: 'lot_002',
    type: ActivityType.FERTILIZATION,
    date: new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000),
    description: 'Aplicación NPK etapa vegetativa',
    completed: false,
    notes: 'Pendiente. Programado para el jueves.',
    workersAssigned: 2,
    createdAt: new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'act_004',
    lotId: 'lot_001',
    type: ActivityType.WEEDING,
    date: new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000),
    description: 'Deshierbe manual sector norte',
    completed: true,
    notes: 'Limpieza general realizada.',
    workersAssigned: 4,
    createdAt: new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'act_005',
    lotId: 'lot_003',
    type: ActivityType.IRRIGATION,
    date: new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000),
    description: 'Riego de mantenimiento',
    completed: false,
    notes: 'Según calendario.',
    workersAssigned: 2,
    createdAt: today,
    updatedAt: today,
  },
];

// ============================================================================
// GASTOS REGISTRADOS
// ============================================================================

export const MOCK_EXPENSES: Expense[] = [
  {
    id: 'exp_001',
    farmId: 'farm_001',
    lotId: 'lot_001',
    concept: 'Semillas de café variedad Geisha',
    category: ExpenseCategory.SEEDS,
    amount: 1_850_000,
    date: threeMonthsAgo,
    receipt: 'FAC-2024-001',
    createdAt: threeMonthsAgo,
    updatedAt: threeMonthsAgo,
  },
  {
    id: 'exp_002',
    farmId: 'farm_001',
    lotId: 'lot_001',
    concept: 'Jornales de siembra (8 días × 2 trabajadores)',
    category: ExpenseCategory.LABOR,
    amount: 960_000, // 60.000 COP/día × 16 jornales
    date: threeMonthsAgo,
    receipt: 'REC-SIE-001',
    createdAt: threeMonthsAgo,
    updatedAt: threeMonthsAgo,
  },
  {
    id: 'exp_003',
    farmId: 'farm_001',
    lotId: 'lot_001',
    concept: 'Fertilizante NPK 18-18-18',
    category: ExpenseCategory.FERTILIZERS,
    amount: 420_000,
    date: new Date(today.getTime() - 15 * 24 * 60 * 60 * 1000),
    receipt: 'FAC-2024-045',
    createdAt: new Date(today.getTime() - 15 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(today.getTime() - 15 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'exp_004',
    farmId: 'farm_001',
    lotId: 'lot_001',
    concept: 'Fungicida orgánico (control de broca)',
    category: ExpenseCategory.FERTILIZERS,
    amount: 280_000,
    date: new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000),
    receipt: 'FAC-2024-078',
    createdAt: new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'exp_005',
    farmId: 'farm_001',
    lotId: 'lot_001',
    concept: 'Jornales de control de plagas (3 días)',
    category: ExpenseCategory.LABOR,
    amount: 360_000, // 60.000 COP/día × 3 trabajadores × 2 días
    date: new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000),
    receipt: 'REC-PLG-001',
    createdAt: new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'exp_006',
    farmId: 'farm_001',
    lotId: undefined, // Gasto general de finca
    concept: 'Mantenimiento de sistema de riego',
    category: ExpenseCategory.EQUIPMENT,
    amount: 150_000,
    date: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000),
    receipt: 'FAC-2024-062',
    createdAt: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'exp_007',
    farmId: 'farm_002',
    lotId: 'lot_003',
    concept: 'Preparación de terreno',
    category: ExpenseCategory.LABOR,
    amount: 1_200_000,
    date: oneMonthAgo,
    receipt: 'REC-PREP-001',
    createdAt: oneMonthAgo,
    updatedAt: oneMonthAgo,
  },
];

// ============================================================================
// PRODUCCIÓN Y COSECHAS (Históricas)
// ============================================================================

export const MOCK_PRODUCTION: Production[] = [
  {
    id: 'prod_001',
    lotId: 'lot_001',
    harvestDate: new Date('2024-04-15'),
    quantity: 1200, // kg de café cereza
    quality: QualityRating.GOOD,
    pricePerUnit: 1500, // COP/kg
    grossIncome: 1_800_000, // 1200 × 1500
    totalExpenses: 2_000_000,
    netIncome: -200_000,
    roi: -10,
    createdAt: new Date('2024-04-15'),
    updatedAt: new Date('2024-04-15'),
  },
];

// ============================================================================
// CONTRATISTAS
// ============================================================================

export const MOCK_CONTRACTORS: Contractor[] = [
  {
    id: 'cont_001',
    farmId: 'farm_001',
    name: 'Carlos Rodríguez',
    phone: '+57 310 555 1234',
    dailyRate: 60_000,
    specialty: 'Cosecha',
    active: true,
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01'),
  },
  {
    id: 'cont_002',
    farmId: 'farm_001',
    name: 'María González',
    phone: '+57 315 666 5678',
    dailyRate: 55_000,
    specialty: 'Fertilización',
    active: true,
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-02-15'),
  },
  {
    id: 'cont_003',
    farmId: 'farm_001',
    name: 'Juan Martínez',
    phone: '+57 320 777 9012',
    dailyRate: 65_000,
    specialty: 'Riego',
    active: true,
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-03-01'),
  },
  {
    id: 'cont_004',
    farmId: 'farm_002',
    name: 'Pedro López',
    phone: '+57 312 888 3456',
    dailyRate: 60_000,
    specialty: 'Deshierbe',
    active: true,
    createdAt: new Date('2024-03-20'),
    updatedAt: new Date('2024-03-20'),
  },
];

// ============================================================================
// REGISTROS DE TRABAJO
// ============================================================================

export const MOCK_WORK_RECORDS: WorkRecord[] = [
  {
    id: 'work_001',
    activityId: 'act_001',
    contractorId: 'cont_001',
    date: new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000),
    daysWorked: 1,
    totalCost: 60_000,
    notes: 'Riego mañana completa',
    createdAt: new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'work_002',
    activityId: 'act_001',
    contractorId: 'cont_001',
    date: new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000),
    daysWorked: 1,
    totalCost: 60_000,
    notes: 'Riego tarde completa',
    createdAt: new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'work_003',
    activityId: 'act_002',
    contractorId: 'cont_002',
    date: new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000),
    daysWorked: 2,
    totalCost: 110_000,
    notes: 'Control de plagas 2 días',
    createdAt: new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000),
  },
];

// ============================================================================
// NOTIFICACIONES
// ============================================================================

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif_001',
    userId: 'user_001',
    title: 'Actividad completada',
    message: 'Riego del lote "Sector Norte A" fue registrado exitosamente',
    type: NotificationType.SUCCESS,
    relatedLotId: 'lot_001',
    relatedActivityId: 'act_001',
    read: true,
    createdAt: new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'notif_002',
    userId: 'user_001',
    title: 'Recordatorio: Fertilización',
    message: 'Está programado aplicar fertilizante NPK en "Sector Sur B" en 2 días',
    type: NotificationType.REMINDER,
    relatedLotId: 'lot_002',
    relatedActivityId: 'act_003',
    read: false,
    createdAt: new Date(today.getTime() - 6 * 60 * 60 * 1000),
  },
  {
    id: 'notif_003',
    userId: 'user_001',
    title: 'Próxima cosecha',
    message: 'El lote "Sector Norte A" estará listo para cosechar en 52 días',
    type: NotificationType.INFO,
    relatedLotId: 'lot_001',
    read: false,
    createdAt: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000),
  },
];
