// This file is a JavaScript wrapper for seed-db-impl.ts
// It compiles the TypeScript file using ts-node and executes it

// Use ESM syntax for importing
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get the current script directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Run ts-node directly to execute the TypeScript file
const tsNodeProcess = spawn('npx', ['ts-node', join(__dirname, 'seed-db-impl.ts')], {
  stdio: 'inherit',
  shell: true
});

// Handle process completion
tsNodeProcess.on('close', (code) => {
  process.exit(code);
});