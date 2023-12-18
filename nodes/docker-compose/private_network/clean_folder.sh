#!/bin/bash

# Check we are in valid directory
if [ ! -d "$(pwd)" ]; then
  echo "Not valid folder."
  exit 1
fi

# List existing folders and delete it
for directorio in $(find . -maxdepth 1 -type d); do
  # Exclude current folder and parent
  if [ "$directorio" != "." ] && [ "$directorio" != ".." ]; then
    echo "Delet: $directorio"
    sudo rm -R "$directorio"
  fi
done

echo "Clean completed!!"