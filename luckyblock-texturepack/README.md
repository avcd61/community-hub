# Mellstroy Lucky Block Texture Pack

Resource pack for Minecraft 1.8.9 that replaces the Lucky Block texture (mod v7.0.2 by PlayerInDistress) with a custom Mellstroy design.

## Installation

1. Download or clone this folder (`luckyblock-texturepack`).
2. Copy the **entire folder** (or zip it into `luckyblock-texturepack.zip`) into:
   ```
   %appdata%/.minecraft/resourcepacks/
   ```
3. Launch Minecraft 1.8.9 with the Lucky Block mod installed.
4. Go to **Options > Resource Packs** and enable **Mellstroy Lucky Block Texture Pack** (move it to the right / above other packs).

## Structure

```
luckyblock-texturepack/
  pack.mcmeta                              — pack metadata (pack_format: 1 for MC 1.8.x)
  assets/lucky/textures/blocks/
    lucky_block.png                        — 128x128 replacement texture
  original_texture.png                     — original full-res source image (1254x1254)
```

## Notes

- The mod namespace is `lucky`, so the texture must be at `assets/lucky/textures/blocks/lucky_block.png`.
- `pack_format: 1` is for Minecraft 1.8.x. If using a newer Minecraft version, change `pack_format` accordingly (e.g., `3` for 1.11-1.12, `4` for 1.13-1.14, etc.) and rename the folder `blocks` to `block`.
- The texture is scaled to 128x128 for good quality. Minecraft supports any power-of-2 size (16, 32, 64, 128, 256...).
