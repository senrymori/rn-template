import { DimensionValue } from 'react-native';

export interface PulseConfig {
  top: DimensionValue;
  left: DimensionValue;
  size: number;
  delay: number;
  fadeIn: number;
  fadeOut: number;
}

export const pulseConfigs: PulseConfig[] = [
  { top: '-10%', left: '-10%', size: 220, delay: 200, fadeIn: 1200, fadeOut: 1800 }, // big - 1 top left
  { top: '2%', left: '55%', size: 320, delay: 400, fadeIn: 1400, fadeOut: 1600 }, // big - 2 top right
  { top: '58%', left: '-30%', size: 280, delay: 200, fadeIn: 1100, fadeOut: 1600 }, // big - 3 bottom left
  { top: '80%', left: '58%', size: 230, delay: 1000, fadeIn: 1600, fadeOut: 2000 }, // big - 3 bottom right
  { top: '62%', left: '55%', size: 80, delay: 800, fadeIn: 1000, fadeOut: 1200 }, // small
  { top: '32%', left: '5%', size: 80, delay: 400, fadeIn: 1200, fadeOut: 1600 },
];
