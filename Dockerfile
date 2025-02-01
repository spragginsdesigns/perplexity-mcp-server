# Generated by https://smithery.ai. See: https://smithery.ai/docs/config#dockerfile
# Use a Node.js image as the base
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package.json tsconfig.json ./

# Install dependencies
RUN npm install

# Copy source files
COPY src ./src

# Build the TypeScript files
RUN npm run build

# Use a separate runtime image
FROM node:18-alpine AS runtime

# Set working directory
WORKDIR /app

# Copy built files from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package.json ./

# Set environment variable for API key
ENV PERPLEXITY_API_KEY=your_api_key_here

# Start the application
CMD ["node", "dist/index.js"]
