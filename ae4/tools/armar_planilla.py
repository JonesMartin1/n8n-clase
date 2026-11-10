"""Genera ae4/planilla-calificacion.xlsx con las reglas de la rúbrica AE4 v03 en fórmulas.

Uso:  python -I ae4/tools/armar_planilla.py
"""
from pathlib import Path

from openpyxl import Workbook
from openpyxl.formatting.rule import FormulaRule
from openpyxl.styles import Alignment, Border, Font, PatternFill, Side
from openpyxl.utils import get_column_letter
from openpyxl.worksheet.datavalidation import DataValidation

SALIDA = Path(__file__).resolve().parents[1] / "planilla-calificacion.xlsx"
FILAS = 40  # parejas

# (encabezado, ancho, tipo)
COLUMNAS = [
    ("Pareja", 8, "txt"), ("Organización", 22, "txt"), ("Integrante 1", 20, "txt"), ("Integrante 2", 20, "txt"),
    ("Fecha Coloquio", 12, "txt"),
    ("A1 Sistema (15)", 9, "A"), ("A2 BPMN (15)", 9, "A"), ("A3 Automat. (15)", 9, "A"), ("A4 Datos (15)", 9, "A"),
    ("¿Bloque A ≥10 en los 4?", 11, "f"),
    ("B1 Recorrido (7)", 9, "B7"), ("B2 Fundam. (6)", 9, "B6"), ("B3 Viabil. (6)", 9, "B6"), ("B4 Comunic. (6)", 9, "B6"),
    ("C1 Alertas (0/5/10)", 9, "C"), ("C2 Cloud (0/5/10)", 9, "C"), ("C3 Tablero (0/5/10)", 9, "C"),
    ("Descuento ortografía (0–10)", 11, "D"),
    ("Total", 8, "f"), ("Nota", 7, "f"),
    ("Portafolio (C/I)", 10, "CI"), ("Bitácora 1 (C/I)", 10, "CI"), ("Bitácora 2 (C/I)", 10, "CI"),
    ("Coloquio 1 (V/NV)", 10, "V"), ("Coloquio 2 (V/NV)", 10, "V"),
    ("Estado integrante 1", 24, "f"), ("Estado integrante 2", 24, "f"),
    ("Observaciones para la devolución", 50, "txt"),
]
COL = {c[0]: get_column_letter(i + 1) for i, c in enumerate(COLUMNAS)}


def c(nombre, fila):
    return f"{COL[nombre]}{fila}"


def formulas(r):
    a = [c(n, r) for n in ("A1 Sistema (15)", "A2 BPMN (15)", "A3 Automat. (15)", "A4 Datos (15)")]
    b = [c(n, r) for n in ("B1 Recorrido (7)", "B2 Fundam. (6)", "B3 Viabil. (6)", "B4 Comunic. (6)")]
    x = [c(n, r) for n in ("C1 Alertas (0/5/10)", "C2 Cloud (0/5/10)", "C3 Tablero (0/5/10)")]
    desc = c("Descuento ortografía (0–10)", r)
    ok = c("¿Bloque A ≥10 en los 4?", r)
    tot = c("Total", r)
    nota = c("Nota", r)
    vacio = f"COUNT({a[0]}:{a[3]})<4"
    suma_a = f"SUM({a[0]}:{a[3]})"
    suma_b = f"SUM({b[0]}:{b[3]})"
    suma_c = f"SUM({x[0]}:{x[2]})"
    f = {
        ok: f'=IF({vacio},"",IF(AND({a[0]}>=10,{a[1]}>=10,{a[2]}>=10,{a[3]}>=10),"Sí","No"))',
        # Paso 1-3 de la rúbrica: si el Bloque A falla no hay extras; tope 100 y después el descuento.
        tot: (f'=IF({vacio},"",IF({ok}="Sí",MAX(0,MIN(100,{suma_a}+{suma_b}+{suma_c})-N({desc})),'
              f'MAX(0,{suma_a}+{suma_b}-N({desc}))))'),
        # Paso 4: decena; con el Bloque A sin cumplir, máximo 5.
        nota: f'=IF({tot}="","",IF({ok}="Sí",INT({tot}/10),MIN(5,INT({tot}/10))))',
    }
    port = c("Portafolio (C/I)", r)
    for i in (1, 2):
        bit, col = c(f"Bitácora {i} (C/I)", r), c(f"Coloquio {i} (V/NV)", r)
        f[c(f"Estado integrante {i}", r)] = (
            f'=IF({nota}="","",IF({ok}="No","No aprobada: Bloque A",IF({nota}<6,"No aprobada",'
            f'IF(OR({port}="",{bit}="",{col}=""),"Falta registrar",'
            f'IF(AND({port}="C",{bit}="C",{col}="V"),"Aprobada: "&{nota},"Recuperatorio TIFAS")))))'
        )
    return f


def main():
    wb = Workbook()
    ws = wb.active
    ws.title = "Parejas"
    borde = Border(*(Side(style="thin", color="BBBBBB"),) * 4)
    cab = PatternFill("solid", fgColor="1F3A5F")
    gris = PatternFill("solid", fgColor="EEF1F5")

    for i, (nombre, ancho, tipo) in enumerate(COLUMNAS, 1):
        celda = ws.cell(row=1, column=i, value=nombre)
        celda.font = Font(bold=True, color="FFFFFF")
        celda.fill = cab
        celda.alignment = Alignment(wrap_text=True, horizontal="center", vertical="center")
        ws.column_dimensions[get_column_letter(i)].width = ancho
    ws.row_dimensions[1].height = 48
    ws.freeze_panes = "F2"

    for r in range(2, FILAS + 2):
        ws.cell(row=r, column=1, value=r - 1)
        for celda, formula in formulas(r).items():
            ws[celda] = formula
            ws[celda].fill = gris
            ws[celda].font = Font(bold=True)
        for i in range(1, len(COLUMNAS) + 1):
            ws.cell(row=r, column=i).border = borde
            ws.cell(row=r, column=i).alignment = Alignment(horizontal="left" if i in (2, 3, 4, 28) else "center",
                                                           wrap_text=(i == 28))

    def validar(tipo, regla, mensaje):
        letras = [COL[n] for n, _, t in COLUMNAS if t == tipo]
        if not letras:
            return
        dv = DataValidation(**regla, showErrorMessage=True, errorTitle="Valor fuera de la rúbrica", error=mensaje)
        for l in letras:
            dv.add(f"{l}2:{l}{FILAS + 1}")
        ws.add_data_validation(dv)

    validar("A", dict(type="whole", operator="between", formula1="0", formula2="15"), "Entre 0 y 15.")
    validar("B7", dict(type="whole", operator="between", formula1="0", formula2="7"), "Entre 0 y 7.")
    validar("B6", dict(type="whole", operator="between", formula1="0", formula2="6"), "Entre 0 y 6.")
    validar("C", dict(type="list", formula1='"0,5,10"'), "Solo 0, 5 o 10.")
    validar("D", dict(type="whole", operator="between", formula1="0", formula2="10"), "Entre 0 y 10.")
    validar("CI", dict(type="list", formula1='"C,I"'), "C (completo) o I (incompleto).")
    validar("V", dict(type="list", formula1='"V,NV"'), "V (validada) o NV (no validada).")

    rojo = PatternFill("solid", fgColor="F8D7DA")
    verde = PatternFill("solid", fgColor="D4EDDA")
    amarillo = PatternFill("solid", fgColor="FFF3CD")
    rango_a = f"{COL['A1 Sistema (15)']}2:{COL['A4 Datos (15)']}{FILAS + 1}"
    ws.conditional_formatting.add(rango_a, FormulaRule(
        formula=[f"AND(ISNUMBER({COL['A1 Sistema (15)']}2),{COL['A1 Sistema (15)']}2<10)"], fill=rojo))
    for i in (1, 2):
        l = COL[f"Estado integrante {i}"]
        rango = f"{l}2:{l}{FILAS + 1}"
        ws.conditional_formatting.add(rango, FormulaRule(formula=[f'LEFT({l}2,8)="Aprobada"'], fill=verde))
        ws.conditional_formatting.add(rango, FormulaRule(formula=[f'LEFT({l}2,2)="No"'], fill=rojo))
        ws.conditional_formatting.add(rango, FormulaRule(
            formula=[f'OR({l}2="Recuperatorio TIFAS",{l}2="Falta registrar")'], fill=amarillo))

    # Hoja de ejemplos: los cinco casos de la rúbrica, para comprobar las fórmulas al abrir.
    ej = wb.create_sheet("Ejemplos rúbrica")
    casos = [
        (1, [13, 13, 13, 13], [5, 5, 4, 4], [0, 0, 0], 70, 7),
        (2, [15, 15, 15, 15], [6, 6, 5, 5], [10, 0, 5], 97, 9),
        (3, [10, 10, 10, 10], [3, 3, 3, 3], [10, 0, 0], 62, 6),
        (4, [15, 15, 15, 8], [5, 5, 5, 5], [0, 10, 0], 73, 5),
        (5, [15, 15, 15, 15], [7, 6, 6, 6], [10, 10, 10], 100, 10),
    ]
    enc = [n for n, _, _ in COLUMNAS[:20]] + ["Total esperado", "Nota esperada", "¿Coincide?"]
    for i, h in enumerate(enc, 1):
        k = ej.cell(row=1, column=i, value=h)
        k.font = Font(bold=True, color="FFFFFF")
        k.fill = cab
        k.alignment = Alignment(wrap_text=True, horizontal="center")
        ej.column_dimensions[get_column_letter(i)].width = 10
    ej.row_dimensions[1].height = 48
    for fila, (n, a, b, x, t, nt) in enumerate(casos, 2):
        valores = [f"Caso {n}", "", "", "", ""] + a + [None] + b + x + [0]
        for i, v in enumerate(valores, 1):
            if v is not None:
                ej.cell(row=fila, column=i, value=v)
        for celda, formula in formulas(fila).items():
            if celda.rstrip("0123456789") in (COL["¿Bloque A ≥10 en los 4?"], COL["Total"], COL["Nota"]):
                ej[celda] = formula
        ej.cell(row=fila, column=21, value=t)
        ej.cell(row=fila, column=22, value=nt)
        ej.cell(row=fila, column=23,
                value=f'=IF(AND({c("Total", fila)}=U{fila},{c("Nota", fila)}=V{fila}),"Sí","NO")')

    reglas = wb.create_sheet("Reglas")
    texto = [
        "Cómo calcula la planilla (rúbrica AE4, consigna LAE-TICGO-2C2026-AE4-v03)",
        "",
        "1. Si algún componente del Bloque A tiene menos de 10, AE4 no se aprueba: no se suman extras y",
        "   la nota es la decena de (A + B − descuento), con un máximo de 5.",
        "2. Si el Bloque A se cumple, se suma A + B + C.",
        "3. Se aplica el tope de 100 y después el descuento por ortografía y redacción (hasta 10).",
        "4. Nota: 60–69 = 6 · 70–79 = 7 · 80–89 = 8 · 90–99 = 9 · 100 = 10. Menos de 60: la decena.",
        "5. La nota se consolida por estudiante solo con Portafolio C, su Bitácora C y su Coloquio V.",
        "   Si falta alguno, ese estudiante pasa al Recuperatorio TIFAS.",
        "",
        "Celdas grises: fórmulas, no se escriben. Los extras solo admiten 0, 5 o 10.",
        "La hoja «Ejemplos rúbrica» reproduce los cinco casos de la rúbrica: la última columna tiene que decir Sí.",
    ]
    for i, t in enumerate(texto, 1):
        reglas.cell(row=i, column=1, value=t).font = Font(bold=(i == 1))
    reglas.column_dimensions["A"].width = 110

    wb.save(SALIDA)
    print(f"Listo: {SALIDA}")


if __name__ == "__main__":
    main()
