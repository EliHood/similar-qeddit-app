import * as c from "./config";

const globalVarName = "__config__";

export function setConfig(config: c.Config): void {
    (globalThis as any)[globalVarName] = config;
}

export function getConfig(): c.Config | undefined {
    const config = (globalThis as any)[globalVarName] as c.Config | undefined;

    if (config === undefined) {
        console.error("Config is not set");
        return undefined;
    }

    const validationResult = validateConfig(config);
    if (!validationResult.isOk) {
        console.error("Current config is invalid: ", validationResult.message);
        return undefined;
    }

    return config;
}

export type ValidationResult<T> =
    | { isOk: true; value: T }
    | { isOk: false; message: string };

export function validateConfig(config: c.Config): ValidationResult<void> {
    try {
        c.config.parse(config);
        return { isOk: true, value: undefined };
    } catch (e: unknown) {
        return { isOk: false, message: (e as Error).toString() };
    }
}

export type Config = c.Config;
