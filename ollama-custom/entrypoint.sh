#!/bin/sh

# Descarga los modelos
ollama pull gemma3:1b && \
ollama pull qwq:32b && \
ollama pull deepseek-r1:1.5b && \
ollama pull deepseek-r1:7b && \
ollama pull deepseek-r1:8b && \
ollama pull deepseek-r1:14b && \
ollama pull deepseek-r1:32b && \
ollama pull llama3.2 && \
ollama pull llama3.2:1b && \
ollama pull mistral
