#!/bin/bash

/Applications/Blender.app/Contents/MacOS/Blender \
  --background \
  --python generate_object.py \
  -- --frames 60 --output ../public/spinner_frames