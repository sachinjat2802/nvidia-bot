FROM node:20-slim

WORKDIR /app

# Install dependencies first (for better caching)
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose the default port (Hugging Face uses 7860, Render uses 10000)
ENV PORT=7860
EXPOSE 7860

# Command to run the application using the compiled JS
CMD ["npm", "run", "web"]
