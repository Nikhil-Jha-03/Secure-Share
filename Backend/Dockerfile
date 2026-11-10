
# Base Image
FROM node:22

# Working directory
WORKDIR /app

# copy package dependency
COPY package*.json ./

# Download pacakges
RUN npm install

COPY . .

EXPOSE 5000

CMD [ "npm", "run", "dev" ]