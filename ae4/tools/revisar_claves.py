"""Busca claves expuestas en lo que entrega una pareja de AE4.

Uso:  python -I revisar_claves.py <carpeta o archivo> [...]

Revisa .json, .md, .txt, .csv, .yaml y .env. Nunca muestra una clave completa:
solo el archivo, la línea, qué tipo de clave parece y los primeros 4 caracteres.
Sale con código 1 si encuentra algo, así se puede usar en un script.
"""
import json
import re
import sys
from pathlib import Path

EXTENSIONES = {".json", ".md", ".txt", ".csv", ".yaml", ".yml", ".env"}
PLACEHOLDERS = {"pegar_aca", "pegar_acá", "xxx", "xxxx", "tu_clave", "your_api_key", "changeme", ""}

# Campos cuyo valor no debería venir con nada real adentro.
CAMPO_SENSIBLE = re.compile(r"(api[_-]?key|apikey|token|secret|password|contrase[ñn]a|clave|passwd)", re.I)

PATRONES = [
    ("clave de OpenAI / Anthropic", re.compile(r"\bsk-(?:ant-|proj-)?[A-Za-z0-9_\-]{20,}")),
    ("token de GitHub", re.compile(r"\bgh[pousr]_[A-Za-z0-9]{30,}")),
    ("clave de acceso de AWS", re.compile(r"\bAKIA[0-9A-Z]{16}\b")),
    ("token JWT", re.compile(r"\beyJ[A-Za-z0-9_\-]{10,}\.[A-Za-z0-9_\-]{10,}\.[A-Za-z0-9_\-]{10,}")),
    ("encabezado Authorization", re.compile(r"(?i)\b(?:bearer|basic)\s+[A-Za-z0-9+/=_\-\.]{20,}")),
    ("clave de Google", re.compile(r"\bAIza[0-9A-Za-z_\-]{35}\b")),
    ("token de bot de Telegram", re.compile(r"\b\d{8,10}:AA[A-Za-z0-9_\-]{30,}")),
]


def tapar(valor: str) -> str:
    return valor[:4] + "…" + f" ({len(valor)} caracteres)"


def es_placeholder(valor: str) -> bool:
    v = valor.strip().strip("\"'").lower()
    return v in PLACEHOLDERS or v.startswith("={{") or v.startswith("{{") or len(v) < 12


def recorrer_json(nodo, ruta, hallazgos, archivo):
    """En los JSON de n8n/Make, mirar pares nombre/valor y claves sensibles."""
    if isinstance(nodo, dict):
        # Nodo "Set" de n8n: {"name": "evo_apikey", "value": "..."}
        nombre = nodo.get("name")
        valor = nodo.get("value")
        if isinstance(nombre, str) and isinstance(valor, str) and CAMPO_SENSIBLE.search(nombre):
            if not es_placeholder(valor):
                hallazgos.append((archivo, ruta, f"campo «{nombre}» con valor", tapar(valor)))
        for k, v in nodo.items():
            if isinstance(v, str) and CAMPO_SENSIBLE.search(k) and not es_placeholder(v):
                hallazgos.append((archivo, f"{ruta}.{k}", f"campo «{k}» con valor", tapar(v)))
            else:
                recorrer_json(v, f"{ruta}.{k}", hallazgos, archivo)
    elif isinstance(nodo, list):
        for i, v in enumerate(nodo):
            recorrer_json(v, f"{ruta}[{i}]", hallazgos, archivo)


def revisar_archivo(path: Path, hallazgos):
    try:
        texto = path.read_text(encoding="utf-8", errors="replace")
    except OSError as e:
        print(f"  no se pudo leer {path}: {e}")
        return
    for n, linea in enumerate(texto.splitlines(), 1):
        for tipo, patron in PATRONES:
            for m in patron.finditer(linea):
                hallazgos.append((path, f"línea {n}", tipo, tapar(m.group(0))))
    if path.suffix.lower() == ".json":
        try:
            recorrer_json(json.loads(texto), "$", hallazgos, path)
        except json.JSONDecodeError:
            pass


def main(rutas):
    if not rutas:
        print(__doc__)
        return 2
    archivos = []
    for r in map(Path, rutas):
        if r.is_dir():
            archivos += [p for p in r.rglob("*") if p.is_file() and p.suffix.lower() in EXTENSIONES]
        elif r.is_file():
            archivos.append(r)
        else:
            print(f"no existe: {r}")
    hallazgos = []
    for a in archivos:
        revisar_archivo(a, hallazgos)
    # Un mismo valor puede aparecer por patrón y por campo: dejar uno por archivo+valor.
    vistos, unicos = set(), []
    for h in hallazgos:
        clave = (str(h[0]), h[3])
        if clave not in vistos:
            vistos.add(clave)
            unicos.append(h)
    print(f"Revisados {len(archivos)} archivo(s).")
    if not unicos:
        print("Sin claves a la vista. (Las capturas de pantalla hay que mirarlas a ojo.)")
        return 0
    print(f"⚠ {len(unicos)} posible(s) clave(s) expuesta(s). A4 no puede superar 10 y la pareja debe cambiarlas:")
    for archivo, donde, tipo, muestra in unicos:
        print(f"  - {archivo} · {donde} · {tipo} · empieza con {muestra}")
    return 1


if __name__ == "__main__":
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")
    sys.exit(main(sys.argv[1:]))
