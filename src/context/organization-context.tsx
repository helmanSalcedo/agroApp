import React, { createContext, useState, useContext, useCallback } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'propietario' | 'administrador' | 'supervisor' | 'ingeniero' | 'contador' | 'trabajador' | 'invitado';
}

export interface Organization {
  id: string;
  name: string;
  logo?: string;
  description?: string;
  location?: string;
  createdBy: string;
  createdAt: Date;
  members: User[];
  fincas: string[];
  totalArea?: number;
}

interface OrganizationContextType {
  currentOrganization: Organization | null;
  organizations: Organization[];
  user: User | null;

  setCurrentOrganization: (org: Organization) => void;
  createOrganization: (org: Omit<Organization, 'id' | 'createdAt' | 'members' | 'fincas'>) => Promise<Organization>;
  inviteUser: (email: string, role: User['role']) => Promise<void>;
  updateOrganization: (orgId: string, data: Partial<Organization>) => Promise<void>;
  deleteOrganization: (orgId: string) => Promise<void>;
  leaveOrganization: (orgId: string) => Promise<void>;
}

const OrganizationContext = createContext<OrganizationContextType | undefined>(undefined);

// Mock data
const MOCK_ORGANIZATIONS: Organization[] = [
  {
    id: 'org_1',
    name: 'Agropecuaria Los Campos',
    logo: '🌾',
    description: 'Finca dedicada a cultivos de maíz y frijol',
    location: 'Cundinamarca',
    createdBy: 'user_1',
    createdAt: new Date('2024-01-15'),
    members: [
      {
        id: 'user_1',
        name: 'Carlos García',
        email: 'carlos@example.com',
        role: 'propietario',
        avatar: '👨‍🌾',
      },
      {
        id: 'user_2',
        name: 'María López',
        email: 'maria@example.com',
        role: 'administrador',
        avatar: '👩‍🌾',
      },
      {
        id: 'user_3',
        name: 'Juan Pérez',
        email: 'juan@example.com',
        role: 'ingeniero',
        avatar: '👨‍💼',
      },
    ],
    fincas: ['finca_1', 'finca_2'],
    totalArea: 150,
  },
  {
    id: 'org_2',
    name: 'Ganadería San José',
    logo: '🐄',
    description: 'Producción de ganado lechero',
    location: 'Boyacá',
    createdBy: 'user_4',
    createdAt: new Date('2024-03-20'),
    members: [
      {
        id: 'user_4',
        name: 'Roberto Sánchez',
        email: 'roberto@example.com',
        role: 'propietario',
        avatar: '👨‍🌾',
      },
    ],
    fincas: ['finca_3'],
    totalArea: 80,
  },
];

export function OrganizationProvider({ children }: { children: React.ReactNode }) {
  const [organizations, setOrganizations] = useState<Organization[]>(MOCK_ORGANIZATIONS);
  const [currentOrganization, setCurrentOrganization] = useState<Organization | null>(
    MOCK_ORGANIZATIONS[0]
  );

  // Mock current user
  const [user] = useState<User>({
    id: 'user_1',
    name: 'Carlos García',
    email: 'carlos@example.com',
    role: 'propietario',
    avatar: '👨‍🌾',
  });

  const createOrganization = useCallback(
    async (orgData: Omit<Organization, 'id' | 'createdAt' | 'members' | 'fincas'>) => {
      const newOrg: Organization = {
        ...orgData,
        id: `org_${Date.now()}`,
        createdAt: new Date(),
        members: [user],
        fincas: [],
      };

      setOrganizations(prev => [...prev, newOrg]);
      return newOrg;
    },
    [user]
  );

  const inviteUser = useCallback(
    async (email: string, role: User['role']) => {
      if (!currentOrganization) return;

      const newMember: User = {
        id: `user_${Date.now()}`,
        name: email.split('@')[0],
        email,
        role,
      };

      setOrganizations(prev =>
        prev.map(org =>
          org.id === currentOrganization.id
            ? { ...org, members: [...org.members, newMember] }
            : org
        )
      );

      setCurrentOrganization({
        ...currentOrganization,
        members: [...currentOrganization.members, newMember],
      });
    },
    [currentOrganization]
  );

  const updateOrganization = useCallback(
    async (orgId: string, data: Partial<Organization>) => {
      setOrganizations(prev =>
        prev.map(org =>
          org.id === orgId ? { ...org, ...data } : org
        )
      );

      if (currentOrganization?.id === orgId) {
        setCurrentOrganization({ ...currentOrganization, ...data });
      }
    },
    [currentOrganization]
  );

  const deleteOrganization = useCallback(async (orgId: string) => {
    setOrganizations(prev => prev.filter(org => org.id !== orgId));

    if (currentOrganization?.id === orgId) {
      setCurrentOrganization(organizations[0] || null);
    }
  }, [currentOrganization, organizations]);

  const leaveOrganization = useCallback(
    async (orgId: string) => {
      setOrganizations(prev =>
        prev.map(org =>
          org.id === orgId
            ? { ...org, members: org.members.filter(m => m.id !== user.id) }
            : org
        )
      );

      if (currentOrganization?.id === orgId) {
        const remaining = organizations.filter(o => o.id !== orgId);
        setCurrentOrganization(remaining[0] || null);
      }
    },
    [currentOrganization, organizations, user.id]
  );

  const value: OrganizationContextType = {
    currentOrganization,
    organizations,
    user,
    setCurrentOrganization,
    createOrganization,
    inviteUser,
    updateOrganization,
    deleteOrganization,
    leaveOrganization,
  };

  return (
    <OrganizationContext.Provider value={value}>
      {children}
    </OrganizationContext.Provider>
  );
}

export function useOrganization() {
  const context = useContext(OrganizationContext);
  if (!context) {
    throw new Error('useOrganization must be used within OrganizationProvider');
  }
  return context;
}
