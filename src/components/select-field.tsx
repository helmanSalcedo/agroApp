import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, Pressable, FlatList, Modal, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { Spacing } from '@/constants/theme';

export interface SelectOption {
  label: string;
  value: string | number;
}

interface SelectFieldProps {
  label?: string;
  options: SelectOption[];
  value: string | number | undefined;
  onChange: (value: string | number) => void;
  placeholder?: string;
  inline?: boolean;
  disabled?: boolean;
  color?: string;
}

export function SelectField({
  label,
  options,
  value,
  onChange,
  placeholder = 'Selecciona una opción',
  inline = true,
  disabled = false,
  color = '#52FF94',
}: SelectFieldProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
  const triggerRef = useRef<View>(null);
  const { height: screenHeight } = useWindowDimensions();

  const selectedOption = options.find((o) => o.value === value);

  const handleTriggerPress = () => {
    triggerRef.current?.measureInWindow((x, y, width, height) => {
      setPosition({ top: y + height + 8, left: x, width });
      setShowDropdown(true);
    });
  };

  if (inline) {
    return (
      <Animated.View entering={FadeInDown.duration(400)} style={styles.container}>
        {label && <Text style={styles.label}>{label}</Text>}

        <View style={styles.inlineContainer}>
          {options.map((option) => (
            <Pressable
              key={option.value}
              style={({ pressed }) => [
                styles.inlineButton,
                value === option.value && [styles.inlineButtonActive, { borderColor: color, backgroundColor: `${color}15` }],
                pressed && styles.inlineButtonPressed,
              ]}
              onPress={() => onChange(option.value)}
              disabled={disabled}
            >
              {value === option.value && (
                <Ionicons name="checkmark-circle" size={16} color={color} style={styles.checkIcon} />
              )}
              <Text
                style={[
                  styles.inlineButtonText,
                  value === option.value && [styles.inlineButtonTextActive, { color }],
                ]}
              >
                {option.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </Animated.View>
    );
  }

  return (
    <>
      <View style={styles.container}>
        {label && <Text style={styles.label}>{label}</Text>}

        <View ref={triggerRef} style={styles.triggerWrapper}>
          <Pressable
            style={({ pressed }) => [
              styles.trigger,
              disabled && styles.triggerDisabled,
              pressed && styles.triggerPressed,
              { borderColor: showDropdown ? color : 'rgba(82,255,148,0.15)' },
            ]}
            onPress={handleTriggerPress}
            disabled={disabled}
          >
            <Text style={[styles.triggerText, !selectedOption && styles.triggerPlaceholder]}>
              {selectedOption?.label || placeholder}
            </Text>
            <Ionicons
              name={showDropdown ? "chevron-up" : "chevron-down"}
              size={20}
              color={color}
            />
          </Pressable>
        </View>
      </View>

      {showDropdown && (
        <Modal
          visible={showDropdown}
          transparent
          animationType="none"
          onRequestClose={() => setShowDropdown(false)}
        >
          <Pressable
            style={styles.overlay}
            onPress={() => setShowDropdown(false)}
          >
            <Animated.View
              entering={FadeInDown.duration(200)}
              style={[
                styles.dropdownMenu,
                {
                  top: position.top,
                  left: position.left,
                  width: position.width,
                },
              ]}
            >
              <FlatList
                data={options}
                keyExtractor={(item) => String(item.value)}
                scrollEnabled={options.length > 6}
                style={styles.dropdownList}
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled
                renderItem={({ item }) => (
                  <Pressable
                    style={[
                      styles.dropdownItem,
                      value === item.value && [styles.dropdownItemActive, { backgroundColor: `${color}20` }],
                    ]}
                    onPress={() => {
                      onChange(item.value);
                      setShowDropdown(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.dropdownItemText,
                        value === item.value && [styles.dropdownItemTextActive, { color }],
                      ]}
                    >
                      {item.label}
                    </Text>
                    {value === item.value && (
                      <Ionicons name="checkmark" size={18} color={color} />
                    )}
                  </Pressable>
                )}
              />
            </Animated.View>
          </Pressable>
        </Modal>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.three,
  },

  label: {
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.75)',
    marginBottom: 8,
  },

  triggerWrapper: {
    zIndex: 10,
  },

  inlineContainer: {
    gap: 8,
  },

  inlineButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 11,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(82,255,148,0.15)',
    backgroundColor: 'rgba(82,255,148,0.05)',
    gap: 8,
  },

  inlineButtonPressed: {
    opacity: 0.7,
  },

  inlineButtonActive: {
    borderWidth: 1,
  },

  checkIcon: {
    marginRight: 2,
  },

  inlineButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.7)',
    flex: 1,
  },

  inlineButtonTextActive: {
    fontWeight: '600',
    color: '#52FF94',
  },

  trigger: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 11,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(82,255,148,0.15)',
    backgroundColor: 'rgba(82,255,148,0.05)',
  },

  triggerPressed: {
    opacity: 0.8,
  },

  triggerDisabled: {
    opacity: 0.5,
  },

  triggerText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
  },

  triggerPlaceholder: {
    color: 'rgba(255,255,255,0.4)',
  },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },

  dropdownMenu: {
    position: 'absolute',
    backgroundColor: '#08120D',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(82,255,148,0.2)',
    maxHeight: 280,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
    overflow: 'hidden',
  },

  dropdownList: {
    maxHeight: 280,
  },

  dropdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(82,255,148,0.08)',
  },

  dropdownItemActive: {
    backgroundColor: 'rgba(82,255,148,0.15)',
  },

  dropdownItemText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.85)',
    flex: 1,
  },

  dropdownItemTextActive: {
    fontWeight: '600',
    color: '#52FF94',
  },
});
