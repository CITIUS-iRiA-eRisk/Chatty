# Chatty the Lab 🧪⚡

**Experiment with AI models side-by-side**  
*Compare outputs, tweak parameters, and discover model behaviors in real-time*

```mermaid
graph TD
    %% Usuario interactuando con el sistema
    User((User)) -->|Interacts with| ClientSide["Frontend Client-Side (Browser)"]
    ClientSide -->|API Requests| ServerSide["Frontend Server-Side"]

    %% Comunicación entre frontend y backend
    ServerSide -->|API Requests| Backend

    %% Backend interactuando con servicios
    Backend -->|Queries| MongoDB[(MongoDB)]
    Backend -->|Vector Search| Qdrant[(Qdrant)]
    Backend -->|AI Processing| Ollama["Ollama AI"]
    Backend -->|Uses| HF["Hugging Face API"]
    
    %% Uso de otras APIs de AI
    Backend -->|Uses| OpenAI["OpenAI API"]
    Backend -->|Uses| Mistral["Mistral API"]
    Backend -->|Uses| Gemini["Gemini API"]

    Ollama -->|Optionally uses| GPU[(GPU Acceleration)]

    %% Agrupar en entorno Docker
    subgraph "Docker Environment"
        ServerSide["Frontend Server-Side"]
        Backend
        MongoDB[(MongoDB)]
        Qdrant[(Qdrant)]
        Ollama["Ollama AI"]
    end


```

[![Docker](https://img.shields.io/badge/Docker-✓-blue?logo=docker)](https://www.docker.com)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)
[![OpenAI](https://img.shields.io/badge/Integrated-OpenAI-purple)](https://openai.com)

![UI Demo](app_screen.png)  
*Settings panel screenshot*

1. **Choose Models** - Local (Ollama) vs Cloud (OpenAI) vs Open Source (HF)
2. **Select Context** - Choose from predefined scenarios or roles
3. **Prompt** - Type or paste your text
4. **Compare** - Side-by-side outputs with token counters

## 🚀 Key Features

- 🔄 **Multi-provider support** - Ollama, OpenAI, Hugging Face, Anthropic
- ⚡ **Real-time comparisons** - View 2-4 model outputs simultaneously
- 🧠 **Context playground** - Select custom contexts for model role impersonation
- 📦 **One-click deploy** - Fully Dockerized stack (MongoDB + Qdrant included)
- 📊 **Export results** - CSV/JSON formats for analysis




## ⚡ Quick Start

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

# 2. Start the stack (requires Docker)
```bash
docker compose up -d
```

# 3. Access at http://localhost:3000

> 💡 **Pro Tip:** Add your OpenAI key in `docker-compose.yml` for GPT-4 comparisons!

## 🛠️ Configuration

### Model Selection
```yaml
- OPENAI_KEY=your_openai_key
- MISTRAL_KEY=your_mistral_key
- GEMINI_KEY=your_gemini_key
```




## 🚨 Need Help?

- 📚 [Full Documentation](https://citius-iria-erisk.github.io/Chatty)  

## 📜 License

MIT License - See [LICENSE](LICENSE).  
*Cloud model access requires separate API keys and compliance with provider terms.*

---

**Happy Experimenting!** 🧑🔬✨  
