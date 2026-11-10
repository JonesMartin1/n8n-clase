# Paso a paso: tu servidor, n8n y tu bot de WhatsApp

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
      `GENERIC_TIMEZONE=America/Argentina/Buenos_Aires` → **Save**.
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

## Paso 9 (extra) — Que conteste con Inteligencia Artificial

Usamos Gemini de Google porque tiene uso gratis.

- [ ] Sacá una clave gratis en [aistudio.google.com/apikey](https://aistudio.google.com/apikey) → **Create API key**.
- [ ] En n8n, entre los nodos **¿Es un mensaje para contestar?** y **Contestar por WhatsApp**, agregá un nodo **AI Agent**.
  - Prompt (Source for Prompt: *Define below*): `{{ $json.texto }}`
  - En **Options → System Message** escribí cómo querés que sea tu bot. Ejemplo:
    `Sos el asistente de la pizzería "La Clase". Contestás corto, amable y en español rioplatense. Si no sabés algo, decí que lo consultás.`
  - En **Chat Model** agregá **Google Gemini Chat Model** → nueva credencial → pegá tu clave → elegí un modelo "flash".
- [ ] En el nodo **Contestar por WhatsApp**, en el cuerpo (JSON), reemplazá
      `'🤖 Recibí tu mensaje: ' + $('Datos').item.json.texto` por `$json.output`.
      Queda así:
  ```
  {{ JSON.stringify({ number: $('Datos').item.json.numero, text: $json.output }) }}
  ```
  (`$json.output` es lo que contestó la IA; el número, la dirección y la clave los sigue tomando del nodo **Datos**).
- [ ] Guardá, mandá un mensaje y mirá cómo contesta la IA.

**Bonus:** al **AI Agent** agregale **Memory → Simple Memory** con Session Key `{{ $('Datos').item.json.numero }}`:
así se acuerda de lo que le dijiste antes, separado por cada persona.

---

## Antes de irte

- [ ] ¿No lo vas a usar por un tiempo? EC2 → tu instancia → **Estado de la instancia → Detener**. (Para volver: **Iniciar**.)
- [ ] Mirá cuánto crédito te queda: buscador de la consola → **Billing and Cost Management** → **Credits**.
- [ ] Si usaste tu WhatsApp personal: en el celular → Dispositivos vinculados → cerrá la sesión de "Evolution API".
