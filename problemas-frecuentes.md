# Problemas frecuentes

## AWS

| Qué se ve | Qué pasa | Cómo se arregla |
|---|---|---|
| "Tu cuenta se está activando" y no deja crear la instancia | AWS todavía verifica la cuenta | Esperar (hasta 24 h). Por eso se crea antes de la clase |
| No aparece `t3.small` o dice que no es apto | La región elegida no lo ofrece en el plan gratis, o la cuenta es vieja (antes del 15/07/2025) | Cambiar a **us-east-1**. Cuenta vieja: usar `t3.micro` (1 GB) con el swap de 4 GB, va más lento pero anda |
| EC2 Instance Connect: "Failed to connect" | Falta el puerto 22 en el grupo de seguridad, o la imagen no es Ubuntu | Agregar regla SSH (22) desde `0.0.0.0/0`. Confirmar que la AMI sea Ubuntu |
| Pegar en la terminal no hace nada | En la terminal web `Ctrl+V` no siempre anda | `Ctrl+Shift+V` o clic derecho → Pegar |

## Dokploy

| Qué se ve | Qué pasa | Cómo se arregla |
|---|---|---|
| `http://IP:3000` no abre | Falta el puerto 3000 en el grupo de seguridad, o la instalación no terminó | Revisar la regla del paso 2. En la terminal, `sudo docker ps` tiene que mostrar `dokploy` |
| El instalador dice que el puerto 80/443 está en uso | Hay otra cosa usando esos puertos | En un servidor recién creado no debería pasar: crear la instancia de nuevo |
| El deploy queda en rojo | Normalmente falta memoria | Confirmar el swap con `free -h`. Ver la pestaña **Logs** del deploy |

## Dominio y candado (HTTPS)

| Qué se ve | Qué pasa | Cómo se arregla |
|---|---|---|
| "No es seguro" o error de certificado | Let's Encrypt todavía no lo emitió | Esperar 1-2 minutos y recargar. Necesita los puertos 80 y 443 abiertos |
| El dominio no abre nada | DuckDNS apunta a otra IP | En duckdns.org, confirmar que la IP sea la **elástica** |
| **Plan B sin DuckDNS:** | | Dejar el dominio `...traefik.me` que Dokploy pone solo, con **HTTPS desactivado**. En n8n agregar en Environment `N8N_SECURE_COOKIE=false` y redeploy (si no, n8n no deja iniciar sesión por http). En Evolution, `SERVER_URL=http://...traefik.me`. En este plan **no** cambies `N8N_HOST`; y como la Production URL que muestra n8n empieza con `https://`, al pegarla en el webhook de Evolution cambiale `https` por `http`. Telegram no anda en este plan (exige candado) |

## Evolution / WhatsApp

| Qué se ve | Qué pasa | Cómo se arregla |
|---|---|---|
| El manager pide clave y no entra | Clave mal copiada | Volver a copiar `AUTHENTICATION_API_KEY` de Dokploy, sin espacios |
| El QR no aparece o se vence | Tarda en generarse / venció | Tocar de nuevo **Get QR Code**. Tenés ~40 segundos para escanear |
| Se desconecta solo | El celular estuvo mucho sin internet o se cerró la sesión | Volver a generar QR y escanear |
| Número bloqueado por WhatsApp | Se mandaron muchos mensajes / parece spam | Por eso se usa un número de prueba. El bot solo contesta, nunca escribe primero |

## Telegram

Para ver qué le pasa al bot, abrí en el navegador `https://api.telegram.org/botTU_TOKEN/getWebhookInfo`
(cambiando `TU_TOKEN` por el token, pegado justo después de `bot`, sin espacios). ⚠ Esa dirección lleva tu token:
no le saques captura ni la compartas. Mirá dos renglones: `url` (a dónde manda los mensajes) y
`last_error_message` (el último error, si hubo).

| Qué se ve | Qué pasa | Cómo se arregla |
|---|---|---|
| Al guardar la credencial sale error | Token mal copiado (falta un pedazo o hay un espacio) | Volver a copiarlo de @BotFather. Si lo perdiste, `/token` en @BotFather te lo vuelve a mostrar |
| Al prender **Active** sale "Bad Request: bad webhook" o "HTTPS URL must be provided" | n8n le pasó a Telegram una dirección sin candado o la `traefik.me` | Paso 5 de la guía: `N8N_HOST=n8n.TUNOMBRE.duckdns.org` en Environment, Deploy, y apagar/prender **Active** |
| `getWebhookInfo` muestra `url` vacía | El flujo no está activo, o se usó "Listen for test event" y al cortar se borró la dirección | Apagar y prender **Active** |
| `getWebhookInfo` muestra una `url` con `webhook-test` | Quedó la dirección de prueba | Apagar y prender **Active** |
| `getWebhookInfo` muestra una `url` con `traefik.me` | Falta cambiar `N8N_HOST` (paso 5) | Corregir `N8N_HOST`, Deploy, apagar/prender **Active** |
| `last_error_message` dice "SSL" o "certificate" | El candado de DuckDNS todavía no salió | Esperar 1-2 minutos a que `https://n8n.TUNOMBRE.duckdns.org` abra con candado y apagar/prender **Active** |
| Andaba y dejó de contestar de golpe | Otro flujo (o un compañero) activó un trigger con **el mismo bot** y se quedó con la dirección | Un bot por flujo. Creá otro bot en @BotFather para el segundo flujo |
| Le escribo en un grupo y no contesta | Es a propósito: el filtro deja pasar solo charlas privadas | Probalo por privado |
| Las respuestas terminan con "This message was sent automatically with n8n" | El nodo de Telegram se armó a mano, no desde `bot-eco-telegram.json` | Nodo **Contestar por Telegram** → **Add Field** → **Append n8n Attribution** apagado |

## n8n / el bot no contesta

Mirá primero en n8n la pestaña **Executions** (Ejecuciones) del workflow. Ahí se ve todo.

| Qué se ve | Qué pasa | Cómo se arregla |
|---|---|---|
| No aparece **ninguna** ejecución | Evolution no le está avisando a n8n | (1) El workflow está activo/publicado. (2) En Evolution el webhook usa la **Production URL**, no la "Test URL". (3) Está tildado `MESSAGES_UPSERT` y "Webhook by Events" desactivado. (4) La Production URL empieza con `https://n8n.TUNOMBRE.duckdns.org` y no con algo de `traefik.me` |
| La Production URL dice `traefik.me` en vez de tu dominio | Falta cambiar `N8N_HOST` (paso 5) | Dokploy → n8n → Environment → `N8N_HOST=n8n.TUNOMBRE.duckdns.org` → Save → Deploy. Volvé a copiar la URL y pegala de nuevo en Evolution |
| La ejecución termina en el nodo **¿Es un mensaje para contestar?** sin seguir | El mensaje no era texto (audio, foto, sticker), lo mandaste desde el mismo número del bot, o vino de un grupo | Mandá un texto desde **otro** número |
| Error en **Contestar por WhatsApp**: 401 | Clave de Evolution mal | Revisar `evo_apikey` en el nodo **Datos** |
| Error 404 | Dirección o nombre de instancia mal | `evo_url` sin barra al final, y que la instancia exista en el manager |
| Error 400 "exists: false" o similar con el número | WhatsApp a veces manda el remitente con formato `@lid` en vez del número | Abrir la ejecución, mirar en `body.data.key` si viene un campo `remoteJidAlt` o `senderPn` con `@s.whatsapp.net`, y usar ese en `numero` del nodo **Datos** |
| El bot se contesta a sí mismo en loop | Se borró la condición `es_mio` | Volver a importar `bot-eco.json` |

## Odoo

| Qué se ve | Qué pasa | Cómo se arregla |
|---|---|---|
| Mi base dice que se vence en 15 días | Se creó sin el prefijo `edu-`: es una prueba común | Crear otra desde la página de Odoo Education, con nombre que empiece con `edu-`. El nombre no se puede cambiar después |
| "Demasiadas solicitudes" al crear la base | Muchas bases creadas desde la misma red | Crearla desde casa, o esperar unas horas |
| Mi base está vacía | Se creó sin datos de ejemplo | Ajustes → al final → **Activar modo desarrollador**, y en Aplicaciones cargar datos de demostración (no se puede deshacer), o cargar 2-3 productos a mano |
| No me deja crear la base: "nombre ya usado" | Otro alumno eligió el mismo nombre | Agregá algo al final: `edu-juanbot2`, `edu-juan-perez` |
| La credencial de Odoo en n8n da error de acceso | Se usó la contraseña en vez de la clave API, o el nombre de la base está mal | Username = tu mail, Password = la **clave API**, Database = `edu-...` exacto, Site URL sin barra al final |
| La credencial anda pero crear la oportunidad da error de permisos | Falta la app **CRM** en tu base | En Odoo → **Aplicaciones** → instalar **CRM** |
| La credencial da error aunque todo esté bien escrito | La base educativa puede no aceptar conexiones externas | Avisale al profe: hay un plan B en su guía |
| La base dice que está desactivada | Nadie entró en 3 meses, o pasaron los 24 | Pedile al profe que la reactive desde el programa educativo. Entrá seguido |
| No encuentro "Nueva clave API" | Está en otro lado según la versión | Mi perfil → **Seguridad de la cuenta**. Si no aparece, activá el **modo desarrollador** (Ajustes → al final → Activar modo desarrollador) y volvé a mirar |
