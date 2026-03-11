<#
This script installs PostgreSQL on Windows using Chocolatey (if available),
then verifies that psql is available.
#>

param(
    [switch]$Force
)

function Write-ErrorAndExit($message) {
    Write-Host "ERROR: $message" -ForegroundColor Red
    exit 1
}

if (Get-Command psql -ErrorAction SilentlyContinue) {
    Write-Host "PostgreSQL is already installed (psql found)."
    exit 0
}

if (-not (Get-Command choco -ErrorAction SilentlyContinue)) {
    Write-Host "Chocolatey not found. Install it from https://chocolatey.org/install and rerun this script."
    exit 1
}

Write-Host "Installing PostgreSQL via Chocolatey..."
choco install postgresql -y

if (-not (Get-Command psql -ErrorAction SilentlyContinue)) {
    Write-ErrorAndExit "Installation completed but 'psql' is not found. Please restart your terminal and try again."
}

Write-Host "PostgreSQL installed successfully. You can now run 'psql' to connect."