FROM node:20
RUN mkdir -p /app
ENV NODE_ENV production
# Create app directory
WORKDIR /app
# Copy package.json
COPY package*.json ./
# Install dependencies
RUN npm install
# Copy all files
COPY . .
COPY .env ./
WORKDIR /app/webapp
COPY ./webapp/.env ./
RUN npm install
RUN npm run build

WORKDIR /app
# Expose port 5000
EXPOSE 5000
# Run app
CMD ["node","index.js"]
