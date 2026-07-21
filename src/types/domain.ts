/**
 * Domain Types - Definiciones principales del negocio agrícola
 * Usado en contextos, servicios y componentes
 */

// ============================================================================
// USUARIO
// ============================================================================

export interface AuthUser {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: 'farmer' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================================
// FINCA (Granja)
// ============================================================================

export enum ProductionType {
  CROPS = 'crops',           // Cultivos
  LIVESTOCK = 'livestock',   // Ganado
  FISHING = 'fishing',       // Pesca
  FORESTRY = 'forestry',     // Forestal
  OTHER = 'other',           // Otro
}

export interface Farm {
  id: string;
  userId: string;
  name: string;
  location: string;
  totalArea: number; // hectáreas
  productionType: ProductionType;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateFarmInput {
  name: string;
  location: string;
  totalArea: number;
  productionType: ProductionType;
}

export interface UpdateFarmInput {
  name?: string;
  location?: string;
  totalArea?: number;
}

// ============================================================================
// LOTE (Parcela de cultivo)
// ============================================================================

export enum CropType {
  MAIZE = 'maize',
  SOYBEAN = 'soybean',
  WHEAT = 'wheat',
  RICE = 'rice',
  COFFEE = 'coffee',
  SUGARCANE = 'sugarcane',
  BEANS = 'beans',
  OTHER = 'other',
}

export enum LotStatus {
  PLANNING = 'planning',
  ACTIVE = 'active',
  HARVESTED = 'harvested',
  IDLE = 'idle',
}

export interface Lot {
  id: string;
  farmId: string;
  name: string;
  crop: CropType;
  area: number; // hectáreas
  status: LotStatus;
  sowingDate: Date | null;
  expectedHarvestDate: Date | null;
  actualHarvestDate: Date | null;
  daysToHarvest: number | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateLotInput {
  farmId: string;
  name: string;
  crop: CropType;
  area: number;
}

export interface UpdateLotInput {
  name?: string;
  crop?: CropType;
  area?: number;
  status?: LotStatus;
}

// ============================================================================
// ACTIVIDADES AGRÍCOLAS
// ============================================================================

export enum ActivityType {
  IRRIGATION = 'irrigation',
  FERTILIZATION = 'fertilization',
  PEST_CONTROL = 'pest-control',
  WEEDING = 'weeding',
  HARVESTING = 'harvesting',
  PLANTING = 'planting',
  PRUNING = 'pruning',
  SALES = 'sales',
  SOIL_ANALYSIS = 'soil-analysis',
  TRANSPLANTING = 'transplanting',
  PEST_MONITORING = 'pest-monitoring',
  CROP_INSPECTION = 'crop-inspection',
  PACKING = 'packing',
  FUNGICIDE_APPLICATION = 'fungicide-application',
  DISINFECTION = 'disinfection',
  IRRIGATION_MAINTENANCE = 'irrigation-maintenance',
  OTHER = 'other',
}

export interface Activity {
  id: string;
  lotId: string;
  type: ActivityType;
  date: Date;
  description: string;
  completed: boolean;
  notes?: string;
  workersAssigned?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateActivityInput {
  lotId: string;
  type: ActivityType;
  date: Date;
  description: string;
  notes?: string;
  workersAssigned?: number;
  // IRRIGATION
  irrigationType?: string;
  irrigationDuration?: number;
  waterQuantity?: number;
  // FERTILIZATION
  fertilizerType?: string;
  fertilizerQuantity?: number;
  fertilizerUnit?: string;
  applicationMethod?: string;
  // PEST_CONTROL
  pestType?: string;
  pestControlMethod?: string;
  productUsed?: string;
  quantityApplied?: number;
  // WEEDING
  weedingMethod?: string;
  areaWeeded?: number;
  // HARVESTING
  quantityHarvested?: number;
  harvestUnit?: string;
  quality?: string;
  // PLANTING
  seedType?: string;
  quantityPlanted?: number;
  plantingUnit?: string;
  seedQuality?: string;
  // PRUNING
  pruningType?: string;
  areasAffected?: string;
  // SALES
  quantity?: number;
  pricePerUnit?: number;
  buyerName?: string;
  // SOIL_ANALYSIS
  analysisType?: string;
  phLevel?: number;
  nitrogen?: number;
  phosphorus?: number;
  potassium?: number;
  // TRANSPLANTING
  quantityTransplanted?: number;
  sourceLocation?: string;
  destinationArea?: string;
  // PEST_MONITORING
  pestsFound?: string;
  pestQuantity?: string;
  affectedArea?: number;
  // CROP_INSPECTION
  inspectionFindings?: string;
  cropHealth?: string;
  // PACKING
  quantityPacked?: number;
  packingType?: string;
  // FUNGICIDE_APPLICATION
  fungicideType?: string;
  fungicideQuantity?: number;
  affectedPlants?: string;
  // DISINFECTION
  disinfectantUsed?: string;
  areaDisinfected?: string;
  // IRRIGATION_MAINTENANCE
  maintenanceType?: string;
  partsReplaced?: string;
  maintenanceHours?: number;
}

export interface UpdateActivityInput {
  description?: string;
  completed?: boolean;
  notes?: string;
}

// ============================================================================
// GASTOS
// ============================================================================

export enum ExpenseCategory {
  SEEDS = 'seeds', // Semillas
  FERTILIZERS = 'fertilizers', // Abonos, fertilizantes
  ANIMAL_FEED = 'animal_feed', // Alimentos para animales
  LABOR = 'labor', // Jornales
  IRRIGATION = 'irrigation', // Agua, riego
  TRANSPORT = 'transport', // Transporte
  EQUIPMENT = 'equipment', // Herramientas
  RENTAL = 'rental', // Alquiler de maquinaria
  UTILITIES = 'utilities', // Servicios (energía, agua)
  MAINTENANCE = 'maintenance', // Mantenimiento, reparaciones
  VETERINARY = 'veterinary', // Servicios veterinarios
  OTHER = 'other',
}

export interface Expense {
  id: string;
  farmId: string;
  lotId?: string;
  concept: string;
  category: ExpenseCategory;
  amount: number; // moneda local (COP)
  date: Date;
  receipt?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateExpenseInput {
  farmId: string;
  lotId?: string;
  concept: string;
  category: ExpenseCategory;
  amount: number;
  date: Date;
  receipt?: string;
  // Datos específicos por categoría
  provider?: string; // SEEDS, FERTILIZERS, ANIMAL_FEED
  quantity?: number; // SEEDS, FERTILIZERS, ANIMAL_FEED, EQUIPMENT
  unit?: string; // SEEDS, FERTILIZERS, ANIMAL_FEED
  unitPrice?: number; // SEEDS, FERTILIZERS, ANIMAL_FEED, EQUIPMENT
  workers?: number; // LABOR
  dailyRate?: number; // LABOR
  days?: number; // LABOR, RENTAL
  workDescription?: string; // LABOR
  irrigationType?: string; // IRRIGATION
  waterQuantity?: number; // IRRIGATION
  duration?: number; // IRRIGATION
  destination?: string; // TRANSPORT
  distance?: number; // TRANSPORT
  transportType?: string; // TRANSPORT
  equipmentDescription?: string; // EQUIPMENT
  equipmentName?: string; // RENTAL
  dailyCost?: number; // RENTAL
  rentalPeriod?: string; // RENTAL
  serviceType?: string; // UTILITIES, MAINTENANCE, VETERINARY
  description?: string; // MAINTENANCE, VETERINARY
  notes?: string;
}

// ============================================================================
// PRODUCCIÓN Y COSECHAS
// ============================================================================

export enum QualityRating {
  EXCELLENT = 'excellent',
  GOOD = 'good',
  REGULAR = 'regular',
  POOR = 'poor',
}

export interface Production {
  id: string;
  lotId: string;
  harvestDate: Date;
  quantity: number; // kg
  quality: QualityRating;
  pricePerUnit: number; // COP/kg
  grossIncome: number; // cantidad * pricePerUnit
  totalExpenses: number; // suma de gastos del lote
  netIncome: number; // grossIncome - totalExpenses
  roi: number; // % de retorno
  createdAt: Date;
  updatedAt: Date;
}

export interface RecordProductionInput {
  lotId: string;
  harvestDate: Date;
  quantity: number;
  quality: QualityRating;
  pricePerUnit: number;
}

// ============================================================================
// TRABAJADORES / CONTRATISTAS
// ============================================================================

export interface Contractor {
  id: string;
  farmId: string;
  name: string;
  phone: string;
  dailyRate: number; // COP/día
  specialty?: string; // p.ej. "Cosecha", "Fertilización"
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface WorkRecord {
  id: string;
  activityId: string;
  contractorId: string;
  date: Date;
  daysWorked: number;
  totalCost: number; // daysWorked * dailyRate
  notes?: string;
  createdAt: Date;
}

// ============================================================================
// NOTIFICACIONES
// ============================================================================

export enum NotificationType {
  REMINDER = 'reminder',
  ALERT = 'alert',
  INFO = 'info',
  SUCCESS = 'success',
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  relatedLotId?: string;
  relatedActivityId?: string;
  read: boolean;
  createdAt: Date;
}

// ============================================================================
// DASHBOARDS Y CÁLCULOS
// ============================================================================

export interface FarmStatistics {
  totalLots: number;
  activeLots: number;
  harvestedLots: number;
  totalArea: number;
  totalExpenses: number;
  totalIncome: number;
  averageROI: number;
}

export interface LotProgress {
  lotId: string;
  name: string;
  crop: CropType;
  progress: number; // 0-100 %
  daysToHarvest: number | null;
  status: LotStatus;
}
