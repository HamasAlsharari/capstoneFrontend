# Base image
FROM node:20

# Set working directory inside the container
WORKDIR /app

# Copy dependency files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the port Vite uses
EXPOSE 5173

# Default command to start the dev server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]