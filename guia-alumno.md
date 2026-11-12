# Paso a paso: tu servidor, n8n, tu bot de WhatsApp y Odoo

Tildá cada casillero cuando lo termines. Si te trabás, levantá la mano (o poné 🔴 en el chat).

Vas a ir anotando cosas. Copiá esta tabla en un bloc de notas y completala a medida que avanzás:

```
Mi IP del servidor:        ___.___.___.___
Mi nombre de DuckDNS:      __________.duckdns.org
Mi Dokploy:                http://IP:3000
Mi n8n:                    https://n8n.__________.duckdns.org
Mi Evolution:              https://evo.__________.duckdns.org
Clave de Evolution (apikey): (no la compartas con nadie)
Nombre de mi instancia:    __________
Mi Odoo:                   https://edu-__________.odoo.com
Mi base de Odoo:           edu-__________
Mi usuario de Odoo (mail): __________
Clave API de Odoo:         (no la compartas con nadie)
```

---

## Paso 1 — Cuenta de AWS (se hace en casa, antes de la clase)

- [ ] Entrá a [aws.amazon.com/free](https://aws.amazon.com/free) → **Crear una cuenta gratuita**.
- [ ] Mail, contraseña, nombre de la cuenta (ej. `clase-juan`).
- [ ] Cuando pregunte el plan, elegí **Free plan** (plan gratuito). ⚠ **No elijas "Paid"**: el gratuito es el que
      no te puede cobrar nunca.
- [ ] Verificá el teléfono con el código que te llega por SMS.
- [ ] Si te pide tarjeta, es solo para verificar identidad. Con el plan Free no se cobra.
- [ ] Esperá el mail de "tu cuenta está lista" (puede tardar de minutos a unas horas).

**Y también:** entrá a [duckdns.org](https://www.duckdns.org), iniciá sesión con Google, escribí un nombre en
"sub domain" (ej. `juanbot`) y tocá **add domain**. Por ahora dejalo así.

**Y por último, tu Odoo gratis por 2 años** (hacelo en casa: si toda la clase lo crea a la vez desde la misma red,
Odoo corta con "demasiadas solicitudes"):

- [ ] Entrá a [odoo.com/es_ES/education/odoo-online](https://www.odoo.com/es_ES/education/odoo-online) y tocá
      **Crear una base de datos gratuita**.
- [ ] Elegí la app **CRM** y completá el formulario con tu mail.
- [ ] ⚠ **El nombre de la base TIENE que empezar con `edu-`** (ej. `edu-juanbot`). Ese prefijo es lo que la hace
      **gratis por 24 meses** y en versión Enterprise. Sin `edu-` es una prueba común que se vence a los 15 días.
- [ ] 📝 Anotá en tu tabla la dirección (`https://edu-....odoo.com`), el nombre de la base y tu mail.

> No hace falta anotarse en ningún programa ni que te aprueben: el `edu-` alcanza.

---

## Paso 2 — Crear el servidor en AWS

- [ ] Entrá a la [consola de AWS](https://console.aws.amazon.com).
- [ ] Arriba a la derecha, elegí la región **EE. UU. Este (Norte de Virginia) — us-east-1**.
- [ ] En el buscador de arriba escribí **EC2** y entrá.
- [ ] Botón naranja **Lanzar instancia** y completá así:

| Campo | Qué poner |
|---|---|
| Nombre | `mi-servidor` |
| Imagen (AMI) | **Ubuntu Server 24.04 LTS** (la que dice "Apta para la capa gratuita") |
| Arquitectura | 64 bits (x86) |
| Tipo de instancia | **t3.small** |
| Par de claves | "Continuar sin un par de claves" (nos conectamos desde el navegador) |
| Configuración de red → Firewall | "Crear grupo de seguridad" y tildá: **Permitir SSH**, **Permitir HTTPS**, **Permitir HTTP** |
| Almacenamiento | **30** GiB, tipo gp3 |

- [ ] Tocá **Lanzar instancia**. Esperá a que diga **En ejecución** (1-2 minutos).

### Abrir el puerto del panel (3000)

- [ ] Hacé clic en tu instancia → pestaña **Seguridad** → clic en el grupo de seguridad (`sg-...`).
- [ ] **Editar reglas de entrada** → **Agregar regla**: Tipo `TCP personalizado`, Puerto `3000`, Origen `0.0.0.0/0`.
- [ ] **Guardar reglas**.

### Ponerle una IP fija (IP elástica)

- [ ] En el menú izquierdo de EC2: **Red y seguridad → Direcciones IP elásticas** → **Asignar dirección IP elástica** → Asignar.
- [ ] Seleccionala → **Acciones → Asociar dirección IP elástica** → elegí tu instancia → Asociar.
- [ ] 📝 Anotá esa IP en tu tabla. **Esa es la dirección de tu servidor.**

### Apuntar tu dominio a tu servidor

- [ ] Volvé a [duckdns.org](https://www.duckdns.org), en tu dominio poné la IP elástica en "current ip" y tocá **update ip**.

> Con eso, `juanbot.duckdns.org` **y cualquier cosa delante** (`n8n.juanbot.duckdns.org`, `evo.juanbot.duckdns.org`)
> llegan a tu servidor.

---

## Paso 3 — Entrar al servidor (la única parte con pantalla negra)

- [ ] En EC2, seleccioná tu instancia → botón **Conectar** → pestaña **EC2 Instance Connect** → **Conectar**.
- [ ] Se abre una terminal negra en el navegador. Ya estás adentro de tu servidor. 🎉

Copiá este bloque **entero**, pegalo con **Ctrl+Shift+V** (o clic derecho → Pegar) y apretá Enter.
Le agrega 4 GB de "memoria de reserva" al servidor para que no se quede corto:

```bash
sudo fallocate -l 4G /swapfile && sudo chmod 600 /swapfile && sudo mkswap /swapfile && sudo swapon /swapfile && echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

- [ ] Para comprobarlo, pegá `free -h`. En la fila **Swap** tiene que decir `4.0Gi`.

---

## Paso 4 — Instalar el panel Dokploy

Pegá esto y apretá Enter. Tarda unos 3-5 minutos — no cierres la pestaña:

```bash
curl -sSL https://dokploy.com/install.sh | sudo sh
```

- [ ] Cuando termine, muestra un mensaje de felicitaciones con una dirección. Abrí en una **pestaña nueva**:
      `http://TU-IP:3000`
- [ ] Creá tu usuario administrador (mail y contraseña: **anotalos**).

Listo: desde acá en adelante todo es con clics. La terminal ya la podés cerrar.

---

## Paso 5 — Instalar n8n

- [ ] En Dokploy: **Projects** → **Create Project** → nombre `bot` → Create.
- [ ] Entrá al proyecto → **Create Service** → **Template** → buscá **n8n** → elegí el que dice solo **n8n** → **Create**.
- [ ] Entrá al servicio de n8n → pestaña **Environment**: cambiá `GENERIC_TIMEZONE=Europe/Berlin` por
      `GENERIC_TIMEZONE=America/Argentina/Buenos_Aires`.
- [ ] En esa misma pestaña, buscá la línea `N8N_HOST=` (trae una dirección rara terminada en `traefik.me`) y
      cambiala por tu dominio, **sin** `https://` y sin barra al final:
      `N8N_HOST=n8n.TUNOMBRE.duckdns.org` → **Save**.
      ⚠ No te lo saltees: con esta línea n8n arma las direcciones que le pasás a WhatsApp (paso 8) y a Telegram
      (paso 12). Si queda la de `traefik.me`, el bot nunca recibe los mensajes.
- [ ] Pestaña **Domains** → editá el dominio que viene (el lápiz):
  - Host: `n8n.TUNOMBRE.duckdns.org`
  - **HTTPS**: activado
  - Certificate: **Let's Encrypt**
  - Guardar.
- [ ] Botón **Deploy** (arriba). Esperá a que en **Deployments** quede en verde ("done").
- [ ] Abrí `https://n8n.TUNOMBRE.duckdns.org` (el candado puede tardar 1-2 minutos en aparecer la primera vez).
- [ ] Creá tu cuenta de n8n (es solo tuya, vive en tu servidor).

---

## Paso 6 — Instalar Evolution API (el "WhatsApp" del servidor)

- [ ] Volvé al proyecto `bot` → **Create Service** → **Template** → buscá **Evolution API** → **Create**.
- [ ] Pestaña **Domains** → editá el dominio:
  - Host: `evo.TUNOMBRE.duckdns.org`
  - HTTPS activado, Certificate **Let's Encrypt**, Guardar.
- [ ] Pestaña **Environment**: buscá la línea `SERVER_URL=` y dejala `SERVER_URL=https://evo.TUNOMBRE.duckdns.org`.
- [ ] En esa misma pestaña buscá `AUTHENTICATION_API_KEY=` → 📝 **copiá ese valor a tu tabla**. Es tu clave.
- [ ] **Save** y después **Deploy**. Esperá el verde.

---

## Paso 7 — Conectar tu WhatsApp de prueba

- [ ] Abrí `https://evo.TUNOMBRE.duckdns.org/manager`
- [ ] Te pide: Server URL `https://evo.TUNOMBRE.duckdns.org` y API Key = **tu clave**. Entrar.
- [ ] **Instance +** (crear instancia) → Name: `bot` (o tu nombre, sin espacios) → Channel: **Baileys** → Save.
- [ ] Entrá a la instancia → **Get QR Code**.
- [ ] En el celular de prueba: WhatsApp → ⋮ → **Dispositivos vinculados** → **Vincular un dispositivo** → escaneá el QR.
- [ ] El estado tiene que pasar a **Connected** / "open". 🎉

---

## Paso 8 — El bot que contesta

### 8.1 Importar el workflow

- [ ] En n8n: **Create Workflow** (o "+") → menú **⋯** arriba a la derecha → **Import from File** → elegí `bot-eco.json`.
- [ ] Abrí el nodo **Datos** (doble clic) y completá los dos campos que dicen `PEGAR_ACA`:
  - `evo_url` → `https://evo.TUNOMBRE.duckdns.org` (sin barra al final)
  - `evo_apikey` → tu clave de Evolution
- [ ] Guardá (**Ctrl+S**) y **activá / publicá** el workflow (el interruptor o botón arriba a la derecha).
- [ ] Abrí el nodo **Llega un WhatsApp** → pestaña **Production URL** → **copiá esa dirección**.
      Se ve así: `https://n8n.TUNOMBRE.duckdns.org/webhook/whatsapp`
      Si en cambio dice algo con `traefik.me`, te faltó cambiar `N8N_HOST` en el paso 5: hacelo, Deploy, y volvé a copiarla.

### 8.2 Decirle a Evolution que avise a n8n

- [ ] En el manager de Evolution → tu instancia → **Events** → **Webhook**:
  - **Enabled**: activado
  - **URL**: la Production URL que copiaste
  - **Webhook by Events**: desactivado
  - **Webhook Base64**: desactivado
  - **Events**: tildá solo `MESSAGES_UPSERT`
  - Save.

### 8.3 ¡Probar!

- [ ] Desde **otro celular** (el tuyo o el de un compañero) mandale un mensaje al número de prueba: `hola`
- [ ] Tiene que contestar: `🤖 Recibí tu mensaje: hola`

Si contesta: **tenés un bot de WhatsApp en tu propio servidor**. 🏆
Si no: mirá la sección [Problemas frecuentes](problemas-frecuentes.md).

---

## Paso 9 — Tu empresa en Odoo Enterprise

Odoo es el sistema donde una empresa lleva sus clientes, ventas, stock y facturas. Con la cuenta educativa lo usás
**gratis por 2 años**, en la versión Enterprise (la completa). No se instala en tu servidor: vive en la nube de Odoo.

- [ ] Entrá a la base `edu-` que creaste en casa (paso 1).
      **Si el profe armó una empresa modelo**, en cambio, abrí su enlace del curso y tocá **Duplicar**, poniéndole
      también un nombre que empiece con `edu-`: así arrancás con productos y clientes ya cargados.
- [ ] Si tu base está vacía, cargá 2 o 3 productos y un cliente de prueba (o datos de demostración: ver
      Problemas frecuentes).
- [ ] Recorré **CRM** (oportunidades) y **Contactos**: ahí van a caer los mensajes del bot.

### Sacar la clave para que n8n entre a tu Odoo

- [ ] Arriba a la derecha, tu foto → **Mi perfil** (o "Preferencias") → pestaña **Seguridad de la cuenta**.
- [ ] **Nueva clave API** → te pide la contraseña → descripción `n8n` → duración la más larga → **Generar clave**.
- [ ] 📝 Copiala a tu tabla **ya**: se muestra una sola vez.

> ⚠ Entrá a tu Odoo **al menos una vez cada 3 meses**. Si no, la base se desactiva.

---

## Paso 10 — El bot carga los pedidos en Odoo (la base del integrador)

La idea: alguien le escribe al WhatsApp "quiero 2 pizzas para las 21", y eso queda como **oportunidad en el CRM**
de Odoo, con su número de teléfono, para que la empresa le haga el seguimiento.

### 10.1 Conectar n8n con Odoo

- [ ] En n8n: **Overview** → **Credentials** → **Create** → buscá **Odoo API** y completá:

| Campo | Qué poner |
|---|---|
| Site URL | `https://edu-TUNOMBRE.odoo.com` |
| Username | el mail con el que entrás a Odoo |
| Password or API Key | tu **clave API** de Odoo (no la contraseña) |
| Database Name | `edu-TUNOMBRE` |

- [ ] **Save**. Tiene que decir que la conexión salió bien (en verde).

### 10.2 Agregar Odoo al bot

- [ ] Abrí tu workflow del bot. Entre **¿Es un mensaje para contestar?** y **Contestar por WhatsApp**, agregá un nodo
      **Odoo** → acción **Create an opportunity** (crear oportunidad):
  - Credential: la que creaste recién.
  - Opportunity Name: `{{ 'WhatsApp: ' + $('Datos').item.json.texto }}`
  - **Add Field → Phone**: `{{ $('Datos').item.json.numero }}`
- [ ] En el nodo **Contestar por WhatsApp**, cambiá el texto de la respuesta:
      reemplazá `'🤖 Recibí tu mensaje: ' + $('Datos').item.json.texto` por
      `'✅ Anotamos tu pedido con el número ' + $json.id + '. En breve te contactamos.'`
- [ ] Guardá y mandá un mensaje desde otro celular.
- [ ] En Odoo → **CRM**: tiene que aparecer la oportunidad "WhatsApp: ..." con el teléfono. 🏆

**Para el integrador:** con esto ya tienen la columna vertebral (cliente → WhatsApp → automatización → sistema de
gestión). De acá cada grupo lo lleva a su rubro: buscar el producto en el inventario de Odoo antes de contestar,
crear un presupuesto en **Ventas**, avisar cuando cambia el estado del pedido, etc.

---

## Paso 11 (extra) — Que conteste con Inteligencia Artificial

Usamos Gemini de Google porque tiene uso gratis.

- [ ] Sacá una clave gratis en [aistudio.google.com/apikey](https://aistudio.google.com/apikey) → **Create API key**.
- [ ] En n8n, justo antes de **Contestar por WhatsApp** (después del nodo **Odoo**, si hiciste el paso 10), agregá un nodo **AI Agent**.
  - Prompt (Source for Prompt: *Define below*): `{{ $('Datos').item.json.texto }}`
  - En **Options → System Message** escribí cómo querés que sea tu bot. Ejemplo:
    `Sos el asistente de la pizzería "La Clase". Contestás corto, amable y en español rioplatense. Si no sabés algo, decí que lo consultás.`
  - En **Chat Model** agregá **Google Gemini Chat Model** → nueva credencial → pegá tu clave → elegí un modelo "flash".
- [ ] En el nodo **Contestar por WhatsApp**, en el cuerpo (JSON), reemplazá el texto de la respuesta
      (el `'🤖 Recibí tu mensaje: ...'` o el `'✅ Anotamos tu pedido...'` del paso 10) por `$json.output`.
      Queda así:
  ```
  {{ JSON.stringify({ number: $('Datos').item.json.numero, text: $json.output }) }}
  ```
  (`$json.output` es lo que contestó la IA; el número, la dirección y la clave los sigue tomando del nodo **Datos**).
- [ ] Guardá, mandá un mensaje y mirá cómo contesta la IA.

**Bonus:** al **AI Agent** agregale **Memory → Simple Memory** con Session Key `{{ $('Datos').item.json.numero }}`:
así se acuerda de lo que le dijiste antes, separado por cada persona.

---

## Paso 12 (extra) — El mismo bot, pero por Telegram

Telegram sirve como **segundo canal** o como **plan B** si WhatsApp te da problemas (QR que se vence, número
bloqueado, celular que se desconecta). Funciona igual que el bot de WhatsApp, con dos ventajas: **no necesitás
Evolution ni un celular de prueba** (Telegram tiene bots oficiales, gratis) y **no te bloquean el número**.

La diferencia: en WhatsApp el "cartero" que avisa a n8n era Evolution. En Telegram el cartero es el propio Telegram.

Agregá a tu tabla:

```
Usuario de mi bot:         @__________bot
Token del bot:             (no lo compartas con nadie: es la clave del bot)
```

### 12.1 Crear el bot (desde el celular, 2 minutos)

- [ ] En Telegram buscá **@BotFather** (tiene el tilde azul de verificado) → **Iniciar**.
- [ ] Escribile `/newbot`.
- [ ] Te pide un **nombre** (el que ve la gente, ej. `Pizzería La Clase`) y después un **usuario**, que tiene que
      **terminar en `bot`** y no estar usado (ej. `pizzeria_juan_bot`).
- [ ] Te contesta con un **token**, algo como `123456789:AAH...`. 📝 Copialo a tu tabla.
      ⚠ El token es la llave del bot: quien lo tiene, maneja tu bot. Si se te escapa (captura, chat, entrega),
      en @BotFather mandá `/revoke`, elegí tu bot y te da uno nuevo.

### 12.2 Revisar que n8n sepa su propia dirección

Telegram necesita saber a qué dirección avisarle, y n8n se la dice solo, usando la línea `N8N_HOST` que
corregiste en el **paso 5**. Si la saltaste, Telegram recibe la dirección automática (`...traefik.me`) y no anda.

- [ ] En Dokploy → proyecto `bot` → servicio **n8n** → pestaña **Environment**: la línea tiene que decir
      `N8N_HOST=n8n.TUNOMBRE.duckdns.org`.
- [ ] Si dice otra cosa (algo con `traefik.me`), corregila, **Save** y **Deploy**. Esperá el verde.

⚠ **Telegram exige HTTPS con candado.** Si estás con el plan B sin DuckDNS (`traefik.me` por `http`), Telegram no
va a andar: necesitás el dominio de DuckDNS con candado.

### 12.3 Importar el bot y conectarlo

- [ ] En n8n: **Create Workflow** → menú **⋯** → **Import from File** → elegí `bot-eco-telegram.json`.
- [ ] Abrí el nodo **Llega un Telegram** → en **Credential** elegí **Create New Credential** → en **Access Token**
      pegá el token del bot → **Save**. Tiene que quedar en verde.
- [ ] Abrí el nodo **Contestar por Telegram** y elegí **la misma credencial**.
- [ ] Guardá (**Ctrl+S**) y prendé el interruptor **Active** arriba a la derecha.
      En ese momento n8n le avisa a Telegram "mandame los mensajes a mí". No hace falta copiar ninguna dirección.

### 12.4 ¡Probar!

- [ ] En Telegram buscá tu bot por su usuario (`@pizzeria_juan_bot`) → **Iniciar**.
      Tiene que contestar: `👋 ¡Hola Juan! Escribime algo y te contesto.`
- [ ] Escribile `hola`. Tiene que contestar: `🤖 Recibí tu mensaje: hola`

Si contesta: **tenés un bot en dos canales**. 🏆 Si no, mirá
[Problemas frecuentes → Telegram](problemas-frecuentes.md#telegram).

### Trucos que te ahorran una tarde

- **No uses "Test workflow" / "Listen for test event" con el bot ya activo.** Telegram guarda **una sola**
  dirección por bot: al escuchar en modo prueba, n8n se la cambia por la de prueba y el bot activo deja de recibir.
  Si te pasó: apagá y prendé de nuevo el interruptor **Active**. Para ver qué llegó, usá la pestaña **Executions**.
- **Un bot, un flujo.** Si dos flujos usan el mismo bot, gana el último que activaste. Para otro flujo, creá otro bot
  en @BotFather (es gratis).
- **El bot nunca escribe primero.** La persona tiene que tocar **Iniciar** antes. Igual que en WhatsApp: solo contesta.
- **En grupos no contesta a propósito** (el filtro **¿Es un mensaje para contestar?** deja pasar solo charlas
  privadas). Así nadie lo usa para hacer lío en un grupo.
- **Telegram no te da el teléfono** de quien escribe. Para identificar a la persona usá `chat_id` (un número fijo
  por persona), `nombre` y `usuario`, que ya están en el nodo **Datos**.

### Pasarle el paso 10 (Odoo) y el 11 (IA) a Telegram

Es lo mismo que hiciste con WhatsApp, cambiando de dónde salen los datos:

| Lo que en WhatsApp era… | En Telegram es… |
|---|---|
| Opportunity Name `{{ 'WhatsApp: ' + $('Datos').item.json.texto }}` | `{{ 'Telegram (' + $('Datos').item.json.nombre + '): ' + $('Datos').item.json.texto }}` |
| Phone `{{ $('Datos').item.json.numero }}` | No hay teléfono: sacá ese campo (el nombre ya va en el título) |
| El nodo **Contestar por WhatsApp** (HTTP Request) | El nodo **Contestar por Telegram**: cambiá solo el campo **Text** |
| Texto con la IA: `$json.output` | En **Text**: `{{ $json.output }}` |
| Session Key de la memoria: `numero` | `{{ $('Datos').item.json.chat_id }}` |

---

## Antes de irte

- [ ] ¿No lo vas a usar por un tiempo? EC2 → tu instancia → **Estado de la instancia → Detener**. (Para volver: **Iniciar**.)
- [ ] Mirá cuánto crédito te queda: buscador de la consola → **Billing and Cost Management** → **Credits**.
- [ ] Si usaste tu WhatsApp personal: en el celular → Dispositivos vinculados → cerrá la sesión de "Evolution API".
