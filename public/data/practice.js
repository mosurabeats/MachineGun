// Synthetic-skin practice program. Every assignment requires photo or video
// evidence. Progression is self-paced and unlocks when prerequisites have a
// submission. Unlocking is NOT a competency judgement; competency milestones
// are signed only by a human mentor (see milestones.js).

export const PRACTICE_LEVELS = [
  { id: 1, name: 'Foundations', desc: 'Machine familiarity and hand control.' },
  { id: 2, name: 'Line control', desc: 'Straight lines, curves and circles with consistent quality.' },
  { id: 3, name: 'Fill & value', desc: 'Shading transitions, black packing and color saturation.' },
  { id: 4, name: 'Application', desc: 'Stencils, curved surfaces and full pieces at session length.' },
];

const PHOTO = 'Photo: straight-on, even light, a ruler or scale in frame. Include one close-up.';
const VIDEO = 'Video: 30–90 s, side view showing hand, angle and machine.';

export const EXERCISES = [
  // Level 1
  { id: 'ex.familiar', level: 1, title: 'Machine familiarity: run, listen, record',
    goal: 'Set up your machine with a barrier, run it unloaded and under light load on synthetic skin, and note the sound and feel at your usual settings.',
    steps: ['Set up with full barrier practice as if for a client.', 'Run unloaded for 10 s and note the sound.', 'Make light contact with synthetic skin and note any pitch change.', 'Record the machine, grip, needle, stroke, voltage or battery level, and give setting.'],
    evidence: [VIDEO, 'Photo of setup with barriers in place.'], criteria: ['Barrier coverage complete', 'Setup values recorded', 'Consistent sound under light load'], requires: [] },
  { id: 'ex.grip', level: 1, title: 'Hand positioning & bracing',
    goal: 'Find a stable grip and a bracing point you can hold for 20 minutes without tension.',
    steps: ['Try two brace points (pinky, heel of hand).', 'Film 2 minutes of each pulling short lines.', 'Note fatigue and wobble.'],
    evidence: [VIDEO], criteria: ['Stable brace', 'Consistent angle throughout'], requires: ['ex.familiar'] },
  { id: 'ex.dots', level: 1, title: 'Hand-speed ladder',
    goal: 'At one fixed machine speed, pull 10 lines at progressively faster hand speeds and see where the line breaks up.',
    steps: ['Keep machine settings fixed.', 'Pull 10 × 5 cm lines, each faster than the last.', 'Label each line 1–10.'],
    evidence: [PHOTO], criteria: ['Clear visible transition from solid to dotted', 'Lines labelled'], requires: ['ex.familiar'] },

  // Level 2
  { id: 'ex.straight', level: 2, title: 'Straight lines: 3 weights × 10',
    goal: 'Pull ten 8 cm straight lines each with a small, medium and large round liner.',
    steps: ['Pull lines toward you.', 'One pass per line wherever possible.', 'Do not go back over gaps. Leave them visible for review.'],
    evidence: [PHOTO, VIDEO], criteria: ['Consistent weight end to end', 'No wobble', 'Clean starts and stops'], requires: ['ex.grip', 'ex.dots'] },
  { id: 'ex.curves', level: 2, title: 'Curved lines & S-curves',
    goal: 'Practise long gentle curves and tight S-curves without stopping mid-curve.',
    steps: ['Rotate the practice surface instead of your wrist.', '10 long arcs, 10 S-curves.'],
    evidence: [PHOTO, VIDEO], criteria: ['Smooth curvature', 'No flat spots or hooks', 'Consistent weight through the curve'], requires: ['ex.straight'] },
  { id: 'ex.circles', level: 2, title: 'Circles at three sizes',
    goal: 'Draw closed circles of 1 cm, 3 cm and 6 cm with invisible joins.',
    steps: ['Stencil the circles.', 'Complete each circle in as few strokes as possible.'],
    evidence: [PHOTO], criteria: ['Joins not visible', 'Follows stencil', 'Round, not oval'], requires: ['ex.curves'] },
  { id: 'ex.groupings', level: 2, title: 'Needle grouping control',
    goal: 'Line the same simple design with 3RL, 7RL and 11RL, and compare.',
    steps: ['Use the same design three times.', 'Record each needle, taper and gauge.'],
    evidence: [PHOTO], criteria: ['Weight is consistent within each version', 'Clear difference between groupings'], requires: ['ex.straight'] },

  // Level 3
  { id: 'ex.gradient', level: 3, title: 'Black-and-grey gradient strip',
    goal: 'Shade a 10 × 2 cm strip from solid black to skin tone with no banding.',
    steps: ['Use a magnum or curved magnum.', 'Try whip and pendulum motions on separate strips.', 'Label which technique made each strip.'],
    evidence: [PHOTO, VIDEO], criteria: ['Smooth transition', 'No banding or hard lines', 'Even saturation in the dark end'], requires: ['ex.groupings'] },
  { id: 'ex.pack', level: 3, title: 'Solid black packing',
    goal: 'Pack 3 shapes (circle, star, banner) with solid, even black.',
    steps: ['Line first, then pack.', 'Note passes per area.'],
    evidence: [PHOTO], criteria: ['No holidays (gaps)', 'Edges meet the outline', 'Even sheen'], requires: ['ex.groupings'] },
  { id: 'ex.color', level: 3, title: 'Color saturation swatches',
    goal: 'Pack a swatch card of 6 colors plus 2 blends.',
    steps: ['Pack light colors after dark ones, or follow your mentor\'s order.', 'Clean the needle between colors as your shop does.'],
    evidence: [PHOTO], criteria: ['Solid, even saturation', 'Clean color boundaries', 'Smooth blends'], requires: ['ex.pack'] },
  { id: 'ex.whip', level: 3, title: 'Whip shading on a traditional rose leaf',
    goal: 'Shade a traditional leaf with whip shading from the vein outward.',
    steps: ['Stencil a bold traditional leaf.', 'Line it, then whip shade.'],
    evidence: [PHOTO, VIDEO], criteria: ['Stipple density decreases smoothly', 'Shading direction suits the form'], requires: ['ex.gradient'] },

  // Level 4
  { id: 'ex.stencil', level: 4, title: 'Stencil application & accuracy',
    goal: 'Apply a stencil to a curved practice surface, then line it with fidelity to the stencil.',
    steps: ['Prepare the surface as you would skin.', 'Apply the stencil and photograph it before tattooing.', 'Line it, then photograph again.'],
    evidence: ['Photo of stencil before tattooing.', 'Photo after lining.', PHOTO], criteria: ['Clean transfer', 'No smudging', 'Linework follows the stencil'], requires: ['ex.circles'] },
  { id: 'ex.curved', level: 4, title: 'Working around curved surfaces',
    goal: 'Tattoo a band design around a cylindrical practice arm or leg.',
    steps: ['Plan where the design wraps and where the joins fall.', 'Reposition rather than reaching.'],
    evidence: [PHOTO, 'Photos from four sides.'], criteria: ['Design reads from the main view', 'Joins aligned'], requires: ['ex.stencil'] },
  { id: 'ex.flash', level: 4, title: 'Full traditional flash piece',
    goal: 'Complete a palm-sized traditional piece: outline, black, color.',
    steps: ['Choose a flash design.', 'Run the full procedure checklist in practice mode.', 'Time the session.'],
    evidence: [PHOTO, VIDEO, 'Completed procedure checklist.'], criteria: ['Bold, consistent outline', 'Solid black', 'Saturated color', 'Clean overall'], requires: ['ex.whip', 'ex.color', 'ex.stencil'] },
  { id: 'ex.endurance', level: 4, title: 'Session endurance: 2+ hours',
    goal: 'Keep technique consistent over a 2-hour practice session.',
    steps: ['Take scheduled breaks with full glove and barrier changes.', 'Photograph work at 30-minute intervals.'],
    evidence: ['Photos at 30-minute intervals.', 'Notes on fatigue and corrections.'], criteria: ['Line quality at hour 2 matches the start', 'Break protocol followed'], requires: ['ex.flash'] },
];
