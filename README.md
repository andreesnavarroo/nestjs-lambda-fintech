# 🚀 NestJS Lambda Fintech Transactions

Este proyecto implementa un servicio backend con **NestJS**, diseñado para ejecutarse en **AWS Lambda** mediante **Serverless Framework**. Se integra con **MySQL (RDS)** y **Amazon S3** para el almacenamiento de archivos CSV, y soporta CI/CD con **GitHub Actions** sin exponer claves de AWS.

## 🏗️ Tecnologías Utilizadas

- **NestJS** → Framework para Node.js
- **Serverless Framework** → Despliegue en AWS Lambda
- **MySQL (RDS)** → Base de datos
- **Amazon S3** → Almacenamiento de archivos CSV
- **Sequelize ORM** → Gestión de base de datos con migraciones
- **TypeScript** → Tipado fuerte para el código
- **GitHub Actions** → CI/CD automatizado con autenticación segura mediante OIDC (sin uso de claves de AWS)

---

## 🔧 Instalación Local

### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/nestjs-lambda-fintech.git
cd nestjs-lambda-fintech
```

### 2️⃣ Instalar dependencias
```bash
npm install
```

### 3️⃣ Configurar variables de entorno
Crea un archivo `.env` basado en `.env.example`:
```ini
AWS_REGION=us-east-2
AWS_BUCKET_NAME=fintech-transactions-bucket
DB_HOST=your-rds-endpoint.amazonaws.com
DB_PORT=3306
DB_USER=admin
DB_PASS=yourpassword
DB_NAME=fintech
```

### 4️⃣ Ejecutar en local
Para correr en modo desarrollo:
```bash
npm run start:dev
```
Para emular AWS Lambda localmente:
```bash
npx serverless offline
```

---

## 📦 Migraciones con Sequelize

### Generar una nueva migración
```bash
npx sequelize-cli migration:generate --name create-transactions-table
```

### Aplicar migraciones
```bash
npx sequelize-cli db:migrate
```

---

## 🚀 CI/CD con GitHub Actions

El despliegue en AWS Lambda está automatizado mediante **GitHub Actions** con autenticación segura usando **OIDC**, lo que permite conectarse a AWS sin necesidad de exponer claves de acceso (`AWS_ACCESS_KEY_ID` y `AWS_SECRET_ACCESS_KEY`).

Cada vez que se hace un `push` a `main`, el workflow realiza:
1️⃣ **Instalación de dependencias y compilación del proyecto**
2️⃣ **Autenticación segura con AWS mediante OIDC**
3️⃣ **Carga automática de variables de entorno desde GitHub Secrets**
4️⃣ **Despliegue en AWS Lambda con Serverless Framework**

Para modificar la configuración del workflow, edita el archivo:
📌 `.github/workflows/deploy.yml`

---

## 🛠️ Despliegue Manual en AWS Lambda
Si necesitas desplegar manualmente:
```bash
npx serverless deploy
```
Para eliminar la función de AWS:
```bash
npx serverless remove
```

---

## 📡 Endpoints disponibles
```http
GET    /transactions/all        # Listar transacciones
POST   /transactions/create     # Crear una nueva transacción
POST   /transactions/import/:fileKey  # Importar transacciones desde S3
```

---

## 📜 Licencia
Este proyecto está bajo la licencia MIT.

📌 **Autor:** Ing. Andres Navarro


