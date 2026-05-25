import React, { useState, useEffect } from 'react';
import { Home, Dumbbell, Apple, Activity, User, Flame, Check, Plus, TrendingUp, Calendar, Target, Award, ChevronRight, ChevronDown, Minus, X, Trash2, PlayCircle, Lightbulb, AlertTriangle, Info } from 'lucide-react';

// ============================================================
// BLS WORKOUT PROGRAM — Bigger Leaner Stronger by Mike Matthews
// 5-day split, heavy compound lifts, 4–6 rep range, 3 min rest
// ============================================================
const BLS_SPLIT = {
  1: { // Monday
    name: 'Chest & Calves',
    tag: 'PUSH',
    exercises: [
      { name: 'Incline Barbell Bench Press', sets: 3, reps: '4–6', rest: '3 min' },
      { name: 'Incline Dumbbell Bench Press', sets: 3, reps: '4–6', rest: '3 min' },
      { name: 'Flat Barbell Bench Press', sets: 3, reps: '4–6', rest: '3 min' },
      { name: 'Standing Calf Raise', sets: 3, reps: '4–6', rest: '2 min' },
      { name: 'Seated Calf Raise', sets: 3, reps: '4–6', rest: '2 min' },
    ],
  },
  2: { // Tuesday
    name: 'Back',
    tag: 'PULL',
    exercises: [
      { name: 'Barbell Deadlift', sets: 3, reps: '4–6', rest: '3 min' },
      { name: 'Barbell Row', sets: 3, reps: '4–6', rest: '3 min' },
      { name: 'One-Arm Dumbbell Row', sets: 3, reps: '4–6', rest: '3 min' },
      { name: 'Wide-Grip Pull-Up (or Lat Pulldown)', sets: 3, reps: '4–6', rest: '3 min' },
    ],
  },
  3: { // Wednesday
    name: 'Shoulders & Calves',
    tag: 'PUSH',
    exercises: [
      { name: 'Seated Barbell Military Press', sets: 3, reps: '4–6', rest: '3 min' },
      { name: 'Side Lateral Raise', sets: 3, reps: '4–6', rest: '2 min' },
      { name: 'Bent-Over Rear Delt Raise', sets: 3, reps: '4–6', rest: '2 min' },
      { name: 'Barbell Shrug', sets: 3, reps: '4–6', rest: '2 min' },
      { name: 'Standing Calf Raise', sets: 3, reps: '4–6', rest: '2 min' },
    ],
  },
  4: { // Thursday
    name: 'Legs',
    tag: 'LOWER',
    exercises: [
      { name: 'Barbell Back Squat', sets: 3, reps: '4–6', rest: '3 min' },
      { name: 'Leg Press', sets: 3, reps: '4–6', rest: '3 min' },
      { name: 'Romanian Deadlift', sets: 3, reps: '4–6', rest: '3 min' },
      { name: 'Lying Leg Curl', sets: 3, reps: '4–6', rest: '2 min' },
    ],
  },
  5: { // Friday
    name: 'Arms & Calves',
    tag: 'ARMS',
    exercises: [
      { name: 'Barbell Curl', sets: 3, reps: '4–6', rest: '2 min' },
      { name: 'Alternating Dumbbell Curl', sets: 3, reps: '4–6', rest: '2 min' },
      { name: 'Hammer Curl', sets: 3, reps: '4–6', rest: '2 min' },
      { name: 'Close-Grip Bench Press', sets: 3, reps: '4–6', rest: '3 min' },
      { name: 'Seated Triceps Press', sets: 3, reps: '4–6', rest: '2 min' },
      { name: 'Triceps Pushdown', sets: 3, reps: '4–6', rest: '2 min' },
    ],
  },
  6: { name: 'Rest / HIIT Cardio', tag: 'RECOVERY', exercises: [] }, // Sat
  0: { name: 'Rest / HIIT Cardio', tag: 'RECOVERY', exercises: [] }, // Sun
};

// ============================================================
// EXERCISE DETAILS — Beginner-friendly form guide for every lift
// ============================================================
const EXERCISE_DETAILS = {
  'Incline Barbell Bench Press': {
    muscles: 'Upper chest, front delts, triceps',
    setup: [
      'Set the bench to 30–45° incline. Steeper than that shifts work to shoulders.',
      'Lie back with your eyes directly under the bar. Plant both feet flat on the floor.',
      'Grip the bar slightly wider than shoulder-width. Wrap your thumbs around — never use a "suicide grip".',
      'Squeeze your shoulder blades together and down, like tucking them into your back pockets.',
    ],
    execution: [
      'Unrack the bar with straight arms and bring it over your upper chest.',
      'Lower the bar slowly (~2 seconds) to your upper chest, just below your collarbones.',
      'Keep your elbows tucked at about 45° from your torso — not flared out wide.',
      'Pause briefly at the bottom — no bouncing off the chest.',
      'Drive the bar back up explosively, keeping your shoulder blades pinned.',
      'Lock arms out at the top. Repeat.',
    ],
    tips: [
      'Inhale on the way down, exhale forcefully as you press up.',
      'Keep your butt on the bench — don\'t arch so hard you lift off.',
      'Use a spotter or set safety arms on your first heavy set ever.',
    ],
    mistakes: [
      'Flaring elbows wide → shoulder pain',
      'Bouncing the bar off your chest',
      'Setting the incline too steep (60°+ becomes a shoulder press)',
    ],
  },
  'Incline Dumbbell Bench Press': {
    muscles: 'Upper chest, front delts, triceps',
    setup: [
      'Bench at 30–45° incline.',
      'Sit on the bench with a dumbbell on each thigh, holding them upright.',
      'Lie back and kick the dumbbells up to shoulder level as you go.',
    ],
    execution: [
      'Start with dumbbells just outside your shoulders, palms facing forward.',
      'Press both up over your chest until arms are nearly locked (don\'t clang them).',
      'Lower slowly to shoulder level over ~2 seconds, elbows about 45° from torso.',
      'Press back up. Repeat.',
    ],
    tips: [
      'When done, sit up and drop the dumbbells to your sides (don\'t try to lower them gently).',
      'Pick dumbbells you can confidently kick up — if you struggle to even start the set, drop the weight.',
    ],
    mistakes: [
      'Touching the dumbbells together at the top (kills tension)',
      'Letting them drift wide and stress the shoulders',
    ],
  },
  'Flat Barbell Bench Press': {
    muscles: 'Mid chest, front delts, triceps',
    setup: [
      'Lie flat with eyes directly under the bar. Plant feet firmly on the ground.',
      'Create a slight natural arch in your lower back — chest up, shoulder blades pulled together and down.',
      'Grip ~1.5× shoulder width. Wrap thumbs around the bar.',
    ],
    execution: [
      'Unrack to straight arms, positioned over your upper chest.',
      'Lower the bar slowly (~2 seconds) to your mid-chest (nipple line).',
      'Elbows at about 45° — not flared out, not pinned to your sides.',
      'Pause briefly. Drive the bar back up, slightly toward your face, until arms lock.',
    ],
    tips: [
      'Always use safety arms or a spotter for heavy sets — never use clips alone.',
      'Keep your feet planted and push through them — leg drive helps a lot.',
    ],
    mistakes: [
      'Bouncing the bar off your chest',
      'Lifting your butt off the bench',
      'Pressing the bar straight up (it should travel slightly back toward the rack)',
    ],
  },
  'Standing Calf Raise': {
    muscles: 'Calves (gastrocnemius)',
    setup: [
      'Use a standing calf raise machine, or stand with the balls of your feet on a sturdy step/platform.',
      'Position the shoulder pads (if using a machine) so you stand up with a slight squeeze in your calves.',
    ],
    execution: [
      'Let your heels drop as far below the platform as your flexibility allows.',
      'Press up onto the balls of your feet as high as you can.',
      'Squeeze hard at the top for a beat. Lower slowly.',
    ],
    tips: [
      'Slow eccentric (lowering) gives the calves much more growth stimulus.',
      'Calves respond best to full range of motion — go all the way down and all the way up.',
    ],
    mistakes: [
      'Half reps — barely going up on the toes',
      'Bouncing through reps without controlling the descent',
    ],
  },
  'Seated Calf Raise': {
    muscles: 'Calves (soleus)',
    setup: [
      'Sit at the seated calf raise machine.',
      'Place the balls of your feet on the platform, knees under the pad.',
      'The pad should sit just above your knees.',
    ],
    execution: [
      'Drop your heels below the platform as far as possible.',
      'Press up onto your toes, squeezing your calves.',
      'Slow, controlled lower.',
    ],
    tips: [
      'This hits the soleus (under the gastroc) — strong soleus = bigger overall calves.',
      'Don\'t rush. Calves grow from time under tension.',
    ],
    mistakes: [
      'Letting the weight crash down at the bottom',
      'Cutting range of motion short',
    ],
  },
  'Barbell Deadlift': {
    muscles: 'Posterior chain: hamstrings, glutes, lower back, lats, traps, forearms',
    setup: [
      'Bar on the floor. Stand with your mid-foot under the bar — bar should be about an inch from your shins.',
      'Stance: roughly hip-width, toes slightly out.',
      'Hinge at the hips (push butt back) and bend your knees to grip the bar just outside your legs.',
      'Use a double-overhand grip until it limits you; then switch to mixed (one hand reversed) for heavy sets.',
      'Flat back. Chest up. Engage your lats (think "protect your armpits"). Pull all the slack out of the bar.',
    ],
    execution: [
      'Take a big breath, brace your core like someone\'s about to punch you.',
      'Drive your feet through the floor — push the floor away rather than yanking the bar up.',
      'Bar drags up along your legs, staying close to your body the entire way.',
      'Stand tall at the top — squeeze glutes, don\'t lean back.',
      'Reverse: hips back first, then bend knees once bar passes them. Lower under control.',
    ],
    tips: [
      'This is the most important lift to learn correctly. Spend your first weeks light, drilling form.',
      'Reset between every rep — touch and go reps come later.',
      'Wear flat-soled shoes (no running shoes). Barefoot or Converse style.',
    ],
    mistakes: [
      'Rounding your lower back — STOP the set if this happens',
      'Bar drifting away from your shins',
      'Hyperextending at the top (leaning back like a banana)',
      'Lifting with your back instead of pushing through the floor',
    ],
  },
  'Barbell Row': {
    muscles: 'Mid-back, lats, rear delts, biceps',
    setup: [
      'Bar on the floor (or pulled from rack at knee height).',
      'Stand with mid-foot under the bar, feet hip-width.',
      'Hinge at the hips with a slight knee bend — torso at roughly 45° to the floor.',
      'Grip just outside your shins, overhand. Flat back, chest up.',
    ],
    execution: [
      'Brace your core. Pull the bar toward your lower chest / upper abs.',
      'Drive your elbows back and slightly out, squeezing your shoulder blades together at the top.',
      'Lower slowly under control. Touch the floor or stop just above it — don\'t bounce.',
    ],
    tips: [
      'Keep your torso angle constant — don\'t stand up to "cheat" the weight up.',
      'Think "pull with your elbows," not your hands. This helps fire the back muscles.',
    ],
    mistakes: [
      'Standing too upright (turns it into a shrug)',
      'Rounding the lower back',
      'Pulling to the wrong spot (a high pull is a different exercise)',
    ],
  },
  'One-Arm Dumbbell Row': {
    muscles: 'Lats, mid-back, rear delts, biceps',
    setup: [
      'Place one knee and the same-side hand on a flat bench.',
      'Your back should be roughly parallel to the floor.',
      'Grab a dumbbell with your free hand, arm hanging straight down.',
    ],
    execution: [
      'Pull the dumbbell up toward your hip, keeping your elbow close to your body.',
      'Squeeze your back at the top — imagine sawing wood with your elbow.',
      'Lower slowly until your arm is fully extended (let the shoulder blade open).',
    ],
    tips: [
      'Don\'t twist your torso to swing the weight up — keep your hips and shoulders square.',
      'Range of motion matters more than weight here.',
    ],
    mistakes: [
      'Pulling with the arm instead of the back',
      'Letting the shoulder hike up toward your ear',
    ],
  },
  'Wide-Grip Pull-Up (or Lat Pulldown)': {
    muscles: 'Lats, mid-back, biceps, rear delts',
    setup: [
      'Pull-up: grip the bar slightly wider than shoulder-width, palms facing away.',
      'Lat Pulldown (substitute if you can\'t do pull-ups yet): sit at the machine, adjust knee pad snug, grip the bar wider than shoulders, palms forward.',
      'Hang or sit with arms fully extended. Engage lats by pulling shoulders down (not up by your ears).',
    ],
    execution: [
      'Pull-up: drive your elbows down and back, bringing your upper chest toward the bar.',
      'Lat Pulldown: lean back ~15°, pull the bar to your upper chest, squeezing lats and pulling shoulder blades together.',
      'Slow, controlled return to a full hang/extension. Full range every rep.',
    ],
    tips: [
      'Can\'t do a pull-up? Use band-assisted pull-ups or lat pulldowns until you build strength.',
      'Don\'t kip or swing — every rep should be strict.',
    ],
    mistakes: [
      'Half reps (not coming down all the way)',
      'Letting the bar pull your shoulders up — keep them depressed',
      'Using too much bicep — focus on driving elbows down',
    ],
  },
  'Seated Barbell Military Press': {
    muscles: 'Shoulders (front + side), triceps, upper chest',
    setup: [
      'Set the rack pins so the bar sits at the height of your collarbones when seated.',
      'Sit on a bench with vertical back support — feet flat on the floor.',
      'Grip slightly wider than shoulder-width. Unrack so the bar rests at your front shoulders.',
    ],
    execution: [
      'Brace your core hard. Press the bar straight up overhead.',
      'As the bar clears your face, push your head slightly forward (under the bar) at lockout.',
      'Lock out fully — bar over the middle of your head, not in front of it.',
      'Lower slowly to your front shoulders. Repeat.',
    ],
    tips: [
      'Squeeze your glutes and keep your core tight — overhead pressing without bracing wrecks the lower back.',
      'Don\'t flare your elbows out wide — they should be slightly in front of the bar.',
    ],
    mistakes: [
      'Leaning back excessively (turns it into a standing incline press)',
      'Pressing the bar in front of your head instead of over it',
      'Cutting the range of motion at the top',
    ],
  },
  'Side Lateral Raise': {
    muscles: 'Side delts (medial shoulder)',
    setup: [
      'Stand with a dumbbell in each hand at your sides.',
      'Slight bend in your elbows — keep that bend the whole set.',
      'Stand tall, core engaged.',
    ],
    execution: [
      'Lift the dumbbells out to your sides until your arms are parallel to the floor.',
      'Lead with your elbows, not your hands — imagine pouring water out of two pitchers at the top.',
      'Hold for a beat. Lower slowly.',
    ],
    tips: [
      'Side delts respond to lighter weight done strictly — don\'t ego lift here.',
      'A slight forward lean (10–15°) can target the side delts better than standing perfectly upright.',
    ],
    mistakes: [
      'Swinging the weights up using momentum',
      'Lifting too high (above parallel just shrugs the traps)',
      'Bending elbows mid-rep to cheat',
    ],
  },
  'Bent-Over Rear Delt Raise': {
    muscles: 'Rear delts, upper back',
    setup: [
      'Dumbbells in each hand. Hinge at the hips ~45–60° forward, slight knee bend.',
      'Back flat. Arms hanging straight down, palms facing each other.',
      'Slight bend in elbows.',
    ],
    execution: [
      'Lift the dumbbells out to your sides, leading with your elbows.',
      'Squeeze your rear delts and upper back hard at the top.',
      'Lower slowly. Repeat.',
    ],
    tips: [
      'Use very strict form — rear delts get tiny stimulus from heavy ego lifts.',
      'Think about pulling the dumbbells apart at the top, not lifting them up.',
    ],
    mistakes: [
      'Standing up too much (turns it into a lateral raise)',
      'Using too much weight and turning it into a row',
    ],
  },
  'Barbell Shrug': {
    muscles: 'Traps',
    setup: [
      'Stand holding a barbell at arm\'s length in front of your thighs.',
      'Hands slightly wider than hip-width, overhand grip.',
      'Stand tall, chest up.',
    ],
    execution: [
      'Shrug your shoulders straight up toward your ears.',
      'Squeeze hard at the top for a beat.',
      'Lower slowly to the starting position.',
    ],
    tips: [
      'Don\'t roll your shoulders — straight up and down only.',
      'Use straps if your grip fails before your traps do (you can shrug heavy).',
    ],
    mistakes: [
      'Rolling shoulders forward/backward (no benefit, just impingement risk)',
      'Tilting your head forward as you lift',
    ],
  },
  'Barbell Back Squat': {
    muscles: 'Quads, glutes, hamstrings, core, lower back',
    setup: [
      'Set the rack hooks at upper-chest height. Walk under the bar and place it across your upper back (on your traps or just below).',
      'Grip the bar tighter than shoulder-width. Pull your elbows down and back to create a shelf with your traps.',
      'Stand up to unrack. Take 2 controlled steps back.',
      'Stance: about shoulder-width, toes slightly turned out (10–30°).',
      'Brace your core. Look slightly forward and down — not straight up.',
    ],
    execution: [
      'Initiate by pushing your hips back AND bending your knees at the same time.',
      'Descend with control — knees track over your toes, chest stays up.',
      'Go to at least parallel (hip crease below the top of your knee) if your mobility allows.',
      'Drive through your mid-foot to stand up. Push the floor away. Knees out, not caving in.',
      'Stand tall. Repeat.',
    ],
    tips: [
      'Always squat inside a rack with safety arms set just below your bottom position.',
      'Take your time setting up — a sloppy unrack ruins the whole set.',
      'If you can\'t reach parallel without your lower back rounding ("butt wink"), work on hip mobility.',
    ],
    mistakes: [
      'Knees caving inward as you stand up',
      'Going onto your toes (heels coming off the floor) → wrong shoes or weak ankles',
      'Falling forward — chest collapsing toward the floor',
      'Squatting in running shoes — use flat soles or lifting shoes',
    ],
  },
  'Leg Press': {
    muscles: 'Quads, glutes, hamstrings',
    setup: [
      'Sit in the leg press. Place your feet shoulder-width on the platform, roughly in the middle.',
      'Lower back fully pressed into the pad.',
      'Disengage the safety stops.',
    ],
    execution: [
      'Lower the platform by bending your knees toward your chest.',
      'Stop when your knees reach about 90° (or lower if your form stays clean).',
      'Press the platform back up by driving through your whole foot.',
      'Don\'t fully lock out your knees at the top — keep a slight bend.',
    ],
    tips: [
      'Higher foot placement = more hamstring/glute. Lower placement = more quad.',
      'Keep your butt on the seat — if your hips lift, you went too deep.',
    ],
    mistakes: [
      'Locking knees out hard (joint stress)',
      'Hips lifting off the seat at the bottom (lower back risk)',
      'Putting hands on knees to push (just hold the side handles)',
    ],
  },
  'Romanian Deadlift': {
    muscles: 'Hamstrings, glutes, lower back',
    setup: [
      'Stand holding a barbell at hip level (use a rack or deadlift the bar up first).',
      'Grip just outside your legs, overhand. Feet hip-width.',
      'Slight bend in the knees — that bend stays the same the whole movement.',
    ],
    execution: [
      'Push your hips straight back (not down). Keep the bar dragging down your thighs.',
      'Lower until you feel a deep stretch in your hamstrings — usually mid-shin or just below your knees.',
      'Keep your back flat the entire time.',
      'Drive your hips forward to stand back up. Squeeze glutes at the top.',
    ],
    tips: [
      'The motion is a HIP HINGE, not a squat. Think "shut a car door with your butt."',
      'Don\'t go lower than your flexibility allows — back rounding kills the lift.',
    ],
    mistakes: [
      'Bending the knees more as you go down (that\'s a deadlift, not an RDL)',
      'Letting the bar drift forward off your legs',
      'Rounding the lower back',
    ],
  },
  'Lying Leg Curl': {
    muscles: 'Hamstrings',
    setup: [
      'Lie face down on the machine. Position your knees just past the edge of the pad.',
      'Place the ankle pad against your Achilles, not your calves.',
      'Grip the handles or sides of the machine.',
    ],
    execution: [
      'Curl your heels toward your butt by contracting your hamstrings.',
      'Squeeze hard at the top.',
      'Lower slowly under control until legs are nearly straight (don\'t let the stack slam down).',
    ],
    tips: [
      'Don\'t let your hips lift off the pad — that\'s using your back, not hamstrings.',
      'Slow eccentric (3+ seconds down) builds hamstrings well.',
    ],
    mistakes: [
      'Lifting your hips to swing the weight up',
      'Cutting the range of motion short at either end',
    ],
  },
  'Barbell Curl': {
    muscles: 'Biceps, forearms',
    setup: [
      'Stand holding a barbell with palms facing up, hands roughly shoulder-width apart.',
      'Elbows tucked into your sides.',
      'Stand tall, core engaged.',
    ],
    execution: [
      'Curl the bar up by flexing your biceps — only your forearms should move.',
      'Bring the bar to roughly shoulder height (no need to go higher).',
      'Squeeze biceps hard at the top.',
      'Lower slowly with control to a full extension.',
    ],
    tips: [
      'Don\'t swing your hips or lean back — strict form gives the most growth per rep.',
      'If your wrists hurt with a straight bar, switch to an EZ-curl bar.',
    ],
    mistakes: [
      'Swinging the weight up with your back',
      'Letting elbows drift forward at the top',
      'Half reps — failing to fully extend at the bottom',
    ],
  },
  'Alternating Dumbbell Curl': {
    muscles: 'Biceps, forearms',
    setup: [
      'Stand with a dumbbell in each hand, palms facing your thighs.',
      'Elbows tucked at your sides.',
    ],
    execution: [
      'Curl one dumbbell up, rotating your palm to face you as you raise it.',
      'Squeeze at the top.',
      'Lower with control as you start the other arm.',
      'Alternate arms each rep.',
    ],
    tips: [
      'The rotation (supination) is what fully recruits the biceps — don\'t skip it.',
      'Keep the non-working arm completely still.',
    ],
    mistakes: [
      'Both arms curling at once (different exercise)',
      'Letting elbows drift forward',
    ],
  },
  'Hammer Curl': {
    muscles: 'Brachialis, forearms, biceps',
    setup: [
      'Stand with dumbbells at your sides, palms facing in (neutral grip — like holding hammers).',
    ],
    execution: [
      'Curl the dumbbells up keeping your palms facing in the entire time.',
      'Bring them up to shoulder level.',
      'Squeeze. Slow lower.',
    ],
    tips: [
      'Hammer curls build the brachialis (muscle under the biceps) — that\'s what pushes the biceps UP and makes the arm look bigger.',
      'Can be done alternating or both at once.',
    ],
    mistakes: [
      'Rotating the wrists mid-rep (that\'s just a regular curl)',
      'Using too much weight and swinging',
    ],
  },
  'Close-Grip Bench Press': {
    muscles: 'Triceps, chest, front delts',
    setup: [
      'Lie on a flat bench with the bar over your eyes.',
      'Grip the bar about shoulder-width — not narrower than that (narrow grips wreck wrists).',
      'Shoulder blades retracted, feet planted.',
    ],
    execution: [
      'Unrack to straight arms.',
      'Lower the bar to your mid-chest with elbows tucked close to your body (not flared).',
      'Pause briefly. Press back up, focusing on driving with your triceps.',
    ],
    tips: [
      'Shoulder-width grip is plenty close — going narrower stresses the wrists without more tricep activation.',
      'Keep elbows tucked at ~30° from your torso, not flared like a regular bench.',
    ],
    mistakes: [
      'Gripping too narrow (wrist pain)',
      'Flaring elbows (turns it into a regular bench press)',
    ],
  },
  'Seated Triceps Press': {
    muscles: 'Triceps (especially long head)',
    setup: [
      'Sit on a bench with vertical back support.',
      'Hold ONE dumbbell vertically with both hands cupped under the top plate.',
      'Press the dumbbell straight overhead — arms locked out.',
    ],
    execution: [
      'Slowly lower the dumbbell behind your head by bending your elbows.',
      'Keep your elbows pointed straight up and close to your head — don\'t flare them out.',
      'Lower until you feel a stretch in your triceps.',
      'Press back up, squeezing triceps at the top.',
    ],
    tips: [
      'Use a back-supported bench — overhead pressing without support stresses the lower back.',
      'Start lighter than you think — this position can feel awkward at first.',
    ],
    mistakes: [
      'Elbows flaring out wide as you lower',
      'Half reps — not getting a real stretch at the bottom',
    ],
  },
  'Triceps Pushdown': {
    muscles: 'Triceps',
    setup: [
      'Stand facing a cable machine with a rope or straight bar attachment at the top.',
      'Grip the attachment (rope: thumbs on top of the knots; bar: overhand).',
      'Pin your elbows tight to your sides. Slight forward lean.',
    ],
    execution: [
      'Press the attachment down until your arms are fully extended.',
      'Squeeze your triceps hard at the bottom.',
      'For rope: spread the rope apart at the bottom for extra peak contraction.',
      'Slow return until your forearms are roughly parallel to the floor (or slightly higher).',
    ],
    tips: [
      'The ONLY thing that moves is your forearms — elbows stay glued to your sides.',
      'Going much higher than parallel takes tension off the triceps.',
    ],
    mistakes: [
      'Elbows flaring out and moving forward',
      'Using your bodyweight to push the stack down',
      'Bouncing reps',
    ],
  },
};

const MOTIVATIONS = [
  'The only way to get bigger, leaner, and stronger is to do the work.',
  'Discipline equals freedom. Show up.',
  'Heavy compound lifts. Progressive overload. Patience.',
  'You don\'t have to be extreme. Just consistent.',
  'Eat enough protein. Lift heavy. Sleep. Repeat.',
  'The pain of discipline weighs ounces. The pain of regret weighs tons.',
  '80% whole foods, 20% flexible. That\'s the formula.',
];

// ============================================================
// CARDIO & SPORTS — Additional activities (on top of BLS plan)
// ============================================================
const CARDIO_ACTIVITIES = [
  { id: 'running', name: 'Running', tag: 'RUN', hasDistance: true },
  { id: 'cycling', name: 'Cycling', tag: 'BIKE', hasDistance: true },
  { id: 'swimming', name: 'Swimming', tag: 'SWIM', hasDistance: true },
  { id: 'tennis', name: 'Tennis', tag: 'TENNIS', hasDistance: false },
  { id: 'pickleball', name: 'Pickleball', tag: 'PICKLE', hasDistance: false },
  { id: 'hiit', name: 'HIIT', tag: 'HIIT', hasDistance: false },
  { id: 'walking', name: 'Walking', tag: 'WALK', hasDistance: true },
  { id: 'other', name: 'Other', tag: 'OTHER', hasDistance: false },
];

// ============================================================
// GYM ETIQUETTE — First time guide
// ============================================================
const GYM_ETIQUETTE = [
  {
    title: 'Before You Go',
    items: [
      'Eat something 1–2 hours before — carbs + protein helps energy and focus.',
      'Bring a water bottle, small hand towel, and headphones (optional).',
      'Wear flat-soled shoes for lifting (NOT running shoes — they\'re too soft for squats).',
      'Plan your workout in advance. Today\'s split is already in this app.',
      'Always warm up: 5 minutes light cardio + a few light warm-up sets of your first lift.',
    ],
  },
  {
    title: 'The Unwritten Rules',
    items: [
      'Re-rack your weights. ALWAYS. When you take a plate off, put it back where it belongs.',
      'Wipe down equipment after use. Most gyms have spray and paper towels.',
      'Don\'t hog equipment. Between sets, others can "work in" (use it during your rest).',
      'Never walk in front of someone mid-lift — especially during squats or dumbbell work. Go around.',
      'Don\'t drop weights unless you\'re on a designated platform (deadlifts/Olympic lifts only).',
      'Don\'t film other people. Filming your own form is fine.',
      'Don\'t curl in the squat rack. Squat racks are precious — use them for what they\'re built for.',
    ],
  },
  {
    title: 'Working In',
    items: [
      'During someone\'s rest (2–3 min between sets), ask: "Mind if I work in?"',
      'You\'ll take turns on the same equipment, adjusting weights between sets.',
      'Totally normal. Don\'t be afraid to ask or be asked.',
    ],
  },
  {
    title: 'Asking for a Spot',
    items: [
      'For heavy bench: "Hey, can you spot me for a few reps?"',
      'Be specific about how many reps and how much help you might need.',
      'For squats: spotting is hard — use safety arms in the rack instead.',
      'If you\'re spotting: hands hovering, assist only if they truly fail. Don\'t over-help.',
    ],
  },
  {
    title: 'Safety Non-Negotiables',
    items: [
      'ALWAYS use safety arms in the squat rack and bench — set them just below your bottom position.',
      'Use clips/collars on the bar so plates can\'t slide off.',
      'Never round your lower back on deadlifts or rows. If form breaks, stop the set.',
      'Don\'t test 1-rep maxes in your first few months. Stay in the 4–6 rep range.',
      'Sharp pain (joint, sudden) is not muscle burn. Stop and reassess.',
    ],
  },
  {
    title: 'You Belong There',
    items: [
      'Everyone in that gym was a beginner once — including the strongest person you see.',
      'No one is watching or judging. They\'re focused on their own workout.',
      'Use the empty bar to learn movements. A standard barbell is 45 lbs (20 kg) on its own.',
      'Ask staff or a friendly lifter if you can\'t find equipment. Most people are happy to help.',
      'Progress takes months and years. Show up consistently. The compound effect is real.',
    ],
  },
];

// ============================================================
// MACRO CALCULATION (per BLS recommendations)
// ============================================================
function calculateMacros(weight, phase) {
  if (!weight || weight <= 0) return { calories: 0, protein: 0, carbs: 0, fat: 0 };
  const w = Number(weight);
  let cal, p, c, f;
  if (phase === 'cut') {
    cal = Math.round(w * 10);
    p = Math.round(w * 1.2);
    c = Math.round(w * 1);
    f = Math.round(w * 0.2);
  } else if (phase === 'bulk') {
    cal = Math.round(w * 18);
    p = Math.round(w * 1);
    c = Math.round(w * 3);
    f = Math.round(w * 0.4);
  } else { // maintain
    cal = Math.round(w * 15);
    p = Math.round(w * 1);
    c = Math.round(w * 2);
    f = Math.round(w * 0.3);
  }
  return { calories: cal, protein: p, carbs: c, fat: f };
}

// ============================================================
// STORAGE HELPERS
// ============================================================
const storage = {
  async get(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  },
  async set(key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch {}
  },
};

const todayKey = () => new Date().toISOString().split('T')[0];
const dayOfWeek = () => new Date().getDay();

// ============================================================
// UNIT CONVERSION
// Storage is always in lbs / inches (BLS native).
// Display converts based on user's preference.
// ============================================================
const LBS_PER_KG = 2.2046;
const CM_PER_IN = 2.54;
const KM_PER_MI = 1.6093;

const u = {
  w: (lbs, sys) => {
    if (!lbs && lbs !== 0) return '';
    const v = sys === 'kg' ? lbs / LBS_PER_KG : lbs;
    return Math.round(v * 10) / 10;
  },
  wToLbs: (val, sys) => {
    const n = parseFloat(val);
    if (isNaN(n)) return 0;
    return sys === 'kg' ? n * LBS_PER_KG : n;
  },
  wLabel: (sys) => sys === 'kg' ? 'kg' : 'lbs',
  m: (inches, sys) => {
    if (!inches && inches !== 0) return '';
    const v = sys === 'cm' ? inches * CM_PER_IN : inches;
    return Math.round(v * 10) / 10;
  },
  mToIn: (val, sys) => {
    const n = parseFloat(val);
    if (isNaN(n)) return 0;
    return sys === 'cm' ? n / CM_PER_IN : n;
  },
  mLabel: (sys) => sys === 'cm' ? 'cm' : 'in',
  dLabel: (sys) => sys === 'km' ? 'km' : 'mi',
};

// ============================================================
// MAIN APP
// ============================================================
export default function App() {
  const [tab, setTab] = useState('home');
  const [profile, setProfile] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [workouts, setWorkouts] = useState({});
  const [body, setBody] = useState({});
  const [food, setFood] = useState({});
  const [cardio, setCardio] = useState({});
  const [streak, setStreak] = useState({ current: 0, longest: 0, lastDate: null });
  const [showGuide, setShowGuide] = useState(false);

  useEffect(() => {
    (async () => {
      const p = await storage.get('profile', null);
      // Backfill units for profiles created before unit support
      if (p && !p.units) {
        p.units = { weight: 'lbs', measurement: 'in', distance: 'mi' };
        await storage.set('profile', p);
      }
      const w = await storage.get('workouts', {});
      const b = await storage.get('body', {});
      const f = await storage.get('food', {});
      const c = await storage.get('cardio', {});
      const s = await storage.get('streak', { current: 0, longest: 0, lastDate: null });
      setProfile(p);
      setWorkouts(w);
      setBody(b);
      setFood(f);
      setCardio(c);
      setStreak(s);
      setLoaded(true);
    })();
  }, []);

  const saveProfile = async (p) => { setProfile(p); await storage.set('profile', p); };
  const saveWorkouts = async (w) => { setWorkouts(w); await storage.set('workouts', w); };
  const saveBody = async (b) => { setBody(b); await storage.set('body', b); };
  const saveFood = async (f) => { setFood(f); await storage.set('food', f); };
  const saveCardio = async (c) => { setCardio(c); await storage.set('cardio', c); };
  const saveStreak = async (s) => { setStreak(s); await storage.set('streak', s); };

  const updateStreak = async () => {
    const today = todayKey();
    if (streak.lastDate === today) return; // already counted
    const yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1);
    const yKey = yesterday.toISOString().split('T')[0];
    const newCurrent = streak.lastDate === yKey ? streak.current + 1 : 1;
    const newStreak = {
      current: newCurrent,
      longest: Math.max(newCurrent, streak.longest),
      lastDate: today,
    };
    await saveStreak(newStreak);
  };

  if (!loaded) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <div className="text-lime-400 font-bold tracking-widest text-sm animate-pulse">LOADING</div>
      </div>
    );
  }

  if (!profile) {
    return <Onboarding onSave={saveProfile} />;
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100" style={{ fontFamily: '"Manrope", system-ui, sans-serif' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Manrope:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;700&display=swap');
        .display { font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.02em; }
        .mono { font-family: 'JetBrains Mono', monospace; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="max-w-md mx-auto pb-24 min-h-screen">
        {tab === 'home' && <Dashboard profile={profile} streak={streak} workouts={workouts} body={body} food={food} cardio={cardio} setTab={setTab} />}
        {tab === 'workout' && <WorkoutView profile={profile} workouts={workouts} saveWorkouts={saveWorkouts} updateStreak={updateStreak} cardio={cardio} saveCardio={saveCardio} onOpenGuide={() => setShowGuide(true)} />}
        {tab === 'food' && <FoodView profile={profile} food={food} saveFood={saveFood} />}
        {tab === 'body' && <BodyView body={body} saveBody={saveBody} profile={profile} saveProfile={saveProfile} />}
        {tab === 'profile' && <ProfileView profile={profile} saveProfile={saveProfile} streak={streak} onOpenGuide={() => setShowGuide(true)} />}
      </div>

      {showGuide && <GymGuide onClose={() => setShowGuide(false)} />}

      <BottomNav tab={tab} setTab={setTab} />
    </div>
  );
}

// ============================================================
// BOTTOM NAVIGATION
// ============================================================
function BottomNav({ tab, setTab }) {
  const items = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'workout', icon: Dumbbell, label: 'Train' },
    { id: 'food', icon: Apple, label: 'Fuel' },
    { id: 'body', icon: Activity, label: 'Body' },
    { id: 'profile', icon: User, label: 'You' },
  ];
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-neutral-950/95 backdrop-blur border-t border-neutral-800 z-50">
      <div className="max-w-md mx-auto flex justify-around py-2 pb-safe" style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 8px)' }}>
        {items.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`flex flex-col items-center justify-center py-2 px-4 rounded-lg transition-all ${
              tab === id ? 'text-lime-400' : 'text-neutral-500'
            }`}
          >
            <Icon size={22} strokeWidth={tab === id ? 2.5 : 1.75} />
            <span className="text-[10px] mt-1 font-semibold tracking-wider uppercase">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// ONBOARDING
// ============================================================
function Onboarding({ onSave }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    name: '',
    units: { weight: 'lbs', measurement: 'in', distance: 'mi' },
    weight: '',
    height: '',
    age: '',
    gender: 'male',
    phase: 'maintain',
  });

  const update = (k, v) => setData({ ...data, [k]: v });
  const updateUnits = (k, v) => setData({ ...data, units: { ...data.units, [k]: v } });

  const next = () => {
    if (step < 5) setStep(step + 1);
    else {
      // Convert inputs to storage units (lbs, inches)
      onSave({
        ...data,
        weight: u.wToLbs(data.weight, data.units.weight),
        height: u.mToIn(data.height, data.units.measurement),
        age: Number(data.age),
      });
    }
  };

  const canNext = () => {
    if (step === 0) return data.name.trim().length > 0;
    if (step === 1) return true;
    if (step === 2) return data.weight && Number(data.weight) > 0;
    if (step === 3) return data.height && Number(data.height) > 0 && data.age && Number(data.age) > 0;
    return true;
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col p-6" style={{ fontFamily: '"Manrope", system-ui, sans-serif' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Manrope:wght@400;500;600;700;800&display=swap');
        .display { font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.02em; }
      `}</style>

      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        <div className="mb-8">
          <div className="text-lime-400 text-xs font-bold tracking-[0.2em] mb-2">BIGGER · LEANER · STRONGER</div>
          <div className="flex gap-1">
            {[0,1,2,3,4,5].map(i => (
              <div key={i} className={`h-1 flex-1 rounded-full ${i <= step ? 'bg-lime-400' : 'bg-neutral-800'}`} />
            ))}
          </div>
        </div>

        {step === 0 && (
          <div>
            <h1 className="display text-6xl mb-2">WELCOME.</h1>
            <p className="text-neutral-400 mb-8">Let's build your program. What should we call you?</p>
            <input
              autoFocus
              value={data.name}
              onChange={(e) => update('name', e.target.value)}
              placeholder="Your name"
              className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-4 text-lg focus:border-lime-400 focus:outline-none"
            />
          </div>
        )}

        {step === 1 && (
          <div>
            <h1 className="display text-5xl mb-2">YOUR UNITS</h1>
            <p className="text-neutral-400 mb-8">Pick what feels natural. You can change this later.</p>

            <div className="mb-5">
              <div className="text-xs text-neutral-400 mb-2 font-bold tracking-widest uppercase">Weight</div>
              <div className="flex gap-2">
                {[{ id: 'lbs', l: 'Pounds (lbs)' }, { id: 'kg', l: 'Kilograms (kg)' }].map(o => (
                  <button
                    key={o.id}
                    onClick={() => updateUnits('weight', o.id)}
                    className={`flex-1 py-3 rounded-xl border transition-all text-sm font-semibold ${
                      data.units.weight === o.id ? 'bg-lime-400 text-neutral-950 border-lime-400' : 'bg-neutral-900 border-neutral-800 text-neutral-400'
                    }`}
                  >
                    {o.l}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-5">
              <div className="text-xs text-neutral-400 mb-2 font-bold tracking-widest uppercase">Body measurements</div>
              <div className="flex gap-2">
                {[{ id: 'in', l: 'Inches (in)' }, { id: 'cm', l: 'Centimeters (cm)' }].map(o => (
                  <button
                    key={o.id}
                    onClick={() => updateUnits('measurement', o.id)}
                    className={`flex-1 py-3 rounded-xl border transition-all text-sm font-semibold ${
                      data.units.measurement === o.id ? 'bg-lime-400 text-neutral-950 border-lime-400' : 'bg-neutral-900 border-neutral-800 text-neutral-400'
                    }`}
                  >
                    {o.l}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="text-xs text-neutral-400 mb-2 font-bold tracking-widest uppercase">Distance (cardio)</div>
              <div className="flex gap-2">
                {[{ id: 'mi', l: 'Miles (mi)' }, { id: 'km', l: 'Kilometers (km)' }].map(o => (
                  <button
                    key={o.id}
                    onClick={() => updateUnits('distance', o.id)}
                    className={`flex-1 py-3 rounded-xl border transition-all text-sm font-semibold ${
                      data.units.distance === o.id ? 'bg-lime-400 text-neutral-950 border-lime-400' : 'bg-neutral-900 border-neutral-800 text-neutral-400'
                    }`}
                  >
                    {o.l}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h1 className="display text-5xl mb-2">YOUR WEIGHT</h1>
            <p className="text-neutral-400 mb-8">In {u.wLabel(data.units.weight)}. This drives your macros.</p>
            <div className="relative">
              <input
                autoFocus
                type="number"
                inputMode="decimal"
                value={data.weight}
                onChange={(e) => update('weight', e.target.value)}
                placeholder={data.units.weight === 'kg' ? 'e.g. 80' : 'e.g. 175'}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-4 text-lg focus:border-lime-400 focus:outline-none pr-16"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 font-bold">{u.wLabel(data.units.weight)}</span>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h1 className="display text-5xl mb-2">A FEW MORE STATS</h1>
            <p className="text-neutral-400 mb-8">Height ({u.mLabel(data.units.measurement)}) and age.</p>
            <div className="relative mb-3">
              <input
                autoFocus
                type="number"
                inputMode="decimal"
                value={data.height}
                onChange={(e) => update('height', e.target.value)}
                placeholder={`Height in ${u.mLabel(data.units.measurement)}`}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-4 text-lg focus:border-lime-400 focus:outline-none pr-16"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 font-bold">{u.mLabel(data.units.measurement)}</span>
            </div>
            <input
              type="number"
              inputMode="numeric"
              value={data.age}
              onChange={(e) => update('age', e.target.value)}
              placeholder="Age"
              className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-4 text-lg focus:border-lime-400 focus:outline-none"
            />
            <div className="flex gap-2 mt-4">
              {['male', 'female'].map(g => (
                <button
                  key={g}
                  onClick={() => update('gender', g)}
                  className={`flex-1 py-3 rounded-xl border transition-all text-sm font-semibold uppercase tracking-wide ${
                    data.gender === g ? 'bg-lime-400 text-neutral-950 border-lime-400' : 'bg-neutral-900 border-neutral-800 text-neutral-400'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h1 className="display text-5xl mb-2">YOUR GOAL</h1>
            <p className="text-neutral-400 mb-8">BLS uses phases. Pick yours.</p>
            <div className="space-y-3">
              {[
                { id: 'cut', label: 'CUT', desc: 'Lose fat. ~25% caloric deficit. Preserve muscle.' },
                { id: 'maintain', label: 'MAINTAIN', desc: 'Recomp. Stay at maintenance calories.' },
                { id: 'bulk', label: 'BULK', desc: 'Build muscle. Moderate surplus.' },
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => update('phase', opt.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    data.phase === opt.id ? 'bg-lime-400/10 border-lime-400' : 'bg-neutral-900 border-neutral-800'
                  }`}
                >
                  <div className={`display text-2xl mb-1 ${data.phase === opt.id ? 'text-lime-400' : 'text-neutral-100'}`}>{opt.label}</div>
                  <div className="text-xs text-neutral-400">{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 5 && (
          <div>
            <h1 className="display text-5xl mb-2">YOU'RE SET, {data.name.toUpperCase()}.</h1>
            <p className="text-neutral-400 mb-8">Your program is built on Mike Matthews' Bigger Leaner Stronger:</p>
            <div className="space-y-3 text-sm">
              <div className="flex gap-3"><span className="text-lime-400">→</span><span>5-day split. Heavy compound lifts.</span></div>
              <div className="flex gap-3"><span className="text-lime-400">→</span><span>4–6 reps, 3 sets, 3 min rest.</span></div>
              <div className="flex gap-3"><span className="text-lime-400">→</span><span>Macros calculated for your <span className="text-lime-400 font-bold uppercase">{data.phase}</span> phase.</span></div>
              <div className="flex gap-3"><span className="text-lime-400">→</span><span>80/20 nutrition. Whole foods first.</span></div>
              <div className="flex gap-3"><span className="text-lime-400">→</span><span>Track weight, body fat, measurements + log your other sports.</span></div>
            </div>
          </div>
        )}
      </div>

      <button
        onClick={next}
        disabled={!canNext()}
        className="w-full bg-lime-400 text-neutral-950 font-bold py-4 rounded-xl mt-6 disabled:bg-neutral-800 disabled:text-neutral-600 transition-all uppercase tracking-wider"
      >
        {step === 5 ? "Let's Go" : 'Continue'}
      </button>
    </div>
  );
}

// ============================================================
// DASHBOARD
// ============================================================
function Dashboard({ profile, streak, workouts, body, food, cardio, setTab }) {
  const today = todayKey();
  const dow = dayOfWeek();
  const todayWorkout = BLS_SPLIT[dow];
  const todayLog = workouts[today];
  const isComplete = todayLog?.completed;
  const macros = calculateMacros(profile.weight, profile.phase);
  const todayFood = food[today]?.entries || [];
  const consumed = todayFood.reduce((acc, e) => ({
    cal: acc.cal + (Number(e.calories) || 0),
    p: acc.p + (Number(e.protein) || 0),
    c: acc.c + (Number(e.carbs) || 0),
    f: acc.f + (Number(e.fat) || 0),
  }), { cal: 0, p: 0, c: 0, f: 0 });

  const latestBody = Object.entries(body).sort((a,b) => b[0].localeCompare(a[0]))[0];
  const quote = MOTIVATIONS[new Date().getDate() % MOTIVATIONS.length];
  const todayCardio = cardio[today] || [];
  const wSys = profile.units?.weight || 'lbs';

  const dateStr = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  const displayWeight = latestBody?.[1]?.weight || profile.weight;

  return (
    <div className="px-5 pt-12">
      {/* Header */}
      <div className="mb-6">
        <div className="text-xs text-neutral-500 font-semibold tracking-widest uppercase">{dateStr}</div>
        <h1 className="display text-4xl mt-1">HEY, {profile.name.toUpperCase()}.</h1>
      </div>

      {/* Streak Hero */}
      <div className="bg-gradient-to-br from-lime-400 to-lime-500 text-neutral-950 rounded-3xl p-6 mb-4 relative overflow-hidden">
        <div className="absolute -right-4 -top-4 opacity-10">
          <Flame size={140} strokeWidth={1} />
        </div>
        <div className="text-xs font-bold tracking-widest uppercase opacity-70">Current Streak</div>
        <div className="display text-7xl leading-none mt-1">{streak.current}</div>
        <div className="text-sm font-semibold mt-1">{streak.current === 1 ? 'day' : 'days'} strong</div>
        <div className="mt-4 flex gap-4 text-xs">
          <div><span className="font-bold">{streak.longest}</span> longest</div>
        </div>
      </div>

      {/* Today's Workout Card */}
      <button onClick={() => setTab('workout')} className="w-full text-left bg-neutral-900 border border-neutral-800 rounded-2xl p-5 mb-3 active:bg-neutral-800 transition-all">
        <div className="flex items-start justify-between mb-2">
          <div>
            <div className="text-xs text-lime-400 font-bold tracking-widest uppercase mb-1">{todayWorkout.tag} · TODAY</div>
            <div className="display text-3xl">{todayWorkout.name.toUpperCase()}</div>
          </div>
          {isComplete ? (
            <div className="bg-lime-400 text-neutral-950 rounded-full p-2"><Check size={18} strokeWidth={3} /></div>
          ) : (
            <ChevronRight className="text-neutral-600" />
          )}
        </div>
        {todayWorkout.exercises.length > 0 && (
          <div className="text-sm text-neutral-400">{todayWorkout.exercises.length} exercises · 4–6 reps · 3 sets</div>
        )}
        {todayWorkout.exercises.length === 0 && (
          <div className="text-sm text-neutral-400">Recovery day. Optional HIIT cardio.</div>
        )}
      </button>

      {/* Today's Cardio/Sports */}
      {todayCardio.length > 0 && (
        <button onClick={() => setTab('workout')} className="w-full text-left bg-neutral-900 border border-neutral-800 rounded-2xl p-5 mb-3 active:bg-neutral-800 transition-all">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <div className="text-xs text-sky-400 font-bold tracking-widest uppercase mb-1">Bonus Activity</div>
              <div className="space-y-1">
                {todayCardio.map(a => {
                  const act = CARDIO_ACTIVITIES.find(x => x.id === a.activity) || { name: a.activity };
                  return (
                    <div key={a.id} className="text-sm">
                      <span className="font-bold">{act.name}</span>
                      <span className="text-neutral-500 mono ml-2 text-xs">
                        {a.duration}min{a.distance ? ` · ${a.distance} ${a.distanceUnit}` : ''}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            <ChevronRight className="text-neutral-600" />
          </div>
        </button>
      )}

      {/* Nutrition Quick View */}
      <button onClick={() => setTab('food')} className="w-full text-left bg-neutral-900 border border-neutral-800 rounded-2xl p-5 mb-3 active:bg-neutral-800 transition-all">
        <div className="flex justify-between items-start mb-3">
          <div>
            <div className="text-xs text-neutral-500 font-bold tracking-widest uppercase mb-1">Fuel · {profile.phase.toUpperCase()}</div>
            <div className="flex items-baseline gap-2">
              <span className="display text-4xl">{consumed.cal}</span>
              <span className="text-neutral-500 mono text-sm">/ {macros.calories} cal</span>
            </div>
          </div>
          <ChevronRight className="text-neutral-600" />
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { l: 'P', v: consumed.p, t: macros.protein, c: 'bg-rose-400' },
            { l: 'C', v: consumed.c, t: macros.carbs, c: 'bg-amber-400' },
            { l: 'F', v: consumed.f, t: macros.fat, c: 'bg-sky-400' },
          ].map(m => (
            <div key={m.l}>
              <div className="flex justify-between text-xs mono mb-1">
                <span className="text-neutral-500">{m.l}</span>
                <span>{Math.round(m.v)}/{m.t}g</span>
              </div>
              <div className="h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                <div className={`h-full ${m.c}`} style={{ width: `${Math.min(100, (m.v / m.t) * 100)}%` }} />
              </div>
            </div>
          ))}
        </div>
      </button>

      {/* Body Quick View */}
      <button onClick={() => setTab('body')} className="w-full text-left bg-neutral-900 border border-neutral-800 rounded-2xl p-5 mb-3 active:bg-neutral-800 transition-all">
        <div className="flex justify-between items-start">
          <div>
            <div className="text-xs text-neutral-500 font-bold tracking-widest uppercase mb-1">Body</div>
            <div className="flex items-baseline gap-2">
              <span className="display text-4xl">{u.w(displayWeight, wSys)}</span>
              <span className="text-neutral-500 mono text-sm">{u.wLabel(wSys)}</span>
              {latestBody?.[1]?.bodyFat && (
                <span className="text-neutral-500 mono text-sm ml-2">{latestBody[1].bodyFat}% BF</span>
              )}
            </div>
          </div>
          <ChevronRight className="text-neutral-600" />
        </div>
      </button>

      {/* Motivation */}
      <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-5 mt-4">
        <div className="text-xs text-neutral-500 font-bold tracking-widest uppercase mb-2">From the Book</div>
        <div className="text-sm text-neutral-300 italic leading-relaxed">"{quote}"</div>
      </div>
    </div>
  );
}

// ============================================================
// WORKOUT VIEW
// ============================================================
function WorkoutView({ profile, workouts, saveWorkouts, updateStreak, cardio, saveCardio, onOpenGuide }) {
  const [viewDay, setViewDay] = useState(dayOfWeek());
  const [expandedIdx, setExpandedIdx] = useState(null);
  const [showCardioForm, setShowCardioForm] = useState(false);
  const today = todayKey();
  const isToday = viewDay === dayOfWeek();
  const targetDateKey = isToday ? today : null;
  const workout = BLS_SPLIT[viewDay];
  const wSys = profile.units?.weight || 'lbs';
  const dSys = profile.units?.distance || 'mi';

  // Initialize today's log if not exists
  const dayLog = targetDateKey ? (workouts[targetDateKey] || {
    completed: false,
    workoutName: workout.name,
    exercises: workout.exercises.map(ex => ({
      name: ex.name,
      sets: Array.from({ length: ex.sets }, () => ({ weight: '', reps: '', done: false })),
    })),
  }) : null;

  const updateSet = async (exIdx, setIdx, field, value) => {
    if (!targetDateKey) return;
    const updated = { ...workouts };
    if (!updated[targetDateKey]) updated[targetDateKey] = dayLog;
    updated[targetDateKey].exercises[exIdx].sets[setIdx][field] = value;
    await saveWorkouts(updated);
  };

  const toggleSet = async (exIdx, setIdx) => {
    if (!targetDateKey) return;
    const updated = { ...workouts };
    if (!updated[targetDateKey]) updated[targetDateKey] = dayLog;
    updated[targetDateKey].exercises[exIdx].sets[setIdx].done = !updated[targetDateKey].exercises[exIdx].sets[setIdx].done;
    await saveWorkouts(updated);
  };

  const completeWorkout = async () => {
    if (!targetDateKey) return;
    const updated = { ...workouts };
    if (!updated[targetDateKey]) updated[targetDateKey] = dayLog;
    updated[targetDateKey].completed = !updated[targetDateKey].completed;
    await saveWorkouts(updated);
    if (updated[targetDateKey].completed) await updateStreak();
  };

  const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const todayDow = dayOfWeek();

  return (
    <div className="px-5 pt-12">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="text-xs text-neutral-500 font-bold tracking-widest uppercase">Training</div>
          <h1 className="display text-4xl mt-1 leading-none">{workout.name.toUpperCase()}</h1>
          <div className="text-lime-400 text-xs font-bold tracking-widest mt-1">{workout.tag}</div>
        </div>
        <button
          onClick={onOpenGuide}
          className="flex-shrink-0 bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 flex items-center gap-1.5 active:bg-neutral-800"
        >
          <Info size={14} className="text-lime-400" />
          <span className="text-[10px] font-bold tracking-widest uppercase">Gym Guide</span>
        </button>
      </div>

      {/* Week selector */}
      <div className="flex gap-1.5 mb-6 overflow-x-auto scrollbar-hide -mx-5 px-5">
        {[1,2,3,4,5,6,0].map(d => (
          <button
            key={d}
            onClick={() => setViewDay(d)}
            className={`flex-shrink-0 px-3 py-2 rounded-lg text-xs font-bold tracking-wider transition-all relative ${
              viewDay === d
                ? 'bg-lime-400 text-neutral-950'
                : 'bg-neutral-900 text-neutral-400 border border-neutral-800'
            }`}
          >
            {dayNames[d]}
            {d === todayDow && viewDay !== d && (
              <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-lime-400" />
            )}
          </button>
        ))}
      </div>

      {workout.exercises.length === 0 ? (
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 text-center">
          <Activity size={32} className="mx-auto text-lime-400 mb-3" />
          <div className="display text-2xl mb-2">RECOVERY DAY</div>
          <div className="text-neutral-400 text-sm">
            Rest, or 25–30 min of HIIT cardio if cutting. Your muscles grow when you rest.
          </div>
        </div>
      ) : (
        <>
          <div className="bg-lime-400/5 border border-lime-400/20 rounded-xl p-3 mb-3 flex items-start gap-2">
            <Info size={14} className="text-lime-400 mt-0.5 flex-shrink-0" />
            <div className="text-xs text-neutral-300 leading-relaxed">
              <span className="text-lime-400 font-bold">New to the gym?</span> Tap any exercise below for full step-by-step instructions, beginner tips, and a link to video demos.
            </div>
          </div>

          <div className="space-y-3">
            {workout.exercises.map((ex, i) => {
              const logEx = dayLog?.exercises[i];
              const details = EXERCISE_DETAILS[ex.name];
              const expanded = expandedIdx === i;
              const ytQuery = encodeURIComponent(`${ex.name} proper form tutorial`);
              return (
                <div key={i} className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setExpandedIdx(expanded ? null : i)}
                    className="w-full text-left p-4 active:bg-neutral-800/50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 pr-3">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-5 h-5 rounded-full bg-neutral-800 flex items-center justify-center text-[10px] mono text-neutral-400 flex-shrink-0">{i + 1}</div>
                          <div className="font-bold text-base leading-tight">{ex.name}</div>
                        </div>
                        <div className="text-xs text-neutral-500 mono ml-7">{ex.sets}×{ex.reps} · rest {ex.rest}</div>
                      </div>
                      <ChevronDown size={20} className={`text-neutral-400 transition-transform mt-1 flex-shrink-0 ${expanded ? 'rotate-180' : ''}`} />
                    </div>
                  </button>

                  {expanded && details && (
                    <div className="px-4 pb-4 border-t border-neutral-800 pt-4 space-y-4 bg-neutral-950/30">
                      <div className="text-xs">
                        <span className="text-[10px] font-bold tracking-widest text-neutral-500 uppercase">Targets · </span>
                        <span className="text-neutral-300">{details.muscles}</span>
                      </div>

                      <a
                        href={`https://www.youtube.com/results?search_query=${ytQuery}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl py-3 px-4 text-xs font-bold uppercase tracking-widest active:bg-red-500/20 transition-colors"
                      >
                        <PlayCircle size={18} /> Watch Form Demos
                      </a>

                      <div>
                        <div className="text-[10px] font-bold tracking-widest text-lime-400 uppercase mb-2">Setup</div>
                        <ol className="space-y-2 text-sm text-neutral-300 leading-relaxed">
                          {details.setup.map((s, j) => (
                            <li key={j} className="flex gap-2.5">
                              <span className="text-neutral-600 mono text-xs mt-0.5 flex-shrink-0">{j + 1}.</span>
                              <span>{s}</span>
                            </li>
                          ))}
                        </ol>
                      </div>

                      <div>
                        <div className="text-[10px] font-bold tracking-widest text-lime-400 uppercase mb-2">How to do it</div>
                        <ol className="space-y-2 text-sm text-neutral-300 leading-relaxed">
                          {details.execution.map((s, j) => (
                            <li key={j} className="flex gap-2.5">
                              <span className="text-neutral-600 mono text-xs mt-0.5 flex-shrink-0">{j + 1}.</span>
                              <span>{s}</span>
                            </li>
                          ))}
                        </ol>
                      </div>

                      <div className="bg-amber-400/5 border border-amber-400/20 rounded-xl p-3">
                        <div className="text-[10px] font-bold tracking-widest text-amber-400 uppercase mb-2 flex items-center gap-1.5">
                          <Lightbulb size={12} /> Beginner Tips
                        </div>
                        <ul className="space-y-1.5 text-sm text-neutral-300 leading-relaxed">
                          {details.tips.map((s, j) => (
                            <li key={j} className="flex gap-2"><span className="text-amber-400 flex-shrink-0">→</span><span>{s}</span></li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-rose-500/5 border border-rose-500/20 rounded-xl p-3">
                        <div className="text-[10px] font-bold tracking-widest text-rose-400 uppercase mb-2 flex items-center gap-1.5">
                          <AlertTriangle size={12} /> Avoid
                        </div>
                        <ul className="space-y-1.5 text-sm text-neutral-300 leading-relaxed">
                          {details.mistakes.map((s, j) => (
                            <li key={j} className="flex gap-2"><span className="text-rose-400 flex-shrink-0">×</span><span>{s}</span></li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {isToday && logEx && (
                    <div className={`px-4 pb-4 ${expanded ? 'pt-2 border-t border-neutral-800' : 'pt-0'}`}>
                      {expanded && <div className="text-[10px] font-bold tracking-widest text-lime-400 uppercase mb-2 mt-2">Log Your Sets</div>}
                      <div className="space-y-1.5">
                        <div className="flex gap-2 text-[10px] text-neutral-500 font-bold tracking-wider uppercase px-1">
                          <div className="w-8">Set</div>
                          <div className="flex-1">Weight ({u.wLabel(wSys)})</div>
                          <div className="flex-1">Reps</div>
                          <div className="w-8"></div>
                        </div>
                        {logEx.sets.map((s, si) => (
                          <div key={si} className="flex gap-2 items-center">
                            <div className="w-8 text-center text-neutral-500 mono text-sm">{si + 1}</div>
                            <input
                              type="number"
                              inputMode="decimal"
                              value={s.weight}
                              onChange={(e) => updateSet(i, si, 'weight', e.target.value)}
                              placeholder="lbs"
                              className="flex-1 bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm focus:border-lime-400 focus:outline-none mono"
                            />
                            <input
                              type="number"
                              inputMode="numeric"
                              value={s.reps}
                              onChange={(e) => updateSet(i, si, 'reps', e.target.value)}
                              placeholder="reps"
                              className="flex-1 bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm focus:border-lime-400 focus:outline-none mono"
                            />
                            <button
                              onClick={() => toggleSet(i, si)}
                              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                                s.done ? 'bg-lime-400 text-neutral-950' : 'bg-neutral-800 text-neutral-600'
                              }`}
                            >
                              <Check size={16} strokeWidth={3} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {isToday && (
            <button
              onClick={completeWorkout}
              className={`w-full mt-4 py-4 rounded-xl font-bold uppercase tracking-wider transition-all ${
                dayLog?.completed
                  ? 'bg-neutral-800 text-lime-400 border border-lime-400/30'
                  : 'bg-lime-400 text-neutral-950'
              }`}
            >
              {dayLog?.completed ? '✓ Workout Complete' : 'Mark Workout Complete'}
            </button>
          )}

          {!isToday && (
            <div className="text-center text-xs text-neutral-500 mt-6 px-4">
              Preview only. Switch to today's split to log your sets and add to your streak.
            </div>
          )}
        </>
      )}

      {/* Additional Activity — Cardio / Sports (always available today) */}
      {isToday && (
        <CardioSection cardio={cardio} saveCardio={saveCardio} dSys={dSys} />
      )}
    </div>
  );
}

// ============================================================
// CARDIO SECTION — Log cardio/sports in addition to BLS plan
// ============================================================
function CardioSection({ cardio, saveCardio, dSys }) {
  const today = todayKey();
  const todayList = cardio[today] || [];
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState(null);
  const [duration, setDuration] = useState('');
  const [distance, setDistance] = useState('');
  const [notes, setNotes] = useState('');

  const reset = () => {
    setSelected(null);
    setDuration('');
    setDistance('');
    setNotes('');
    setShowForm(false);
  };

  const add = async () => {
    if (!selected || !duration) return;
    const activity = CARDIO_ACTIVITIES.find(a => a.id === selected);
    const entry = {
      id: Date.now(),
      activity: selected,
      duration: Number(duration),
      distance: activity.hasDistance && distance ? Number(distance) : null,
      distanceUnit: activity.hasDistance && distance ? dSys : null,
      notes: notes.trim() || null,
    };
    const updated = { ...cardio };
    if (!updated[today]) updated[today] = [];
    updated[today] = [...updated[today], entry];
    await saveCardio(updated);
    reset();
  };

  const remove = async (id) => {
    const updated = { ...cardio };
    updated[today] = (updated[today] || []).filter(a => a.id !== id);
    await saveCardio(updated);
  };

  const selectedActivity = CARDIO_ACTIVITIES.find(a => a.id === selected);

  return (
    <div className="mt-8 pt-6 border-t border-neutral-800">
      <div className="mb-3">
        <div className="text-xs text-sky-400 font-bold tracking-widest uppercase">+ Bonus Activity</div>
        <div className="text-[11px] text-neutral-500 mt-0.5">Cardio or sports — on top of your BLS plan</div>
      </div>

      {todayList.length > 0 && (
        <div className="space-y-2 mb-3">
          {todayList.map(act => {
            const meta = CARDIO_ACTIVITIES.find(a => a.id === act.activity) || { name: act.activity, tag: 'OTHER' };
            return (
              <div key={act.id} className="bg-neutral-900 border border-neutral-800 rounded-xl p-3 flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold tracking-widest text-sky-400 bg-sky-400/10 px-1.5 py-0.5 rounded">{meta.tag}</span>
                    <span className="font-bold text-sm truncate">{meta.name}</span>
                  </div>
                  <div className="text-xs text-neutral-500 mono mt-1">
                    {act.duration} min
                    {act.distance ? ` · ${act.distance} ${act.distanceUnit}` : ''}
                  </div>
                  {act.notes && <div className="text-xs text-neutral-400 mt-1 italic">"{act.notes}"</div>}
                </div>
                <button onClick={() => remove(act.id)} className="text-neutral-600 p-2 flex-shrink-0">
                  <Trash2 size={14} />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="w-full bg-neutral-900 border border-dashed border-sky-400/40 text-sky-400 py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-wider active:bg-sky-400/5"
        >
          <Plus size={16} strokeWidth={3} /> Log Activity
        </button>
      ) : (
        <div className="bg-neutral-900 border border-sky-400/30 rounded-2xl p-4">
          {!selected ? (
            <>
              <div className="text-xs font-bold tracking-widest text-sky-400 uppercase mb-3">Choose Activity</div>
              <div className="grid grid-cols-2 gap-2">
                {CARDIO_ACTIVITIES.map(act => (
                  <button
                    key={act.id}
                    onClick={() => setSelected(act.id)}
                    className="bg-neutral-800 border border-neutral-700 rounded-xl p-3 text-left active:bg-neutral-700"
                  >
                    <div className="text-[10px] font-bold tracking-widest text-sky-400">{act.tag}</div>
                    <div className="font-bold text-sm mt-1">{act.name}</div>
                  </button>
                ))}
              </div>
              <button onClick={reset} className="w-full mt-3 py-2 text-xs text-neutral-500 uppercase tracking-wider">Cancel</button>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-[10px] font-bold tracking-widest text-sky-400">{selectedActivity.tag}</div>
                  <div className="font-bold">{selectedActivity.name}</div>
                </div>
                <button onClick={() => setSelected(null)} className="text-xs text-neutral-500">Change</button>
              </div>
              <div className="space-y-2">
                <div className="relative">
                  <input
                    autoFocus
                    type="number"
                    inputMode="numeric"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="Duration"
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2.5 text-sm focus:border-sky-400 focus:outline-none mono pr-12"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-500 mono">min</span>
                </div>
                {selectedActivity.hasDistance && (
                  <div className="relative">
                    <input
                      type="number"
                      inputMode="decimal"
                      value={distance}
                      onChange={(e) => setDistance(e.target.value)}
                      placeholder={`Distance (optional)`}
                      className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2.5 text-sm focus:border-sky-400 focus:outline-none mono pr-12"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-500 mono">{u.dLabel(dSys)}</span>
                  </div>
                )}
                <input
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Notes (optional)"
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2.5 text-sm focus:border-sky-400 focus:outline-none"
                />
              </div>
              <div className="flex gap-2 mt-3">
                <button onClick={reset} className="flex-1 py-2.5 rounded-lg bg-neutral-800 text-neutral-400 text-sm font-bold uppercase tracking-wider">Cancel</button>
                <button onClick={add} disabled={!duration} className="flex-1 py-2.5 rounded-lg bg-sky-400 text-neutral-950 text-sm font-bold uppercase tracking-wider disabled:bg-neutral-700 disabled:text-neutral-500">Log</button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

// ============================================================
// FOOD VIEW
// ============================================================
function FoodView({ profile, food, saveFood }) {
  const today = todayKey();
  const macros = calculateMacros(profile.weight, profile.phase);
  const entries = food[today]?.entries || [];
  const [adding, setAdding] = useState(false);
  const [newEntry, setNewEntry] = useState({ name: '', grams: '', calories: '', protein: '', carbs: '', fat: '' });

  const consumed = entries.reduce((acc, e) => ({
    cal: acc.cal + (Number(e.calories) || 0),
    p: acc.p + (Number(e.protein) || 0),
    c: acc.c + (Number(e.carbs) || 0),
    f: acc.f + (Number(e.fat) || 0),
  }), { cal: 0, p: 0, c: 0, f: 0 });

  const addEntry = async () => {
    if (!newEntry.name.trim()) return;
    const updated = { ...food };
    if (!updated[today]) updated[today] = { entries: [] };
    updated[today].entries.push({ ...newEntry, id: Date.now() });
    await saveFood(updated);
    setNewEntry({ name: '', grams: '', calories: '', protein: '', carbs: '', fat: '' });
    setAdding(false);
  };

  const removeEntry = async (id) => {
    const updated = { ...food };
    updated[today].entries = updated[today].entries.filter(e => e.id !== id);
    await saveFood(updated);
  };

  return (
    <div className="px-5 pt-12">
      <div className="mb-6">
        <div className="text-xs text-neutral-500 font-bold tracking-widest uppercase">Fuel · {profile.phase.toUpperCase()} PHASE</div>
        <h1 className="display text-4xl mt-1">NUTRITION</h1>
      </div>

      {/* Calorie hero */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 mb-3">
        <div className="flex items-baseline justify-between mb-2">
          <div className="display text-5xl">{Math.round(consumed.cal)}</div>
          <div className="text-neutral-500 mono text-sm">/ {macros.calories} cal</div>
        </div>
        <div className="h-2 bg-neutral-800 rounded-full overflow-hidden mb-1">
          <div className="h-full bg-lime-400" style={{ width: `${Math.min(100, (consumed.cal / macros.calories) * 100)}%` }} />
        </div>
        <div className="text-xs text-neutral-500 mono">
          {Math.max(0, macros.calories - Math.round(consumed.cal))} cal remaining
        </div>
      </div>

      {/* Macros */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[
          { l: 'PROTEIN', v: consumed.p, t: macros.protein, c: 'bg-rose-400', tc: 'text-rose-400' },
          { l: 'CARBS', v: consumed.c, t: macros.carbs, c: 'bg-amber-400', tc: 'text-amber-400' },
          { l: 'FAT', v: consumed.f, t: macros.fat, c: 'bg-sky-400', tc: 'text-sky-400' },
        ].map(m => (
          <div key={m.l} className="bg-neutral-900 border border-neutral-800 rounded-xl p-3">
            <div className={`text-[10px] font-bold tracking-widest ${m.tc}`}>{m.l}</div>
            <div className="display text-2xl mt-1">{Math.round(m.v)}<span className="text-sm text-neutral-500 mono">/{m.t}</span></div>
            <div className="h-1 bg-neutral-800 rounded-full overflow-hidden mt-2">
              <div className={`h-full ${m.c}`} style={{ width: `${Math.min(100, (m.v / m.t) * 100)}%` }} />
            </div>
          </div>
        ))}
      </div>

      {/* Add button */}
      {!adding && (
        <button
          onClick={() => setAdding(true)}
          className="w-full bg-lime-400 text-neutral-950 font-bold py-3 rounded-xl mb-4 flex items-center justify-center gap-2 uppercase tracking-wider text-sm"
        >
          <Plus size={18} strokeWidth={3} /> Log Food
        </button>
      )}

      {adding && (
        <div className="bg-neutral-900 border border-lime-400/30 rounded-2xl p-4 mb-4">
          <input
            autoFocus
            value={newEntry.name}
            onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
            placeholder="Food name (e.g. Chicken breast)"
            className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2.5 text-sm mb-2 focus:border-lime-400 focus:outline-none"
          />
          <div className="relative mb-2">
            <input
              type="number"
              inputMode="decimal"
              value={newEntry.grams}
              onChange={(e) => setNewEntry({ ...newEntry, grams: e.target.value })}
              placeholder="Portion size (optional)"
              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2.5 text-sm focus:border-lime-400 focus:outline-none mono pr-12"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-500 mono">g</span>
          </div>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <input type="number" inputMode="decimal" value={newEntry.calories} onChange={(e) => setNewEntry({ ...newEntry, calories: e.target.value })} placeholder="Calories" className="bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2.5 text-sm focus:border-lime-400 focus:outline-none mono" />
            <input type="number" inputMode="decimal" value={newEntry.protein} onChange={(e) => setNewEntry({ ...newEntry, protein: e.target.value })} placeholder="Protein (g)" className="bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2.5 text-sm focus:border-lime-400 focus:outline-none mono" />
            <input type="number" inputMode="decimal" value={newEntry.carbs} onChange={(e) => setNewEntry({ ...newEntry, carbs: e.target.value })} placeholder="Carbs (g)" className="bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2.5 text-sm focus:border-lime-400 focus:outline-none mono" />
            <input type="number" inputMode="decimal" value={newEntry.fat} onChange={(e) => setNewEntry({ ...newEntry, fat: e.target.value })} placeholder="Fat (g)" className="bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2.5 text-sm focus:border-lime-400 focus:outline-none mono" />
          </div>
          <div className="flex gap-2">
            <button onClick={() => { setAdding(false); setNewEntry({ name: '', grams: '', calories: '', protein: '', carbs: '', fat: '' }); }} className="flex-1 py-2.5 rounded-lg bg-neutral-800 text-neutral-400 text-sm font-bold uppercase tracking-wider">Cancel</button>
            <button onClick={addEntry} className="flex-1 py-2.5 rounded-lg bg-lime-400 text-neutral-950 text-sm font-bold uppercase tracking-wider">Add</button>
          </div>
        </div>
      )}

      {/* Food log */}
      {entries.length > 0 ? (
        <div className="space-y-2">
          <div className="text-xs text-neutral-500 font-bold tracking-widest uppercase mb-2">Today's Log</div>
          {entries.map(e => (
            <div key={e.id} className="bg-neutral-900 border border-neutral-800 rounded-xl p-3 flex items-center gap-3">
              <div className="flex-1">
                <div className="font-semibold text-sm">
                  {e.name}
                  {e.grams && <span className="text-neutral-500 font-normal"> · {e.grams}g</span>}
                </div>
                <div className="text-xs text-neutral-500 mono mt-0.5">
                  {e.calories || 0} cal · P{e.protein || 0} C{e.carbs || 0} F{e.fat || 0}
                </div>
              </div>
              <button onClick={() => removeEntry(e.id)} className="text-neutral-600 p-2">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        !adding && (
          <div className="text-center text-neutral-500 text-sm mt-8">
            <Apple size={32} className="mx-auto mb-2 opacity-50" />
            <div>No food logged yet today.</div>
            <div className="text-xs mt-2 text-neutral-600">BLS rule: 80% whole foods, 20% flexible.</div>
          </div>
        )
      )}
    </div>
  );
}

// ============================================================
// BODY VIEW
// ============================================================
function BodyView({ body, saveBody, profile, saveProfile }) {
  const today = todayKey();
  const todayLog = body[today] || {};
  const wSys = profile.units?.weight || 'lbs';
  const mSys = profile.units?.measurement || 'in';

  const [vals, setVals] = useState({
    weight: todayLog.weight ? String(u.w(todayLog.weight, wSys)) : '',
    bodyFat: todayLog.bodyFat ? String(todayLog.bodyFat) : '',
    waist: todayLog.waist ? String(u.m(todayLog.waist, mSys)) : '',
    chest: todayLog.chest ? String(u.m(todayLog.chest, mSys)) : '',
    arms: todayLog.arms ? String(u.m(todayLog.arms, mSys)) : '',
    thighs: todayLog.thighs ? String(u.m(todayLog.thighs, mSys)) : '',
  });

  const sortedDates = Object.keys(body).sort((a, b) => b.localeCompare(a));
  const history = sortedDates.slice(0, 10);

  const save = async () => {
    const updated = { ...body };
    updated[today] = {
      weight: vals.weight ? u.wToLbs(vals.weight, wSys) : undefined,
      bodyFat: vals.bodyFat ? Number(vals.bodyFat) : undefined,
      waist: vals.waist ? u.mToIn(vals.waist, mSys) : undefined,
      chest: vals.chest ? u.mToIn(vals.chest, mSys) : undefined,
      arms: vals.arms ? u.mToIn(vals.arms, mSys) : undefined,
      thighs: vals.thighs ? u.mToIn(vals.thighs, mSys) : undefined,
    };
    await saveBody(updated);
    // Also update profile weight (so macros refresh)
    if (vals.weight && Number(vals.weight) > 0) {
      await saveProfile({ ...profile, weight: u.wToLbs(vals.weight, wSys) });
    }
  };

  const fields = [
    { key: 'weight', label: 'Weight', unit: u.wLabel(wSys) },
    { key: 'bodyFat', label: 'Body Fat', unit: '%' },
    { key: 'waist', label: 'Waist', unit: u.mLabel(mSys) },
    { key: 'chest', label: 'Chest', unit: u.mLabel(mSys) },
    { key: 'arms', label: 'Arms', unit: u.mLabel(mSys) },
    { key: 'thighs', label: 'Thighs', unit: u.mLabel(mSys) },
  ];

  return (
    <div className="px-5 pt-12">
      <div className="mb-6">
        <div className="text-xs text-neutral-500 font-bold tracking-widest uppercase">Tracker</div>
        <h1 className="display text-4xl mt-1">BODY VITALS</h1>
      </div>

      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 mb-4">
        <div className="text-xs text-neutral-500 font-bold tracking-widest uppercase mb-3">Log Today</div>
        <div className="grid grid-cols-2 gap-3">
          {fields.map(f => (
            <div key={f.key}>
              <div className="text-xs text-neutral-400 mb-1">{f.label}</div>
              <div className="relative">
                <input
                  type="number"
                  inputMode="decimal"
                  value={vals[f.key]}
                  onChange={(e) => setVals({ ...vals, [f.key]: e.target.value })}
                  placeholder="—"
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2.5 text-sm focus:border-lime-400 focus:outline-none mono pr-12"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-500 mono">{f.unit}</span>
              </div>
            </div>
          ))}
        </div>
        <button onClick={save} className="w-full mt-4 bg-lime-400 text-neutral-950 font-bold py-3 rounded-lg uppercase tracking-wider text-sm">
          Save Entry
        </button>
      </div>

      {history.length > 0 && (
        <div>
          <div className="text-xs text-neutral-500 font-bold tracking-widest uppercase mb-2">History</div>
          <div className="space-y-2">
            {history.map(date => {
              const d = body[date];
              const dateLabel = new Date(date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
              return (
                <div key={date} className="bg-neutral-900 border border-neutral-800 rounded-xl p-3">
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-xs font-bold tracking-wider text-neutral-400 uppercase">{dateLabel}</div>
                    {date === today && <div className="text-[10px] font-bold text-lime-400 tracking-widest">TODAY</div>}
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs mono">
                    {d.weight && <div><span className="text-neutral-500">WT</span> {u.w(d.weight, wSys)}{u.wLabel(wSys)}</div>}
                    {d.bodyFat && <div><span className="text-neutral-500">BF</span> {d.bodyFat}%</div>}
                    {d.waist && <div><span className="text-neutral-500">W</span> {u.m(d.waist, mSys)}{u.mLabel(mSys)}</div>}
                    {d.chest && <div><span className="text-neutral-500">C</span> {u.m(d.chest, mSys)}{u.mLabel(mSys)}</div>}
                    {d.arms && <div><span className="text-neutral-500">A</span> {u.m(d.arms, mSys)}{u.mLabel(mSys)}</div>}
                    {d.thighs && <div><span className="text-neutral-500">T</span> {u.m(d.thighs, mSys)}{u.mLabel(mSys)}</div>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// PROFILE VIEW
// ============================================================
function ProfileView({ profile, saveProfile, streak, onOpenGuide }) {
  const [editing, setEditing] = useState(false);
  const wSys = profile.units?.weight || 'lbs';
  const mSys = profile.units?.measurement || 'in';
  const dSys = profile.units?.distance || 'mi';

  const [form, setForm] = useState({
    name: profile.name,
    weight: String(u.w(profile.weight, wSys)),
    height: String(u.m(profile.height, mSys)),
    age: String(profile.age),
    phase: profile.phase,
    gender: profile.gender,
    units: profile.units || { weight: 'lbs', measurement: 'in', distance: 'mi' },
  });

  const macros = calculateMacros(profile.weight, profile.phase);

  const save = async () => {
    await saveProfile({
      name: form.name,
      gender: form.gender,
      phase: form.phase,
      weight: u.wToLbs(form.weight, form.units.weight),
      height: u.mToIn(form.height, form.units.measurement),
      age: Number(form.age),
      units: form.units,
    });
    setEditing(false);
  };

  const updateUnits = (k, v) => setForm({ ...form, units: { ...form.units, [k]: v } });

  if (editing) {
    return (
      <div className="px-5 pt-12">
        <div className="mb-6">
          <div className="text-xs text-neutral-500 font-bold tracking-widest uppercase">Edit Profile</div>
          <h1 className="display text-4xl mt-1">SETTINGS</h1>
        </div>
        <div className="space-y-3">
          <div>
            <div className="text-xs text-neutral-400 mb-1">Name</div>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2.5 text-sm focus:border-lime-400 focus:outline-none"
            />
          </div>

          <div>
            <div className="text-xs text-neutral-400 mb-1">Weight ({u.wLabel(form.units.weight)})</div>
            <input
              type="number"
              inputMode="decimal"
              value={form.weight}
              onChange={(e) => setForm({ ...form, weight: e.target.value })}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2.5 text-sm focus:border-lime-400 focus:outline-none mono"
            />
          </div>

          <div>
            <div className="text-xs text-neutral-400 mb-1">Height ({u.mLabel(form.units.measurement)})</div>
            <input
              type="number"
              inputMode="decimal"
              value={form.height}
              onChange={(e) => setForm({ ...form, height: e.target.value })}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2.5 text-sm focus:border-lime-400 focus:outline-none mono"
            />
          </div>

          <div>
            <div className="text-xs text-neutral-400 mb-1">Age</div>
            <input
              type="number"
              inputMode="numeric"
              value={form.age}
              onChange={(e) => setForm({ ...form, age: e.target.value })}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2.5 text-sm focus:border-lime-400 focus:outline-none mono"
            />
          </div>

          <div>
            <div className="text-xs text-neutral-400 mb-1">Phase</div>
            <div className="grid grid-cols-3 gap-2">
              {['cut', 'maintain', 'bulk'].map(p => (
                <button key={p} onClick={() => setForm({ ...form, phase: p })} className={`py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider ${form.phase === p ? 'bg-lime-400 text-neutral-950' : 'bg-neutral-900 border border-neutral-800 text-neutral-400'}`}>
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-neutral-800">
            <div className="text-xs text-neutral-500 font-bold tracking-widest uppercase mb-3">Units</div>
            <div className="space-y-3">
              <div>
                <div className="text-xs text-neutral-400 mb-1.5">Weight</div>
                <div className="grid grid-cols-2 gap-2">
                  {['lbs', 'kg'].map(opt => (
                    <button key={opt} onClick={() => {
                      // Convert the current input value when switching
                      const curLbs = u.wToLbs(form.weight, form.units.weight);
                      updateUnits('weight', opt);
                      setForm(f => ({ ...f, units: { ...f.units, weight: opt }, weight: String(u.w(curLbs, opt)) }));
                    }} className={`py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider ${form.units.weight === opt ? 'bg-lime-400 text-neutral-950' : 'bg-neutral-900 border border-neutral-800 text-neutral-400'}`}>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-xs text-neutral-400 mb-1.5">Body measurements</div>
                <div className="grid grid-cols-2 gap-2">
                  {['in', 'cm'].map(opt => (
                    <button key={opt} onClick={() => {
                      const curIn = u.mToIn(form.height, form.units.measurement);
                      setForm(f => ({ ...f, units: { ...f.units, measurement: opt }, height: String(u.m(curIn, opt)) }));
                    }} className={`py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider ${form.units.measurement === opt ? 'bg-lime-400 text-neutral-950' : 'bg-neutral-900 border border-neutral-800 text-neutral-400'}`}>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-xs text-neutral-400 mb-1.5">Distance (cardio)</div>
                <div className="grid grid-cols-2 gap-2">
                  {['mi', 'km'].map(opt => (
                    <button key={opt} onClick={() => updateUnits('distance', opt)} className={`py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider ${form.units.distance === opt ? 'bg-lime-400 text-neutral-950' : 'bg-neutral-900 border border-neutral-800 text-neutral-400'}`}>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-2 pt-3">
            <button onClick={() => setEditing(false)} className="flex-1 py-3 bg-neutral-800 text-neutral-400 rounded-lg font-bold uppercase tracking-wider text-sm">Cancel</button>
            <button onClick={save} className="flex-1 py-3 bg-lime-400 text-neutral-950 rounded-lg font-bold uppercase tracking-wider text-sm">Save</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-5 pt-12">
      <div className="mb-6">
        <div className="text-xs text-neutral-500 font-bold tracking-widest uppercase">Profile</div>
        <h1 className="display text-4xl mt-1">{profile.name.toUpperCase()}</h1>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <StatBox label="Weight" value={u.w(profile.weight, wSys)} unit={u.wLabel(wSys)} />
        <StatBox label="Phase" value={profile.phase.toUpperCase()} accent />
        <StatBox label="Height" value={u.m(profile.height, mSys)} unit={u.mLabel(mSys)} />
        <StatBox label="Age" value={profile.age} />
      </div>

      {/* Streak stats */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 mb-3">
        <div className="text-xs text-neutral-500 font-bold tracking-widest uppercase mb-3 flex items-center gap-2"><Award size={14} /> Achievements</div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="display text-3xl text-lime-400">{streak.current}</div>
            <div className="text-xs text-neutral-500 uppercase tracking-wider mt-1">Current streak</div>
          </div>
          <div>
            <div className="display text-3xl">{streak.longest}</div>
            <div className="text-xs text-neutral-500 uppercase tracking-wider mt-1">Longest streak</div>
          </div>
        </div>
      </div>

      {/* Macros breakdown */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 mb-3">
        <div className="text-xs text-neutral-500 font-bold tracking-widest uppercase mb-3 flex items-center gap-2"><Target size={14} /> Your Daily Targets</div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-neutral-400">Calories</span><span className="mono font-bold">{macros.calories}</span></div>
          <div className="flex justify-between"><span className="text-neutral-400">Protein</span><span className="mono font-bold text-rose-400">{macros.protein}g</span></div>
          <div className="flex justify-between"><span className="text-neutral-400">Carbs</span><span className="mono font-bold text-amber-400">{macros.carbs}g</span></div>
          <div className="flex justify-between"><span className="text-neutral-400">Fat</span><span className="mono font-bold text-sky-400">{macros.fat}g</span></div>
        </div>
        <div className="text-[10px] text-neutral-600 mt-3 leading-relaxed">
          Calculated using BLS formulas for your <span className="text-lime-400">{profile.phase}</span> phase.
        </div>
      </div>

      {/* Gym Guide */}
      <button onClick={onOpenGuide} className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-4 mb-3 text-left flex items-center justify-between active:bg-neutral-800">
        <div className="flex items-center gap-3">
          <Info size={18} className="text-lime-400" />
          <div>
            <div className="font-bold text-sm">Gym Guide</div>
            <div className="text-xs text-neutral-500">Etiquette & first-day tips</div>
          </div>
        </div>
        <ChevronRight className="text-neutral-600" />
      </button>

      <button onClick={() => setEditing(true)} className="w-full bg-neutral-900 border border-neutral-800 text-lime-400 py-3 rounded-xl font-bold uppercase tracking-wider text-sm">
        Edit Profile
      </button>

      <div className="text-center text-[10px] text-neutral-600 mt-6 leading-relaxed">
        Built on the principles of<br/><span className="text-neutral-400 font-bold tracking-widest">BIGGER LEANER STRONGER</span><br/>by Michael Matthews
      </div>
    </div>
  );
}

function StatBox({ label, value, unit, accent }) {
  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4">
      <div className="text-[10px] text-neutral-500 font-bold tracking-widest uppercase">{label}</div>
      <div className={`display text-3xl mt-1 ${accent ? 'text-lime-400' : ''}`}>
        {value}{unit && <span className="text-sm text-neutral-500 mono ml-1">{unit}</span>}
      </div>
    </div>
  );
}

// ============================================================
// GYM GUIDE — First-time etiquette + safety modal
// ============================================================
function GymGuide({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-neutral-950 overflow-y-auto" style={{ fontFamily: '"Manrope", system-ui, sans-serif' }}>
      <div className="max-w-md mx-auto min-h-screen pb-12">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-neutral-950 border-b border-neutral-800 px-5 pt-12 pb-4 flex items-center justify-between">
          <div>
            <div className="text-xs text-lime-400 font-bold tracking-[0.2em] uppercase">First Time? Read This.</div>
            <h1 className="display text-3xl mt-1 leading-none">GYM GUIDE</h1>
          </div>
          <button
            onClick={onClose}
            className="bg-neutral-900 border border-neutral-800 rounded-full w-10 h-10 flex items-center justify-center active:bg-neutral-800"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Intro */}
        <div className="px-5 pt-4 pb-2">
          <p className="text-sm text-neutral-400 leading-relaxed">
            Nobody is born knowing this. Read it once before your first session and you'll walk in looking like you've been here all along.
          </p>
        </div>

        {/* Sections */}
        <div className="px-5 space-y-4 mt-4">
          {GYM_ETIQUETTE.map((section, i) => (
            <div key={i} className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-full bg-lime-400 text-neutral-950 flex items-center justify-center text-xs font-bold mono">{i + 1}</div>
                <div className="display text-xl tracking-wide">{section.title.toUpperCase()}</div>
              </div>
              <ul className="space-y-2.5">
                {section.items.map((item, j) => (
                  <li key={j} className="flex gap-2.5 text-sm text-neutral-300 leading-relaxed">
                    <span className="text-lime-400 flex-shrink-0 mt-0.5">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Closing reassurance */}
          <div className="bg-lime-400/5 border border-lime-400/20 rounded-2xl p-4 mt-4">
            <div className="display text-xl mb-2 text-lime-400">DAY ONE.</div>
            <p className="text-sm text-neutral-300 leading-relaxed">
              Walk in, find a spot, warm up, do your sets, re-rack, leave. You don't have to lift heavy on day one. The strongest people in the room respect anyone showing up and putting in honest work.
            </p>
            <p className="text-sm text-neutral-400 leading-relaxed mt-2">
              Tap any exercise in your workout for full instructions. You've got everything you need.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-full bg-lime-400 text-neutral-950 font-bold py-4 rounded-xl mt-2 uppercase tracking-wider text-sm"
          >
            Got it. Let's Train.
          </button>
        </div>
      </div>
    </div>
  );
}
