# Clase: tu propio servidor gratis + n8n + bot de WhatsApp

Para chicos con poco conocimiento técnico. Al final de la clase cada uno tiene:

1. Una cuenta de AWS con créditos gratis (sin pagar nada).
2. Un servidor en la nube con **Dokploy**, un panel visual muy parecido a Easypanel, pero 100% libre y sin límite de proyectos.
3. **n8n** instalado con un clic.
4. Un **bot de WhatsApp** que contesta mensajes (con IA opcional al final).

## Archivos

| Archivo | Para quién | Qué tiene |
|---|---|---|
| [guia-docente.md](guia-docente.md) | Profe | Agenda, qué preparar antes, cómo explicar cada parte, plan B |
| [guia-alumno.md](guia-alumno.md) | Alumnos | Paso a paso para seguir en clase, con casilleros para tildar |
| [bot-eco.json](bot-eco.json) | Alumnos | Workflow de n8n listo para importar (el bot que contesta) |
| [problemas-frecuentes.md](problemas-frecuentes.md) | Los dos | Lo que se rompe y cómo arreglarlo |

## La idea en un dibujo

```
 Celular del alumno ──WhatsApp──▶ Evolution API ──aviso (webhook)──▶ n8n
        ▲                         (en el servidor)                    │
        └────────────── respuesta ◀── Evolution API ◀── "mandá esto" ─┘

 Todo corre adentro de UN servidor de AWS, manejado desde el panel Dokploy.
```

## Lo que ya está verificado (al 2026-10-27)

- **AWS Free Plan** (cuentas creadas desde el 15/07/2025): USD 100 de crédito al registrarse + hasta USD 100 más
  por completar actividades. Dura **6 meses** o hasta gastar el crédito. Con el plan Free **no te pueden cobrar**:
  cuando se termina, la cuenta se suspende (guarda los datos 90 días) salvo que la pases a pago.
  Los viejos "750 horas gratis por 12 meses" que aparecen en tutoriales **ya no aplican** a cuentas nuevas.
- Instancias EC2 que entran en el plan: `t3.micro`, `t3.small`, `t4g.micro`, `t4g.small`, `c7i-flex.large`, `m7i-flex.large`.
- **AWS Educate** no da un servidor para usar libre: son cursos y laboratorios. La cuenta normal con Free Plan es el camino.
- **Dokploy** pide 2 GB de RAM y 30 GB de disco, y trae plantillas oficiales de `n8n` y `evolutionapi`.
- **Easypanel** también sirve: el plan gratis permite 3 proyectos por servidor. Elegimos Dokploy porque es libre y sin topes.
