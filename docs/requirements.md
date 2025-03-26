## Prerequisites

### 🐋 Docker Installation

#### Para todos los sistemas operativos:
```bash
# Verifica si ya tienes Docker
docker --version && docker compose version
```

# Instalación de Docker

Docker es una plataforma de contenedores que permite empaquetar, distribuir y ejecutar aplicaciones de forma aislada. A continuación, se describe cómo instalar Docker en diferentes sistemas operativos.

## 🖥️ Instalación en Windows

1. **Descargar Docker Desktop** desde la página oficial:  
   👉 [https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/)

2. Ejecutar el instalador y seguir las instrucciones.

3. Reiniciar el equipo si se solicita.

4. Abrir Docker Desktop y verificar que Docker está corriendo ejecutando en una terminal:
   ```sh
   docker --version
   ```

5. Opcional: Para usar Docker sin privilegios de administrador, habilitar la integración con WSL 2.

## 🍏 Instalación en macOS

1. **Descargar Docker Desktop** desde:
   👉 [https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/)

2. Abrir el `.dmg` descargado y arrastrar el icono de Docker a la carpeta de Aplicaciones.

3. Iniciar Docker Desktop desde el Finder o Launchpad.

4. Verificar la instalación con:
   ```sh
   docker --version
   ```

## 🐧 Instalación en Linux

### Ubuntu / Debian

1. **Actualizar el sistema**:
   ```sh
   sudo apt update && sudo apt upgrade -y
   ```

2. **Instalar dependencias**:
   ```sh
   sudo apt install -y ca-certificates curl 
   ```

3. **Agregar la clave GPG de Docker**:
   ```sh
    sudo install -m 0755 -d /etc/apt/keyrings
    sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
    sudo chmod a+r /etc/apt/keyrings/docker.asc
   ```

4. **Agregar el repositorio de Docker**:
   ```sh
   echo \
    "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
    $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" | \
    sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
   ```

5. **Instalar Docker**:
   ```sh
   sudo apt-get update
   sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
   ```

6. **Verificar la instalación**:
   ```sh
   docker --version
   ```

7. **Opcional: Agregar el usuario al grupo Docker** (para ejecutar Docker sin sudo):
   ```sh
   sudo usermod -aG docker $USER
   newgrp docker
   ```
## 🚀 Post-instalación

Para probar que Docker funciona correctamente, ejecuta:
```sh
docker run hello-world
```
Si ves un mensaje indicando que Docker está funcionando, ¡la instalación fue exitosa! 🎉

## 🖥️ Configuración de NVIDIA para Docker

Si tienes una GPU NVIDIA y deseas utilizarla con Docker, sigue estos pasos para instalar el **NVIDIA Container Toolkit**.

### 1. Agregar el repositorio de NVIDIA

#### Ubuntu / Debian
```sh
curl -fsSL https://nvidia.github.io/libnvidia-container/gpgkey | sudo gpg --dearmor -o /usr/share/keyrings/nvidia-container-toolkit-keyring.gpg
curl -s -L https://nvidia.github.io/libnvidia-container/stable/deb/nvidia-container-toolkit.list | sed 's#deb https://#deb [signed-by=/usr/share/keyrings/nvidia-container-toolkit-keyring.gpg] https://#g' | sudo tee /etc/apt/sources.list.d/nvidia-container-toolkit.list
sudo apt update
```

#### Fedora
```sh
sudo dnf config-manager --add-repo https://nvidia.github.io/libnvidia-container/stable/rpm/nvidia-container-toolkit.repo
```

### 2. Instalar el toolkit

```sh
sudo apt install -y nvidia-container-toolkit
sudo nvidia-ctk runtime configure --runtime=docker
sudo systemctl restart docker
```

### 3. Verificar la instalación

Ejecuta un contenedor de prueba para verificar que la GPU es detectada por Docker:
```sh
docker run --rm --gpus all nvidia/cuda:12.2.0-base nvidia-smi
```
Si ves la información de tu GPU en la salida, ¡la configuración ha sido exitosa! 🎉

🔗 Más información: [Guía oficial de NVIDIA](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html)

