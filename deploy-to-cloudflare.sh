#!/bin/bash
# deploy-to-cloudflare.sh
# Script to build and deploy Bhatia Traders to Cloudflare Pages

set -e  # Exit on any error

# Configuration - Update these variables
PROJECT_NAME="bhatia-traders"  # Your Cloudflare Pages project name
BUILD_DIR="artifacts/bhatia-traders/dist/public"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Starting deployment to Cloudflare Pages${NC}"

# Check if required environment variables are set
if [ -z "$CLOUDFLARE_API_TOKEN" ]; then
    echo -e "${RED}❌ Error: CLOUDFLARE_API_TOKEN environment variable is not set${NC}"
    echo "Get your API token from: https://dash.cloudflare.com/profile/api-tokens"
    echo "Use the 'Edit Cloudflare Workers' template"
    exit 1
fi

if [ -z "$CLOUDFLARE_ACCOUNT_ID" ]; then
    echo -e "${RED}❌ Error: CLOUDFLARE_ACCOUNT_ID environment variable is not set${NC}"
    echo "Find your Account ID in: https://dash.cloudflare.com/ (in the URL or account settings)"
    exit 1
fi

# Check if pnpm is available
if ! command -v pnpm &> /dev/null; then
    echo -e "${RED}❌ Error: pnpm is not installed${NC}"
    exit 1
fi

# Check if wrangler is available
if ! command -v wrangler &> /dev/null && ! npx wrangler --version &> /dev/null; then
    echo -e "${YELLOW}⚠️  Wrangler CLI not found, installing...${NC}"
    npm install -g wrangler
fi

echo -e "${YELLOW}📦 Installing dependencies...${NC}"
pnpm install --frozen-lockfile

echo -e "${YELLOW}🔨 Building the project...${NC}"
pnpm --filter @workspace/bhatia-traders run build

# Check if build output exists
if [ ! -d "$BUILD_DIR" ]; then
    echo -e "${RED}❌ Error: Build directory '$BUILD_DIR' not found${NC}"
    exit 1
fi

echo -e "${YELLOW}☁️  Deploying to Cloudflare Pages...${NC}"
echo "Project: $PROJECT_NAME"
echo "Build dir: $BUILD_DIR"

# Deploy to Cloudflare Pages
npx wrangler pages deploy "$BUILD_DIR" \
    --project-name="$PROJECT_NAME" \
    --compatibility-date=2024-01-01 \
    --skip-caching

echo -e "${GREEN}✅ Deployment completed successfully!${NC}"
echo -e "${GREEN}🌐 Your site should be available at: https://$PROJECT_NAME.pages.dev${NC}"
echo -e "${YELLOW}📝 Don't forget to add your custom domain in Cloudflare Pages settings${NC}"