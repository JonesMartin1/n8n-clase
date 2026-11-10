# Guía del profe

## Antes de la clase (una semana antes)

**Esto es lo que más tiempo salva.** La cuenta de AWS a veces tarda horas en activarse, pide verificar el teléfono
y a veces una tarjeta. Si se hace en clase, se pierde la primera hora.

Mandales a los chicos esta tarea:

1. Crear la cuenta de AWS (paso 1 de la guía del alumno) y elegir **Free Plan**.
2. Crear una cuenta en [duckdns.org](https://www.duckdns.org) (entra con Google) y reservar un nombre, ej. `juanbot`.
3. Tener a mano un **número de WhatsApp de prueba**: un chip prepago o un WhatsApp Business en un celular viejo.
   **No usar el WhatsApp personal** (ver "Riesgos" abajo).
4. Venir con notebook (con el celular solo no se puede).

> ⚠ **Edad:** las condiciones de AWS piden ser mayor de edad para tener cuenta. Si los alumnos son menores,
> la cuenta la crea un adulto responsable a su nombre. Lo mismo para la tarjeta, si AWS la pide.

Vos, antes de la clase:

- [ ] Hacé todo el recorrido una vez en tu propia cuenta, de punta a punta. Anotá cuánto tardaste.
- [ ] **Odoo:** no hace falta anotarse ni pedir aprobación. Desde
      [odoo.com/education](https://www.odoo.com/es_ES/education/odoo-online) → **Crear una base de datos gratuita**,
      cualquier base cuyo nombre empiece con **`edu-`** es Enterprise y gratis por 24 meses. Cada alumno crea la suya
      en casa (paso 1 de su guía).
- [ ] **Opcional, recomendado:** armá una base modelo (`edu-clase-...`) con una empresa inventada, algunos productos
      y clientes, y la app **CRM**. Publicala desde **Mis bases de datos → Compartir el curso** y pasales el enlace:
      la duplican y todos arrancan con lo mismo. Las copias de los alumnos te aparecen debajo de la tuya, con un
      botón **Conectar** para ver cómo van.
- [ ] ⚠ **Probá la conexión de n8n con tu base educativa** (paso 10 de la guía del alumno) **antes** de prometerla.
      No está confirmado que las bases educativas acepten la API externa (en Odoo Online pago, solo el plan "Custom"
      la trae). Si no la acepta, usá el plan B de Odoo de abajo.
- [ ] Dejá un servidor tuyo funcionando con el bot, para mostrar el resultado al principio ("esto es lo que vamos a armar").
- [ ] Imprimí o compartí `guia-alumno.md` y `bot-eco.json`.

## Agenda: dos encuentros

Todo junto no entra en una sola clase sin apurar a los que vienen atrás. Se divide en dos:
**encuentro 1** = servidor + n8n + bot (3 horas), **encuentro 2** = Odoo + integración + arranque del integrador.

### Encuentro 1 (3 horas con un recreo)

| Tiempo | Bloque | Qué pasa | Cómo explicarlo |
|---|---|---|---|
| 0:00 – 0:10 | Demo | Le escribís a tu bot desde el celular y contesta | "Al final de hoy cada uno tiene esto" |
| 0:10 – 0:20 | La idea | El dibujo del README | Servidor = una compu prendida siempre en otro lado. Panel = el control remoto. n8n = la caja de LEGO donde se arma la lógica. Evolution = el "celular virtual" que tiene WhatsApp |
| 0:20 – 0:50 | AWS | Crear el servidor (paso 2) | "Alquilamos una compu en Estados Unidos. Paga Amazon con los créditos de regalo" |
| 0:50 – 1:20 | Dokploy | Conectarse e instalar el panel (pasos 3 y 4) | "Pegamos UNA línea mágica y se instala sola. Es el único momento de pantalla negra" |
| 1:20 – 1:30 | Recreo | Mientras, se instala Dokploy si alguno viene atrasado | |
| 1:30 – 1:55 | n8n | Instalar desde plantilla (paso 5) | "Como instalar una app del Play Store, pero en tu servidor" |
| 1:55 – 2:40 | Bot | Evolution + QR + importar el workflow (pasos 6 a 8) | El momento "wow" es cuando el bot contesta. Que todos se manden mensajes entre ellos |
| 2:40 – 3:00 | Cierre | Cómo apagar, qué pasa a los 6 meses. Tarea: crear la base `edu-` de Odoo en casa | |

### Encuentro 2 (3 horas con un recreo)

| Tiempo | Bloque | Qué pasa | Cómo explicarlo |
|---|---|---|---|
| 0:00 – 0:15 | Repaso | Todos confirman que su bot sigue contestando | Si alguno se cayó, se arregla acá (problemas frecuentes) |
| 0:15 – 0:45 | ¿Qué es un ERP? | Recorrida por Odoo con la base modelo: CRM, Contactos, Ventas, Inventario | "Es el cuaderno de la empresa, pero ordenado y compartido por todos" |
| 0:45 – 1:15 | Su Odoo | Entrar a su base `edu-` (o duplicar la modelo), sacar la clave API (paso 9) | "Cada uno tiene su empresa de práctica, gratis por 2 años" |
| 1:15 – 1:25 | Recreo | | |
| 1:25 – 2:15 | Integración | Conectar n8n con Odoo y que el bot cargue la oportunidad (paso 10) | El "wow" es mandar un WhatsApp y verlo aparecer en el CRM |
| 2:15 – 2:40 | Extra | IA opcional (paso 11) | |
| 2:40 – 3:00 | Integrador | Cada grupo elige su rubro y escribe qué tendría que hacer su bot con Odoo | Ideas: consultar stock, armar un presupuesto, avisar el estado de un pedido |

## Cómo llevar la clase

- **Pantalla compartida siempre**: andá un paso adelante de ellos, no diez.
- Usá **semáforo**: cada uno tiene un papel verde/rojo arriba de la notebook (o un emoji en el chat).
  Rojo = trabado. Avanzás cuando está todo verde o casi.
- Si hay un ayudante, que recorra los rojos mientras vos seguís con el grupo.
- La terminal asusta: aclarales que **solo se usa en el paso 3 y 4**, que no hace falta entender los comandos,
  y que se copian y pegan (en la terminal web de AWS se pega con `Ctrl+Shift+V` o clic derecho → Pegar).

## Decisiones tomadas (y por qué)

| Decisión | Por qué |
|---|---|
| Servidor `t3.small` (2 GB RAM) + 4 GB de memoria de intercambio (swap) | Es la más barata que aguanta Dokploy + n8n + Evolution. Cuesta ≈ USD 21/mes con IP y disco: los USD 100 iniciales alcanzan para ≈ 4 meses, y con los 200 llega a los 6 |
| Región **us-east-1 (Norte de Virginia)** | Es la más barata. Para un bot no se nota la distancia |
| Conectarse con **EC2 Instance Connect** (terminal en el navegador) | No hay que instalar nada ni manejar archivos de llaves |
| **Dokploy** en vez de Easypanel | Interfaz casi igual, libre, sin tope de proyectos. Easypanel gratis también funciona (3 proyectos) |
| **DuckDNS** para el dominio | Gratis y anda con candado (HTTPS). Con un solo nombre (`juanbot.duckdns.org`) salen todos los subdominios: `n8n.juanbot...`, `evo.juanbot...` |
| **IP elástica** | Si se apaga el servidor, la IP no cambia y el dominio sigue andando |
| **Evolution API** para WhatsApp | Se conecta escaneando un QR, como WhatsApp Web. No necesita cuenta de Meta ni aprobación |
| **Odoo Enterprise en la nube de Odoo** (base educativa), no en AWS | Enterprise no se puede instalar en un servidor propio sin suscripción o ser partner. La base educativa es Enterprise, gratis 24 meses, pero solo existe en Odoo Online. Además el servidor de 2 GB no aguanta Odoo encima de lo demás |
| Odoo y n8n conectados por la **clave API** del usuario | Es lo que pide el nodo Odoo de n8n. No hace falta tocar código |
| El bot crea una **oportunidad de CRM** | Es lo más simple que se ve enseguida en Odoo, y sirve de base para cualquier rubro del integrador |

## Riesgos que tenés que contar

- **Evolution no es la API oficial de WhatsApp.** Funciona como WhatsApp Web. Si se usa para mandar mensajes masivos o
  spam, WhatsApp puede **bloquear el número**. Por eso: número de prueba, y el bot solo contesta, nunca escribe primero.
  Para un negocio real se usa la API oficial de Meta (WhatsApp Cloud API) — mencionarlo como "el siguiente nivel".
- **La clave de Evolution (apikey) es como la contraseña del WhatsApp.** No se comparte en grupos ni en capturas.
- **A los 6 meses** (o si se acaba el crédito) AWS suspende la cuenta. Si no la pasan a pago en 90 días, se borra todo.
  Está bien: es un laboratorio. Que no armen algo de un cliente real ahí.
- **Los dos relojes no coinciden:** AWS dura 6 meses, Odoo 24. Si el integrador dura más de 6 meses, el bot se queda
  sin servidor antes que Odoo: o se pasa la cuenta a pago (≈ USD 21/mes) o se presenta antes.
- **La base de Odoo se apaga** si nadie entra en 3 meses, y a los 24 meses sí o sí. Exportar los datos antes.

## Plan B

| Si pasa esto | Hacé esto |
|---|---|
| A un alumno AWS no le activó la cuenta | Que trabaje en pareja con otro (mismo servidor, cada uno con su instancia de WhatsApp en Evolution) |
| La terminal web de AWS no conecta | Revisar que el grupo de seguridad tenga el puerto 22 abierto. Si sigue, desde la consola: "Reboot instance" |
| DuckDNS o el candado no salen | Usar el dominio automático que trae Dokploy (`...traefik.me`) sin HTTPS, y agregar en n8n la variable `N8N_SECURE_COOKIE=false` (ver problemas frecuentes) |
| No hay número de prueba | Vincular con el WhatsApp propio **solo durante la clase** y desvincularlo al final (en el celular: Dispositivos vinculados → cerrar sesión) |
| **La base educativa de Odoo no acepta la conexión de n8n** | Dos salidas, a probar antes de la clase: (1) **Al revés**: en Odoo, **Ajustes → Técnico → Reglas de automatización**, crear una regla con disparador **"Al recibir un webhook"** que cree la oportunidad; Odoo da una dirección y n8n le manda los datos con un nodo **HTTP Request**, sin clave API. (2) Usar **Odoo Community** en un servidor aparte con el repo [odoo-aws-terraform](https://github.com/JonesMartin1/odoo-aws-terraform): funciona igual con n8n, pero no es Enterprise y suma otro servidor que gasta crédito |
| Un alumno no puede duplicar la base del curso | Que el profe la duplique por él y lo invite como usuario (los usuarios son ilimitados) |
| Odoo dice "demasiadas solicitudes" al crear bases en clase | Muchas bases desde la misma IP. Esperar unas horas, o pedirle a soporte de Odoo que marque la IP de la institución como confiable. Por eso se crean en casa |

## Al final de la clase

- Mostrar cómo **apagar** el servidor (EC2 → Instancias → Detener) si no lo van a usar: deja de gastar la máquina,
  pero la IP elástica y el disco siguen consumiendo un poco (≈ USD 6/mes).
- Mostrar dónde ver el crédito que queda: buscador de la consola → **Billing** → "Free Tier" / "Credits".
