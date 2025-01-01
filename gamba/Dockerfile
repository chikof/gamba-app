# Start with the Node.js runtime image
FROM node:23-alpine AS build

# Set the working directory
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy the package and lock files
COPY package.json pnpm-lock.yaml* ./

# Install dependencies with pnpm
RUN pnpm install --frozen-lockfile --prod

# Install curl
RUN apk add --no-cache curl

# Copy the rest of the application files
COPY . .

# Build the Next.js app
RUN pnpm run build

# Use a lightweight production server
FROM node:23-alpine

# Set the working directory
WORKDIR /app

# Copy built files from the previous stage
COPY --from=build /app /app

# Install curl in the final image as well
RUN apk add --no-cache curl

# Set environment variable
ENV NODE_ENV=production

# Expose the port the app runs on
EXPOSE 3000

# Start the app
CMD ["npm", "run", "start"]
