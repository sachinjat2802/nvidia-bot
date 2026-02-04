# Build Stage
FROM node:20-slim AS builder

WORKDIR /app

# Copy root dependency manifests
COPY package*.json ./

# Install all dependencies
RUN npm install

# Copy the entire project
COPY . .

# Build the Next.js application
RUN npm run build

# Production Stage
FROM node:20-slim AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=10000

# Copy necessary files from the builder stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
# Only copy src if your app uses it at runtime (e.g., custom server or dynamic imports)
COPY --from=builder /app/src ./src

# Copy the public directory for static assets like logos
COPY --from=builder /app/public ./public

# Expose the application port
EXPOSE 10000

# Start the Next.js server
CMD ["npm", "start"]
