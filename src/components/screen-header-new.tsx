import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface Breadcrumb {
  label: string;
  route?: string;
}

interface ScreenHeaderProps {
  title: string;
  breadcrumbs?: Breadcrumb[];
  rightAction?: {
    icon: string;
    onPress: () => void;
  };
  showBack?: boolean;
}

export function ScreenHeader({
  title,
  breadcrumbs,
  rightAction,
  showBack = true,
}: ScreenHeaderProps) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Top Row - Back & Title & Action */}
      <View style={styles.topRow}>
        {showBack && (
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={28} color="#52FF94" />
          </Pressable>
        )}

        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
        </View>

        {rightAction ? (
          <Pressable onPress={rightAction.onPress} style={styles.actionButton}>
            <Ionicons
              name={rightAction.icon as any}
              size={24}
              color="#52FF94"
            />
          </Pressable>
        ) : (
          <View style={{ width: 28 }} />
        )}
      </View>

      {/* Breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <View style={styles.breadcrumbsContainer}>
          {breadcrumbs.map((crumb, index) => (
            <View key={index} style={styles.breadcrumbItem}>
              {crumb.route ? (
                <Pressable onPress={() => crumb.route && router.push(crumb.route)}>
                  <Text style={styles.breadcrumbLink}>{crumb.label}</Text>
                </Pressable>
              ) : (
                <Text style={styles.breadcrumbText}>{crumb.label}</Text>
              )}

              {index < breadcrumbs.length - 1 && (
                <Text style={styles.breadcrumbSeparator}> / </Text>
              )}
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(82,255,148,0.1)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },

  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  backButton: {
    padding: 4,
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },

  titleContainer: {
    flex: 1,
    marginHorizontal: 12,
  },

  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
  },

  actionButton: {
    padding: 4,
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },

  breadcrumbsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },

  breadcrumbItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  breadcrumbLink: {
    fontSize: 11,
    fontWeight: '600',
    color: '#52FF94',
  },

  breadcrumbText: {
    fontSize: 11,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.6)',
  },

  breadcrumbSeparator: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.4)',
  },
});
