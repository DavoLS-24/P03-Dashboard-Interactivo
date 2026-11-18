import json
import csv
from datetime import datetime


def limpiar_texto(texto):
    texto = " ".join(texto.split())
    return texto if texto else None


def convertir_fecha(texto):
    return datetime.strptime(texto, "%d/%m/%Y").strftime("%Y-%m-%d")


def limpiar_codigo_postal(texto):
    if texto is None:
        return None
    return texto.zfill(5)


def csv_to_json(inputF, outputF):

    with open(inputF, 'r', encoding='utf-8', newline='') as csv_file:
        csv_reader = csv.DictReader(csv_file)
        data = []
        for row in csv_reader:
            row = {campo.strip(): limpiar_texto(valor) for campo, valor in row.items()}

            row["Row ID"] = int(row["Row ID"])
            row["Sales"] = float(row["Sales"])

            row["Order Date"] = convertir_fecha(row["Order Date"])
            row["Ship Date"] = convertir_fecha(row["Ship Date"])

            row["Postal Code"] = limpiar_codigo_postal(row["Postal Code"])

            data.append(row)

    with open(outputF, 'w', encoding='utf-8') as json_file:
        json.dump(data, json_file, indent=2, ensure_ascii=False)

    print(f"Convertidos {len(data)} registros a {outputF}")


if __name__ == "__main__":

    csv_to_json("train.csv", "output.json")
