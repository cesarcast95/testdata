# compose_flask/app.py
from flask import Flask, jsonify
import pandas as pd
import os
import json
import chardet

# Build paths inside the project like this: BASE_DIR / 'subdir'.
# BASE_DIR = Path(__file__).resolve().parent.parent
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Read config.json file

with open(BASE_DIR + 'code/config.json') as json_file:
    env = json.load(json_file)

print(env['settings']['project'])
app = Flask(__name__)


@app.route('/files')
def hello():
    imprimir = env['routes']
    return jsonify(imprimir)


@app.route('/pedidos', methods=['GET'])
def get_pedidos():
    data = pd.read_excel(env['routes']['pedidos'], sheet_name='Hoja1')

    to_drop = ['\como\lidiar\con\este\campo']
    data.drop(to_drop, inplace=True, axis=1)

    return data.to_json(orient='records')


@app.route('/clientes', methods=['GET'])
def get_clientes():
    # Identify the encoding type of the file
    with open(env['routes']['clientes'], 'rb') as f:
        enc = chardet.detect(f.read())
    data = pd.read_csv(env['routes']['clientes'], sep="\t", encoding=enc['encoding'])

    data_dict = data.to_dict(orient='records')
    return jsonify(data_dict)


@app.route('/pedido_cliente', methods=['GET'])
def get_pedido_cliente():
    # DataFrame Pedidos
    data_pedidos = pd.read_excel(env['routes']['pedidos'], sheet_name='Hoja1')

    to_drop = ['\como\lidiar\con\este\campo']
    data_pedidos.drop(to_drop, inplace=True, axis=1)

    # DataFrame Clientes
    with open(env['routes']['clientes'], 'rb') as f:
        enc = chardet.detect(f.read())
    data_clientes = pd.read_csv(env['routes']['clientes'], sep="\t", encoding=enc['encoding'])

    merged_inner = pd.merge(left=data_pedidos, right=data_clientes, left_on='cc_cliente', right_on='CEDULA')

    # Eliminar campo redundante
    to_drop = ['cc_cliente']
    merged_inner.drop(to_drop, inplace=True, axis=1)

    data_dict = merged_inner.to_dict(orient='records')

    return jsonify(data_dict)


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
