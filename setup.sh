#!/bin/zsh

if ! command -v serve &> /dev/null; then
    echo "The 'serve' package is not installed. Installing it globally..."
    npm install -g serve
else
    echo "'serve' is already installed."
fi