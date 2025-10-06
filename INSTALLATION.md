# Installation Guide

## For End Users (After PyPI Publication)

### ⭐ Easiest Method: Using `claude mcp add` (Recommended)

**One-line installation for Claude Code/Desktop:**

```bash
# Option 1: Using npx (recommended - works for everyone!)
claude mcp add cakemail-api-docs -- npx cakemail-api-docs

# Option 2: Using uvx (Python developers)
claude mcp add cakemail-api-docs -- uvx cakemail-api-docs-mcp

# Option 3: After npm install
npm install -g cakemail-api-docs
claude mcp add cakemail-api-docs cakemail-api-docs

# Option 4: After pip install
pip install cakemail-api-docs-mcp
claude mcp add cakemail-api-docs cakemail-api-docs-mcp
```

That's it! The `claude mcp add` command automatically:
- Adds the server to your Claude config
- Sets up the correct paths
- Restarts Claude if needed

### Alternative: Manual Installation

**Step 1: Install the package**

```bash
# Install from PyPI
pip install cakemail-api-docs-mcp

# Or with pipx (recommended for CLI tools)
pipx install cakemail-api-docs-mcp
```

**Step 2: Configure Claude Desktop**

Edit `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "cakemail": {
      "command": "cakemail-api-docs-mcp"
    }
  }
}
```

**Step 3: Restart Claude Desktop**

### Using uvx (No Installation Required)

```json
{
  "mcpServers": {
    "cakemail": {
      "command": "uvx",
      "args": ["cakemail-api-docs-mcp"]
    }
  }
}
```

With `uvx`, you don't even need to install - it downloads and runs automatically!

---

## For Developers (Local Development)

### Development Installation

```bash
# Clone the repository
git clone https://github.com/cakemail/cakemail-api-docs-mcp.git
cd cakemail-api-docs-mcp

# Install in development mode
uv pip install -e ".[dev]"
```

### Claude Desktop Configuration (Development)

```json
{
  "mcpServers": {
    "cakemail": {
      "command": "uv",
      "args": [
        "run",
        "--directory",
        "/path/to/cakemail-api-docs-mcp",
        "python",
        "-m",
        "cakemail_mcp"
      ],
      "env": {
        "LOG_LEVEL": "DEBUG"
      }
    }
  }
}
```

---

## Comparison: Installation Methods

### Current (Development Mode)
**Complex manual setup:**
```bash
uv pip install -e ".[dev]"
# Then manually edit config file with long paths
```

### After PyPI - Method 1: `claude mcp add` ⭐
**One command:**
```bash
claude mcp add cakemail-api-docs -- npx cakemail-api-docs
```
Done! No config file editing needed.

### After PyPI - Method 2: Manual
**Traditional approach:**
```bash
pip install cakemail-api-docs-mcp
# Then add to config file
```

### After PyPI - Method 3: npx (No Install)
**Automatic download:**
```json
{
  "mcpServers": {
    "cakemail-api-docs": {
      "command": "npx",
      "args": ["cakemail-api-docs"]
    }
  }
}
```

**Recommendation:** Use `claude mcp add cakemail-api-docs -- npx cakemail-api-docs` for the simplest experience!

---

## Configuration Options

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `LOG_LEVEL` | Logging level (DEBUG, INFO, WARNING, ERROR) | `INFO` |

**Note:** The server includes a bundled OpenAPI spec. No additional configuration is needed for basic usage.

---

## Verification

After installation, verify it works:

```bash
# Test the command
cakemail-api-docs-mcp --version

# Run the server manually (Ctrl+C to stop)
cakemail-api-docs-mcp
```

In Claude Desktop, you should see a 🔌 icon when connected.

---

## Uninstallation

```bash
# If installed with pip
pip uninstall cakemail-api-docs-mcp

# If installed with pipx
pipx uninstall cakemail-api-docs-mcp
```

Then remove the configuration from `claude_desktop_config.json`.

---

## System Requirements

- Python 3.11 or higher
- macOS, Linux, or Windows
- Claude Desktop (for MCP integration)

---

## Troubleshooting

### Command not found: cakemail-api-docs-mcp

Make sure the package is installed:
```bash
pip list | grep cakemail-api-docs-mcp
```

If using pipx, ensure pipx is in your PATH:
```bash
pipx list
```

### Claude Desktop not connecting

1. Check Claude Desktop logs: `~/Library/Logs/Claude/mcp*.log`
2. Verify JSON syntax in config file
3. Restart Claude Desktop completely (Cmd+Q)

For more help, see [TESTING.md](./TESTING.md).
