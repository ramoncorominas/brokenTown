# A11Y Conf Automation Playground

Este repositorio está diseñado para experimentar con Deque AXE Core en preparación para el taller sobre pruebas automatizadas de accesibilidad como parte de la conferencia de accessibilidad A11YConf. Usa este espacio para experimentar y crear materiales para el taller.

## Acerca de Este Taller

En este taller aprenderás a:

- **Instalar y configurar** @axe-core/cli para pruebas de accesibilidad automatizadas
- **Ejecutar análisis de accesibilidad** en páginas web usando la línea de comandos
- **Interpretar resultados** de AXE y distinguir entre violaciones WCAG y recomendaciones de buenas prácticas
- **Identificar y corregir** problemas de accesibilidad comunes en HTML
- **Integrar pruebas de accesibilidad** en flujos de trabajo automatizados con GitHub Actions

### ¿Qué Harás en el Taller?

Durante el taller trabajarás con ejemplos de páginas web que contienen problemas de accesibilidad intencionales. Tu tarea será:

1. Usar AXE CLI para identificar los problemas
2. Analizar los resultados y priorizar las correcciones
3. Corregir las violaciones en tu fork del repositorio
4. Enviar una pull request con tus correcciones
5. Ver cómo las pruebas automatizadas validan tus cambios

Este es un taller práctico y hands-on. ¡Prepárate para escribir código y experimentar!

## Instalación de axe CLI

Para este taller, estaremos experimentando con AXE en la línea de comandos, por lo que usaremos el enfoque de instalación global.

### Instalación Global

```bash
npm install @axe-core/cli -g
```

Esto instala axe CLI globalmente en tu sistema, haciendo que el comando `axe` esté disponible desde cualquier lugar en tu terminal.

### Instalación a Nivel de Proyecto (Alternativa)

```bash
npm install --save-dev @axe-core/cli
```

Esto instala axe CLI como una dependencia de desarrollo, permitiéndote gestionar la versión específica y asegurar consistencia en tu equipo.

**Nota:** Al configurar GitHub Actions para pruebas automatizadas de accesibilidad, necesitarás agregar el paquete como una dependencia del proyecto para asegurar que esté disponible en tu pipeline de CI/CD.

## Ejecutar AXE en el Repositorio de Pruebas

Este repositorio incluye un formulario de contacto de ejemplo (`test-pages/contact-form.html`) para pruebas.

**Nota:** La carpeta `sample-scripts` contiene ejemplos de scripts JSON de la documentación de Deque. Estos son para referencia y demuestran patrones de automatización de pruebas, pero requieren **Axe DevTools CLI** (un producto comercial) para ejecutarse. El paquete **@axe-core/cli** que estamos usando es gratuito y de código abierto, pero acepta URLs directamente en lugar de archivos de configuración JSON.

### Probando el Formulario de Contacto

Para probar la página del formulario de contacto, tienes dos opciones:

**Opción 1: Probar a través de un servidor local (recomendado)**

Si estás usando la extensión Live Server de VS Code o cualquier servidor de desarrollo local:

```bash
axe http://localhost:5500/test-pages/contact-form.html
```

**Opción 2: Probar el archivo directamente**

```bash
axe file:///$(pwd)/test-pages/contact-form.html
```

### Guardar Resultados

Para guardar los resultados en un archivo JSON, agrega la bandera `--save`:

```bash
axe http://localhost:5500/test-pages/contact-form.html --save results.json
```

Los resultados incluirán:
- **Violations (Violaciones)**: Problemas de accesibilidad que deben ser corregidos
- **Passes (Aprobadas)**: Reglas que pasaron la validación
- **Inapplicable (No aplicables)**: Reglas que no aplican a la página
- **Incomplete (Incompletas)**: Reglas que requieren revisión manual

## Pruebas Automatizadas con GitHub Actions

Este repositorio incluye un flujo de trabajo que verifica la accesibilidad usando AXE en todos los archivos HTML del directorio `test-pages/` en cada push o pull request a la rama principal.

### Cómo Funciona el Flujo de Trabajo

El flujo de trabajo:
1. Instala @axe-core/cli y configura un servidor local
2. Prueba cada archivo HTML en `test-pages/`
3. Genera reportes JSON para cada página
4. **Falla la compilación** solo si se encuentran violaciones de WCAG (los potenciales incumplimientos con buenas prácticas se reportan pero no hacen que la compilación falle)
5. Sube los resultados de las pruebas como artefactos que puedes descargar y revisar

### Ver Resultados

Después de cada commit, puedes:
1. Ir a la pestaña "Actions" en GitHub
2. Seleccionar la última ejecución del flujo de trabajo
3. Descargar el artefacto "accessibility-results" para ver los reportes JSON detallados

El flujo de trabajo no fallará si tan sólo se identifican potenciales incumplimientos con buenas prácticas (como puntos de referencia faltantes), pero sí fallará si hay problemas reales de cumplimiento con WCAG (como campos de formulario sin etiqueta accesible).

## Contribuir Cambios

Como colaborador externo, necesitarás hacer un fork del repositorio y enviar una pull request. Sigue estos pasos:

1. **Haz un fork del repositorio** en GitHub seleccionando el botón "Fork"

2. **Clona tu fork** a tu máquina local
   ```bash
   git clone https://github.com/TU-USUARIO/A11YConfAutomationPlayground.git
   cd A11YConfAutomationPlayground
   ```

3. **Crea una feature branch**
   ```bash
   git checkout -b fix-accessibility-issues
   ```

4. **Haz tus cambios** y pruébalos localmente usando axe CLI
   ```bash
   axe file:///$(pwd)/test-pages/contact-form.html
   ```

5. **Confirma tus cambios**
   ```bash
   git add .
   git commit -m "Corregir problemas de contraste de color"
   ```

6. **Actualiza los cambios en tu fork**
   ```bash
   git push origin fix-accessibility-issues
   ```

7. **Abre una Pull Request** desde tu fork al repositorio original en la rama `main`

8. **Espera a que las pruebas de accesibilidad** se ejecuten automáticamente
   - El flujo de trabajo probará todos los archivos HTML en `test-pages/`
   - Si se encuentran violaciones de WCAG, la PR será bloqueada para fusionarse
   - Revisa los resultados de las pruebas y corrige cualquier violación en tu fork
   
9. **Actualiza tu PR** si es necesario haciendo push de commits adicionales a tu rama

10. **Tu PR será revisada** y fusionada una vez que las pruebas pasen y sea aprobada

## Configuración del Agente de Codificación de GitHub Copilot

Este repositorio incluye un flujo de trabajo de configuración para el agente de codificación de GitHub Copilot (`.github/workflows/copilot-setup-steps.yml`). Esta configuración se aplica específicamente al **agente de codificación alojado en GitHub** que se ejecuta en entornos de GitHub Actions cuando usas Copilot para crear pull requests directamente en GitHub, no la extensión de VS Code Copilot.

Cuando el agente de codificación de GitHub Copilot trabaja en tareas en este repositorio, automáticamente tendrá:

- Node.js 20 preinstalado
- @axe-core/cli preinstalado y listo para usar
- Acceso al comando `axe` para pruebas de accesibilidad

Esto permite que el agente ejecute pruebas de accesibilidad como parte de su flujo de trabajo de desarrollo sin necesidad de instalar dependencias cada vez.
