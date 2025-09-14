# Multi-stage build for minimal production image
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./
# Install deps (npm ci if lockfile present else npm install)
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi
COPY . .
RUN npm run build

# Production stage: serve with a tiny static HTTP server
FROM node:22-alpine AS runtime
WORKDIR /app
# Install a very small static server
RUN npm install --no-save serve@14.2.3
ENV NODE_ENV=production
# Copy build output only
COPY --from=build /app/dist ./dist
EXPOSE 8080
ENV PORT=8080
CMD ["npx", "serve", "-s", "dist", "-l", "8080"]
