#!/usr/bin/env node

/**
 * NPM wrapper for Cakemail MCP Server
 *
 * This wrapper checks for Python/uvx and runs the actual Python-based MCP server.
 */

const { spawn } = require('child_process');
const { platform } = require('os');

// Check if uvx is available
function hasUvx() {
  return new Promise((resolve) => {
    const check = spawn('uvx', ['--version']);
    check.on('error', () => resolve(false));
    check.on('exit', (code) => resolve(code === 0));
  });
}

// Check if Python is available
function hasPython() {
  return new Promise((resolve) => {
    const pythonCmd = platform() === 'win32' ? 'python' : 'python3';
    const check = spawn(pythonCmd, ['--version']);
    check.on('error', () => resolve(false));
    check.on('exit', (code) => resolve(code === 0));
  });
}

async function main() {
  // Try uvx first (recommended)
  if (await hasUvx()) {
    console.error('Starting Cakemail MCP Server via uvx...');
    const server = spawn('uvx', ['cakemail-mcp-server', ...process.argv.slice(2)], {
      stdio: 'inherit',
      shell: platform() === 'win32'
    });

    server.on('exit', (code) => process.exit(code || 0));
    return;
  }

  // Try pipx as fallback
  console.error('uvx not found, attempting pipx...');
  const pipxServer = spawn('pipx', ['run', 'cakemail-mcp-server', ...process.argv.slice(2)], {
    stdio: 'inherit',
    shell: platform() === 'win32'
  });

  pipxServer.on('error', async () => {
    // If pipx fails, check for Python and suggest installation
    if (await hasPython()) {
      console.error('\n❌ Error: Neither uvx nor pipx is installed.');
      console.error('\nPlease install uv (recommended):');
      console.error('  curl -LsSf https://astral.sh/uv/install.sh | sh');
      console.error('\nOr install the Python package directly:');
      console.error('  pip install cakemail-mcp-server');
      console.error('  cakemail-mcp-server');
    } else {
      console.error('\n❌ Error: Python 3.11+ is required but not found.');
      console.error('\nPlease install Python 3.11 or higher:');
      console.error('  https://www.python.org/downloads/');
    }
    process.exit(1);
  });

  pipxServer.on('exit', (code) => process.exit(code || 0));
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
