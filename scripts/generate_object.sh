#!/bin/bash

BLENDER_APP=/Applications/Blender.app/Contents/MacOS/Blender
TYPE=box
DIRECTION=horizontal
SCRIPT_DIR=$(dirname "$0")

if [ -n "$1" ]; then
  DIRECTION="$1"
fi

cd "$SCRIPT_DIR"

mkdir -p ../public/spinner_frames_${DIRECTION}_${TYPE}

$BLENDER_APP \
  --background \
  --python generate_${DIRECTION}_${TYPE}_object.py \
  -- --frames 60 --output ../public/spinner_frames_${DIRECTION}_${TYPE}

# convert to webp
cd ../public/spinner_frames_${DIRECTION}_${TYPE}
for f in *.png; do
  cwebp -q 80 "$f" -o "${f%.png}.webp"
done