FROM node:20-alpine AS builder

WORKDIR /app

# Install ALL dependencies (including devDependencies for TypeScript)
COPY package*.json ./
RUN npm ci

# Copy source and build TypeScript

COPY . .
RUN npm run build

# Prune dev dependencies for production
RUN npm prune  --production

# --- Production Stage ---
FROM node:20-alpine

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

COPY --from=builder --chown=appuser:appgroup /app/dist ./dist
COPY --from=builder --chown=appuser:appgroup /app/node_modules ./node_modules
COPY --chown=appuser:appuser package*.jon ./

USER appuser
EXPOSE 10000

ENV NODE_ENV=production

CMD [ "node", "dist/server.ts" ]