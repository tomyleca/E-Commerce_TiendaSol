FROM node:22-alpine

# Configurar variables de entorno

WORKDIR /backend

# Copiar package files
COPY package*.json ./

RUN npm install

# Copiar el resto de los archivos
COPY . .

ENTRYPOINT [ "node","index.js" ]