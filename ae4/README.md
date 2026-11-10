# AE4: Trabajo Integrador Final (TIC para la Gestión Organizacional, 2C 2026)

Lo que se necesita para tomar y corregir la AE4, que se arma sobre los talleres de esta misma carpeta.

| Archivo | Para quién | Qué tiene |
|---|---|---|
| `AE4 - Consigna v03 - ….docx` | Alumnos y docente | La consigna corregida (reemplaza a la v02) |
| `AE4 - Rubrica de evaluacion v03 - ….docx` | Alumnos y docente | La rúbrica alineada con la consigna |
| [checklist-entrega.md](checklist-entrega.md) | Parejas | Lo que tiene que estar antes del jueves 19/11, componente por componente |
| `guia-coloquio.md` (solo en la compu del docente, no se publica) | Docente | Calendario, cómo verificar antes de puntuar, el Coloquio minuto a minuto, preguntas y criterios V/NV |
| `planilla-calificacion.xlsx` | Docente | Una fila por pareja: aplica sola la regla del Bloque A, el tope de 100, el descuento, la nota y el estado de cada integrante |
| [tools/revisar_claves.py](tools/revisar_claves.py) | Docente | Busca claves expuestas en los flujos exportados y en los textos de una pareja |
| [tools/armar_planilla.py](tools/armar_planilla.py) | Docente | Vuelve a generar la planilla si cambian las reglas |

## Qué cambió de la v02 a la v03

La v03 es la misma actividad: ninguna exigencia nueva para los alumnos. Solo se hizo que la consigna y la
rúbrica dijeran lo mismo.

1. **A3, flujo sobre Odoo** (rúbrica). La consigna pone como mínimo para aprobar que al menos un flujo opere sobre
   el sistema de gestión, pero el nivel Suficiente de la rúbrica aceptaba "ninguno opera sobre el sistema de
   gestión". Ahora Suficiente exige que al menos uno lo haga, y el caso contrario pasa a En proceso.
2. **Suficiente frente a lo que pide cada componente** (consigna). Se aclara que lo que pide cada componente
   describe el nivel Logrado, y que la rúbrica precisa qué faltantes todavía alcanzan Suficiente. Antes parecía
   que faltaba un caso de prueba en A1 y se desaprobaba, mientras la rúbrica lo aceptaba.
3. **Tope de 5 si falla el Bloque A** (consigna). Lo decía la rúbrica (paso 1 y ejemplo 4) pero no la consigna.
4. **Extras: 0, 5 o 10** (consigna). Decía "hasta 10", como si se pudiera cualquier valor del 0 al 10. La rúbrica
   solo admite esos tres.
5. **n8n Cloud no cuenta como ambiente propio** (consigna). La rúbrica lo excluía, la consigna nombraba solo Make y
   Odoo.
6. **"El Plan debe ser producción genuina"** pasa a decir "El Producto Final": había quedado de la v01.
7. Codificación `LAE-TICGO-2C2026-AE4-v02` → `v03`, en la consigna y en la referencia de la rúbrica.

Los cambios se hicieron sobre el texto del Word original, sin tocar el formato. Antes de subir la v03 al Aula
conviene abrir los dos documentos y mirarlos una vez.

## Uso rápido

```bash
# Revisar lo que entregó una pareja (no muestra las claves, solo dónde están)
python -I ae4/tools/revisar_claves.py ruta/a/la/entrega/

# Regenerar la planilla (necesita openpyxl)
python -I ae4/tools/armar_planilla.py
```

En la planilla, las celdas grises son fórmulas. La hoja "Ejemplos rúbrica" reproduce los cinco casos de la
rúbrica: si alguien toca una fórmula y deja de coincidir, la última columna dice NO.
