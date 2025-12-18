FROM node:20-alpine

WORKDIR /app

# Install dependencies based on package-lock.json
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Expose port 3000
EXPOSE 3000

# Start Next.js in dev mode
CMD ["npm", "run", "dev"]
