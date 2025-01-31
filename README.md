# 🚀 NestJS Lambda Fintech

Este proyecto es una API **serverless** desarrollada con **NestJS**, desplegada en **AWS Lambda** utilizando **Serverless Framework**. Permite la gestión de **transacciones financieras**, procesando datos desde archivos **CSV almacenados en S3** y guardándolos en una base de datos **MySQL en AWS RDS** mediante **Sequelize**.

---

## 📌 Tecnologías Utilizadas

- **NestJS** – Framework modular de Node.js para aplicaciones escalables.
- **AWS Lambda** – Plataforma serverless para ejecutar la API.
- **Sequelize** – ORM para manejar la base de datos MySQL en AWS RDS.
- **AWS S3** – Almacenamiento de archivos CSV.
- **Serverless Framework** – Herramienta para despliegue en AWS.
- **TypeScript** – Tipado seguro para mejor mantenibilidad.

---


## 🚀 Instalación y Configuración

### 1️⃣ **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/nestjs-lambda-fintech.git
cd nestjs-lambda-fintech
```

### 2️⃣ **Instalar dependencias**
```bash
npm install
```

### 3️⃣ **Configurar variables de entorno**
Crea un archivo `.env` en la raíz con las siguientes variables:
```env
DB_HOST=your-db-host
DB_PORT=3306
DB_USER=your-db-user
DB_PASS=your-db-pass
DB_NAME=your-db-name
AWS_BUCKET_NAME=your-bucket-name
AWS_REGION_=your-region
```

### 4️⃣ **Ejecutar en desarrollo**
```bash
npm run start:dev
```

### 5️⃣ **Ejecutar en modo serverless offline**
```bash
sls offline
```

### 6️⃣ **Desplegar en AWS Lambda**
```bash
sls deploy
```

---

## 📄 API - Endpoints Principales

### 🟢 **Crear una transacción**
```http
POST /transactions/create
```
📥 **Body (JSON)**
```json
{
  "customer_name": "Juan Pérez",
  "amount": 100.50,
  "transaction_type": "DEPOSIT",
  "status": "COMPLETED",
  "transaction_date": "2025-01-30",
  "description": "Depósito inicial"
}
```
📤 **Respuesta (JSON)**
```json
{
  "transaction_id": 1,
  "customer_name": "Juan Pérez",
  "amount": 100.50,
  "transaction_type": "DEPOSIT",
  "status": "COMPLETED",
  "transaction_date": "2025-01-30T00:00:00.000Z",
  "description": "Depósito inicial",
  "createdAt": "2025-01-30T12:00:00.000Z",
  "updatedAt": "2025-01-30T12:00:00.000Z"
}
```

### 🟢 **Listar transacciones**
```http
GET /transactions/all
```
📤 **Respuesta (JSON)**
```json
[
  {
    "transaction_id": 1,
    "customer_name": "Juan Pérez",
    "amount": 100.50,
    "transaction_type": "DEPOSIT",
    "status": "COMPLETED",
    "transaction_date": "2025-01-30T00:00:00.000Z",
    "description": "Depósito inicial"
  }
]
```

### 🟢 **Importar transacciones desde S3**
```http
POST /transactions/import/{fileKey}
```
📌 `fileKey` es el nombre del archivo CSV en S3 (ejemplo: `transactions/transactions.csv`).

---

## ☁️ Despliegue en AWS Lambda

### 1️⃣ **Configurar credenciales de AWS**
```bash
aws configure
```

### 2️⃣ **Deploy con Serverless Framework**
```bash
sls deploy
```
📌 Esto subirá la función Lambda y generará una URL pública.

### 3️⃣ **Obtener la URL de la API**
Después del deploy, revisa la salida en la terminal para obtener la **URL de la API**:
```
Service Information
service: fintech-transactions
stage: production
region: us-east-2
endpoint: https://xyz123.execute-api.us-east-2.amazonaws.com/production
```
✅ La API estará accesible en:
```
https://xyz123.execute-api.us-east-2.amazonaws.com/production/transactions/all
```

---

## 📜 Licencia
Este proyecto está bajo la **Licencia MIT**.

📌 **Autor:** Ing. Andres Navarro

