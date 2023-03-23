#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');

const defaultConfig = './envs/local.json';

function getArgValue(arg) {
    const argIndex = process.argv.indexOf(arg);
    if (argIndex === -1) {
        return undefined;
    }

    const argValue = process.argv[argIndex + 1];
    if (argValue === undefined) {
        return undefined;
    }

    return argValue;
}

function showHelp() {
    console.log('This script runs the application with the specified config.\n');
    console.log('Usage: ./run --config ./envs/local.json\n');
    console.log(`Default config: ${defaultConfig}\n`);
}

function run() {
    // Show help if --help is passed
    if (process.argv.includes('--help')) {
        showHelp();
        process.exit(0);
    }

    const srcConfig = path.resolve(__dirname, getArgValue('--config') || defaultConfig);
    const targetConfig = path.resolve(__dirname, 'config.json');

    console.log('Running app with the config:', srcConfig);

    // Copy the config to the root of the app
    fs.copyFileSync(srcConfig, targetConfig);

    // Start the app
    const child = spawn('npm', ['start'], { stdio: 'inherit' });

    // Handle graceful shutdown
    process.on('SIGTERM', () => child.kill('SIGTERM'));
    process.on('SIGINT', () => child.kill('SIGINT'));
}

run();
