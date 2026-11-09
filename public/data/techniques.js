// Technique curriculum (section 7). Each topic has the five components:
// theory, demonstration study, simulated exercise (linked to practice.js),
// professional observation assignment, and a supervised practical assessment
// (linked to a mentor-signed milestone).

export const TRACKS = [
  {
    id: 'trk.lining', title: 'Lining', milestone: 'ms.client-lining', synthMilestone: 'ms.lining-synthetic',
    topics: [
      { id: 'ln.consistency', title: 'Line consistency', theory: 'Line weight is set by grouping, depth and the hand-speed to machine-speed ratio. Keep all three steady through the line.', demo: 'Watch an experienced artist pull long lines in slow motion. Note where the hand braces and when the angle changes.', exercise: 'ex.straight', observe: 'In the shop, watch your mentor line a piece. Note pass count, wipe frequency and stretch.' },
      { id: 'ln.contour', title: 'Contour work', theory: 'Contour lines describe form. Vary weight deliberately, heavier on the shadow side, not accidentally.', demo: 'Compare traditional flash outlines with how they look tattooed.', exercise: 'ex.curves', observe: 'Ask your mentor how they choose weight changes on a contour.' },
      { id: 'ln.tight', title: 'Tight curves', theory: 'Rotate the skin or surface rather than your wrist. Slow your hand through the apex so punctures do not spread.', demo: 'Study how artists turn the work on small lettering and scroll ends.', exercise: 'ex.circles', observe: 'Note how your mentor positions the client for tight curves.' },
      { id: 'ln.long', title: 'Long lines', theory: 'Plan your break points. Overlap joins slightly and match the weight.', demo: 'Watch how long banners and borders are pulled in segments.', exercise: 'ex.straight', observe: 'Observe where your mentor breaks long lines.' },
      { id: 'ln.bold', title: 'Traditional bold outlines', theory: 'Bold outlines are made with larger round liners in a confident single pass. They make the design readable for decades.', demo: 'Compare fresh and healed traditional outlines in an artist\'s portfolio.', exercise: 'ex.groupings', observe: 'Observe the needle choices for a traditional piece.' },
      { id: 'ln.defects', title: 'Preventing common line defects', theory: 'Blowouts, wobble, hooks and blobs, and gaps. Each has typical causes: see the Technical Troubleshooting guide.', demo: 'Review healed examples of line defects with your mentor.', exercise: 'ex.curves', observe: 'Ask your mentor to show you defects they have corrected.' },
      { id: 'ln.troubleshoot', title: 'Troubleshooting inconsistent results', theory: 'Change one variable at a time: technique first, then setup, then equipment.', demo: 'Use the Machine Lab troubleshooting guide.', exercise: 'ex.dots', observe: 'Diagnose a deliberately mis-set machine with your mentor.' },
    ],
  },
  {
    id: 'trk.bng', title: 'Black and Gray', milestone: 'ms.client-shading', synthMilestone: 'ms.shading-synthetic',
    topics: [
      { id: 'bg.smooth', title: 'Smooth shading', theory: 'Overlapping, consistent passes with a magnum or curved magnum. Build value gradually.', demo: 'Study slow-motion shading demonstrations.', exercise: 'ex.gradient', observe: 'Watch your mentor shade. Note motion, angle and passes.' },
      { id: 'bg.value', title: 'Value control', theory: 'Value comes from density of pigment and dilution (grey wash). Plan a limited value range that will survive healing.', demo: 'Compare fresh and healed black-and-grey work.', exercise: 'ex.gradient', observe: 'Ask how your mentor mixes and orders grey washes.' },
      { id: 'bg.gradient', title: 'Gradients', theory: 'Transitions from dark to light without banding: feather the light end with lighter pressure or faster passes.', demo: 'Analyse gradient work under magnification in photographs.', exercise: 'ex.gradient', observe: 'Observe a gradient done in person.' },
      { id: 'bg.whip', title: 'Whip shading', theory: 'A flicking motion leaves stippled shading that thins toward the light. It is a hallmark of traditional work.', demo: 'Watch whip shading on traditional leaves and petals.', exercise: 'ex.whip', observe: 'Ask your mentor to demonstrate their whip motion.' },
      { id: 'bg.pendulum', title: 'Pendulum shading', theory: 'An arcing, pendulum motion that gives smooth graduated tone.', demo: 'Compare pendulum and whip shading results side by side.', exercise: 'ex.gradient', observe: 'Observe when your mentor chooses pendulum over whip shading.' },
      { id: 'bg.black', title: 'Black saturation', theory: 'Solid black needs consistent motion and enough pigment load, without overworking.', demo: 'Study healed solid black from several artists.', exercise: 'ex.pack', observe: 'Note your mentor\'s pass count on solid black.' },
      { id: 'bg.trad', title: 'Traditional black shading', theory: 'Bold black placement and whip-shaded transitions in American traditional. Black creates the contrast that holds up over time.', demo: 'Study historic flash sheets and their tattooed versions.', exercise: 'ex.whip', observe: 'Discuss black placement on a flash sheet with your mentor.' },
    ],
  },
  {
    id: 'trk.color', title: 'Color Tattooing', milestone: 'ms.client-color', synthMilestone: 'ms.shading-synthetic',
    topics: [
      { id: 'cl.theory', title: 'Color theory applied to tattooing', theory: 'Skin tone sits under every color. Contrast and value matter more than hue for readability. Colors shift as they heal.', demo: 'Compare the same palette healed on different skin tones.', exercise: 'ex.color', observe: 'Ask your mentor how skin tone changes their palette choices.' },
      { id: 'cl.pack', title: 'Color packing', theory: 'Even, overlapping motion with an appropriate magnum, working each color to full saturation.', demo: 'Watch packing videos at slow speed.', exercise: 'ex.color', observe: 'Observe color packing in person.' },
      { id: 'cl.saturation', title: 'Saturation', theory: 'A saturated area looks solid with no holidays (gaps). Under-saturation shows as patchiness after healing.', demo: 'Compare fresh and healed saturation.', exercise: 'ex.color', observe: 'Review healed color with your mentor.' },
      { id: 'cl.layer', title: 'Layering principles', theory: 'Order of operations and blending wet-on-wet versus sequential. Practices vary between artists, so treat them as a convention, not a rule.', demo: 'Compare two artists\' blending approaches.', exercise: 'ex.color', observe: 'Ask your mentor their color order and why.' },
      { id: 'cl.palette', title: 'Traditional color palettes', theory: 'The limited, bold palette of traditional work (red, yellow, green, black, often brown and blue) reads clearly from a distance and over time.', demo: 'Study historical flash palettes in The Archive.', exercise: 'ex.flash', observe: 'Discuss palette restraint with your mentor.' },
      { id: 'cl.pigment', title: 'Pigment selection', theory: 'Use inks from reputable manufacturers. Record lot numbers. Never dilute with non-sterile water: the CDC has linked that to infection outbreaks. Check FDA advisories and recalls.', demo: 'Read the FDA\'s tattoo ink safety pages and recent advisories.', exercise: 'ex.color', observe: 'Learn your shop\'s ink sourcing and record-keeping.' },
      { id: 'cl.retention', title: 'Healing and color retention', theory: 'Lighter colors and some pigments fade faster. Red pigments are more often linked to allergic reactions. Sun exposure accelerates fading.', demo: 'Review long-healed color work.', exercise: 'ex.color', observe: 'Track healing of your supervised color work.' },
    ],
  },
  {
    id: 'trk.trad', title: 'Traditional Tattoo Application', milestone: 'ms.client-traditional', synthMilestone: 'ms.procedure-synthetic',
    topics: [
      { id: 'tr.flash', title: 'Translating flash into tattooable designs', theory: 'Simplify the design and check its line spacing. Make sure the black and color areas will separate after healing. Draw the design as it will be tattooed, not as a painting.', demo: 'Compare painted flash with tattooed versions.', exercise: 'ex.flash', observe: 'Watch your mentor adapt a flash sheet for a client.' },
      { id: 'tr.weight', title: 'Appropriate line weight', theory: 'Outline weight should be proportional to the design size. Small designs with heavy lines and tight spaces close up over time.', demo: 'Study healed small traditional pieces.', exercise: 'ex.groupings', observe: 'Discuss liner choice by design size.' },
      { id: 'tr.black', title: 'Black placement', theory: 'Distribute solid black for contrast and balance. It anchors the design.', demo: 'Analyse black distribution on classic flash in The Archive.', exercise: 'ex.pack', observe: 'Ask your mentor to critique your black placement.' },
      { id: 'tr.size', title: 'Design sizing', theory: 'Choose a minimum size that keeps details at least a few millimetres apart so they don\'t merge as the tattoo ages.', demo: 'Compare the same design at three sizes, healed.', exercise: 'ex.stencil', observe: 'Discuss minimum sizes with your mentor.' },
      { id: 'tr.placement', title: 'Body placement', theory: 'Placement should follow body flow, muscle and movement, and avoid high-friction, high-sun or high-stretch areas for detail.', demo: 'Study placement on full traditional sleeves.', exercise: 'ex.curved', observe: 'Observe a stencil placement and the adjustments made.' },
      { id: 'tr.age', title: 'Readability over time', theory: 'Lines spread and colors soften with age. Bold, simple, high-contrast designs stay readable longest.', demo: 'Study photos of decades-old traditional tattoos.', exercise: 'ex.flash', observe: 'Ask clients with old work (with consent) to let you photograph it.' },
      { id: 'tr.anatomy', title: 'Adapting designs to anatomy', theory: 'Distort the design to suit curved surfaces so it reads correctly from the main viewing angle.', demo: 'Compare flat flash with wrapped placements.', exercise: 'ex.curved', observe: 'Watch your mentor adapt a stencil for a forearm curve.' },
    ],
  },
];
