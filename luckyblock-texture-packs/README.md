# Mellstroy Lucky Block Texture Packs

Ready-to-use `.zip` resource packs for Minecraft 1.8.9 that replace the Lucky Block texture with a custom Mellstroy design.

## Included Packs

| File | Target Mod |
|------|------------|
| `Mellstroy-LuckyBlock-Original.zip` | Lucky Block v7.0.2 (original by PlayerInDistress) |
| `Mellstroy-LuckyBlock-Asertical.zip` | Asertical Lucky Block Mod |
| `Mellstroy-LuckyBlock-Future.zip` | Future Lucky Block Mod |
| `Mellstroy-LuckyBlock-Spiral.zip` | Lucky Block Spiral Mod |
| `Mellstroy-LuckyBlock-Mixed.zip` | Mixed Lucky Block Mod |

## Installation

1. Download the `.zip` file for your mod.
2. Copy the `.zip` file **as-is** (do not unzip!) into:
   ```
   %appdata%/.minecraft/resourcepacks/
   ```
3. Launch Minecraft 1.8.9 with the Lucky Block mod + addon installed.
4. Go to **Options > Resource Packs** and enable the pack (move it above other packs for priority).

## Troubleshooting

If the texture doesn't change in-game, the addon's internal block ID may differ. To verify:

1. Open the addon `.zip` file (e.g. `Asertical-Lucky-Block-Mod-Forge-1.8.9.zip`).
2. Find `properties.txt` inside and look for the `block_id=` line.
3. The texture in the resource pack must be named exactly `<block_id>.png`.
4. Rename the texture file inside the resource pack `.zip` accordingly.

## Technical Details

- `pack_format: 1` (for Minecraft 1.8.x)
- Texture resolution: 128x128 pixels
- Mod namespace: `lucky`
- Texture path: `assets/lucky/textures/blocks/<block_id>.png`
