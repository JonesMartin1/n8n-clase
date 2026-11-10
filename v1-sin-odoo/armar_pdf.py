"""Arma clase.pdf juntando los .md de la clase. Uso: python tools/armar_pdf.py"""
import re
import subprocess
import tempfile
from pathlib import Path

import markdown

RAIZ = Path(__file__).resolve().parent.parent
CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

SECCIONES = [
    ("README.md", "1. La idea"),
    ("guia-alumno.md", "2. Paso a paso"),
    ("problemas-frecuentes.md", "3. Problemas frecuentes"),
    ("guia-docente.md", "Anexo. Guía del profe"),
]

CSS = """
@page { size: A4; margin: 18mm 16mm 20mm 16mm;
  @bottom-center { content: "Tu servidor gratis + n8n + bot de WhatsApp  ·  " counter(page) " / " counter(pages);
                   font: 9pt 'Segoe UI', sans-serif; color: #888; } }
@page :first { @bottom-center { content: none; } }
body { font: 10.5pt/1.5 'Segoe UI', 'Segoe UI Emoji', sans-serif; color: #1d2433; }
h1 { font-size: 21pt; color: #0f5132; border-bottom: 3px solid #25d366; padding-bottom: 4px; margin-top: 0; }
h2 { font-size: 14.5pt; color: #0f5132; margin-top: 22px; break-after: avoid; }
h3 { font-size: 12pt; color: #333; break-after: avoid; }
.seccion { break-before: page; }
.etiqueta { font-size: 9pt; letter-spacing: 1.5px; text-transform: uppercase; color: #25a35a; font-weight: 700; }
table { border-collapse: collapse; width: 100%; margin: 10px 0; font-size: 9.5pt; break-inside: auto; }
tr { break-inside: avoid; }
th { background: #e9f7ef; text-align: left; }
th, td { border: 1px solid #cfd8d3; padding: 5px 7px; vertical-align: top; }
code { font: 9pt Consolas, monospace; background: #f1f3f5; padding: 1px 4px; border-radius: 3px; }
pre { background: #1e2530; color: #e6edf3; padding: 10px 12px; border-radius: 6px;
      white-space: pre-wrap; word-break: break-all; break-inside: avoid; }
pre code { background: none; color: inherit; padding: 0; }
blockquote { margin: 10px 0; padding: 8px 12px; background: #fff8e1; border-left: 4px solid #f5b400; }
blockquote p { margin: 0; }
li { margin: 2px 0; }
li.tarea { list-style: none; margin-left: -1.2em; }
.caja { display: inline-block; width: 11px; height: 11px; border: 1.5px solid #555; border-radius: 2px;
        margin-right: 7px; vertical-align: -1px; }
a { color: #0b7a3e; text-decoration: none; }
hr { border: none; border-top: 1px dashed #ccc; margin: 18px 0; }
.portada { height: 250mm; display: flex; flex-direction: column; justify-content: center; }
.portada h1 { font-size: 34pt; border: none; line-height: 1.15; }
.portada .sub { font-size: 14pt; color: #555; margin-top: 8px; }
.portada ol { font-size: 13pt; line-height: 2; margin-top: 30px; }
.portada .pie { margin-top: 50px; color: #888; font-size: 10pt; }
"""

PORTADA = """
<div class="portada">
  <div class="etiqueta">Clase práctica</div>
  <h1>Tu propio servidor gratis,<br>n8n y un bot de WhatsApp</h1>
  <div class="sub">Para empezar de cero, sin saber programar.</div>
  <ol>
    <li>Cuenta de AWS con créditos gratis</li>
    <li>Panel Dokploy (como Easypanel, pero libre)</li>
    <li>n8n instalado con un clic</li>
    <li>Un bot de WhatsApp que contesta solo</li>
  </ol>
  <div class="pie">Datos verificados al 27/10/2026 · Junto con este PDF va el archivo <code>bot-eco.json</code></div>
</div>
"""


def a_html(texto: str) -> str:
    # Los enlaces a otros .md de la clase pasan a texto: en el PDF son secciones.
    texto = re.sub(r"\[([^\]]+)\]\((?!https?:)[^)]+\.(?:md|json)\)", r"**\1**", texto)
    html = markdown.markdown(texto, extensions=["tables", "fenced_code", "sane_lists"])
    html = re.sub(r"<li>\s*(<p>)?\s*\[ \]\s*", r'<li class="tarea">\1<span class="caja"></span>', html)
    return html


def main() -> None:
    cuerpo = [PORTADA]
    for archivo, etiqueta in SECCIONES:
        texto = (RAIZ / archivo).read_text(encoding="utf-8")
        if archivo == "README.md":
            # Título, objetivos y lista de archivos ya están en la portada.
            texto = "# Cómo funciona\n\n" + texto[texto.index("## La idea en un dibujo"):]
        cuerpo.append(f'<section class="seccion"><div class="etiqueta">{etiqueta}</div>'
                      f'{a_html(texto)}</section>')
    doc = (f'<!doctype html><html lang="es"><head><meta charset="utf-8"><style>{CSS}</style>'
           f'</head><body>{"".join(cuerpo)}</body></html>')

    with tempfile.TemporaryDirectory() as tmp:
        html_path = Path(tmp) / "clase.html"
        html_path.write_text(doc, encoding="utf-8")
        salida = RAIZ / "clase.pdf"
        subprocess.run([CHROME, "--headless=new", "--disable-gpu", "--no-pdf-header-footer",
                        f"--print-to-pdf={salida}", html_path.as_uri()], check=True,
                       capture_output=True, timeout=120)
    print(f"Listo: {salida}")


if __name__ == "__main__":
    main()
