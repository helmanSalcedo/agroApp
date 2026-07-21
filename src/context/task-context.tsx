import React, { createContext, useContext, useState } from 'react';

export type TaskPriority = 'baja' | 'media' | 'alta' | 'urgente';
export type TaskStatus = 'pendiente' | 'en-progreso' | 'completada' | 'cancelada';
export type ReminderFrequency = 'una-vez' | 'diaria' | 'semanal' | 'mensual';

export interface Reminder {
  id: string;
  taskId: string;
  type: 'notificacion' | 'email' | 'sms';
  time: string; // HH:mm
  frequency: ReminderFrequency;
  enabled: boolean;
}

export interface Task {
  id: string;
  organizationId: string;
  farmId?: string;
  lotId?: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignedTo: string; // userId
  category: 'cultivo' | 'animal' | 'inventario' | 'general' | 'mantenimiento';
  dueDate: string; // YYYY-MM-DD
  createdAt: string;
  updatedAt: string;
  reminders: Reminder[];
  attachments?: string[];
  completedAt?: string;
  progress?: number; // 0-100
}

interface TaskContextType {
  tasks: Task[];
  upcomingTasks: Task[];
  overdueTasks: Task[];
  createTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  completeTask: (id: string) => void;
  cancelTask: (id: string) => void;
  addReminder: (taskId: string, reminder: Omit<Reminder, 'id'>) => void;
  removeReminder: (taskId: string, reminderId: string) => void;
  updateReminder: (taskId: string, reminderId: string, updates: Partial<Reminder>) => void;
  getTasksByFarm: (farmId: string) => Task[];
  getTasksByStatus: (status: TaskStatus) => Task[];
  getTasksByPriority: (priority: TaskPriority) => Task[];
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

const MOCK_TASKS: Task[] = [
  {
    id: 'task-1',
    organizationId: 'org-1',
    farmId: 'farm-1',
    lotId: 'lot-1',
    title: 'Fertilización del Lote Alto',
    description: 'Aplicar fertilizante NPK 10-10-10 en el lote alto. Verificar humedad del suelo antes de aplicar.',
    status: 'en-progreso',
    priority: 'alta',
    assignedTo: 'user-2',
    category: 'cultivo',
    dueDate: '2026-07-22',
    createdAt: '2026-07-15T10:00:00Z',
    updatedAt: '2026-07-19T14:30:00Z',
    progress: 60,
    reminders: [
      {
        id: 'reminder-1',
        taskId: 'task-1',
        type: 'notificacion',
        time: '07:00',
        frequency: 'una-vez',
        enabled: true,
      },
    ],
  },
  {
    id: 'task-2',
    organizationId: 'org-1',
    farmId: 'farm-1',
    lotId: 'lot-2',
    title: 'Control de maleza - Lote Bajo',
    description: 'Realizar deshierbe manual en el lote bajo. Usar herramientas apropiadas.',
    status: 'pendiente',
    priority: 'media',
    assignedTo: 'user-3',
    category: 'cultivo',
    dueDate: '2026-07-23',
    createdAt: '2026-07-18T11:00:00Z',
    updatedAt: '2026-07-18T11:00:00Z',
    reminders: [
      {
        id: 'reminder-2',
        taskId: 'task-2',
        type: 'notificacion',
        time: '06:00',
        frequency: 'diaria',
        enabled: true,
      },
    ],
  },
  {
    id: 'task-3',
    organizationId: 'org-1',
    farmId: 'farm-1',
    title: 'Revisión de riego automático',
    description: 'Verificar estado de tuberías y aspersores. Calibrar sistema de riego.',
    status: 'pendiente',
    priority: 'alta',
    assignedTo: 'user-1',
    category: 'mantenimiento',
    dueDate: '2026-07-20',
    createdAt: '2026-07-17T09:00:00Z',
    updatedAt: '2026-07-17T09:00:00Z',
    reminders: [
      {
        id: 'reminder-3',
        taskId: 'task-3',
        type: 'notificacion',
        time: '08:00',
        frequency: 'una-vez',
        enabled: true,
      },
    ],
  },
  {
    id: 'task-4',
    organizationId: 'org-1',
    farmId: 'farm-2',
    title: 'Inspección de ganado',
    description: 'Revisar salud general del rebaño. Aplicar vacunas si es necesario.',
    status: 'completada',
    priority: 'alta',
    assignedTo: 'user-4',
    category: 'animal',
    dueDate: '2026-07-18',
    createdAt: '2026-07-16T07:00:00Z',
    updatedAt: '2026-07-18T15:00:00Z',
    completedAt: '2026-07-18T14:30:00Z',
    reminders: [],
  },
  {
    id: 'task-5',
    organizationId: 'org-1',
    title: 'Actualizar inventario de semillas',
    description: 'Contar y registrar todas las semillas disponibles en bodega.',
    status: 'pendiente',
    priority: 'baja',
    assignedTo: 'user-5',
    category: 'inventario',
    dueDate: '2026-07-25',
    createdAt: '2026-07-19T10:00:00Z',
    updatedAt: '2026-07-19T10:00:00Z',
    reminders: [
      {
        id: 'reminder-5',
        taskId: 'task-5',
        type: 'email',
        time: '09:00',
        frequency: 'semanal',
        enabled: true,
      },
    ],
  },
  {
    id: 'task-6',
    organizationId: 'org-1',
    title: 'Revisión de costos mensuales',
    description: 'Analizar y categorizar todos los gastos del mes. Preparar reporte.',
    status: 'pendiente',
    priority: 'media',
    assignedTo: 'user-1',
    category: 'general',
    dueDate: '2026-07-30',
    createdAt: '2026-07-19T11:00:00Z',
    updatedAt: '2026-07-19T11:00:00Z',
    reminders: [],
  },
];

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);

  const createTask = (newTask: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const task: Task = {
      ...newTask,
      id: `task-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTasks(prev => [...prev, task]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id
          ? { ...task, ...updates, updatedAt: new Date().toISOString() }
          : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const completeTask = (id: string) => {
    updateTask(id, {
      status: 'completada',
      completedAt: new Date().toISOString(),
      progress: 100,
    });
  };

  const cancelTask = (id: string) => {
    updateTask(id, { status: 'cancelada' });
  };

  const addReminder = (taskId: string, reminder: Omit<Reminder, 'id'>) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId
          ? {
              ...task,
              reminders: [
                ...task.reminders,
                { ...reminder, id: `reminder-${Date.now()}` },
              ],
            }
          : task
      )
    );
  };

  const removeReminder = (taskId: string, reminderId: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId
          ? {
              ...task,
              reminders: task.reminders.filter(r => r.id !== reminderId),
            }
          : task
      )
    );
  };

  const updateReminder = (taskId: string, reminderId: string, updates: Partial<Reminder>) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId
          ? {
              ...task,
              reminders: task.reminders.map(r =>
                r.id === reminderId ? { ...r, ...updates } : r
              ),
            }
          : task
      )
    );
  };

  const getTasksByFarm = (farmId: string) => {
    return tasks.filter(task => task.farmId === farmId);
  };

  const getTasksByStatus = (status: TaskStatus) => {
    return tasks.filter(task => task.status === status);
  };

  const getTasksByPriority = (priority: TaskPriority) => {
    return tasks.filter(task => task.priority === priority);
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingTasks = tasks.filter(task => {
    if (task.status === 'completada' || task.status === 'cancelada') return false;
    const dueDate = new Date(task.dueDate);
    dueDate.setHours(0, 0, 0, 0);
    return dueDate >= today && dueDate <= new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
  }).sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

  const overdueTasks = tasks.filter(task => {
    if (task.status === 'completada' || task.status === 'cancelada') return false;
    const dueDate = new Date(task.dueDate);
    dueDate.setHours(0, 0, 0, 0);
    return dueDate < today;
  }).sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

  return (
    <TaskContext.Provider
      value={{
        tasks,
        upcomingTasks,
        overdueTasks,
        createTask,
        updateTask,
        deleteTask,
        completeTask,
        cancelTask,
        addReminder,
        removeReminder,
        updateReminder,
        getTasksByFarm,
        getTasksByStatus,
        getTasksByPriority,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskContext() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext debe usarse dentro de TaskProvider');
  }
  return context;
}
