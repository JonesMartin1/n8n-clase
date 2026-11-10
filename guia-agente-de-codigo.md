# Tu ayudante de código: cómo usar un agente de IA (gratis) en el taller

Un **agente de código** es un chat de IA que, además de contestar, **escribe y arregla** cosas técnicas por vos:
un flujo de n8n, una fórmula, un mensaje de error que no entendés. Es como tener al lado a un compañero que sabe
programar, pero que a veces se equivoca con mucha seguridad.

> Datos de planes revisados al **10/11/2026**. Los planes gratis cambian seguido: si algo no coincide con lo que
> ves en pantalla, manda lo que dice la página oficial.

---

## 1. Cuál usar (todos tienen versión gratis)

| Opción | Qué necesitás | Qué te dan gratis | Recomendado para |
|---|---|---|---|
| **Codex (ChatGPT)** | Tu cuenta de ChatGPT de siempre | Incluido en el plan Free, pensado para "tareas rápidas". Cupo chico y sin número publicado | **Empezar hoy mismo**, sin instalar nada raro |
| **GitHub Copilot Student** | Cuenta de GitHub verificada como alumno en GitHub Education | Plan Student gratis: autocompletado ilimitado y unos 200 créditos por mes para el chat y el modo agente | **Usarlo todo el cuatrimestre**. La verificación puede tardar días: pedila ya |
| **Google Antigravity** | Una cuenta de Gmail personal (no la de la facultad) | Un cupo que se renueva **una vez por semana** | **Plan B** cuando se te termina el cupo del otro |

**Claude Code** no tiene plan gratis: necesita una suscripción paga.

**Lo que conviene:** arrancá con Codex, que ya lo tenés, y en paralelo pedí Copilot Student. Cuando te lo aprueben,
pasate a Copilot.

---

## 2. Cómo activarlos, paso a paso

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

## 3. Antes de pedirle nada: dale el contexto de tu instalación

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

## 4. Para qué te sirve en este taller

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

## 5. Tres reglas que no se negocian

1. **Nunca le pegues una clave.** Ni la de Evolution, ni la de Odoo, ni la de AWS o Dokploy. Al agente le pasás
   el flujo **siempre** con `PEGAR_ACA` en lugar de la clave. Es lo mismo que dice el video
   *La clave no se comparte*: lo que le pegás a una IA sale de tu compu.
2. **No le creas: probalo.** El agente puede inventar nodos, campos o pasos que no existen. La única prueba que
   vale es que el flujo **ande en tu n8n** y el dato **aparezca en tu Odoo**.
3. **Tenés que poder explicarlo vos.** En el Coloquio te preguntan **a vos**, no al agente. Si armó algo que no
   entendés, pedile que te lo explique hasta que lo puedas contar con tus palabras.

Tampoco le pases **datos reales** de clientes, proveedores ni empleados. Usá siempre los datos inventados de tu Odoo.

---

## 6. Qué podés usar y qué no en AE4

- ❌ **No se redactan con IA:** el informe, la Bitácora Individual ni las respuestas del Coloquio
  (punto 27 de la Guía Docente II Parte). Esto incluye pedirle al agente que "mejore" o "corrija" tu texto.
- ✅ **Sí está permitido:** un bot con IA **como parte de la solución** (por ejemplo, que un nodo de IA entienda
  el mensaje del cliente).
- ✅ **También está permitido usar el agente para construir o arreglar tus flujos**, con una condición:
  **anotalo en el Portafolio** (qué le pediste, qué te dio y qué cambiaste vos). Es parte del registro de
  decisiones. Y en el Coloquio lo tenés que poder explicar vos.

---

## 7. Si algo no anda

| Lo que pasa | Qué hacer |
|---|---|
| "Alcanzaste el límite de uso" | Se te terminó el cupo gratis. Esperá a que se renueve o pasate a otra opción de la tabla |
| El JSON no se importa en n8n | Pedile: "el JSON no se importa en n8n, revisalo y dámelo de nuevo completo" |
| El flujo se importa pero falla | Copiale el error exacto del nodo, no le digas solo "no anda" |
| Te pide una clave o un usuario | **No se la des.** Decile que la vas a poner vos a mano en n8n |
