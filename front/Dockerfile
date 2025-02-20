# Usar imagen oficial de Node.js para frontend
FROM node:18

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias de frontend
RUN npm install

# Copiar el resto de los archivos del frontend
COPY . .

# Construir el frontend
RUN npm run build

# Exponer el puerto 3001
EXPOSE 3001

# Instalar serve y servir correctamente la carpeta dist
RUN npm install -g serve
CMD ["serve", "-s", "/app/dist", "-l", "3001"]