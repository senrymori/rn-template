import { FC, useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useAppThemeColors } from '@providers/theme/AppThemeColorsProvider';
import { useThemeConfig } from '@providers/theme/ThemeConfigProvider';
import logoDark from '@assets/images/logo_dark.png';
import logoLight from '@assets/images/logo_light.png';
import { SplashPulseCircle } from './components/SplashPulseCircle.tsx';
import { PulseConfig, pulseConfigs } from './splash-consts';
import { sharedLayoutStyles } from '@ui-kits/shared-styles.ts';
import { getStorageValue, StorageKeysEnum } from '@utils/storage-utils.ts';
import { useAppThemeStyles } from '@providers/theme/AppThemeStylesProvider.tsx';
import { RootNavigationScreenProps } from '@navigation/navigation-types.ts';

function renderPulse(item: PulseConfig, index: number, color: string) {
  return (
    <SplashPulseCircle
      key={index}
      item={item}
      color={color}
    />
  );
}

export const SplashScreen: FC<RootNavigationScreenProps<'Splash'>> = function ({ navigation }) {
  const themeColors = useAppThemeColors();
  const themeStyles = useAppThemeStyles();
  const { isDark, isLight } = useThemeConfig();

  useEffect(() => {
    const timeout = setTimeout(() => {
      const savedPin = getStorageValue(StorageKeysEnum.Pin);
      if (savedPin) {
        navigation.reset({ index: 0, routes: [{ name: 'PinCodeStack', params: { screen: 'PinLogin' } }] });
      } else {
        navigation.reset({ index: 0, routes: [{ name: 'PinCodeStack' }] });
      }
    }, 2000);

    return () => clearTimeout(timeout);
  }, [navigation]);

  return (
    <View style={[sharedLayoutStyles.flex1, sharedLayoutStyles.center, isLight && themeStyles.primary50BG]}>
      {pulseConfigs.map((item, index) => renderPulse(item, index, themeColors.primary400))}
      <Image
        source={isDark ? logoDark : logoLight}
        style={styles.logo}
        resizeMode={'contain'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 120,
  },
});
