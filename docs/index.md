# Welcome to Chatty the Lab

This documentation will guide you through the process of setting up and using our AI model comparison platform.

Chatty the Lab is an experimental playground that lets you:

- Compare multiple AI models side-by-side from different providers (Ollama, Hugging Face, OpenAI, etc.)
- Configure custom context windows and model parameters
- Analyze differences in model behavior through parallel outputs

## Application Architecture

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

## Quick start 
Follow these steps to get Chatty the Lab up and running in minutes: [Installation Guide](installation.md)


