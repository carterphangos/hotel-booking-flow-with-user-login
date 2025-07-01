FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production=false

# Copy source code
COPY . .

EXPOSE 3000

# Start the development server
CMD ["npm", "run", "dev"]
