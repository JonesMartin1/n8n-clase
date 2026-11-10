# AE4: guía del docente para corregir y tomar el Coloquio

Va con la consigna `LAE-TICGO-2C2026-AE4-v03` y su rúbrica. Lo que sigue es cómo aplicarlas, no las reemplaza.

## Calendario

| Fecha | Qué pasa |
|---|---|
| Jue 12/11 | Encuentro 2 del taller: base educativa de Odoo, integración con n8n y arranque del integrador |
| Mar 17/11 | Laboratorio supervisado de integración. **Última devolución antes de la entrega**: anotarla, porque se pide en el Portafolio |
| Jue 19/11 | **Entrega de todas las parejas** antes de la clase + primer turno de Coloquios |
| Mar 24/11 | Segundo turno de Coloquios |
| Jue 26/11 | Tercer turno de Coloquios |

En una clase entran unas 8 a 10 parejas por día (10 minutos cada una más el cambio). Publicar el cronograma
antes del 17/11 para que nadie se entere el mismo día.

## Antes de cada Coloquio: verificar (unos 15 minutos por pareja)

La rúbrica es clara: **A1 y A3 se califican por lo que funciona, no por lo que dice el informe**.
Lo que no se puede verificar se puntúa como ausente.

1. **Entrar a la base de Odoo** con el usuario invitado. Desde *Mis bases de datos* del curso, las copias de los
   alumnos aparecen debajo de la base modelo, con el botón **Conectar**.
   - ¿Está adaptada a la organización, o sigue siendo la base modelo?
   - Recorrer **un** caso de prueba, de preferencia la excepción.
   - Mirar *Ajustes → Usuarios*: ¿los roles tienen sentido? ¿Todos son administradores?
2. **Pasar los flujos exportados por el revisor de claves** (ver abajo). Cualquier clave encontrada deja A4 en 10
   como máximo, y la pareja la tiene que cambiar **antes** de su Coloquio. Avisarles apenas se detecta.
3. **Ver el video** (máximo 3 minutos).
4. **Chequear los mínimos de A3**: ¿algún flujo lee o escribe en Odoo? Si ninguno lo hace, A3 queda En proceso
   (en la v03 de la rúbrica ese caso ya no alcanza el nivel Suficiente).
5. Cargar los puntos en `planilla-calificacion.xlsx`. La planilla aplica sola la regla del Bloque A y el tope.

### Revisor de claves

```bash
python -I tools/revisar_claves.py carpeta-de-la-pareja/
```

Recorre los `.json`, `.md`, `.txt` y `.csv` de la carpeta y avisa si encuentra algo que parezca una clave:
la apikey de Evolution sin reemplazar por `PEGAR_ACA`, encabezados `Authorization`, tokens con formatos conocidos
(`sk-`, `gho_`, `AKIA`, JWT) o campos con nombres como `password`, `apikey`, `token` o `secret` que tengan un valor
largo. Muestra **dónde** está la clave, nunca la clave completa. No revisa capturas: esas se miran a ojo.

## El Coloquio, minuto a minuto (10 minutos)

| Minuto | Qué pasa |
|---|---|
| 0:00 – 0:30 | Identificación para la grabación: estudiantes, asignatura, fecha, instancia y docente |
| 0:30 – 3:30 | **Demo en vivo**: disparar al menos una automatización y mostrar el efecto en Odoo. Cada integrante opera una parte |
| 3:30 – 10:00 | **Preguntas**: alternarlas entre los dos y pedir a cada uno que explique una parte que **no** operó |

Si la demo se cae por algo ajeno a la pareja (la conectividad, un servicio externo caído), se pasa al video y el
Coloquio sigue. Si se cae porque nunca funcionó, eso es evidencia para A1 y A3.

## Preguntas por componente

Elegir dos o tres por estudiante, no todas. Las mejores son las que salen de **su** trabajo.

| Componente | Qué pedir en la demo | Preguntas |
|---|---|---|
| A1. Sistema | Recorrer en Odoo el caso de excepción | ¿Por qué instalaron esta aplicación y no otra? ¿Qué puede ver y qué no cada usuario? ¿Qué pasaba antes con este caso en la organización? |
| A2. BPMN | Señalar en el TO-BE la tarea que se acaba de ejecutar | ¿Qué tarea dejaron manual y por qué? ¿Qué indicador muestra que el cuello de botella se resolvió? ¿De qué registro de Odoo sale ese dato? |
| A3. Automatizaciones | Disparar un flujo y mostrar su efecto | ¿Qué pasa si Odoo no responde? ¿Cómo se entera alguien de que el flujo falló? ¿Por qué n8n y no Make, o al revés? |
| A4. Datos | Mostrar dónde se guardan las claves y qué permisos tiene cada usuario | ¿En qué país quedan los mensajes de los clientes? ¿Qué exige el art. 12 de la Ley 25.326 para eso? Si un cliente pide que borren sus datos, ¿dónde hay que borrar? |
| C1. Alertas | Disparar la alerta | ¿Quién la recibe y qué hace con ella? ¿Por qué ese umbral? |
| C2. Cloud propio | Mostrar el servidor en Dokploy | ¿Cuánto cuesta por mes cuando se terminan los créditos? ¿Qué es IaaS y qué es SaaS en su solución? ¿Qué hacen el día que vence el crédito? |
| C3. Tablero | Abrir el tablero | ¿Qué decisión toma el gerente mirando este indicador? ¿Por qué este indicador y no las ventas totales? |
| Recorrido | — | ¿Qué cambiaron después de la devolución de AE2? ¿Qué decisión de la Bitácora tomarías distinto hoy? |

## Validada o No validada (por persona)

**Validada**: el estudiante cuenta qué hizo, fundamenta las decisiones con conceptos de la asignatura y puede
profundizar sobre una parte que no operó.

**No validada**: no puede explicar lo que operó, o la demo deja ver que no conoce lo que se construyó.

Señales que conviene anotar en la planilla para la devolución (y para una eventual revisión, que se hace solo sobre
la grabación):

- Responde siempre el mismo integrante, y el otro repite o asiente.
- No puede ubicar en el TO-BE la tarea que acaba de mostrar.
- Lo que dice no coincide con su propia Bitácora.
- No sabe qué hace un nodo del flujo que presentó como suyo.

Con un Protocolo de Evaluación Personalizada vigente, el Coloquio puede durar hasta 20 minutos. Los criterios no
cambian.

## Después del Coloquio

- Compartir la planilla con la pareja junto con la nota. Cada componente que quede en Suficiente o En proceso lleva
  una observación concreta: **qué falta y qué evidencia lo demostraría**. Esa es la hoja de ruta del Recuperatorio.
- Las parejas tienen **48 horas hábiles** para pedir la revisión del Coloquio. Se resuelve solo sobre la grabación.
- Recordarles que pueden apagar el servidor de AWS, pero que si van al Recuperatorio la base de Odoo y los flujos
  tienen que seguir vivos.
