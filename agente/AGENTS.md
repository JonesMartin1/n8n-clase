# Instrucciones para el agente de código (taller n8n + Evolution + Odoo, UCP 2C 2026)

Pegá este archivo entero al empezar una charla con tu agente (Codex, Copilot, Antigravity, ChatGPT…),
o dejalo como `AGENTS.md` en la carpeta donde trabajás: Codex y Copilot lo leen solos.

---

## Quién soy y cómo quiero que me ayudes

- Soy alumno de Administración, **no programador**. Explicame todo en español rioplatense, paso a paso,
  diciendo **en qué pantalla y en qué botón** hago clic. Nada de jerga sin explicar.
- Cuando me des un flujo de n8n, dame el **JSON completo para importar** (n8n → menú ⋯ → Import from File o
  pegar con Ctrl+V en el lienzo) y después explicame qué hace cada nodo en una línea.
- Si no estás seguro de que algo exista en mi versión, **decímelo** en vez de inventarlo.
- **Nunca me pidas una clave** (Evolution, Odoo, AWS, Dokploy, Gemini). En los JSON poné siempre `PEGAR_ACA`
  donde va una clave; yo la cargo a mano en n8n.
- Los datos de Odoo son **inventados**. No uses nombres ni teléfonos reales en los ejemplos.

## Mi instalación (no la cambies sin avisarme)

| Pieza | Versión / dónde vive | Cómo se llega |
|---|---|---|
| Servidor | AWS EC2 `t3.small`, Ubuntu 24.04, región us-east-1, con 4 GB de swap | Panel **Dokploy** en `http://IP:3000` |
| n8n | **1.104.0** (imagen `docker.n8n.io/n8nio/n8n:1.104.0`, plantilla "n8n" de Dokploy) | `https://n8n.MINOMBRE.duckdns.org` |
| Evolution API | **v2.3.7** (imagen `evoapicloud/evolution-api:v2.3.7`, plantilla "Evolution API" de Dokploy), canal **Baileys** (WhatsApp no oficial, por QR) | `https://evo.MINOMBRE.duckdns.org` (manager en `/manager`) |
| Odoo | **Odoo Online, base educativa** `edu-…` (edición Enterprise, en la nube de Odoo, no en mi servidor) | `https://edu-MINOMBRE.odoo.com` |
| Dominio | DuckDNS, HTTPS con Let's Encrypt desde Dokploy | — |

**Importante sobre n8n 1.104:** es n8n **1.x**, no 2.x. Usá nodos y `typeVersion` que existan en 1.104.
Si dudás, copiá las versiones de mi flujo base `bot-eco.json`:
Webhook `typeVersion 2`, Set (Edit Fields) `3.4`, If `2`, HTTP Request `4.2`.
El flujo se prende con el interruptor **Active** arriba a la derecha (en 1.x no hay botón "Publish").
El servidor tiene 2 GB de RAM: no me propongas instalar más servicios en él (Odoo no entra).

## Cómo está armado mi bot (flujo base `bot-eco.json`)

1. **Llega un WhatsApp** — Webhook POST, path `whatsapp`. Evolution le avisa a la **Production URL**
   `https://n8n.MINOMBRE.duckdns.org/webhook/whatsapp` (no la Test URL).
2. **Datos** — nodo Set con estos campos (los demás nodos los leen con `$('Datos').item.json.<campo>`):
   - `evo_url` = `PEGAR_ACA` (la dirección de Evolution, **sin barra al final**)
   - `evo_apikey` = `PEGAR_ACA` (la clave; va en el header `apikey`)
   - `instancia` = `{{ $json.body.instance }}`
   - `numero` = `{{ $json.body.data.key.remoteJid }}`
   - `texto` = `{{ $json.body.data.message?.conversation || $json.body.data.message?.extendedTextMessage?.text || '' }}`
   - `es_mio` = `{{ $json.body.data.key.fromMe }}`
   - `nombre` = `{{ $json.body.data.pushName }}`
3. **¿Es un mensaje para contestar?** — If con tres condiciones: `es_mio` es false, `texto` no está vacío,
   `numero` no termina en `@g.us` (grupos). **No saques ninguna**: sin `es_mio` el bot se contesta a sí mismo en loop.
4. **Contestar por WhatsApp** — HTTP Request:
   - `POST {{ $('Datos').item.json.evo_url }}/message/sendText/{{ $('Datos').item.json.instancia }}`
   - Header `apikey: {{ $('Datos').item.json.evo_apikey }}`
   - Body JSON: `{{ JSON.stringify({ number: $('Datos').item.json.numero, text: '...' }) }}`

Configuración del webhook en Evolution (manager → instancia → Events → Webhook): Enabled sí,
**Webhook by Events no**, **Webhook Base64 no**, evento **solo `MESSAGES_UPSERT`**.

## Mi bot de Telegram (flujo `bot-eco-telegram.json`, opcional)

Es el mismo bot por Telegram, sin Evolution: el bot lo creé en **@BotFather** y el token va en una credencial
**Telegram API** de n8n (nunca en el JSON).

1. **Llega un Telegram** — nodo *Telegram Trigger* `typeVersion 1.2`, Trigger On `message`. Al prender **Active**,
   n8n registra solo el webhook en Telegram (no se copia ninguna URL).
2. **Datos** — Set: `chat_id` = `{{ $json.message.chat.id }}`, `texto` = `{{ $json.message.text || '' }}`,
   `nombre` = `{{ $json.message.from.first_name || '' }}`, `usuario` = `{{ $json.message.from.username || '' }}`,
   `tipo_chat` = `{{ $json.message.chat.type }}`.
3. **¿Es un mensaje para contestar?** — If: `texto` no vacío **y** `tipo_chat` = `private`.
   No hace falta `es_mio`: Telegram no le manda al bot sus propios mensajes.
4. **Contestar por Telegram** — nodo *Telegram* `typeVersion 1.2`, Message → Send Message, Chat ID
   `{{ $('Datos').item.json.chat_id }}`, con **Append n8n Attribution** apagado.

Cosas que ya sé de Telegram en mi instalación:
- La plantilla de n8n de Dokploy arma `WEBHOOK_URL=https://${N8N_HOST}/`, y `N8N_HOST` arranca con el dominio
  automático `traefik.me`. Tiene que decir `n8n.MINOMBRE.duckdns.org` (Dokploy → n8n → Environment → Deploy);
  si no, Telegram recibe una dirección que no llega.
- Telegram exige HTTPS con certificado válido: con el plan B por http no anda.
- **Un solo webhook por bot.** "Listen for test event" pisa (y al cortar, borra) el webhook de producción:
  si pasó, apagar y prender **Active**. Dos flujos con el mismo bot se pisan: el último activado gana.
- Para diagnosticar: `https://api.telegram.org/bot<TOKEN>/getWebhookInfo` (lo abro yo, no me pidas el token).
- Telegram no da el teléfono: en Odoo uso el nombre en el título de la oportunidad y `chat_id` como Session Key.

## Odoo desde n8n

- Credencial **Odoo API** de n8n: Site URL `https://edu-MINOMBRE.odoo.com` (sin barra final), Username = mi mail,
  Password = mi **clave API de Odoo** (no la contraseña), Database = `edu-MINOMBRE` exacto.
- Lo que ya anda en clase: nodo **Odoo** → *Create an opportunity* (CRM) con
  Opportunity Name `{{ 'WhatsApp: ' + $('Datos').item.json.texto }}` y Phone `{{ $('Datos').item.json.numero }}`.
  El nodo devuelve el `id` de lo que creó (`$json.id`), útil para contestarle al cliente el número de pedido.
- Para otras cosas (Ventas, Inventario, Contactos) preferí el nodo **Odoo** con *Custom Resource* y el modelo
  técnico (`sale.order`, `res.partner`, `product.product`, `stock.quant`) antes que inventar un HTTP Request.
- Si algo da error de permisos, primero preguntame si tengo **instalada la app** de Odoo que corresponde (CRM, Ventas,
  Inventario).
- Dato técnico: el nodo Odoo de n8n 1.104 usa la API vieja de Odoo (JSON-RPC). En Odoo 19 está marcada como
  "deprecated" pero **todavía funciona**. Si un día deja de andar, avisame: la salida es actualizar n8n
  (desde 2.23 el nodo usa la API nueva JSON-2) o pasar a HTTP Request contra `/json/2/<modelo>/<método>`.

## Errores conocidos y su arreglo (probados en clase)

| Lo que veo | Qué es | Qué hacer |
|---|---|---|
| No aparece ninguna ejecución en n8n | Evolution no avisa | Flujo **Active**; webhook con la **Production URL**; `MESSAGES_UPSERT` tildado y "Webhook by Events" apagado |
| La Production URL dice `traefik.me` | La plantilla de Dokploy deja `N8N_HOST` con el dominio automático (`WEBHOOK_URL=https://${N8N_HOST}/`) | Dokploy → n8n → Environment: `N8N_HOST=n8n.MINOMBRE.duckdns.org` y Deploy (en el plan B por http no se cambia: se pega la URL cambiando `https` por `http`) |
| La ejecución se corta en el If | No era texto (audio, foto, sticker), vino del mismo número del bot o de un grupo | Probar con un **texto** desde **otro** celular |
| 401 en Contestar por WhatsApp | Clave de Evolution mal copiada | Revisar `evo_apikey` en **Datos**, sin espacios |
| 404 en Contestar por WhatsApp | Dirección o instancia mal | `evo_url` sin barra final; la instancia existe en el manager |
| 400 "exists: false" con el número | WhatsApp mandó el remitente como `@lid` | En la ejecución, mirar `body.data.key`: si hay `remoteJidAlt` o `senderPn` terminado en `@s.whatsapp.net`, usar ese en `numero`. Ej.: `{{ $json.body.data.key.remoteJidAlt \|\| $json.body.data.key.senderPn \|\| $json.body.data.key.remoteJid }}` |
| El bot se contesta solo en loop | Se borró la condición `es_mio` | Volver a ponerla o reimportar `bot-eco.json` |
| n8n no deja iniciar sesión (sin HTTPS) | Plan B con dominio `traefik.me` por http | En Dokploy → n8n → Environment: `N8N_SECURE_COOKIE=false` y redeploy |
| Deploy en rojo en Dokploy | Falta memoria | Revisar swap con `free -h`; mirar la pestaña Logs |
| Credencial de Odoo da error de acceso | Contraseña en vez de clave API, o base mal escrita | Username = mail, Password = clave API, Database = `edu-…` exacto |
| Se desconectó el WhatsApp | El celular estuvo sin internet o se cerró la sesión | Manager → instancia → Get QR Code y escanear de nuevo (hay ~40 s) |

## Reglas para no meterme en problemas

- El bot **solo contesta**, nunca escribe primero ni manda masivos: WhatsApp bloquea el número por spam.
- Antes de que yo exporte un flujo o saque una captura, recordame cambiar `evo_apikey` por `PEGAR_ACA`.
- El informe, la Bitácora y las respuestas del Coloquio de AE4 **los escribo yo**, no vos: si te pido redactarlos,
  recordámelo y no lo hagas. Con los flujos y los errores sí podés ayudarme (el docente lo permite),
  pero **explicándome**: en el Coloquio lo tengo que explicar yo. Al terminar, haceme un resumen de 3 líneas
  de qué me ayudaste a hacer, para anotarlo en el Portafolio.
