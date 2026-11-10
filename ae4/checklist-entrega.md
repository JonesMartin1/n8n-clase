# AE4: checklist de entrega para la pareja

Consigna `LAE-TICGO-2C2026-AE4-v03`. **Entrega: jueves 19/11, antes del inicio de la clase**, en la Tarea del
Aula Digital UCP. La fecha es la misma para todas las parejas, cualquiera sea el día de su Coloquio.

Tildá cada casillero solamente si lo podés **mostrar**. Lo que el docente no puede verificar se puntúa como ausente.

---

## Antes de todo: lo que deja la nota en cero o en 5

- [ ] **Ninguna clave a la vista.** Revisá el informe, las capturas, los JSON exportados y el Portafolio.
      En el flujo del bot, el nodo **Datos** guarda la clave de Evolution: cambiala por `PEGAR_ACA` antes de exportar.
      Una clave expuesta deja A4 en 10 como máximo, y además hay que cambiarla antes del Coloquio.
- [ ] Los datos cargados en Odoo son **ficticios o están anonimizados**. Nada de clientes, proveedores ni empleados reales.
- [ ] El docente está **invitado como usuario** en la base de Odoo. Sin acceso, A1 vale 0.
- [ ] Los **cuatro componentes mínimos** están completos. Si uno solo queda por debajo de 10 de 15, AE4 no se aprueba
      y los puntos extra no cuentan.

## A1. Sistema de información implementado (15)

- [ ] Duplicaron la base modelo del curso y la **adaptaron** a la organización: empresa, productos o servicios,
      clientes y usuarios con roles. Si queda la base modelo sin tocar, el componente queda En proceso.
- [ ] Instalaron **solo** las aplicaciones que el proceso necesita, y cada una tiene su justificación.
- [ ] Hay **tres casos de prueba** recorridos de punta a punta en Odoo, con capturas.
- [ ] Uno de los tres es una **excepción** (falta de stock, cliente sin crédito, reclamo, pedido incompleto)
      y se resuelve **dentro** del sistema.
- [ ] Si usan otro ERP o CRM: tiene justificación y el docente tiene un acceso equivalente.

## A2. Flujos modelados (15)

- [ ] El AS-IS y el TO-BE están en **Bizagi**, corregidos según la devolución de AE2. Se adjunta el `.bpm`.
- [ ] El TO-BE muestra **qué tipo de tarea es cada una**: en Odoo, de servicio (n8n o Make), de envío o recepción
      de mensajes, o manual.
- [ ] El TO-BE coincide con lo que está implementado. Si se copia el de AE2 sin actualizar, queda En proceso.
- [ ] Están los indicadores de AE2: qué miden, cómo se calculan, con qué frecuencia y cuál es el valor aceptable,
      **más el registro de Odoo del que sale cada dato**.
- [ ] Si cambiaron de organización: hay un AS-IS propio del proceso elegido. Sin él, A2 queda En proceso.

## A3. Automatizaciones (15)

- [ ] Hay **dos flujos o más** que funcionan, en n8n o en Make.
- [ ] **Al menos uno lee o escribe en Odoo** (crea una oportunidad o un pedido, consulta stock, actualiza un estado),
      o usa el Plan B: una regla de automatización de Odoo con disparador por webhook.
      Si ningún flujo toca Odoo, el componente queda En proceso.
- [ ] Cada flujo ataca un **cuello de botella** del proceso modelado. El bot que repite el mensaje no cuenta.
- [ ] Cada flujo está documentado: disparador, pasos, datos que toma y que entrega, qué tarea manual reemplaza,
      qué error previene, **qué pasa si falla** y qué condiciones necesita para funcionar.
- [ ] La elección de n8n o de Make está fundamentada con **dos criterios o más**: costo, dónde se procesan los datos,
      límites del plan gratuito, conectores o mantenimiento.
- [ ] Se adjuntan la exportación de cada flujo (JSON de n8n o blueprint de Make), **sin claves**, y capturas de
      ejecuciones exitosas.
- [ ] Hay un video de demostración de **tres minutos como máximo**, con el enlace en los anexos.

## A4. Protocolo de protección de datos (15)

- [ ] Hay un **inventario** con los datos personales y financieros que maneja la solución, en qué sistema queda cada uno
      (Odoo, n8n, Make, Evolution, IA, planillas) y **en qué país están los servidores**.
- [ ] Hay **tres riesgos concretos**, que se pueden señalar en lo construido. "Hackeo" o "virus" no alcanzan.
      Algunos lugares donde buscarlos: claves de API, permisos de los usuarios de Odoo, WhatsApp no oficial,
      mensajes enviados a una IA externa, copias de seguridad, vencimiento de los créditos y de la base educativa.
- [ ] Cada medida tiene **responsable y frecuencia**, y es proporcionada al tamaño de la organización.
- [ ] Cada medida está encuadrada en la Ley 25.326: art. 5 (consentimiento), 9 (seguridad), 10 (confidencialidad),
      12 (transferencia internacional) y 14 a 16 (acceso, rectificación y supresión).
- [ ] Hay una **pieza de comunicación** (infografía, instructivo o mensaje) que entiende alguien que no es técnico.

## Bloque B. Calidad (25)

- [ ] **B1 (7).** Retoman AE1 y AE2 diciendo qué se conservó, qué se cambió y por qué.
- [ ] **B2 (6).** Cada herramienta tiene su alternativa descartada, su licencia (código abierto, Community o Enterprise)
      y su modelo de despliegue (SaaS, PaaS o IaaS). Las citas están en APA 7.
- [ ] **B3 (6).** Están las fases, los **costos reales después del período gratuito** (servidor, licencias por usuario,
      WhatsApp oficial), la capacitación, las resistencias previsibles y la continuidad (vencimiento de créditos y base,
      exportación de datos).
- [ ] **B4 (6).** El resumen ejecutivo de una página **propone**, no solo describe. El informe tiene de 8 a 12 páginas
      sin contar anexos, y las capturas se leen.

## Bloque C. Puntos extra (0, 5 o 10 cada uno)

- [ ] **C1. Mensajería y alertas.** El canal recibe y además **registra o consulta en Odoo**, y hay una alerta
      **con umbral** (stock mínimo, pedido demorado, cobranza vencida) que le llega a quien tiene que actuar.
      Se muestra en vivo.
- [ ] **C2. Ambiente cloud propio.** n8n (y Evolution, si se usa) en un servidor propio con dominio y HTTPS,
      con los flujos usando la URL de producción. Está el modelo de despliegue de cada pieza, el costo mensual cuando
      se terminan los créditos y el plan de apagado o de continuidad. Make, n8n Cloud y Odoo Online no cuentan.
- [ ] **C3. Tablero de control.** Muestra los indicadores del TO-BE con datos de Odoo, tiene al menos una
      **señal visual de umbral**, y cada indicador explica qué decisión permite tomar.

## Estructura del informe (PDF de 8 a 12 páginas)

- [ ] 1. Portada e índice
- [ ] 2. Resumen ejecutivo (una página, para la dirección)
- [ ] 3. La organización y su punto de partida
- [ ] 4. El proceso: AS-IS, cuellos de botella, TO-BE e indicadores
- [ ] 5. Sistema implementado: aplicaciones, configuración, recorrido con capturas, licencia y despliegue
- [ ] 6. Automatizaciones y la documentación de cada flujo
- [ ] 7. Protocolo de datos y la pieza de comunicación
- [ ] 8. Componentes adicionales (si los hay)
- [ ] 9. Implementación en la organización real
- [ ] 10. Conclusiones y referencias en APA 7
- [ ] **Anexos:** `.bpm` de Bizagi · flujos exportados sin claves · enlace al video · confirmación de la invitación al docente

## Lo que se entrega aparte (sin esto AE4 no cierra, aunque la nota alcance)

- [ ] **Portafolio Digital**, accesible para el docente y vinculado al Aula. Tiene que incluir: el acuerdo inicial,
      las evidencias de AE1 y AE2 que retoman, el registro de los talleres sin claves, las versiones de los flujos con
      sus errores, las versiones de los BPMN y de Odoo, los borradores del protocolo, el registro de decisiones,
      las devoluciones docentes con sus ajustes y la reflexión final.
- [ ] **Bitácora Individual de cada integrante**, de 2 a 3 páginas, como texto en línea en el Aula. Tiene que tomar
      una decisión central, contar cómo cambió y qué alternativa se descartó, citar a dos autores en APA 7 y
      remitir a evidencias del Portafolio.

## Para el Coloquio (10 minutos: 3 de demo + 7 de preguntas)

- [ ] La base de Odoo, los flujos y el servidor **siguen funcionando** hasta el día del Coloquio.
      Apaguen el servidor cuando no lo usan y controlen el crédito.
- [ ] En la demo se **dispara una automatización y se ve el efecto en Odoo**.
- [ ] Los **dos integrantes operan** alguna parte de la demo.
- [ ] Cada uno puede explicar también la parte que **no** operó: el Coloquio se valida por persona.
- [ ] El video está a mano por si se cae algún servicio.

> Recordatorio: el informe, la Bitácora y las respuestas del Coloquio no pueden redactarse con IA generativa
> (punto 27 de la Guía Docente II Parte). Un bot con IA **como parte de la solución** sí está permitido.
