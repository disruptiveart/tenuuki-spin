import bpy
import math
import os
import argparse
import sys

# ---------------------------
# Parse CLI arguments
# ---------------------------
argv = sys.argv
if "--" in argv:
    argv = argv[argv.index("--") + 1:]
else:
    argv = []

parser = argparse.ArgumentParser()
parser.add_argument("--frames", type=int, default=60, help="Number of frames")
parser.add_argument("--output", type=str, default="~/spinner_frames", help="Output directory")
args = parser.parse_args(argv)

frames = args.frames
output_dir = os.path.expanduser(args.output)

print(f"Rendering {frames} frames → {output_dir}")

# ---------------------------
# Reset scene
# ---------------------------
bpy.ops.wm.read_factory_settings(use_empty=True)

# ---------------------------
# Create cube (box)
# ---------------------------
bpy.ops.mesh.primitive_cube_add(size=2, location=(0,0,0))
cube = bpy.context.object

# ---------------------------
# Camera
# ---------------------------
bpy.ops.object.camera_add(location=(0,-6,2))
camera = bpy.context.object
camera.rotation_euler = (math.radians(75),0,0)
bpy.context.scene.camera = camera

# ---------------------------
# Light
# ---------------------------
bpy.ops.object.light_add(type='AREA', location=(3,-3,5))
light = bpy.context.object
light.data.energy = 1000

# ---------------------------
# Render settings
# ---------------------------
scene = bpy.context.scene
scene.render.resolution_x = 1024
scene.render.resolution_y = 1024
scene.render.image_settings.file_format = "PNG"

# Enable transparent background
scene.render.film_transparent = True

# ---------------------------
# Ensure output directory
# ---------------------------
os.makedirs(output_dir, exist_ok=True)

# ---------------------------
# Render frames
# ---------------------------
for i in range(frames):
    angle = (i / frames) * 360
    cube.rotation_euler[2] = math.radians(angle)

    filepath = os.path.join(output_dir, f"box-{i+1:04d}.png")
    scene.render.filepath = filepath

    bpy.ops.render.render(write_still=True)

print(f"Done! Frames written to {output_dir} (transparent background)")