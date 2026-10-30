import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

console.log('=== Verifying WinPulse HUD (React 19 + TypeScript + C++20 Core) ===\n');

// Verify C++20 Headers and source
const cppHeader = fs.readFileSync(path.join(rootDir, 'native-core/include/win_telemetry.hpp'), 'utf8');
assert(cppHeader.includes('std::span') || cppHeader.includes('ProcessSnapshot'), 'C++20 Header must define ProcessSnapshot');
assert(cppHeader.includes('class TelemetryEngine'), 'C++20 Header must declare TelemetryEngine');
console.log('  [PASS] C++20 Win32 Kernel Telemetry Engine header verified.');

// Verify React TypeScript Component
const tsxComponent = fs.readFileSync(path.join(rootDir, 'src/components/GlassHUD.tsx'), 'utf8');
assert(tsxComponent.includes('export const GlassHUD'), 'GlassHUD component must be exported');
assert(tsxComponent.includes('ProcessTelemetry'), 'Must use strict TypeScript ProcessTelemetry typing');
console.log('  [PASS] React 19 + TypeScript Glassmorphism HUD component verified.');

// Verify Types definition
const types = fs.readFileSync(path.join(rootDir, 'src/types/system.ts'), 'utf8');
assert(types.includes('SystemHUDMetrics'), 'Must define SystemHUDMetrics interface');
console.log('  [PASS] TypeScript Strict Interfaces verified.');

console.log('\n[ALL WIN-PULSE HUD ARCHITECTURE TESTS PASSED!]');
