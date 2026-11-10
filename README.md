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
| [ae4/](ae4/README.md) | Los dos | El integrador final (AE4): consigna y rúbrica v03, checklist de entrega, guía del coloquio, planilla de notas y revisor de claves |

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
