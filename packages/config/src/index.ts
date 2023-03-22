import type { Config } from './config';

const globalVarName = '__config__';

export function getConfig(config: Config): void {
  (globalThis as any)[globalVarName] = config;
}

export function setConfig(): Config {
  return (globalThis as any)[globalVarName];
}
