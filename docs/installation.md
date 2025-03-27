# Installation Guide

## ⚠️ Pre-requisites

**Before proceeding, ensure your system meets these requirements:** 

```plaintext
✅ Docker Engine 24.0+ and Docker Compose 2.20+
✅ 8GB RAM minimum (16GB recommended for local models)
✅ 25GB available disk space
✅ NVIDIA GPU with drivers v535+ (optional for GPU acceleration)
✅ Unix-based OS (Linux/macOS/WSL2 on Windows)
```
**Also ensure to follow the prerequisites tutorial** [Requirements](requirements.md)

## 🚀 Quick Installation

### 1. Create `docker-compose.yaml`

Create a file with this content:

```yaml
services:
  ollama:
    image: manuc1k/demo-inside-the-lab-ollama:latest
    # deploy:
    #   resources:
    #     reservations:
    #       devices:
    #         - driver: nvidia
    #           count: all
    #           capabilities: [gpu]
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:11434/"]
      interval: 30s
      timeout: 20s
      retries: 5
      start_period: 60s

  database:
    image: manuc1k/demo-inside-the-lab-database:latest
    healthcheck:
      test: echo 'db.runCommand("ping").ok' | mongosh localhost:27017/test --quiet
      interval: 20s
      timeout: 10s
      retries: 5
      start_period: 60s

  qdrant:
    image: manuc1k/demo-inside-the-lab-qdrant:latest
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:6333/healthz"]
      interval: 30s
      timeout: 10s
      retries: 10
      start_period: 60s

  backend:
    image: manuc1k/demo-inside-the-lab-backend:latest
    depends_on:
      database:
        condition: service_healthy
      qdrant:
        condition: service_healthy
      ollama:
        condition: service_healthy

  frontend:
    image: manuc1k/demo-inside-the-lab-frontend:latest
    ports:
      - "3000:3000"
    depends_on:
      - backend
```

### 2. Start the Application

```bash
# Start all services with GPU support
docker compose up -d --pull always

# Monitor initialization (wait for all services healthy)
docker compose logs -f
```

### 3. Access the Application

Once all services show as healthy (2-3 minutes):

🌐 Open [http://localhost:3000](http://localhost:3000) in your browser

## 🔍 Verification

Check all services are running:

```bash
docker compose ps
```

Expected output:

```plaintext
NAME                SERVICE             STATUS              PORTS
chatty-ollama-1     ollama              running             
chatty-database-1   database            healthy             27017/tcp
chatty-qdrant-1     qdrant              healthy             6333/tcp, 6334/tcp
chatty-backend-1    backend             running             
chatty-frontend-1   frontend            running             0.0.0.0:3000->3000/tcp
```

## 🛠️ Basic Configuration

### Set API Keys (Optional)
Edit the `docker-compose.yaml` and add under `backend.environment`:

```yaml
- OPENAI_KEY=your_openai_key
- MISTRAL_KEY=your_mistral_key
- GEMINI_KEY=your_gemini_key
```

### 🖥️ GPU Acceleration (Recommended)
⚠️ **Before using:**  
[Configuración de NVIDIA para Docker](requirements.md#🖥️-Configuración-de-NVIDIA-para-Docker)

(Must have NVIDIA drivers v535+ and Docker GPU support)

**Critical for optimal performance**  
Using GPU acceleration reduces Ollama's response time by 5-8x. For NVIDIA GPUs:

```yaml
ollama:
    image: manuc1k/demo-inside-the-lab-ollama:latest
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: all  # Utilizes all available GPUs
              capabilities: [gpu]  # Requires NVIDIA Container Toolkit
```





## ⏳ Next Steps

- [Configure your first experiment](usage.md)
- [Production deployment guide](deployment.md)
- [Troubleshooting common issues](troubleshooting.md)
