# Stage 1: Build the app
FROM node:16 AS build

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the source code
COPY . .

# Run build script to generate dist/
RUN npm run build

# Stage 2: Production image
FROM node:16-alpine

WORKDIR /app

# Copy only built files and dependencies from build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules

# Expose the port your app listens on
EXPOSE 3001

# Run the app
CMD ["node", "dist/app.js"]
