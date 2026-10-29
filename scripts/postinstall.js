#!/usr/bin/env node
/**
 * postinstall: force-install platform-specific rollup native binding.
 *
 * Workaround for npm bug #4828 — npm ci skips optional native bindings
 * when the lockfile was generated on a different OS (Windows → Linux CI).
 * .npmrc optional-dependencies=true does NOT work reliably with npm ci in
 * npm 10.x for platform-specific optional deps.
 *
 * This script runs AFTER npm ci and explicitly installs the correct
 * @rollup/rollup-<platform> package using --ignore-scripts (no recursion).
 */

const { execSync } = require('child_process');
const os = require('os');

const BINDINGS = {
  linux:  '@rollup/rollup-linux-x64-gnu',
  darwin: os.arch() === 'arm64'
    ? '@rollup/rollup-darwin-arm64'
    : '@rollup/rollup-darwin-x64',
  win32:  '@rollup/rollup-win32-x64-msvc',
};

const platform = os.platform();
const pkg = BINDINGS[platform];

if (!pkg) {
  console.log(`[postinstall] unsupported platform "${platform}" — skipping rollup binding`);
  process.exit(0);
}

// Check if the binding is already present
const fs = require('fs');
const path = require('path');
const bindingPath = path.join(__dirname, 'node_modules', pkg, 'package.json');

if (fs.existsSync(bindingPath)) {
  console.log(`[postinstall] ${pkg} already installed — skipping`);
  process.exit(0);
}

console.log(`[postinstall] installing ${pkg} (npm #4828 workaround)`);
try {
  execSync(`npm install "${pkg}" --no-save --ignore-scripts`, {
    stdio: 'inherit',
  });
  console.log(`[postinstall] ${pkg} installed successfully`);
} catch (e) {
  console.warn(`[postinstall] failed to install ${pkg}:`, e.message);
}
