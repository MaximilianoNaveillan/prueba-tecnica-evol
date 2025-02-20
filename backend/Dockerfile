# Usar imagen oficial de Node.js
FROM node:18

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el código del backend
COPY . .

# Exponer el puerto de NestJS
EXPOSE 3000

# Comando de inicio
CMD ["npm", "run", "start:dev"]