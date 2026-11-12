# Tu ayudante de código: cómo usar un agente de IA (gratis) en el taller

Un **agente de código** es un chat de IA que, además de contestar, **escribe y arregla** cosas técnicas por vos:
un flujo de n8n, una fórmula, un mensaje de error que no entendés. Es como tener al lado a un compañero que sabe
programar, pero que a veces se equivoca con mucha seguridad.

> Datos de planes revisados al **12/11/2026**, en las páginas oficiales de cada uno. Los planes gratis cambian
> seguido (en 2026 cerraron varios): si algo no coincide con lo que ves en pantalla, manda lo que dice la página
> oficial.

---

## 1. La idea: cada cosa con su herramienta gratis

El error más común es usar el agente para todo y quedarse sin cupo a mitad del cuatrimestre. Pensalo como una
caja de herramientas: **el chat gratis para pensar, el agente solo para hacer**.

| Para qué | Usá esto (gratis) | Por qué |
|---|---|---|
| **Pensar el flujo, entender un error, preguntar "¿qué es esto?"** | **ChatGPT Free** (chatgpt.com) y, como segunda opinión, **Gemini** (gemini.google.com) | ChatGPT Free no tiene tope de mensajes de texto. Es donde tenés que hacer la mayoría de las preguntas |
| **Que te arme o arregle el JSON de un flujo** | **Copilot Student** (principal), **Codex** (tareas cortas), **Antigravity** (reserva) | Estos sí tienen cupo chico: guardalos para cuando haya que escribir el flujo |
| **La IA que va adentro de tu bot** (paso 11 de la guía) | **API de Gemini** en Google AI Studio, modelo **Flash** o **Flash-Lite** | Es gratis y n8n 1.104 ya trae el nodo |

## 2. Los agentes de código gratis

| Opción | Qué necesitás | Qué te dan gratis | Para qué |
|---|---|---|---|
| **GitHub Copilot Student** | Cuenta de GitHub verificada como alumno en GitHub Education | Autocompletado **ilimitado** y **200 créditos por mes** para el chat y el modo agente (unos US$2: alcanza para pocas tareas grandes). El modelo lo elige Copilot solo, no vos | **El principal del cuatrimestre.** La verificación tarda días: pedila ya |
| **Codex (ChatGPT Free)** | Tu cuenta de ChatGPT de siempre | "Acceso limitado", sin número publicado. Comparte cupo con otras funciones de ChatGPT | **Empezar hoy** y para arreglos cortos |
| **Google Antigravity** | Una cuenta de Gmail personal (no la de la facultad) | Un cupo que se renueva **una vez por semana** (solo modelos Gemini) | **Reserva** cuando se te termina el de Copilot |
| **Copilot Free** (si no te aprueban como alumno) | Cuenta de GitHub, sin tarjeta | 2.000 autocompletados por mes y muy pocos créditos de chat | Mientras esperás la verificación |
| **Kiro** (de Amazon) | Cuenta gratis, sin tarjeta | 50 créditos por mes | Otra reserva. Su plan de estudiantes (1.000 créditos) **no incluye universidades argentinas** |
| **Cursor**, **Windsurf/Devin**, **Mistral Vibe** | Cuenta gratis | Un cupo "limitado" sin número | Si ya los usás. No hay que instalarlos para el taller |

**Ya no existen gratis (no pierdas tiempo):** Gemini Code Assist individual y el Gemini CLI gratis (cerraron el
18/06/2026, los reemplazó Antigravity), Qwen Code gratis (cerró el 15/04/2026), Amazon Q Developer para cuentas
nuevas (cerró el 15/05/2026, lo reemplazó Kiro), GitHub Models (cerró el 30/07/2026) y los créditos gratis de
Hugging Face. **Claude Code** no tiene plan gratis: necesita una suscripción paga. **Cursor** no tiene plan
de estudiantes.

**Lo que conviene:** hoy mismo pedí la verificación de Copilot Student y, mientras esperás, usá Codex. Para
preguntas, siempre primero ChatGPT Free.

### Beneficio para estudiantes que sí anda en Argentina

**Google AI Plus gratis por un año** ([gemini.google/students](https://gemini.google/students/)), para
universitarios mayores de 18, se puede pedir hasta el **31/12/2026**. ⚠ **Pide tarjeta y al año empieza a
cobrar** (US$4,99 por mes): si lo activás, anotá la fecha y cancelalo antes. No hace falta para el taller.

---

## 3. Cómo activarlos, paso a paso

### Codex (con tu ChatGPT)
1. Entrá a [chatgpt.com/codex](https://chatgpt.com/codex) con tu cuenta de ChatGPT.
2. Listo: ya podés pedirle cosas. Si querés la aplicación de escritorio, aparece ofrecida en esa misma página.
3. Para ver cuánto cupo te queda: [chatgpt.com/codex/settings/usage](https://chatgpt.com/codex/settings/usage).

### GitHub Copilot Student
1. Creá una cuenta en [github.com](https://github.com) (gratis) si no tenés.
2. Entrá a [github.com/settings/education/benefits](https://github.com/settings/education/benefits) y pedí la
   verificación de estudiante. Te va a pedir **el mail de la facultad o una constancia de alumno regular** de la UCP.
3. Esperá el mail de aprobación (puede tardar unos días).
4. Volvé a esa misma página, buscá **Copilot Student** y activalo.
5. Instalá [VS Code](https://code.visualstudio.com) (gratis), abrí el panel de **Copilot Chat** y entrá con tu cuenta de GitHub.

⚠ Si después de verificarte la página te muestra **solo opciones pagas, no pagues**. Esperá unos días y volvé a
probar. Si sigue igual, escribile al soporte de GitHub.

### Google Antigravity
1. Entrá a [antigravity.google](https://antigravity.google) con una cuenta **@gmail.com**.
2. Descargá la aplicación y entrá con esa misma cuenta.

---

## 4. Antes de pedirle nada: dale el contexto de tu instalación

Un agente que no sabe **qué versión** usás inventa botones y nodos que en tu pantalla no existen. Por eso armamos
un archivo con todo lo que tiene que saber:

👉 **[agente/AGENTS.md](agente/AGENTS.md)**

Ahí está:
- **Tus versiones:** n8n **1.104.0** y Evolution API **v2.3.7**, que son las que instala la plantilla de Dokploy,
  con Odoo Online educativo.
- **Cómo está armado tu bot:** el nodo Datos, las direcciones y el webhook.
- **Los errores que ya resolvimos en clase:** el 401, el 404, el `@lid`, el bot que se contesta solo y otros.
- **Las reglas:** nada de claves y nada de redactar el informe.

**Cómo usarlo:**

| Agente | Qué hacés |
|---|---|
| ChatGPT / Codex web | Abrí el archivo en GitHub, copiá todo y pegalo como **primer mensaje** de la charla. Después hacé tu pedido |
| Codex o Copilot en VS Code | Descargá el archivo y guardalo como `AGENTS.md` en la carpeta que abrís. Lo leen solos |
| Antigravity | Pegalo como primer mensaje, igual que en ChatGPT |

> ¿Actualizaste n8n o Evolution por tu cuenta? Cambiá la versión en el archivo. En n8n la ves en el menú de
> ayuda (**?** → **About n8n**). En Evolution, abriendo `https://evo.TUNOMBRE.duckdns.org` en el navegador.

---

## 5. Para qué te sirve en este taller

**Armar un flujo de n8n desde cero.** Describile lo que querés en criollo:

> "Necesito un flujo de n8n que reciba un mensaje de WhatsApp desde Evolution API por webhook. Si el mensaje
> dice que es un pedido, que cree un presupuesto en Odoo con el nombre del cliente y le conteste por WhatsApp
> con el número de pedido. Dame el JSON para importar en n8n y explicame cada nodo como si no supiera nada."

**Entender un error.** Copiá el mensaje rojo del nodo que falló:

> "En n8n, el nodo 'Crear en Odoo' me da este error: (pegás el error). ¿Qué significa y cómo lo arreglo?
> Explicámelo paso a paso."

**Mejorar lo que ya tenés.** Exportá tu flujo, **con la clave cambiada por `PEGAR_ACA`**, y pegáselo:

> "Este es mi flujo de n8n. ¿Qué pasa si el cliente escribe algo que no es un pedido? Agregale ese caso."

**Pedile siempre que te explique.** Terminá tus pedidos con *"explicámelo como si no supiera nada"*. Si no
entendés lo que hizo, no te sirve.

---

## 6. Cómo no quemar tu cupo en este proyecto

1. **Preguntá en el chat, hacé con el agente.** "¿Qué es un webhook?", "¿qué significa este error?", "¿cómo
   conviene armar esto?": todo eso va a **ChatGPT Free**, que no se te termina. Al agente le llevás el pedido ya
   pensado.
2. **Pegá solo lo que falla.** El nodo que da error y el mensaje rojo, no el flujo entero ni "revisá todo".
3. **Un chat por problema.** Cuando cambiás de tema, abrí una charla nueva: una charla larga gasta más en cada
   mensaje porque el agente relee todo lo anterior.
4. **Pedidos concretos.** "Agregá un nodo que cree la oportunidad en Odoo después del If" gasta mucho menos que
   "mejorá mi bot".
5. **Pegale primero [agente/AGENTS.md](agente/AGENTS.md).** Sin eso inventa botones que no existen y se gastan
   tres vueltas en corregirlo.
6. **Si se te terminó uno, pasá al siguiente** de la tabla: Copilot → Codex → Antigravity → Kiro. Y anotá cuándo
   se renueva cada uno (Copilot por mes, Antigravity por semana).
7. **No abras cuentas truchas para tener más cupo.** Va contra las reglas de todos y te pueden cerrar la cuenta.
8. **No pongas tarjeta** en ningún servicio para el taller. Nada de lo que hace falta la pide.

## 7. La IA que va adentro de tu bot (paso 11), sin gastar

Esto es distinto del agente: es el "cerebro" que contesta a tus clientes desde n8n. También es gratis:

| Opción | Cupo gratis | Cómo se usa en n8n 1.104 |
|---|---|---|
| **API de Gemini** ([aistudio.google.com/apikey](https://aistudio.google.com/apikey)) — **la recomendada** | Gratis en los modelos **Flash** y **Flash-Lite** (los "Pro" no). Los límites se ven en AI Studio | Nodo **Google Gemini Chat Model**, como en el paso 11 |
| **Groq** ([console.groq.com](https://console.groq.com)) — plan B | Plan gratis con límites por minuto y por día | Nodo **Groq Chat Model** |
| **OpenRouter**, modelos que terminan en `:free` | Solo **50 mensajes por día**: no alcanza para un bot, sirve para probar | Nodo **OpenRouter Chat Model** |

Para que dure:
- Elegí **Flash-Lite** (o Flash). Para contestar pedidos de una pizzería sobra.
- En **Simple Memory**, dejá pocos mensajes de memoria (5 a 10): cada mensaje recordado se vuelve a mandar.
- Probá con 3 o 4 mensajes, no en ráfaga. Y para probar los nodos de después, usá **Pin data** (el alfiler en
  la salida de un nodo) así n8n no le vuelve a preguntar a la IA en cada prueba.
- ⚠ **En el plan gratis de Gemini, Google puede usar lo que le mandás para mejorar sus productos.** Por eso,
  solo datos inventados: nunca datos reales de clientes.

---

## 8. Tres reglas que no se negocian

1. **Nunca le pegues una clave.** Ni la de Evolution, ni la de Odoo, ni la de AWS o Dokploy. Al agente le pasás
   el flujo **siempre** con `PEGAR_ACA` en lugar de la clave. Es lo mismo que dice el video
   *La clave no se comparte*: lo que le pegás a una IA sale de tu compu.
2. **No le creas: probalo.** El agente puede inventar nodos, campos o pasos que no existen. La única prueba que
   vale es que el flujo **ande en tu n8n** y el dato **aparezca en tu Odoo**.
3. **Tenés que poder explicarlo vos.** En el Coloquio te preguntan **a vos**, no al agente. Si armó algo que no
   entendés, pedile que te lo explique hasta que lo puedas contar con tus palabras.

Tampoco le pases **datos reales** de clientes, proveedores ni empleados. Usá siempre los datos inventados de tu Odoo.

---

## 9. Qué podés usar y qué no en AE4

- ❌ **No se redactan con IA:** el informe, la Bitácora Individual ni las respuestas del Coloquio
  (punto 27 de la Guía Docente II Parte). Esto incluye pedirle al agente que "mejore" o "corrija" tu texto.
- ✅ **Sí está permitido:** un bot con IA **como parte de la solución** (por ejemplo, que un nodo de IA entienda
  el mensaje del cliente).
- ✅ **También está permitido usar el agente para construir o arreglar tus flujos**, con una condición:
  **anotalo en el Portafolio** (qué le pediste, qué te dio y qué cambiaste vos). Es parte del registro de
  decisiones. Y en el Coloquio lo tenés que poder explicar vos.

---

## 10. Si algo no anda

| Lo que pasa | Qué hacer |
|---|---|
| "Alcanzaste el límite de uso" | Se te terminó el cupo gratis. Pasate al siguiente de la tabla de la sección 2 y mirá la sección 6 para que no te vuelva a pasar |
| El bot deja de contestar y el nodo de Gemini dice "quota" o "429" | Se terminó el cupo gratis del día o del minuto de la API | Esperá un rato, pasá a Flash-Lite o usá Groq (sección 7) |
| El JSON no se importa en n8n | Pedile: "el JSON no se importa en n8n, revisalo y dámelo de nuevo completo" |
| El flujo se importa pero falla | Copiale el error exacto del nodo, no le digas solo "no anda" |
| Te pide una clave o un usuario | **No se la des.** Decile que la vas a poner vos a mano en n8n |
