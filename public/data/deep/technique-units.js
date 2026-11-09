// Full technique units, keyed by topic id from techniques.js.
// lessons: paragraphs of instruction
// progression: multi-session drill sequence on synthetic skin
// goodEnough: visible criteria for moving on (synthetic only; NOT competency)
// defects: what it looks like, likely causes, fixes

const U = (lessons, progression, goodEnough, defects) => ({ lessons, progression, goodEnough, defects });

export const UNITS = {
  // ------------------------------------------------------------- LINING
  'ln.consistency': U([
    'A consistent line has the same weight, the same darkness and smooth edges from start to finish. Three variables control it: which needle grouping you use, how deep the needle reaches (set by protrusion, pressure and angle), and how many punctures land per millimetre (machine speed ÷ hand speed). Hold all three steady and the line is consistent. Let any one drift and the line drifts with it.',
    'Start lines with the machine already running and moving. Touching down while stationary leaves a blob at the start. Lift off while still moving to taper the end cleanly. Many educators teach "land and go, lift while moving".',
    'Wipe with light pressure. Heavy wiping inflames human skin and on synthetic skin removes the stencil. Keep a dense ink load in the needle by dipping regularly. A line that fades partway through usually means the needle ran dry.',
  ], [
    { s: 1, drill: '20 × 5 cm straight lines with a 5RL. One pass each. Do not correct them.', target: 'Identify which lines failed and why.' },
    { s: 2, drill: '20 × 8 cm lines with a 7RL, filmed from the side.', target: 'The angle stays steady on the film.' },
    { s: 3, drill: '10 lines each with a 3RL, 7RL and 11RL.', target: 'Each set is consistent within itself.' },
    { s: 4, drill: 'A grid of 10 × 10 cm squares, 1 cm apart.', target: 'Lines parallel, evenly spaced, with clean crossings.' },
    { s: 5, drill: 'Repeat session 2, timed, at the end of a 1-hour practice session.', target: 'Quality matches session 2 despite fatigue.' },
  ], ['No visible wobble at arm\'s length', 'No blob at the start, a taper at the end', 'Weight varies less than about 10% by eye along each line', 'No gaps or doubled sections'],
  [
    { d: 'Blob at the start', looks: 'A dark dot where the line begins', cause: 'Touching down while stationary, or hesitating', fix: 'Start moving before contact' },
    { d: 'Line fades out', looks: 'Lighter toward the end', cause: 'Needle running dry, or the hand lifting', fix: 'Dip more often, and keep pressure through the line' },
    { d: 'Weight changes midway', looks: 'Thick-thin-thick', cause: 'Changing angle or hand speed', fix: 'Film yourself, lock your brace, and slow down' },
  ]),
  'ln.contour': U([
    'Contour lines describe the outer edges and internal forms of a design. In traditional work the outline is usually a consistent bold weight. Contour variation is used for internal details (petal folds, feathers, muscles), drawn with a smaller liner or a lighter, faster pass.',
    'Plan the order. Many artists pull the main outline before the internal details so the detail lines meet the outline cleanly. Others prefer to work from the inside out. Either way, plan where each line starts and stops, so that joins fall at natural breaks such as corners or where lines meet.',
  ], [
    { s: 1, drill: 'Trace 5 simple traditional outlines (leaf, heart, banner) from stencils.', target: 'Every line follows the stencil' },
    { s: 2, drill: 'The same designs, adding internal detail with a smaller needle.', target: 'Detail lines meet outlines without overshooting' },
    { s: 3, drill: 'A rose outline with petals.', target: 'Overlaps read clearly, and the petal joins are invisible' },
  ], ['Lines meet without overshoot or gaps', 'Internal detail visibly lighter than the outline'],
  [
    { d: 'Overshoot', looks: 'Lines cross past where they meet', cause: 'Not lifting in time', fix: 'Slow down near joins, and stop just short of the join' },
    { d: 'Gaps at joins', looks: 'Lines don\'t connect', cause: 'Stopping too early, or stencil misread', fix: 'Plan joins, then come back to close them carefully' },
  ]),
  'ln.tight': U([
    'Tight curves (scroll ends, lettering, small circles) are where wrist-turning causes wobble. Keep your wrist steady and rotate the practice surface or the client\'s limb instead. Slow your hand at the tightest part of the curve. Hand speed effectively drops at the apex, so the machine places more punctures there. Some artists slow the machine slightly for very tight work.',
    'Break a tight curve into two or three pulls if you need to, overlapping slightly at matching weight.',
  ], [
    { s: 1, drill: 'Rows of 1 cm, 2 cm and 3 cm U-curves.', target: 'Smooth apex, no flat spots' },
    { s: 2, drill: 'Script letters: a, e, g, s, at 2 cm height.', target: 'Even weight through every curve' },
    { s: 3, drill: 'Scroll ends on banner designs.', target: 'Clean spirals with no flattening' },
  ], ['Curves are smooth, with no corners or flats', 'Weight consistent through the apex'],
  [
    { d: 'Flattened curve', looks: 'A straight segment within the curve', cause: 'Wrist locking mid-curve', fix: 'Rotate the surface and pull shorter segments' },
    { d: 'Heavy apex', looks: 'Line thicker at the turn', cause: 'Slowing without lightening pressure', fix: 'Keep pressure steady, and consider a slower machine speed' },
  ]),
  'ln.long': U([
    'Long lines (borders, banners, geometric work) exceed the reach of a single comfortable pull. Plan where to break each line: at a natural point, or where the next segment starts. Overlap the next segment slightly at the same weight and angle, so the join disappears.',
    'Stretch is critical. Re-stretch the skin for each segment so the line does not bow.',
  ], [
    { s: 1, drill: '10 × 15 cm lines in 2 segments.', target: 'Joins invisible at arm\'s length' },
    { s: 2, drill: 'A 20 cm border band around a 3D practice arm.', target: 'Straight, consistent, with aligned ends' },
  ], ['Segment joins not visible at arm\'s length', 'Line straight against a ruler'],
  [{ d: 'Visible join', looks: 'A kink or double-weight spot', cause: 'Angle or weight mismatch at the overlap', fix: 'Start the next segment on top of the previous end, at the same angle' }]),
  'ln.bold': U([
    'Bold traditional outlines are usually pulled with large round liners (9RL–14RL, #12) in a single steady pass. The boldness is structural: it holds the design together as the skin ages and lines spread. A hesitant hand gives a wobbly bold line, which is very visible, so bold lining rewards confidence built through repetition.',
    'Larger groupings need slightly slower hand speeds and a firm, consistent setup. Make sure the machine holds its speed with large liners.',
  ], [
    { s: 1, drill: '20 lines with a 9RL, then 20 with an 11RL or 14RL.', target: 'Solid, single-pass lines' },
    { s: 2, drill: 'Outline 3 classic flash pieces with bold outlines.', target: 'Consistent bold weight throughout' },
    { s: 3, drill: 'The same outlines at 2/3 size.', target: 'Recognise where bold lines now crowd details' },
  ], ['Solid black in a single pass', 'Even edges', 'No wobble visible at arm\'s length'],
  [{ d: 'Wobbly bold line', looks: 'Wavy edges', cause: 'Hesitation, or tension in the grip', fix: 'Relax the grip, practise long confident pulls on paper first' },
   { d: 'Grey bold line', looks: 'Not solid black', cause: 'Too fast, or not enough ink', fix: 'Slow the hand and dip more often' }]),
  'ln.defects': U([
    'Know the common line defects and their usual causes. Blowout: pigment halo or spread, usually from depth or angle, or from thin skin (confirmed on healed human skin by your mentor). Wobble: from grip tension, poor bracing or fatigue. Gaps or skipping: from the speed ratio, contact or ink load. Doubling: going back over a line slightly off track. Chewing: the needle dragged sideways or overworked.',
    'Prevention is cheaper than correction. Once a line is in the skin, it cannot be removed by tattooing over it.',
  ], [
    { s: 1, drill: 'With your mentor, deliberately produce each defect on synthetic skin and label it.', target: 'You can recognise each one' },
    { s: 2, drill: 'Review 10 photos of other artists\' healed linework and name any defects.', target: 'Correct identification' },
  ], ['You can name and explain each defect type'],
  [{ d: 'Doubling', looks: 'Two parallel lines close together', cause: 'A second pass off track', fix: 'Aim for one pass, and go back only along the exact path' }]),
  'ln.troubleshoot': U([
    'A troubleshooting order: (1) technique: angle, hand speed, stretch, ink load; (2) setup: protrusion, stroke, give, speed; (3) equipment: needle condition, cartridge seating, machine condition, power. Change one variable, test, record. This order goes from the most common and cheapest cause to the least common.',
  ], [
    { s: 1, drill: 'Your mentor mis-sets a machine. Diagnose the problem with test lines.', target: 'Correct diagnosis in 3 changes or fewer' },
  ], ['You can explain your diagnostic reasoning'], []),

  // ------------------------------------------------------------- BLACK & GREY
  'bg.smooth': U([
    'Smooth shading builds tone gradually through overlapping passes. Common motions are small circles, tight back-and-forth "pendulum" swings, and controlled sweeps. The aim is even coverage without visible stroke marks. Keep the magnum oriented consistently. Many artists run magnums flat to the skin (the whole edge in contact) or at a slight tilt for softness.',
    'Build tone in layers rather than reaching full darkness in one place. This makes transitions smoother. On human skin, layering also has to be balanced against overworking, which your mentor will guide.',
  ], [
    { s: 1, drill: '5 × 3 cm swatches of even mid-grey using small circles.', target: 'No visible stroke marks' },
    { s: 2, drill: 'The same, using pendulum motion.', target: 'Even tone' },
    { s: 3, drill: 'Shade a sphere (5 cm) with light from the upper left.', target: 'Convincing form' },
  ], ['No visible stroke marks or stripes', 'Even tone within each swatch'],
  [{ d: 'Striping', looks: 'Visible bands in the direction of travel', cause: 'Motion too fast or too regular', fix: 'Overlap passes more and vary direction slightly' }]),
  'bg.value': U([
    'Value is lightness or darkness. In black-and-grey work it comes from how much pigment is deposited and from diluted grey washes. Many artists use a limited set of pre-mixed washes (for example 3–5 steps from light grey to black). Shops mix these using sterile diluents as directed by the manufacturer. Never use tap water.',
    'Plan a value structure before tattooing: where the darkest darks and lightest lights are. Skin tone is the lightest value you have in black-and-grey (unless white is used). Healed tattoos lose some contrast, so plan stronger contrast than looks necessary on fresh skin.',
  ], [
    { s: 1, drill: 'A 5-step value scale using pre-mixed washes.', target: 'Each step clearly distinct' },
    { s: 2, drill: 'Draw a value plan for a flash piece on paper, then tattoo it.', target: 'The tattoo matches the plan' },
  ], ['5 distinct, even steps', 'Darkest dark and lightest light clearly placed'],
  [{ d: 'Muddy mid-tones', looks: 'Everything the same grey', cause: 'No value plan', fix: 'Plan 3 value groups before you start' }]),
  'bg.gradient': U([
    'A gradient moves smoothly from dark to light. Work from dark to light. At the light end, lighten your touch, speed up your hand, switch to a lighter wash, or space your passes further apart, so that density falls off gradually. Avoid a hard stop line where the shading ends.',
  ], [
    { s: 1, drill: '10 × 2 cm strips, black to skin tone.', target: 'No banding' },
    { s: 2, drill: 'Gradient around a curve (a crescent).', target: 'The gradient follows the form' },
  ], ['No visible bands', 'Light end fades softly with no hard edge'],
  [{ d: 'Hard stop', looks: 'Visible edge where the shading ends', cause: 'Stopping abruptly', fix: 'Feather the light end with lighter, faster, more spread-out passes' }]),
  'bg.whip': U([
    'Whip shading (also called "whip" or "flick" shading) uses a pendulum or flicking motion that starts with the needle in the skin and lifts out as the hand moves away. This leaves a gradient of stippled dots, dense near the start and sparse at the end. It is a signature texture of traditional tattooing and gives an airy, readable gradient.',
    'Slower machine speeds and smaller magnums or round shaders are common choices. The rhythm matters: consistent flicks give an even stipple. Practise the motion on paper with a pen first.',
  ], [
    { s: 1, drill: 'Paper practice: 100 flicks with a pen.', target: 'Even length and rhythm' },
    { s: 2, drill: 'Whip-shade 5 × 2 cm strips on synthetic skin.', target: 'Stipple density decreases smoothly' },
    { s: 3, drill: 'Whip-shade a traditional leaf from the centre vein outward.', target: 'The shading follows the leaf form' },
  ], ['Stipple fades smoothly', 'Direction follows the form', 'No solid patches in the light area'],
  [{ d: 'Patchy stipple', looks: 'Clumps and gaps', cause: 'Inconsistent flick rhythm', fix: 'Paper drills, and count the rhythm' }]),
  'bg.pendulum': U([
    'Pendulum shading swings the machine in an arc while the needle stays in contact, producing smooth graduated tone without the stipple texture of whip shading. The swing is usually driven from the wrist or forearm, and pressure lightens toward the end of each arc.',
  ], [
    { s: 1, drill: 'Pendulum strips beside whip strips.', target: 'You can clearly tell the two techniques apart' },
    { s: 2, drill: 'Shade a cylinder with the pendulum motion.', target: 'Smooth form' },
  ], ['Smooth tone with no stipple', 'Even arc spacing'], []),
  'bg.black': U([
    'Solid black packing uses steady, overlapping motions (small circles or tight back-and-forth) at an even speed, until the area is uniformly saturated. Line the area first so the black has a clean edge to fill up to. Use a magnum or large RL/RS appropriate to the shape. Keep the needle wet with ink.',
    'Signs on synthetic skin that you need another pass: visible holidays (gaps) when you wipe, or a lighter sheen. On human skin, how many passes the skin can tolerate is guided by your mentor.',
  ], [
    { s: 1, drill: 'Pack 5 × 2 cm squares.', target: 'No holidays' },
    { s: 2, drill: 'Pack complex shapes (star, banner tails).', target: 'Clean edges into the corners' },
    { s: 3, drill: 'Pack a panther head.', target: 'Solid black with clean edges' },
  ], ['No holidays', 'Black meets the outline cleanly', 'Even sheen'],
  [{ d: 'Holidays', looks: 'Small gaps in the black', cause: 'Motion too fast, or the needle dry', fix: 'Slow down, overlap more, keep the needle wet' }]),
  'bg.trad': U([
    'In traditional tattooing, black placement is a design decision. Solid black areas give contrast, anchor the composition and separate colors. Black shading (whip shading) is typically used on one side of forms to suggest light. Study historical flash to see how much black is used and where.',
  ], [
    { s: 1, drill: 'Redraw 5 classic flash pieces, marking black areas.', target: 'Identify the logic of black placement' },
    { s: 2, drill: 'Tattoo one with full black placement and whip shading.', target: 'Balanced contrast' },
  ], ['Black balanced across the design', 'Shading direction consistent with a single light source'], []),

  // ------------------------------------------------------------- COLOR
  'cl.theory': U([
    'Tattoo color sits in and under the skin, so the client\'s skin tone affects every hue. Value contrast (light vs dark) is the strongest factor for readability. Two colors of similar value next to each other blur together from a distance and as the tattoo ages. Complementary colors (red/green, blue/orange, yellow/purple) give strong contrast. Black outlines separate colors.',
    'On deeper skin tones, very light colors may show less contrast and some pigments read differently. Bold, high-contrast designs and well-chosen palettes help. Discuss palette choices with the client and your mentor.',
  ], [
    { s: 1, drill: 'Paint a value check: photograph your color design in greyscale.', target: 'Color areas remain distinct in greyscale' },
    { s: 2, drill: 'Color swatches on 3 synthetic skin tones, if available.', target: 'Note the visible differences' },
  ], ['The design reads in greyscale', 'Adjacent colors differ in value'],
  [{ d: 'Muddy design', looks: 'Colors blur together', cause: 'Similar values side by side', fix: 'Raise the value contrast, and separate colors with black' }]),
  'cl.pack': U([
    'Color packing uses the same principles as black packing: steady overlapping motion to full saturation. Keep each color clean. Rinse the needle between colors as your shop protocol directs, or use a separate needle. A common order is dark colors first, then lighter, so dark pigment is not dragged into light areas. Practice varies, so follow your mentor.',
  ], [
    { s: 1, drill: 'Pack 6 color swatches.', target: 'Solid, even saturation' },
    { s: 2, drill: 'A swallow in 3 colors.', target: 'Clean boundaries between colors' },
  ], ['Each color solid', 'No contamination of light colors by dark ones'],
  [{ d: 'Contaminated yellow', looks: 'Yellow muddied by darker pigment', cause: 'Needle not cleaned between colors', fix: 'Rinse properly or change needles, and do light colors with care' }]),
  'cl.saturation': U([
    'A saturated area looks solid and opaque when wiped. Under-saturation shows as patchiness or speckling and gets worse with healing. Check saturation after wiping, in good light, from more than one angle.',
  ], [
    { s: 1, drill: 'Pack, wipe, photograph under raking light, re-pack the weak spots, photograph again.', target: 'Learn to see thin spots' },
  ], ['No speckle under raking light'], []),
  'cl.layer': U([
    'Blending colors can be done wet-on-wet (a second color worked into the first while the area is still fresh) or by layering in sequence. Artists disagree about how much layering skin tolerates and which order produces the best healed blends. Treat any one method as a convention. Learn your mentor\'s method thoroughly before experimenting.',
  ], [
    { s: 1, drill: 'Blend yellow-to-red and blue-to-purple strips using two methods.', target: 'Compare the results' },
  ], ['Smooth blend with no hard band'], []),
  'cl.palette': U([
    'Classic Western traditional palettes are dominated by black, red, yellow and green, often with brown, blue and sometimes purple, used flat with black shading. The limited palette is part of why the style reads clearly from across a room and holds up for decades. Restraint is a skill: fewer, bolder colors usually heal better than many subtle ones.',
  ], [
    { s: 1, drill: 'Repaint a busy design with only 3 colors plus black.', target: 'It still reads' },
  ], ['The design reads with a limited palette'], []),
  'cl.pigment': U([
    'Use inks from reputable manufacturers, sealed until use, and within their expiry dates. Pour into single-use caps and never return unused ink to the bottle. Record the brand, color and lot for every client. The CDC has linked infection outbreaks to ink contaminated during manufacture or diluted with non-sterile water. The FDA has issued warnings about specific contaminated products. Check FDA advisories periodically.',
  ], [
    { s: 1, drill: 'Write your shop\'s ink-handling procedure from memory, then check it with your mentor.', target: 'Complete and correct' },
  ], ['Procedure covers sourcing, storage, dispensing, records and disposal'], []),
  'cl.retention': U([
    'Colors heal and age differently. Lighter colors (yellows, light blues, pastels) tend to show less contrast over time and on some skin tones. Sun exposure fades everything. Some red pigments are more frequently associated with allergic reactions. Track your supervised color tattoos through healing and note how each color settled.',
  ], [
    { s: 1, drill: 'Compare fresh and healed photos of color work (your mentor\'s, with consent).', target: 'List the changes for each color' },
  ], ['You can predict how a palette will heal'], []),

  // ------------------------------------------------------------- TRADITIONAL APPLICATION
  'tr.flash': U([
    'Flash is often painted on paper with fine detail that will not survive in skin. To translate a painting into a tattooable design: simplify small details, widen spaces between lines so they do not close up, make sure every color area is big enough to pack, and check the black-to-color balance. Draw the final version at actual tattoo size, with the line weights you will use.',
  ], [
    { s: 1, drill: 'Take one detailed painted design and produce a tattoo-ready version at 8 cm.', target: 'Mentor approves it as tattooable' },
    { s: 2, drill: 'Stencil it and tattoo it on synthetic skin.', target: 'It reads at arm\'s length' },
  ], ['All spaces wide enough to stay open', 'Every color area large enough to pack'],
  [{ d: 'Detail closes up', looks: 'Small gaps between lines filled in', cause: 'Spacing too tight for the size', fix: 'Simplify, or enlarge the design' }]),
  'tr.weight': U([
    'Outline weight should suit the design size. A small piece with very heavy outlines leaves little room for color and closes up. A large piece with thin outlines looks weak and fades. Many traditional artists scale the liner with the design: larger designs get bolder liners.',
  ], [{ s: 1, drill: 'Line the same design at 5, 8 and 12 cm with appropriate liners.', target: 'Each version is balanced' }], ['Line weight proportional to size'], []),
  'tr.black': U([
    'See Traditional Black Shading. In application, also consider how black placement reads on the body: dark areas pull the eye. Balance them so the design does not look lopsided from normal viewing distance.',
  ], [{ s: 1, drill: 'Mark black placement on 5 flash designs, then compare with historical versions.', target: 'Discuss the differences with your mentor' }], [], []),
  'tr.size': U([
    'Lines spread a little as tattoos age. As a working principle, shapes and gaps need enough space to stay distinct for decades. Small, detailed designs are the most likely to blur. When a client wants a design smaller than will hold up, explain why and offer a simpler design or a larger size.',
  ], [{ s: 1, drill: 'Find the minimum size for 3 designs. Justify each by the tightest gap in the design.', target: 'Your mentor agrees' }], ['You can state and justify the minimum size'], []),
  'tr.placement': U([
    'Good placement follows the body: the long axis of a forearm, the curve of a shoulder, the flow of a calf. Consider how the design reads in the client\'s natural posture and from the angle people will usually see it. Avoid placing fine detail over high-friction areas or folds. Consider future work: will this placement block a later sleeve?',
  ], [{ s: 1, drill: 'Place a stencil on a 3D practice arm 3 ways and photograph each.', target: 'Explain your best choice' }], ['Placement follows anatomy and reads in natural posture'], []),
  'tr.age': U([
    'A tattoo is seen for decades. Bold lines, solid black, a limited palette and open spacing all resist ageing. This is a large part of why traditional styles endure. Study old tattoos: which elements still read and which have blurred?',
  ], [{ s: 1, drill: 'Annotate 5 photos of decades-old tattoos (with consent, or from published sources).', target: 'Identify what held and what blurred' }], [], []),
  'tr.anatomy': U([
    'Curved surfaces distort flat designs. A circle drawn on a flat stencil wraps and may read as an oval on a forearm. Artists adjust designs so they look correct from the main viewing angle. They may stretch them slightly along the limb, or redraw the design directly on the skin with a marker for complex placements.',
  ], [{ s: 1, drill: 'Tattoo a circle on a 3D practice forearm. Photograph it from the front and the side, then adjust the stencil and repeat.', target: 'The circle reads round from the front' }], ['The design reads correctly from the main angle'], []),
};
