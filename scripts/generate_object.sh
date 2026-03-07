#!/bin/bash

/Applications/Blender.app/Contents/MacOS/Blender \
  --background \
  --python generate_object.py \
  -- --frames 60 --output ../public/spinner_frames

# convert to webp
cd ../public/spinner_frames
for f in *.png; do
  cwebp -q 80 "$f" -o "${f%.png}.webp"
done