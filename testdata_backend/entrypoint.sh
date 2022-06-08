#!/bin/bash

echo "Installing Requirements"
pip install -r /code/requirements.txt

echo "Route of the application"
ruta=$(pwd)
files=$(ls -la)
echo "ruta: $ruta $files"

echo "Starting Server"
python3 $ruta/manage.py 
