# Scripts Runner - Extensión VS Code

Una extensión profesional de VS Code que permite ejecutar scripts de `package.json` con un solo clic desde el sidebar, con detección automática del gestor de paquetes.

## 🎯 Características Principales

- ✅ **Detección automática** del gestor de paquetes (npm, pnpm, yarn, bun)
- ✅ **Vista en sidebar** con todos los scripts disponibles
- ✅ **Ejecución con un clic** directamente desde el explorador
- ✅ **Actualización automática** cuando cambia el `package.json`
- ✅ **Status bar** mostrando el gestor de paquetes actual
- ✅ **Soporte multi-workspace**
- ✅ **Interfaz intuitiva** y fácil de usar

## 📸 Capturas de Pantalla

La extensión agrega una nueva sección "Scripts Runner" en el sidebar del explorador, mostrando todos los scripts disponibles de tu `package.json`.

## 🚀 Instalación

### Desde el Marketplace (próximamente)

1. Abre VS Code
2. Ve a la pestaña de Extensiones
3. Busca "Scripts Runner"
4. Haz clic en Instalar

### Desde el código fuente

1. Clona este repositorio
2. Abre la carpeta en VS Code
3. Ejecuta `npm install`
4. Presiona `F5` para abrir una nueva ventana de VS Code con la extensión cargada

## 📖 Uso

### Ejecutar un Script

1. Abre el sidebar del explorador
2. Expande la sección "Scripts Runner"
3. Haz clic en cualquier script para ejecutarlo
4. El script se ejecutará en una terminal integrada

### Refrescar Scripts

- Haz clic en el botón de refrescar (🔄) en la barra de título de la vista
- O usa el comando: `Scripts Runner: Refrescar Scripts`

### Cambiar Gestor de Paquetes

- Haz clic en el botón de gestor de paquetes (📦) en la barra de título
- O haz clic en el status bar item
- Selecciona el gestor deseado (npm, pnpm, yarn, bun)

### Abrir package.json

- Haz clic en el botón de archivo (📄) en la barra de título
- O usa el comando: `Scripts Runner: Abrir package.json`

## ⚙️ Configuración

La extensión se puede configurar desde las opciones de VS Code:

### `scriptsRunner.defaultPackageManager`

Gestor de paquetes por defecto cuando no se puede detectar automáticamente.

- **Valores**: `npm`, `pnpm`, `yarn`, `bun`
- **Por defecto**: `npm`

### `scriptsRunner.autoDetectPackageManager`

Habilita o deshabilita la detección automática del gestor de paquetes.

- **Valores**: `true`, `false`
- **Por defecto**: `true`

## 🎨 Casos de Uso Soportados

La extensión funciona con cualquier proyecto que tenga un `package.json`, incluyendo:

- ✅ **Node.js** - Proyectos estándar de Node.js
- ✅ **React/Vue/Angular** - Frameworks frontend
- ✅ **PHP/Symfony** - Con scripts personalizados en package.json
- ✅ **Go** - Con comandos de compilación definidos
- ✅ **Python/Django** - Con scripts de manage.py
- ✅ **Ruby on Rails** - Con scripts personalizados
- ✅ **Cualquier proyecto** con package.json personalizado

## 🏗️ Arquitectura

La extensión está construida siguiendo principios SOLID:

- **Single Responsibility**: Cada clase tiene una única responsabilidad
- **Open/Closed**: Extensible mediante interfaces
- **Liskov Substitution**: Implementaciones intercambiables
- **Interface Segregation**: Interfaces pequeñas y específicas
- **Dependency Inversion**: Dependencias inyectadas, no instanciadas

## 🧪 Desarrollo

### Requisitos

- Node.js 18+
- TypeScript 5.0+
- VS Code 1.70+

### Comandos Disponibles

```bash
# Instalar dependencias
npm install

# Compilar
npm run compile

# Modo watch (compilación automática)
npm run watch

# Linting
npm run lint

# Formatear código
npm run format

# Ejecutar tests
npm test
```

### Estructura del Proyecto

```
scripts-runner/
├── src/
│   ├── extension.ts              # Entry point
│   ├── core/                     # Lógica principal
│   ├── models/                   # Modelos de datos
│   ├── services/                 # Servicios
│   ├── commands/                 # Comandos
│   ├── utils/                    # Utilidades
│   └── test/                     # Tests
├── package.json                  # Manifest
├── tsconfig.json                 # TypeScript config
└── README.md                     # Documentación
```

## 📝 Licencia

MIT

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 🐛 Reportar Problemas

Si encuentras algún problema, por favor abre un issue en el repositorio con:
- Descripción del problema
- Pasos para reproducir
- Versión de VS Code
- Sistema operativo

## 📧 Contacto

Para preguntas o sugerencias, abre un issue en el repositorio.

---

Hecho con ❤️ para la comunidad de desarrolladores
