import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInLeft } from 'react-native-reanimated';

interface NavItem {
  id: string;
  label: string;
  icon: string;
  route: string;
  badge?: number;
  color?: string;
  children?: NavItem[];
}

interface SidebarProps {
  active: string;
  onNavigate: (route: string) => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

const NAV_ITEMS: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'grid-outline',
    route: '/dashboard',
    color: '#52FF94',
  },
  {
    id: 'fincas',
    label: 'Fincas',
    icon: 'map-outline',
    route: '/fincas',
    color: '#10B981',
  },
  {
    id: 'lotes',
    label: 'Lotes',
    icon: 'layers-outline',
    route: '/lots-list',
    color: '#F59E0B',
  },
  {
    id: 'cultivos',
    label: 'Cultivos',
    icon: 'leaf-outline',
    route: '/cultivos',
    color: '#22C55E',
  },
  {
    id: 'ganado',
    label: 'Ganadería',
    icon: 'paw-outline',
    route: '/ganado',
    color: '#A16207',
  },
  {
    id: 'pesca',
    label: 'Pesca',
    icon: 'fish-outline',
    route: '/pesca',
    color: '#0EA5E9',
  },
  {
    id: 'produccion',
    label: 'Producción',
    icon: 'stats-chart-outline',
    route: '/production-dashboard',
    color: '#3B82F6',
    badge: 3,
  },
  {
    id: 'actividades',
    label: 'Actividades',
    icon: 'checkmark-done-outline',
    route: '/activities',
    color: '#06B6D4',
  },
  {
    id: 'calendario',
    label: 'Calendario',
    icon: 'calendar-outline',
    route: '/calendario',
    color: '#8B5CF6',
  },
  {
    id: 'inventario',
    label: 'Inventario',
    icon: 'layers-outline',
    route: '/inventory',
    color: '#EC4899',
  },
  {
    id: 'compras',
    label: 'Compras',
    icon: 'cart-outline',
    route: '/compras',
    color: '#F97316',
  },
  {
    id: 'ventas',
    label: 'Ventas',
    icon: 'cash-outline',
    route: '/sales',
    color: '#22C55E',
  },
  {
    id: 'trabajadores',
    label: 'Trabajadores',
    icon: 'people-outline',
    route: '/trabajadores',
    color: '#6B7280',
  },
  {
    id: 'tareas',
    label: 'Tareas',
    icon: 'checkmark-done-outline',
    route: '/tasks',
    color: '#06B6D4',
  },
  {
    id: 'documentos',
    label: 'Documentos',
    icon: 'document-text-outline',
    route: '/documentos',
    color: '#7C3AED',
  },
  {
    id: 'reportes',
    label: 'Reportes',
    icon: 'bar-chart-outline',
    route: '/reportes',
    color: '#EF4444',
  },
];

export function SidebarNavigation({
  active,
  onNavigate,
  collapsed = false,
  onToggleCollapse,
}: SidebarProps) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <Animated.View
      entering={FadeInLeft.duration(400)}
      style={[
        styles.sidebar,
        collapsed && styles.sidebarCollapsed,
        isMobile && styles.sidebarMobile,
      ]}
    >
      {/* Header */}
      <View style={styles.sidebarHeader}>
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>🌾</Text>
          {!collapsed && <Text style={styles.logoText}>AgroApp</Text>}
        </View>
        {!isMobile && (
          <Pressable onPress={onToggleCollapse} style={styles.collapseButton}>
            <Ionicons
              name={collapsed ? 'chevron-forward' : 'chevron-back'}
              size={18}
              color="#52FF94"
            />
          </Pressable>
        )}
      </View>

      <View style={styles.divider} />

      {/* Main Navigation */}
      <ScrollView
        style={styles.navContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.navSection}>
          {!collapsed && (
            <Text style={styles.sectionLabel}>PRINCIPAL</Text>
          )}

          {NAV_ITEMS.slice(0, 3).map((item) => (
            <Pressable
              key={item.id}
              style={[
                styles.navItem,
                active === item.id && styles.navItemActive,
              ]}
              onPress={() => onNavigate(item.route)}
            >
              <View style={styles.navItemLeft}>
                <Ionicons
                  name={item.icon as any}
                  size={20}
                  color={active === item.id ? '#52FF94' : 'rgba(255,255,255,0.6)'}
                />
                {!collapsed && (
                  <Text
                    style={[
                      styles.navItemText,
                      active === item.id && styles.navItemTextActive,
                    ]}
                  >
                    {item.label}
                  </Text>
                )}
              </View>
              {item.badge && !collapsed && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{item.badge}</Text>
                </View>
              )}
            </Pressable>
          ))}
        </View>

        <View style={styles.navSection}>
          {!collapsed && (
            <Text style={styles.sectionLabel}>OPERACIONES</Text>
          )}

          {NAV_ITEMS.slice(3, 10).map((item) => (
            <Pressable
              key={item.id}
              style={[
                styles.navItem,
                active === item.id && styles.navItemActive,
              ]}
              onPress={() => onNavigate(item.route)}
            >
              <View style={styles.navItemLeft}>
                <Ionicons
                  name={item.icon as any}
                  size={20}
                  color={active === item.id ? '#52FF94' : 'rgba(255,255,255,0.6)'}
                />
                {!collapsed && (
                  <Text
                    style={[
                      styles.navItemText,
                      active === item.id && styles.navItemTextActive,
                    ]}
                  >
                    {item.label}
                  </Text>
                )}
              </View>
              {item.badge && !collapsed && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{item.badge}</Text>
                </View>
              )}
            </Pressable>
          ))}
        </View>

        <View style={styles.navSection}>
          {!collapsed && (
            <Text style={styles.sectionLabel}>ADMINISTRACIÓN</Text>
          )}

          {NAV_ITEMS.slice(10).map((item) => (
            <Pressable
              key={item.id}
              style={[
                styles.navItem,
                active === item.id && styles.navItemActive,
              ]}
              onPress={() => onNavigate(item.route)}
            >
              <View style={styles.navItemLeft}>
                <Ionicons
                  name={item.icon as any}
                  size={20}
                  color={active === item.id ? '#52FF94' : 'rgba(255,255,255,0.6)'}
                />
                {!collapsed && (
                  <Text
                    style={[
                      styles.navItemText,
                      active === item.id && styles.navItemTextActive,
                    ]}
                  >
                    {item.label}
                  </Text>
                )}
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      <View style={styles.divider} />

      {/* Footer */}
      <View style={styles.navFooter}>
        <Pressable style={styles.footerItem} onPress={() => onNavigate('/notificaciones')}>
          <Ionicons
            name="notifications-outline"
            size={20}
            color={active === 'notifications' ? '#52FF94' : 'rgba(255,255,255,0.6)'}
          />
          {!collapsed && <Text style={styles.footerItemText}>Notificaciones</Text>}
        </Pressable>

        <Pressable style={styles.footerItem} onPress={() => onNavigate('/configuracion')}>
          <Ionicons
            name="settings-outline"
            size={20}
            color={active === 'settings' ? '#52FF94' : 'rgba(255,255,255,0.6)'}
          />
          {!collapsed && <Text style={styles.footerItemText}>Configuración</Text>}
        </Pressable>

        <Pressable style={styles.footerItem} onPress={() => onNavigate('/perfil')}>
          <Ionicons
            name="person-outline"
            size={20}
            color={active === 'profile' ? '#52FF94' : 'rgba(255,255,255,0.6)'}
          />
          {!collapsed && <Text style={styles.footerItemText}>Perfil</Text>}
        </Pressable>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    width: 260,
    backgroundColor: '#0B1510',
    borderRightWidth: 1,
    borderRightColor: 'rgba(82,255,148,0.1)',
    flexDirection: 'column',
  },

  sidebarCollapsed: {
    width: 80,
  },

  sidebarMobile: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 1000,
  },

  sidebarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },

  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  logo: {
    fontSize: 24,
  },

  logoText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#52FF94',
  },

  collapseButton: {
    padding: 6,
  },

  divider: {
    height: 1,
    backgroundColor: 'rgba(82,255,148,0.1)',
  },

  navContainer: {
    flex: 1,
    paddingVertical: 8,
  },

  navSection: {
    paddingVertical: 12,
  },

  sectionLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.4)',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    paddingHorizontal: 16,
    marginBottom: 8,
  },

  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginHorizontal: 8,
    borderRadius: 10,
  },

  navItemActive: {
    backgroundColor: 'rgba(82,255,148,0.15)',
    borderLeftWidth: 3,
    borderLeftColor: '#52FF94',
  },

  navItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },

  navItemText: {
    fontSize: 13,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.65)',
  },

  navItemTextActive: {
    fontWeight: '700',
    color: '#52FF94',
  },

  badge: {
    backgroundColor: '#EF4444',
    borderRadius: 6,
    minWidth: 22,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },

  badgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  navFooter: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    gap: 8,
  },

  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },

  footerItemText: {
    fontSize: 13,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.65)',
  },
});
