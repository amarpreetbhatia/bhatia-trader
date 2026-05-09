# Cloudflare Pages Deployment

This script automates building and deploying your Bhatia Traders site to Cloudflare Pages.

## Prerequisites

1. **Cloudflare Account**: Sign up at [cloudflare.com](https://cloudflare.com)
2. **API Token**: Create an API token with Pages permissions
3. **Account ID**: Get your Cloudflare Account ID

## Setup

### 1. Get Your Cloudflare Credentials

**API Token:**
- Go to [Cloudflare Dashboard](https://dash.cloudflare.com/profile/api-tokens)
- Click "Create Token"
- Use the "Edit Cloudflare Workers" template
- Copy the generated token

**Account ID:**
- Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
- Look at the URL: `https://dash.cloudflare.com/XXXXXXX...`
- The Account ID is the string after the last `/`

### 2. Set Environment Variables

Create a `.env` file in the project root:

```bash
# .env
CLOUDFLARE_API_TOKEN=your-api-token-here
CLOUDFLARE_ACCOUNT_ID=your-account-id-here
```

Or export them in your shell:

```bash
export CLOUDFLARE_API_TOKEN="your-api-token-here"
export CLOUDFLARE_ACCOUNT_ID="your-account-id-here"
```

### 3. Create Cloudflare Pages Project

1. Go to [Cloudflare Pages](https://dash.cloudflare.com/pages)
2. Click "Create a project"
3. Choose "Direct upload" (not GitHub)
4. Name it `bhatia-traders` (or update the script's `PROJECT_NAME` variable)
5. Skip the upload for now

## Usage

### Run the Deployment Script

```bash
# Make sure you're in the project root
cd /workspaces/bhatia-trader

# Run the deployment script
./deploy-to-cloudflare.sh
```

### What the Script Does

1. ✅ Checks for required environment variables
2. 📦 Installs dependencies with pnpm
3. 🔨 Builds the project using your workspace configuration
4. ☁️ Deploys to Cloudflare Pages using Wrangler CLI
5. 🌐 Provides the deployment URL

## Custom Domain Setup

After deployment:

1. Go to your Pages project in Cloudflare Dashboard
2. Click "Custom domains"
3. Add `www.bhatia-int.com`
4. Cloudflare will show you the DNS records to add

In your domain registrar, add:
```
Type: CNAME
Name: www
Value: [Cloudflare-provided-target]
TTL: default
```

## Troubleshooting

### "API token not found" Error
- Make sure `CLOUDFLARE_API_TOKEN` is set
- Verify the token has Pages permissions

### "Account ID not found" Error
- Make sure `CLOUDFLARE_ACCOUNT_ID` is set
- Check it's the correct Account ID from your dashboard

### Build Fails
- Make sure all dependencies are installed
- Check that the build command works: `pnpm --filter @workspace/bhatia-traders run build`

### Deployment Fails
- Verify your project name matches in Cloudflare Pages
- Check that your API token has the right permissions

## Manual Deployment (Alternative)

If you prefer to upload manually:

```bash
# Build the project
pnpm --filter @workspace/bhatia-traders run build

# Upload the dist folder to Cloudflare Pages dashboard
# Folder: artifacts/bhatia-traders/dist/public/
```

## Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `CLOUDFLARE_API_TOKEN` | Your Cloudflare API token | Yes |
| `CLOUDFLARE_ACCOUNT_ID` | Your Cloudflare Account ID | Yes |
| `PROJECT_NAME` | Pages project name (default: bhatia-traders) | No |

## Advanced Usage

### Deploy to Different Project
```bash
PROJECT_NAME=my-other-project ./deploy-to-cloudflare.sh
```

### Skip Dependency Installation
Edit the script to comment out the `pnpm install` line if dependencies are already installed.