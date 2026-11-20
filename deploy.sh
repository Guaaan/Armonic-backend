#!/bin/bash

echo "🚀 Iniciando deploy completo de armonic-backend..."

# 1. Ejecutar migraciones pendientes
echo "🗄️ Ejecutando migraciones de base de datos..."
npm run migration:run

if [ $? -ne 0 ]; then
    echo "❌ Error ejecutando migraciones"
    exit 1
fi

# 2. Build productivo NestJS
echo "📦 Haciendo build productivo de NestJS..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Error en build productivo"
    exit 1
fi

# 3. Parar container existente (si existe)
echo "🛑 Parando container existente..."
sudo docker stop armonic-api 2>/dev/null || true
sudo docker rm armonic-api 2>/dev/null || true

# 4. Eliminar imagen antigua
echo "🗑️ Eliminando imagen antigua..."
sudo docker rmi armonic-api 2>/dev/null || true

# 5. Build nueva imagen
echo "🐳 Construyendo nueva imagen Docker..."
sudo docker build --no-cache -t armonic-api .

if [ $? -ne 0 ]; then
    echo "❌ Error en docker build"
    exit 1
fi

# 6. Ejecutar nuevo container
echo "🏃 Ejecutando nuevo container..."
sudo docker run --restart always -d -p 3000:3000 --name armonic-api --env-file .env armonic-api

if [ $? -ne 0 ]; then
    echo "❌ Error ejecutando container"
    exit 1
fi

echo "✅ Deploy completado!"
echo "🌐 Backend API disponible en: http://localhost:3000"
echo "📋 Para ver logs: sudo docker logs -f armonic-api"
echo "🗄️ Para ver migraciones: npm run migration:show"