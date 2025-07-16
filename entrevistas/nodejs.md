# Node.js Interview Topics

## Core NodeJs

### Basic

- Core JavaScript Basics (Object, Prototype, Closure, Context, Inheritance)
- NPM (Package Structure, CLI commands, NPM Scripts, semantic versioning, shrinkwrap, package-lock)
- NodeJS CLI (Usage, Options, Environment Variables)
- NodeJS Modules (Standard syntax, ES6 syntax, Module Load System, Global Scope)
- Event Loop (phases, tasks and microtasks, libUV)
- NodeJS Events (sync and async event processing)
- Async programming (callback, promises, generators, async/await)
- NodeJs API (File System API, Stream API, Timer API, Path API)

### Intermediate

- Module publishing (private registry, scoped packages)
- NodeJS Web API Architecture (RPC, REST, GraphQL, HATEOAS)
- NodeJS Network (HTTP API, HTTP protocol, CORS, HTTPS, TLS, UDP, HTTP/2, SSL, caching)
- Error Handling (Error class, custom errors, error logging, async error events)
- Testing (Unit testing, system testing, integration testing, stress testing, E2E)
- Patterns and Principles (GoF, SOLID, architectural patterns - layered, microservices, Flux, event-driven)
- High load operation (child processes, event splitting)

### Advanced

- Serverless (AWS Lambda, Azure functions or Google CloudFunctions, Pros and Cons)
- V8 (workflow, optimizations)

## Frameworks

### Basic

- Framework - Concepts, Configuration (Hapi / Express / Koa/ Nest.JS / Feathers.JS)

### Intermediate

- Framework - Routing (Hapi / Express / Koa / Nest.JS / Feathers.JS)
- Framework - Middlewares (Hapi / Express / Koa / Nest.JS / Feathers.JS)
- Framework - Error handling (Hapi / Express / Koa / Nest.JS / Feathers.JS)

### Advanced

- Framework - Optimizations (Hapi / Express / Koa / Nest.JS / Feathers.JS)

## Other

### Tools

- NVM
- Code style (ESLint, Style guide)
- JSDoc
- Swagger
- Containerization (docker, kubernetes, clusterization, deployment, IaaS)
- Debugging, profiling, monitoring, memory leaks, GC

### Security

- Authorization (OAuth)
- Authentication (HTTP, JWT, Passport)
- Npm audit, npm check, 3rd party security services (snyk etc.)
- Hacker attacks (Man in the middle), OWASP

## Bonus

- NodeJS API (Crypto API, Process API, Cluster API)
- NodeJS Queue (RabbitMQ, Kafka)
- NodeJS Native Extensions, WebAssembly
- Framework - Templating (Hapi/Express/Koa/Nest.JS/Feathers.JS)
- WebSockets, IP sockets, SocketIO
- Data Bases (Mongo, Redis, SQL, No SQL, ORM, ODM)
- Visualization (Kibana, Grafana, Graphite, Prometheus or Zabbix)
- Process managers (PM2 etc)
- IaC concept (Terraform, CloudFormation)
- Helmet

---

# 🧠 Guía avanzada de Node.js

Una lista curada de temas esenciales y avanzados de Node.js para desarrolladores con experiencia que desean dominar su núcleo y entorno de ejecución.

---

## 🧰 Núcleo de Node.js (Core Internals)

### ✅ Ya conocidos:

- `process`
- `worker_threads`
- `child_process`
- `cluster`
- `streams`, `buffers`, `pipe`, `pipeline`

### 📚 Para profundizar:

- 🔄 **Event Loop** (`nextTick`, `setImmediate`, `timers`, `promises`)
- ⚙️ **Timers Phase vs Check Phase**
- 🔧 **Async Hooks** (seguimiento del ciclo de vida async)
- 🔀 **Task queues vs Microtasks**
- 🧵 **Libuv internals** (opcional pero útil)

---

## 🌐 Redes y Servidores

- 🌐 `http`, `https`, `http2` (crear servidores sin frameworks)
- 🔌 `net` y `tls` para sockets TCP y conexiones seguras
- 📡 `dgram` (UDP sockets)
- 🧭 Servidores HTTP personalizados (sin Express)
- 🌍 CORS y manejo manual de headers

---

## 📁 Sistema de Archivos

- 📂 `fs` y `fs.promises`
- ⌛ `fs.watch`, `fs.watchFile`, `chokidar`
- 🧱 Streams de archivo (`createReadStream`, `createWriteStream`)
- 🧪 Uso combinado de streams y archivos (logs, uploads, CSV)

---

## 🔐 Seguridad

- 🧾 `crypto` (hash, HMAC, AES, JWT)
- 🔏 `tls.createSecureContext`
- 🛡️ Protección contra DoS, límites de payload
- 📦 Seguridad de dependencias (`npm audit`, `snyk`, etc.)

---

## ⚙️ CLI y Sistema Operativo

- 🖥️ `readline`, `tty`, `console`, `inquirer` (CLIs)
- 🛠️ `os` (RAM, CPU, hostname, etc.)
- ⏳ `perf_hooks` para benchmarking
- 📈 `v8.getHeapStatistics()`, profiling

---

## 📦 Módulos y Ecosistema

- 🗂️ `require`, `import`, `module.exports`, `__dirname`, `import.meta.url`
- 📜 CommonJS vs ES Modules
- 🔄 Cache de módulos (`require.cache`)
- ✋ `global`, `globalThis`
- 🧩 Anatomía de un paquete de NPM

---

## 🧪 Testing y Depuración

- 🧪 `assert`, `node:test`, `jest`, `tap`
- 🐛 Debugging: `--inspect`, `debugger`, `ndb`, VSCode
- 📊 Coverage: `c8`, `nyc`
- 🔍 Logging: `console`, `pino`, `winston`

---

## 🛠️ Buenas Prácticas de Arquitectura

- 🔌 Middleware sin frameworks
- 🌲 Logging estructurado (nivelado, JSON)
- ⛓️ Control centralizado de errores
- 🧹 Gestión de recursos (`.close()`, `.destroy()`)
- 🧼 Clean exit (`SIGINT`, `SIGTERM`)
- 🔄 Reload sin downtime (`cluster`, `pm2`)

---

## 🔭 Extras Avanzados

- 📶 Backpressure en streams
- 🧪 V8 coverage API
- 🔁 Hot Module Reloading sin Webpack
- 📍 WebAssembly en Node.js
- 🔗 `SharedArrayBuffer` y `Atomics` con `worker_threads`

---

## 🤔 Ruta según intereses

| Interés                  | Tema sugerido                                     |
| ------------------------ | ------------------------------------------------- |
| Alto rendimiento         | `streams`, `worker_threads`, `perf_hooks`         |
| Desarrollo de CLI        | `readline`, `inquirer`, `chalk`, `fs`, `path`     |
| Bajo nivel del sistema   | `net`, `dgram`, `tls`, `os`, `v8`                 |
| Seguridad y cifrado      | `crypto`, `tls`, `env vars` seguras               |
| Infraestructura y devops | `pm2`, clustering, graceful shutdown, `logrotate` |

---
