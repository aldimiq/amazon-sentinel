FROM node:20-alpine

WORKDIR /app

# Install dependencies based on package-lock.json
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy source code
COPY . .

# Set environment variables for Next.js binding
ENV HOST=0.0.0.0
ENV PORT=3000

# Expose port 3000
EXPOSE 3000

# Start Next.js in dev mode
CMD ["npm", "run", "dev"]
