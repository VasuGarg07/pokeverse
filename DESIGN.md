# Pokéverse design guide

Pokéverse is printed like a weekly manga magazine: ink on tinted newsprint, panels with slanted gutters, and big lettering.

## Look
- **Paper:** each section has its own newsprint tint (`--paper`). Home is pink, Pokédex green, battle yellow.
- **Panels:** white, square corners, a 3px ink border, no drop shadows and no soft gradients. Depth comes from overlap and slanted gutters.
- **Screentone:** flat dots (`.tone`) for shade. Two tones and a line, as in the Sakuga skill.
- **Type:** Dela Gothic One for titles and buttons, Zen Kaku Gothic New for everything people read.
- **Colour:** ink, white, the paper tint and one accent, crimson. Azure means Player 2 or the Pokédex. Pokémon type colours stay as they are.
- **Regions are volumes:** each region is a thick book spine, I to IX, all the same size with the last Pokémon of the region, packed like a bookshelf on the footer's crimson edge.

## Effect levels
Add `data-press` to any button or link. `src/lib/press.ts` does the rest.

| Level | Where | What happens |
|---|---|---|
| `browse` | links, tabs, small buttons | squash, small puff, wedges |
| `choose` | picking a region, team or Pokémon | squash, wedges, ring, a small カチッ |
| `hit` | starting something big | squash, burst, shards, ドン |

Attacks in battle get their own effects. They are the loudest thing on the site.

## Rules
- Plain at rest: no idle animation.
- At most one sound word per reaction.
- Effects decorate, they never carry information. Everything works with reduced motion on.
- Things leave by shrinking, not fading.
- Phone first: 44px targets and no sideways scroll.

## Components
- **Ready-made (`public/sakuga-vfx`, unmodified):** button for the main action on a screen, slider for team size, tooltip for the footer links (`pv-link-tip` turns it into a link, with two small puffs and no sound word).
- **Ours:** `Button`, `Tabs`, `TextInput`, the dialog, and the home page panels and book spines.
