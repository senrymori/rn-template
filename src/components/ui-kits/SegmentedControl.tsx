import { FC } from 'react';
import { StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { Typography } from '@ui-kits/Typography/Typography';
import { useAppThemeColors } from '@providers/theme/AppThemeColorsProvider';

interface SegmentedControlProps {
  segments: string[];
  selectedIndex: number;
  onChange: (index: number) => void;
  style?: StyleProp<ViewStyle>;
}

export const SegmentedControl: FC<SegmentedControlProps> = function (props) {
  const themeColors = useAppThemeColors();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: themeColors.backgroundTertiary,
          borderColor: themeColors.border,
        },
        props.style,
      ]}>
      {props.segments.map((segment, index) => {
        const isSelected = index === props.selectedIndex;
        return (
          <TouchableOpacity
            key={index}
            onPress={() => props.onChange(index)}
            style={[
              styles.segment,
              isSelected && {
                backgroundColor: themeColors.background,
                borderColor: themeColors.border,
              },
            ]}>
            <Typography
              size={14}
              weight={isSelected ? 600 : 400}
              color={isSelected ? themeColors.text : themeColors.textSecondary}>
              {segment}
            </Typography>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 10,
    borderWidth: 1,
    padding: 3,
    gap: 3,
  },
  segment: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 7,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'transparent',
  },
});
