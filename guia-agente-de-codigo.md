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

## 3. Para qué te sirve en este taller

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

## 4. Tres reglas que no se negocian

1. **Nunca le pegues una clave.** Ni la de Evolution, ni la de Odoo, ni la de AWS o Dokploy. Al agente le pasás
   el flujo **siempre** con `PEGAR_ACA` en lugar de la clave. Es lo mismo que dice el video
   *La clave no se comparte*: lo que le pegás a una IA sale de tu compu.
2. **No le creas: probalo.** El agente puede inventar nodos, campos o pasos que no existen. La única prueba que
   vale es que el flujo **ande en tu n8n** y el dato **aparezca en tu Odoo**.
3. **Tenés que poder explicarlo vos.** En el Coloquio te preguntan **a vos**, no al agente. Si armó algo que no
   entendés, pedile que te lo explique hasta que lo puedas contar con tus palabras.

Tampoco le pases **datos reales** de clientes, proveedores ni empleados. Usá siempre los datos inventados de tu Odoo.

---

## 5. Qué podés usar y qué no en AE4

- ❌ **No se redactan con IA:** el informe, la Bitácora Individual ni las respuestas del Coloquio
  (punto 27 de la Guía Docente II Parte). Esto incluye pedirle al agente que "mejore" o "corrija" tu texto.
- ✅ **Sí está permitido:** un bot con IA **como parte de la solución** (por ejemplo, que un nodo de IA entienda
  el mensaje del cliente).
- ❓ **Usar el agente para construir o arreglar tus flujos:** consultalo con el docente antes de entregar.
  Si lo usás, **anotalo en el Portafolio**: qué le pediste y qué cambiaste vos. Es parte del registro de decisiones.

---

## 6. Si algo no anda

| Lo que pasa | Qué hacer |
|---|---|
| "Alcanzaste el límite de uso" | Se te terminó el cupo gratis. Esperá a que se renueve o pasate a otra opción de la tabla |
| El JSON no se importa en n8n | Pedile: "el JSON no se importa en n8n, revisalo y dámelo de nuevo completo" |
| El flujo se importa pero falla | Copiale el error exacto del nodo, no le digas solo "no anda" |
| Te pide una clave o un usuario | **No se la des.** Decile que la vas a poner vos a mano en n8n |
