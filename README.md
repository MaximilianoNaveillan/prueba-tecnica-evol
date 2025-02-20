# TASK Project

Este es un proyecto de gestión de tareas que incluye un backend en Node.js (usando Express o cualquier framework que elijas) y un frontend en React, con un contenedor Docker para cada parte.

## Estructura del Proyecto

📂 task/  
│── 📂 backend/  
│── 📂front/

## Descripción

Este proyecto consta de dos partes principales:

- **Backend**: Un servicio que maneja la lógica de negocio y la base de datos.
- **Frontend**: Una interfaz de usuario construida con React.

Ambos servicios se ejecutan dentro de contenedores Docker para garantizar que el entorno de desarrollo sea consistente y que la aplicación sea fácil de desplegar.

## Requisitos

Antes de empezar, asegúrate de tener instalados los siguientes programas:

- **Docker**: Para crear y ejecutar los contenedores.
- **Docker Compose**: Para facilitar la configuración y ejecución de los servicios.
- **Node.js** y **npm** (o **yarn**) para el desarrollo local, si prefieres no usar Docker.

## Instalación y Ejecución

1. **Clonar el repositorio**

   Clona este repositorio en tu máquina local:

   ```sh
   git clone https://github.com/MaximilianoNaveillan/prueba-tecnica-evol/tree/main
   cd task
   ```

## Configurar el entorno de desarrollo

Si no tienes Docker y Docker Compose, instálalos desde sus respectivos sitios web.

## Ejecutar los contenedores con Docker Compose

En la raíz del proyecto (TASK/), corre el siguiente comando para levantar todos los servicios:

```bash
docker-compose up --build
```

Este comando construirá los contenedores y levantará los servicios de backend y frontend. El frontend estará disponible en http://localhost:3001, y el backend estará corriendo en http://localhost:3000.

## Rutas de `TasksController`

### `GET /api/tasks`

- **Descripción**: Obtiene todas las tareas.
- **Respuestas**:
  - `200 OK`: Devuelve una lista de tareas.

### `POST /api/tasks`

- **Descripción**: Crea una nueva tarea.
- **Cuerpo de la solicitud**: Objeto con los datos de la tarea (por ejemplo, `title`, `description`, `status`).
- **Respuestas**:
  - `201 Created`: Devuelve la tarea creada.
  - `400 Bad Request`: Si los datos no son válidos.

### `PUT /api/tasks/:id`

- **Descripción**: Actualiza una tarea existente.
- **Parámetros**:
  - `id`: El ID de la tarea a actualizar.
- **Cuerpo de la solicitud**: Objeto con los datos a actualizar (por ejemplo, `title`, `description`, `status`).
- **Respuestas**:
  - `200 OK`: Devuelve la tarea actualizada.
  - `404 Not Found`: Si no se encuentra la tarea con el ID proporcionado.

### `DELETE /api/tasks/:id`

- **Descripción**: Elimina una tarea por su ID.
- **Parámetros**:
  - `id`: El ID de la tarea a eliminar.
- **Respuestas**:
  - `200 OK`: Confirma que la tarea fue eliminada.
  - `404 Not Found`: Si no se encuentra la tarea con el ID proporcionado.

## Variables de Entorno

Este archivo `.env` en task/backend/ contiene las variables de entorno utilizadas en el backend para la configuración de la base de datos y el puerto del servidor.

- `DATABASE_HOST`:

  - **Descripción**: Dirección del host de la base de datos.
  - **Ejemplo**: `localhost` o una URL de conexión remota.

- `DATABASE_PORT`:

  - **Descripción**: Puerto donde la base de datos está escuchando.
  - **Ejemplo**: `5432` para PostgreSQL.

- `DATABASE_USER`:

  - **Descripción**: Nombre de usuario para conectarse a la base de datos.
  - **Ejemplo**: `admin`.

- `DATABASE_PASSWORD`:

  - **Descripción**: Contraseña para el usuario de la base de datos.
  - **Ejemplo**: `secret`.

- `DATABASE_NAME`:

  - **Descripción**: Nombre de la base de datos que se utilizará.
  - **Ejemplo**: `mydatabase`.

- `PORT`:
  - **Descripción**: Puerto en el que se ejecuta el backend.
  - **Ejemplo**: `3000`.

### Ejemplo del archivo `.env`

```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=admin
DATABASE_PASSWORD=secret
DATABASE_NAME=mydatabase
PORT=3000
```
