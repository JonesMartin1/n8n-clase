# Clase: tu propio servidor gratis + n8n + bot de WhatsApp + Odoo Enterprise

Para chicos con poco conocimiento técnico, pensada como base de su **proyecto integrador**. Al final cada uno tiene:

1. Una cuenta de AWS con créditos gratis (sin pagar nada).
2. Un servidor en la nube con **Dokploy**, un panel visual muy parecido a Easypanel, pero 100% libre y sin límite de proyectos.
3. **n8n** instalado con un clic.
4. Un **bot de WhatsApp** que contesta mensajes.
5. Una empresa de práctica en **Odoo Enterprise** (gratis por 2 años con el programa educativo de Odoo),
   conectada al bot: lo que entra por WhatsApp queda cargado en Odoo.

## Archivos

| Archivo | Para quién | Qué tiene |
|---|---|---|
| [guia-docente.md](guia-docente.md) | Profe | Agenda, qué preparar antes, cómo explicar cada parte, plan B |
| [guia-alumno.md](guia-alumno.md) | Alumnos | Paso a paso para seguir en clase, con casilleros para tildar |
| [bot-eco.json](bot-eco.json) | Alumnos | Workflow de n8n listo para importar (el bot que contesta) |
| [problemas-frecuentes.md](problemas-frecuentes.md) | Los dos | Lo que se rompe y cómo arreglarlo |
| [guia-agente-de-codigo.md](guia-agente-de-codigo.md) | Alumnos | Cómo usar gratis un agente de IA (Codex, Copilot Student, Antigravity) para armar y arreglar flujos, sin pasarle claves |
| [agente/AGENTS.md](agente/AGENTS.md) | Alumnos (para su agente) | Contexto para pegarle al agente de IA: versiones (n8n 1.104.0, Evolution v2.3.7), cómo está armado el bot y los errores ya resueltos |
| [ae4/](ae4/README.md) | Los dos | El integrador final (AE4): consigna y rúbrica v03, checklist de entrega, planilla de notas y revisor de claves |

| [videos/](#videos) | Los dos | Cinco videos cortos (30 a 36 s) para pasar en el proyector |

## Cómo usar todo esto

**El profe, antes de la clase**
1. Leer [guia-docente.md](guia-docente.md): dice qué preparar con días de anticipación (cuenta de AWS, base modelo de
   Odoo, probar la API) y el plan B si algo falla.
2. Bajar los videos de proyector a la compu del aula (ver [Videos](#videos)): así no dependés del wifi.
3. Tener a mano [problemas-frecuentes.md](problemas-frecuentes.md).

**En la clase**
1. Arrancar con el video 1, *Qué vamos a armar*: en 30 segundos muestran el recorrido completo, del WhatsApp a Odoo.
2. Antes de crear el servidor, pasar el video 2, *Qué es un servidor*.
3. Los alumnos siguen [guia-alumno.md](guia-alumno.md) tildando casilleros e importan [bot-eco.json](bot-eco.json) en n8n.
   Si se traban, [guia-agente-de-codigo.md](guia-agente-de-codigo.md) explica cómo pedirle ayuda a un agente de IA gratis.
4. Antes de que exporten flujos o saquen capturas, pasar el video 3, *La clave no se comparte*.

**Para el integrador (AE4)**
1. Pasar el video 4, *Cómo se aprueba AE4*, y compartir con las parejas el
   [checklist de entrega](ae4/checklist-entrega.md) junto con la consigna y la rúbrica v03 que están en [ae4/](ae4/README.md).
2. Al corregir: `ae4/guia-coloquio.md` para el coloquio (no está en el repo público: queda solo en tu compu), `ae4/planilla-calificacion.xlsx`
   para las notas y `python -I ae4/tools/revisar_claves.py <carpeta de la entrega>` para encontrar claves expuestas.

## Videos

Cada video dura entre 30 y 36 segundos, sin voz y con música y sonidos. Tiene un rótulo grande en cada escena y termina
con un resumen que conviene **pausar** para explicarlo. Están hechos para el proyector (1920×1080).

| # | Video | Cuándo pasarlo | Archivo para el proyector |
|---|---|---|---|
| 1 | Qué vamos a armar | Al empezar la clase | [que-vamos-a-armar-proyector.mp4](videos/que-vamos-a-armar/exports/que-vamos-a-armar-proyector.mp4) |
| 2 | Qué es un servidor | Antes de crear el servidor en AWS | [que-es-un-servidor-proyector.mp4](videos/que-es-un-servidor/exports/que-es-un-servidor-proyector.mp4) |
| 3 | La clave no se comparte | Antes de exportar flujos o sacar capturas | [la-clave-no-se-comparte-proyector.mp4](videos/la-clave-no-se-comparte/exports/la-clave-no-se-comparte-proyector.mp4) |
| 4 | Cómo se aprueba AE4 | Al presentar el integrador | [como-se-aprueba-ae4-proyector.mp4](videos/como-se-aprueba-ae4/exports/como-se-aprueba-ae4-proyector.mp4) |
| 5 | Tu ayudante de código | Antes de que armen sus flujos solos (va con [guia-agente-de-codigo.md](guia-agente-de-codigo.md)) | [tu-ayudante-de-codigo-proyector.mp4](videos/tu-ayudante-de-codigo/exports/tu-ayudante-de-codigo-proyector.mp4) |

**Para bajarlos:** entrá al enlace y tocá el botón de descarga (la flechita, *Download raw file*). Se abren con
cualquier reproductor de video.

**Otra forma, sin reproductor:** cada video también viene como página web en `videos/<video>/dist/<video>.html`.
Se baja igual y se abre con doble clic en el navegador. Funciona sin internet.

**Para preparar la clase:** en `videos/<video>/exports/<video>-shots.md` está la lista de escenas, con el segundo en
que aparece cada una y su rótulo.

**Para cambiar un video** (un texto, un color): el código está en `videos/<video>/src/`. Se edita con la skill
`procedural-film` de Claude Code y se vuelve a generar con `node tools/render.cjs`.

## La idea en un dibujo

```
 Celular del cliente ──WhatsApp──▶ Evolution API ──aviso (webhook)──▶ n8n ──carga el pedido──▶ Odoo
        ▲                          (en el servidor)                    │                    (en la nube
        └─────────────── respuesta ◀── Evolution API ◀── "mandá esto" ─┘                     de Odoo)

 Evolution y n8n corren en UN servidor de AWS, manejado desde el panel Dokploy.
 Odoo Enterprise corre en los servidores de Odoo (odoo.com), con la cuenta educativa.
```

## Por qué Odoo va en la nube de Odoo y no en el servidor de AWS

- **Enterprise no se puede instalar en un servidor propio sin pagar**: el código de Enterprise solo lo descargan los
  partners de Odoo o quien tiene suscripción. Lo que se instala gratis en un servidor es la versión **Community**.
- La **base educativa de Odoo es Enterprise** y es gratis, pero **solo funciona en la nube de Odoo** (Odoo Online).
- El servidor gratis de AWS (2 GB) ya va justo con Dokploy + n8n + Evolution. Odoo adentro no entra.

## Lo que ya está verificado (al 2026-10-28)

- **AWS Free Plan** (cuentas creadas desde el 15/07/2025): USD 100 de crédito al registrarse + hasta USD 100 más
  por completar actividades. Dura **6 meses** o hasta gastar el crédito. Con el plan Free **no te pueden cobrar**:
  cuando se termina, la cuenta se suspende (guarda los datos 90 días) salvo que la pases a pago.
  Los viejos "750 horas gratis por 12 meses" que aparecen en tutoriales **ya no aplican** a cuentas nuevas.
- **AWS no tiene "2 años gratis"** para estudiantes. AWS Educate son cursos y laboratorios, sin un servidor libre.
  Los **2 años gratis son de Odoo**, no de AWS (ver abajo).
- Instancias EC2 que entran en el plan: `t3.micro`, `t3.small`, `t4g.micro`, `t4g.small`, `c7i-flex.large`, `m7i-flex.large`.
- **Dokploy** pide 2 GB de RAM y 30 GB de disco, y trae plantillas oficiales de `n8n` y `evolutionapi`.
- **Easypanel** también sirve: el plan gratis permite 3 proyectos por servidor. Elegimos Dokploy porque es libre y sin topes.
- **Odoo Education** ([odoo.com/education](https://www.odoo.com/es_ES/education/odoo-online)): profes y alumnos crean bases
  **gratis por 24 meses**, con **usuarios ilimitados**, y la base educativa **es edición Enterprise**. El nombre tiene
  que empezar con `edu-`. Hay que entrar **al menos una vez cada 3 meses** o se desactiva. A los 24 meses se apaga:
  exportar los datos antes. **No hay que anotarse ni esperar aprobación**: se crea desde "Crear una base de datos
  gratuita" y el prefijo `edu-` en el nombre es lo que la hace gratis. Cada alumno crea la suya (o duplica la base
  modelo del profe, si la armó).
- ⚠ **Sin confirmar:** si la base educativa deja que n8n se conecte por la API de Odoo. En los planes pagos de Odoo
  Online la API externa solo viene en el plan "Custom". Hay que probarlo una vez antes de la clase
  (ver el plan B en la guía del profe).
