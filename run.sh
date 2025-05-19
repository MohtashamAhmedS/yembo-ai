#!/bin/zsh

WEB_DIR=$(pwd)

PORT=80

echo "Serving widget from $WEB_DIR"
echo "Access your widget at: http://localhost:$PORT"

serve -l $PORT
