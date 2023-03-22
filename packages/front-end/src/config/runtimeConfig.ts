import { setConfig, validateConfig } from 'config'
import currentConfig from './config.json'

// This file is supposed to execute in global browser context
const validationResult = validateConfig(currentConfig)

 // Tes, I know that .isOk === false looks strange,
 // but TypeScript a bit dumb to narrow the type of validation result otherwise.
if (validationResult.isOk === false) {
    throw new Error(validationResult.message)
}

setConfig(currentConfig)
