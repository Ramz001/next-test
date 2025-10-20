
# 📝 Project README

Welcome to the **Next.js** project setup with  **React** ,  **Drizzle ORM** ,  **Valibot** , and a robust logging and monitoring stack. This project is designed for scalable, performant web applications with comprehensive observability. Below is an overview of the setup, including services, configuration, and usage instructions.

---

## 🚀 Project Overview

This project leverages modern tools and services to build a Next.js application with:

* **Next.js** ⚡️: A React framework for server-side rendering, static site generation, and API routes.
* **React** ⚛️: A JavaScript library for building user interfaces.
* **Drizzle ORM** 🗄️: A lightweight, type-safe ORM for SQL databases.
* **Valibot** ✅: A schema validation library for TypeScript-first projects.
* **Logging & Monitoring** 📊: A powerful observability stack with  **Grafana** ,  **Loki** ,  **Prometheus** ,  **OpenTelemetry** , and **Zipkin** for logs, metrics, and tracing.

---

## 🛠️ Tech Stack

* **Frontend & Backend** : Next.js, React
* **Database ORM** : Drizzle ORM
* **Validation** : Valibot
* **Logging** : Pino with Loki transport
* **Monitoring & Observability** :
* **Grafana** 📈: Visualize logs and metrics.
* **Loki** 📜: Store and query logs.
* **Prometheus** 📊: Store and query metrics.
* **OpenTelemetry Collector** 🔍: Collect and export telemetry data.
* **Zipkin** 🔗: Distributed tracing for request tracking.

---

## 📂 Project Structure

text

```
├── docker-compose.yml         # Defines monitoring services (Grafana, Loki, Prometheus, etc.)
├── loki-config.yml           # Loki configuration file
├── prometheus.yml            # Prometheus configuration file
├── otel-collector-config.yml # OpenTelemetry Collector configuration
├── src/
│   ├── lib/
│   │   ├── db.ts            # Drizzle ORM setup
│   │   ├── logger.ts        # Pino logger with Loki transport
│   ├── schema/              # Drizzle schema definitions
├── .env                     # Environment variables
├── README.md                # This file
```

---

## 🐳 Docker Services

The project includes a Docker Compose setup for observability services under the monitoring network.

### 1. Grafana 📈

* **Purpose** : Visualize logs, metrics, and traces.
* **Image** : grafana/grafana:latest
* **Port** : 3001:3000
* **Features** :
* Anonymous access enabled (GF_AUTH_ANONYMOUS_ENABLED=true).
* Admin role for anonymous users (GF_AUTH_ANONYMOUS_ORG_ROLE=Admin).
* **Volume** : grafana-storage for persistent data.
* **Access** : Open http://localhost:3001 to explore dashboards.

### 2. Loki 📜

* **Purpose** : Store and query application logs.
* **Image** : grafana/loki:2.9.2
* **Port** : 3100:3100
* **Configuration** : Uses ./loki-config.yml for custom settings.
* **Volume** : Mounted configuration file for persistence.

### 3. Prometheus 📊

* **Purpose** : Collect and store metrics.
* **Image** : prom/prometheus:latest
* **Port** : 9090:9090
* **Configuration** : Uses ./prometheus.yml for custom settings.
* **Volume** : prometheus-storage for persistent metrics data.

### 4. OpenTelemetry Collector 🔍

* **Purpose** : Collect, process, and export telemetry data (logs, metrics, traces).
* **Image** : otel/opentelemetry-collector:latest
* **Ports** :
* 4317 (gRPC OTLP receiver)
* 4318 (HTTP OTLP receiver)
* 8888 (Prometheus metrics)
* 8889 (Prometheus exporter metrics)
* 13133 (Health check)
* 55679 (zPages)
* **Configuration** : Uses ./otel-collector-config.yml.

### 5. Zipkin 🔗

* **Purpose** : Distributed tracing for tracking requests across services.
* **Image** : openzipkin/zipkin:latest
* **Port** : 9411:9411
* **Access** : Open http://localhost:9411 to view traces.

### 6. Network 🌐

* **Name** : monitoring
* **Driver** : bridge
* All services are connected to this network for seamless communication.

---

## ⚙️ Setup Instructions

### Prerequisites

* **Node.js** (v18 or higher)
* **Docker** and **Docker Compose**
* **pnpm** ,  **npm** , or **yarn** (for package management)
* A database (e.g., PostgreSQL) with a connection URL

### Installation

1. **Clone the Repository** :
   bash

```
   git clone <repository-url>
   cd <project-directory>
```

1. **Install Dependencies** :
   bash

```
   pnpm install
```

1. **Set Up Environment Variables** :

* Create a .env file in the root directory.
* Add the following:
  env

  `DATABASE_URL=<your-database-connection-string> LOKI_HOST=http://loki:3100`
* Replace `<your-database-connection-string>` with your database URL (e.g., postgresql://user:password@localhost:5432/dbname).

1. **Start Monitoring Services** :
   bash

```
   docker-compose up -d
```

1. **Run the Next.js Application** :
   bash

```
   pnpm dev
```

* The app will be available at http://localhost:3000.

---

## 🗄️ Database Setup (Drizzle ORM)

The project uses **Drizzle ORM** for database interactions.

### Configuration

* **File** : src/lib/db.ts
* **Setup** :
  typescript

```
  import { config } from "dotenv";
  import { drizzle } from "drizzle-orm/neon-http";
  import * as schema from "./schema";

  config({ path: ".env" });
  export const db = drizzle(process.env.DATABASE_URL!, { schema });
```

* **Environment Variable** : Ensure DATABASE_URL is set in .env.
* **Schema** : Define your database schema in src/schema/.

### Usage

* Import db from src/lib/db.ts to perform database operations.
* Example:
  typescript

  ```
  import { db } from "@/lib/db";
  import { users } from "@/schema";

  async function getUsers() {
    return await db.select().from(users);
  }
  ```

---

## ✅ Validation (Valibot)

**Valibot** is used for schema validation to ensure data integrity.

### Usage

* Install Valibot:
  bash

  ```
  pnpm add valibot
  ```
* Example Schema:
  typescript

  ```
  import { object, string, minLength } from "valibot";

  const UserSchema = object({
    name: string([minLength(2, "Name must be at least 2 characters")]),
    email: string([email("Invalid email")]),
  });

  // Validate data
  const result = parse(UserSchema, { name: "John", email: "john@example.com" });
  ```

---

## 📜 Logging (Pino + Loki)

The project uses **Pino** with **Loki** for structured logging.

### Configuration

* **File** : src/lib/logger.ts
* **Setup** :
  typescript

```
  import { Logger } from "pino";

  declare global {
    var logger: Logger | undefined;
  }

  export async function register() {
    if (process.env.NEXT_RUNTIME === "nodejs") {
      const pino = (await import("pino")).default;
      const pinoLoki = (await import("pino-loki")).default;

      const transport = pinoLoki({
        host: process.env.LOKI_HOST!,
        batching: true,
        interval: 5,
        labels: { job: "nextjs-app" },
      });

      const logger = pino(transport);
      globalThis.logger = logger;
    }
  }
```

* **Environment Variable** : Ensure LOKI_HOST is set (e.g., http://loki:3100).

### Usage

* Import and use the logger:
  typescript

  ```
  import { logger } from "@/lib/logger";

  logger.info("Application started");
  logger.error({ err: new Error("Something went wrong") }, "An error occurred");
  ```
* Logs are sent to **Loki** and can be visualized in  **Grafana** .

---

## 📊 Monitoring & Observability

### Accessing Services

* **Grafana** : http://localhost:3001 (Dashboards for logs and metrics)
* **Loki** : Logs are stored and queried via Grafana.
* **Prometheus** : http://localhost:9090 (Metrics querying)
* **Zipkin** : http://localhost:9411 (Trace visualization)
* **OpenTelemetry Collector** : Exposes multiple ports for telemetry data.

### Configuration Files

* **Loki** : ./loki-config.yml
* **Prometheus** : ./prometheus.yml
* **OpenTelemetry Collector** : ./otel-collector-config.yml

### Example: Viewing Logs in Grafana

1. Open http://localhost:3001.
2. Add a **Loki** data source (URL: http://loki:3100).
3. Create a dashboard to query logs with labels (e.g., job="nextjs-app").

---

## 🛠️ Development Commands

* **Start Development Server** :
  bash

```
  pnpm dev
```

* **Build for Production** :
  bash

```
  pnpm build
```

* **Start Production Server** :
  bash

```
  pnpm start
```

* **Stop Monitoring Services** :
  bash

```
  docker-compose down
```

---

## 📚 Additional Notes

* **Environment Variables** : Always secure sensitive data (e.g., DATABASE_URL) in production.
* **Scaling** : The monitoring stack is lightweight but can be extended with additional nodes for high-traffic applications.
* **Valibot** : Use for both client-side and server-side validation to ensure data consistency.
* **OpenTelemetry** : Configure additional exporters (e.g., Jaeger) if needed for advanced tracing.

---

Happy coding! 🚀
