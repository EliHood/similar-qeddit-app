import { setConfig, validateConfig } from '@core/config'
import currentConfig from '../envs/local.json' // need a way to switch configs based on what environment were on.

/**
 * So maybe a map
 *
 * import {localConfg, prodConfig} from '../envs
 *
 *
 * const currentConfig = {
 *  'local': localConfig,
 *  'prod': prodConfig,
 * }
 *
 * setConfig(currentConfig[whatever logic to determine if user is local or on prod])
 */

// This file is supposed to execute in global browser context
const validationResult = validateConfig(currentConfig)

// Tes, I know that .isOk === false looks strange,
// but TypeScript a bit dumb to narrow the type of validation result otherwise.
if (validationResult.isOk === false) {
    throw new Error(validationResult.message)
}

setConfig(currentConfig)
