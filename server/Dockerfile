FROM node:16.1.0

WORKDIR /app

# Add package file
COPY package*.json ./

# Install deps
RUN npm i

# Copy source
COPY src ./src
COPY tsconfig.json ./tsconfig.json

# Build dist
RUN npm run build

EXPOSE 5000

CMD npm run start