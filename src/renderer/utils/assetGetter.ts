import path from 'path';

export const isDevelopment =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

export const RESOURCES_PATH = !isDevelopment
  ? path.join(process.resourcesPath, 'assets')
  : path.join(__dirname, '../../../assets');

export const getAssetPath = (...paths: string[]): string => {
  return path.join(RESOURCES_PATH, ...paths);
};
