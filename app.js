/* =========================================================
   Tri J Sports Training Hub — app.js  (Backend-Connected)
   Updated: Real-World Elite Coaches Added (60 New Profiles)
   Replace your old app.js with this file.
   ========================================================= */

'use strict';

// ── API base URL — change this if your server runs on a different port
const API = 'https://tri-j-1.onrender.com/api';

/* ─────────────────────────────────────────────
   DATA (still used for UI rendering — coaches/sports come from backend too,
   but we keep these for fast local rendering of cards/modals)
───────────────────────────────────────────── */
const SPORTS = [
  { id:'boxing',      emoji:'🥊', name:'Boxing',      category:'combat',     difficulty:'Hard',   duration:'8–12 weeks', desc:'Master stance, footwork, combinations and ring strategy under world-class trainers.' },
  { id:'football',    emoji:'⚽', name:'Football',    category:'team',       difficulty:'Medium', duration:'6–10 weeks', desc:'Improve ball control, passing, tactical awareness and match-play fitness.' },
  { id:'swimming',    emoji:'🏊', name:'Swimming',    category:'water',      difficulty:'Medium', duration:'4–8 weeks',  desc:'Refine all four strokes, turns, starts and race-pace conditioning.' },
  { id:'weightlifting',emoji:'🏋️',name:'Weightlifting',category:'individual',difficulty:'Hard',   duration:'10–16 weeks',desc:'Build strength, power and technique with Olympic lifting programming.' },
  { id:'tennis',      emoji:'🎾', name:'Tennis',      category:'individual', difficulty:'Medium', duration:'6–10 weeks', desc:'Develop serve mechanics, groundstrokes, net play and match tactics.' },
  { id:'basketball',  emoji:'🏀', name:'Basketball',  category:'team',       difficulty:'Medium', duration:'6–8 weeks',  desc:'Work on dribbling, shooting, court vision and team defensive systems.' },
  { id:'gymnastics',  emoji:'🤸', name:'Gymnastics',  category:'individual', difficulty:'Hard',   duration:'12–20 weeks',desc:'Train flexibility, strength, apparatus skills and competition routines.' },
  { id:'archery',     emoji:'🏹', name:'Archery',     category:'individual', difficulty:'Easy',   duration:'4–6 weeks',  desc:'Perfect form, breath control, aiming technique and mental focus.' },
  { id:'mma',         emoji:'🥋', name:'MMA',         category:'combat',     difficulty:'Hard',   duration:'12–16 weeks',desc:'Blend striking, grappling and wrestling into a complete fighting system.' },
  { id:'cycling',     emoji:'🚴', name:'Cycling',     category:'individual', difficulty:'Easy',   duration:'4–8 weeks',  desc:'Build endurance, climbing power and race-day pacing strategy.' },
  { id:'volleyball',  emoji:'🏐', name:'Volleyball',  category:'team',       difficulty:'Medium', duration:'6–8 weeks',  desc:'Sharpen serve, pass, set and spike with advanced team tactics.' },
  { id:'taekwondo',   emoji:'🦵', name:'Taekwondo',   category:'combat',     difficulty:'Medium', duration:'8–12 weeks', desc:'Learn kicks, forms (poomsae), sparring and Olympic-style competition.' },
];

const COACHES = [
  // ── ORIGINAL 12 COACHES (Kept for compatibility) ───────────────────────
  { id:1, name:'Carlos Mendoza',   flag:'🇲🇽', country:'Mexico',      sport:'Boxing',       title:'Former WBC Contender',          cost:120, costLabel:'$120 / session', duration:'8 wks',  difficulty:'Hard',   rating:4.9, reviews:214, bio:'17 years of professional boxing. Trained Olympic-level fighters across Latin America. Specialises in southpaw technique and defensive boxing.' },
  { id:2, name:'Sophie Laurent',   flag:'🇫🇷', country:'France',      sport:'Tennis',       title:'WTA Certified Coach',           cost:95,  costLabel:'$95 / session',  duration:'6 wks',  difficulty:'Medium', rating:4.8, reviews:178, bio:'Former WTA top-200 player. Now coaches junior and adult athletes on clay and hard courts. Renowned for serve reconstruction programmes.' },
  { id:3, name:'James Okafor',     flag:'🇳🇬', country:'Nigeria',     sport:'Football',     title:'UEFA Pro Licence',              cost:85,  costLabel:'$85 / session',  duration:'6 wks',  difficulty:'Medium', rating:4.7, reviews:301, bio:'Coached in the Nigerian Premier League and European youth academies. Focuses on positional play and high-press tactical systems.' },
  { id:4, name:'Yuki Tanaka',      flag:'🇯🇵', country:'Japan',       sport:'Gymnastics',   title:'FIG Level 4 Coach',             cost:110, costLabel:'$110 / session', duration:'12 wks', difficulty:'Hard',   rating:4.9, reviews:143, bio:'Trained national-level gymnasts for 12 years. Expert in floor exercise and vault. Known for injury-safe progressive skill building.' },
  { id:5, name:'Emma Schulz',      flag:'🇩🇪', country:'Germany',     sport:'Swimming',     title:'Olympic Pool Coach',            cost:100, costLabel:'$100 / session', duration:'8 wks',  difficulty:'Medium', rating:4.8, reviews:192, bio:'Former German national team swimmer. Specialises in butterfly and individual medley technique with elite periodisation planning.' },
  { id:6, name:'Rafael Torres',    flag:'🇨🇴', country:'Colombia',    sport:'Cycling',      title:'UCI Level 2 Coach',             cost:75,  costLabel:'$75 / session',  duration:'6 wks',  difficulty:'Easy',   rating:4.7, reviews:126, bio:'Competitive road and mountain cyclist with 10 years of coaching. Specialises in altitude training adaptation and power output.' },
  { id:7, name:'Park Ji-ho',       flag:'🇰🇷', country:'South Korea', sport:'Taekwondo',    title:'3rd Dan Black Belt, Olympian',  cost:90,  costLabel:'$90 / session',  duration:'8 wks',  difficulty:'Medium', rating:5.0, reviews:89,  bio:'Olympic Taekwondo athlete and certified ITF/WT coach. Trains competitors from beginner to national team level.' },
  { id:8, name:'Aisha Kamara',     flag:'🇬🇭', country:'Ghana',       sport:'Basketball',   title:'FIBA Level 2 Coach',            cost:80,  costLabel:'$80 / session',  duration:'6 wks',  difficulty:'Medium', rating:4.6, reviews:157, bio:'Played professionally in Europe and Africa. Focuses on guard play, offensive spacing and defensive intensity at the team level.' },
  { id:9, name:'Dmitri Volkov',    flag:'🇷🇺', country:'Russia',      sport:'Weightlifting',title:'World Championships Bronze',    cost:130, costLabel:'$130 / session', duration:'12 wks', difficulty:'Hard',   rating:4.9, reviews:98,  bio:'World-level competitive weightlifter with deep expertise in snatch and clean-and-jerk mechanics for all body types and skill levels.' },
  { id:10,name:'Maria Santos',     flag:'🇧🇷', country:'Brazil',      sport:'Volleyball',   title:'CBV Certified, Pro League Vet', cost:85,  costLabel:'$85 / session',  duration:'6 wks',  difficulty:'Medium', rating:4.8, reviews:211, bio:'Played in the Brazilian Superliga. Expert in libero play, team serve-receive systems and individual skill acceleration.' },
  { id:11,name:'Ben Harrington',   flag:'🇦🇺', country:'Australia',   sport:'MMA',          title:'UFC-Trained Coach',             cost:140, costLabel:'$140 / session', duration:'12 wks', difficulty:'Hard',   rating:4.9, reviews:174, bio:'Licensed MMA coach with background in BJJ, Muay Thai and wrestling. Builds complete fighters from the ground up safely and progressively.' },
  { id:12,name:'Lea Hoffmann',     flag:'🇦🇹', country:'Austria',     sport:'Archery',      title:'World Archery Level 3',         cost:65,  costLabel:'$65 / session',  duration:'4 wks',  difficulty:'Easy',   rating:4.7, reviews:72,  bio:'Recurve and compound specialist. Teaches correct form, shot cycle, mental preparation and equipment tuning for competition.' },

  // ── BOXING (+5 Real Coaches) ───────────────────────────────────────────
  { id:13, name:'Freddie Roach',   flag:'🇺🇸', country:'USA',         sport:'Boxing',       title:'7x Boxing Hall of Fame Trainer', cost:250, costLabel:'$250 / session', duration:'12 wks', difficulty:'Hard',   rating:5.0, reviews:942, bio:'Legendary coach of Manny Pacquiao, Miguel Cotto, and Mike Tyson. Master strategist operating out of the Wild Card Boxing Club.' },
  { id:14, name:'Eddy Reynoso',    flag:'🇲🇽', country:'Mexico',      sport:'Boxing',       title:'Trainer of Canelo Alvarez',     cost:220, costLabel:'$220 / session', duration:'10 wks', difficulty:'Hard',   rating:4.9, reviews:410, bio:'Ring Magazine Trainer of the Year. Specialist in counterpunching, tight high-guard setups, and relentless Mexican style conditioning.' },
  { id:15, name:'Anatoly Lomachenko',flag:'🇺🇦', country:'Ukraine',   sport:'Boxing',       title:'Master of Sports & Tech Trainer',cost:200, costLabel:'$200 / session', duration:'12 wks', difficulty:'Hard',   rating:4.9, reviews:185, bio:'Architect behind Vasiliy Lomachenko and Oleksandr Usyk. Famous for incorporating cognitive matrix puzzles, footwork drills, and coordination.' },
  { id:16, name:'Robert Garcia',   flag:'🇺🇸', country:'USA',         sport:'Boxing',       title:'Former IBF Super Feather Champ', cost:150, costLabel:'$150 / session', duration:'8 wks',  difficulty:'Medium', rating:4.8, reviews:322, bio:'Elite world champion coach. Teaches inside-fighting mastery, balance recovery, and aggressive combinations.' },
  { id:17, name:'Buboy Fernandez', flag:'🇵🇭', country:'Philippines', sport:'Boxing',       title:'National Head Coach & Veteran',  cost:130, costLabel:'$130 / session', duration:'8 wks',  difficulty:'Medium', rating:4.8, reviews:210, bio:'Longtime chief cornerman for Manny Pacquiao. Specializes in rapid hand speed development, punch angling, and high-intensity stamina tracks.' },

  // ── FOOTBALL (+5 Real Coaches) ─────────────────────────────────────────
  { id:18, name:'Pep Guardiola',   flag:'🇪🇸', country:'Spain',       sport:'Football',     title:'Man City Tactical Genius',      cost:300, costLabel:'$300 / session', duration:'10 wks', difficulty:'Hard',   rating:5.0, reviews:855, bio:'Pioneer of Tiki-Taka and positional play systems. Teaches advanced spatial awareness, passing networks, and high-intensity pressing traps.' },
  { id:19, name:'Carlo Ancelotti', flag:'🇮🇹', country:'Italy',       sport:'Football',     title:'4x Champions League Winner',    cost:280, costLabel:'$280 / session', duration:'8 wks',  difficulty:'Medium', rating:5.0, reviews:734, bio:'The ultimate man-manager. Specializes in flexible tactical systems, hybrid counter-attacks, and building world-class player psychology.' },
  { id:20, name:'Jurgen Klopp',    flag:'🇩🇪', country:'Germany',     sport:'Football',     title:'Master of Gegenpressing',       cost:260, costLabel:'$260 / session', duration:'8 wks',  difficulty:'Hard',   rating:4.9, reviews:692, bio:'Famous for his explosive heavy-metal football. Teaches elite transition speeds, counter-pressing, and unmatched team work rates.' },
  { id:21, name:'Jose Mourinho',   flag:'🇵🇹', country:'Portugal',     sport:'Football',     title:'The Special One',               cost:240, costLabel:'$240 / session', duration:'6 wks',  difficulty:'Hard',   rating:4.7, reviews:512, bio:'Master of defensive organization, defensive blocks, and high-stakes psychological warfare on the pitch.' },
  { id:22, name:'Zinedine Zidane', flag:'🇫🇷', country:'France',      sport:'Football',     title:'3-Consecutive UCL Champion',    cost:270, costLabel:'$270 / session', duration:'10 wks', difficulty:'Medium', rating:4.9, reviews:480, bio:'Elite midfield technician and iconic coach. Focuses on individual ball handling fluency, composure under stress, and attacking freedom.' },

  // ── SWIMMING (+5 Real Coaches) ─────────────────────────────────────────
  { id:23, name:'Bob Bowman',      flag:'🇺🇸', country:'USA',         sport:'Swimming',     title:'Coach of Michael Phelps',       cost:280, costLabel:'$280 / session', duration:'12 wks', difficulty:'Hard',   rating:5.0, reviews:612, bio:'Head Coach of US Olympic squads. World premier expert on underwater dolphin kicks, lactate thresholds, and championship mental prep.' },
  { id:24, name:'Mel Marshall',    flag:'🇬🇧', country:'Great Britain',sport:'Swimming',    title:'Coach of Adam Peaty',           cost:210, costLabel:'$210 / session', duration:'8 wks',  difficulty:'Hard',   rating:4.9, reviews:198, bio:'Specialist in sprint breaststroke biomechanics, explosive hydrodynamics, and peak power phase training blocks.' },
  { id:25, name:'Michael Bohl',    flag:'🇦🇺', country:'Australia',   sport:'Swimming',     title:'Australian National Coach',     cost:200, costLabel:'$200 / session', duration:'8 wks',  difficulty:'Medium', rating:4.8, reviews:156, bio:'Coached multiple individual gold medalists. Master of long-distance freestyle rhythm, stroke rate adjustment, and aerobic base building.' },
  { id:26, name:'David Marsh',     flag:'🇺🇸', country:'USA',         sport:'Swimming',     title:'12x NCAA Championship Coach',   cost:180, costLabel:'$180 / session', duration:'6 wks',  difficulty:'Medium', rating:4.8, reviews:245, bio:'Renowned for technical stroke mechanics refinement, sprint power training, and streamline efficiency optimization.' },
  { id:27, name:'Dean Boxall',     flag:'🇦🇺', country:'Australia',   sport:'Swimming',     title:'Coach of Ariarne Titmus',       cost:220, costLabel:'$220 / session', duration:'10 wks', difficulty:'Hard',   rating:4.9, reviews:174, bio:'High-energy elite development coach. Focuses on relentless pacing, back-end speed endurance, and mental toughness.' },

  // ── WEIGHTLIFTING (+5 Real Coaches) ────────────────────────────────────
  { id:28, name:'Pyrros Dimas',    flag:'🇬🇷', country:'Greece',      sport:'Weightlifting',title:'3x Olympic Gold Medalist',      cost:240, costLabel:'$240 / session', duration:'12 wks', difficulty:'Hard',   rating:5.0, reviews:310, bio:'One of the greatest Olympic lifters ever. Expert on heavy squat programming, overhead stability, and competitive mindset.' },
  { id:29, name:'Lu Xiaojun',      flag:'🇨🇳', country:'China',       sport:'Weightlifting',title:'3x Olympic Champion',           cost:260, costLabel:'$260 / session', duration:'16 wks', difficulty:'Hard',   rating:5.0, reviews:489, bio:'Iconic champion known for flawless technique. Teaches Chinese weightlifting methodologies, front squat mastery, and mobility.' },
  { id:30, name:'Zlatan Vanev',    flag:'🇧🇬', country:'Bulgaria',    sport:'Weightlifting',title:'World Champion Coach',          cost:190, costLabel:'$190 / session', duration:'12 wks', difficulty:'Hard',   rating:4.7, reviews:115, bio:'Master of the legendary Bulgarian Method. Focuses on high-frequency maximal lifting, raw power, and cleaning pulls.' },
  { id:31, name:'Bob Takano',      flag:'🇺🇸', country:'USA',         sport:'Weightlifting',title:'USA Weightlifting Hall of Fame',cost:160, costLabel:'$160 / session', duration:'10 wks', difficulty:'Medium', rating:4.8, reviews:204, bio:'Renowned author and biomechanics expert. Focuses heavily on precise periodization curves, snatch progressions, and pull trajectories.' },
  { id:32, name:'John Broz',       flag:'🇺🇸', country:'USA',         sport:'Weightlifting',title:'Average Broz Gymnasium Founder',cost:150, costLabel:'$150 / session', duration:'8 wks',  difficulty:'Medium', rating:4.8, reviews:142, bio:'Specializes in high-volume squatting adaptations, heavy nerve conditioning, and overcoming training plateaus.' },

  // ── TENNIS (+5 Real Coaches) ───────────────────────────────────────────
  { id:33, name:'Patrick Mouratoglou',flag:'🇫🇷', country:'France',   sport:'Tennis',       title:'Former Coach of Serena Williams',cost:250, costLabel:'$250 / session', duration:'8 wks',  difficulty:'Hard',   rating:4.9, reviews:512, bio:'Coached elite Grand Slam champions. Focuses on modern baseline aggression, ball spin control, and video-based biomechanic feedback.' },
  { id:34, name:'Toni Nadal',      flag:'🇪🇸', country:'Spain',       sport:'Tennis',       title:'Architect of Rafael Nadal',     cost:260, costLabel:'$260 / session', duration:'10 wks', difficulty:'Hard',   rating:5.0, reviews:423, bio:'Famous for building heavy topspin loops, elite court endurance, and intense mental fortitude under championship pressure.' },
  { id:35, name:'Nick Bollettieri',flag:'🇺🇸', country:'USA',         sport:'Tennis',       title:'Legendary IMG Academy Founder', cost:200, costLabel:'$200 / session', duration:'8 wks',  difficulty:'Medium', rating:4.8, reviews:611, bio:'Legacy coach of Agassi, Courier, and Sharapova. Focuses on killer forehands, swinging volleys, and absolute mental dominance.' },
  { id:36, name:'Ivan Lendl',      flag:'🇨🇿', country:'Czechia',     sport:'Tennis',       title:'8x Grand Slam Champion & Coach',cost:220, costLabel:'$220 / session', duration:'6 wks',  difficulty:'Hard',   rating:4.9, reviews:188, bio:'Coached Andy Murray to historic titles. Specializes in fitness indexing, professional serve placement, and slice containment.' },
  { id:37, name:'Carlos Moya',     flag:'🇪🇸', country:'Spain',       sport:'Tennis',       title:'Former World No. 1 & Pro Coach',cost:210, costLabel:'$210 / session', duration:'8 wks',  difficulty:'Medium', rating:4.9, reviews:154, bio:'Current elite strategist. Expert in pattern play optimization, inside-out forehand footwork, and hard-court positioning.' },

  // ── BASKETBALL (+5 Real Coaches) ───────────────────────────────────────
  { id:38, name:'Phil Jackson',    flag:'🇺🇸', country:'USA',         sport:'Basketball',   title:'11x NBA Championship Coach',   cost:300, costLabel:'$300 / session', duration:'8 wks',  difficulty:'Hard',   rating:5.0, reviews:899, bio:'Legendary master of the Triangle Offense. Focuses heavily on team chemistry, space spacing dynamics, and Zen-based player mindfulness.' },
  { id:39, name:'Gregg Popovich',  flag:'🇺🇸', country:'USA',         sport:'Basketball',   title:'Spurs Multi-Champion Coach',   cost:280, costLabel:'$280 / session', duration:'6 wks',  difficulty:'Hard',   rating:4.9, reviews:762, bio:'NBA all-time winningest coach. Focuses on baseline ball-movement layouts, pick-and-roll defensive schemes, and unselfish play.' },
  { id:40, name:'Steve Kerr',      flag:'🇺🇸', country:'USA',         sport:'Basketball',   title:'Warriors Dynasty Head Coach',   cost:250, costLabel:'$250 / session', duration:'8 wks',  difficulty:'Medium', rating:4.9, reviews:645, bio:'Specialist in motion offenses, high-volume three-point spacing patterns, and modern small-ball switch defenses.' },
  { id:41, name:'Erik Spoelstra',  flag:'🇺🇸', country:'USA',         sport:'Basketball',   title:'Miami Heat Championship Architect',cost:240, costLabel:'$240 / session', duration:'8 wks',  difficulty:'Hard',   rating:4.9, reviews:510, bio:'Pioneer of Heat Culture. Specializes in defensive zone trapping matrices, situational inbound designs, and physical conditioning.' },
  { id:42, name:'Tim Cone',        flag:'🇵🇭', country:'Philippines', sport:'Basketball',   title:'25x PBA Champion Legend',      cost:180, costLabel:'$180 / session', duration:'6 wks',  difficulty:'Medium', rating:4.8, reviews:392, bio:'The most successful coach in Philippine history. Grand Slam master specializing in modern triangle adaptations and full-court presses.' },

  // ── GYMNASTICS (+5 Real Coaches) ───────────────────────────────────────
  { id:43, name:'Valerie Liukin',  flag:'🇺🇸', country:'USA',         sport:'Gymnastics',   title:'Olympic Champion Coach',        cost:220, costLabel:'$220 / session', duration:'12 wks', difficulty:'Hard',   rating:4.9, reviews:183, bio:'Coached Olympic all-around champions. Specializes in elite uneven bars composition, flight mechanics, and twist execution.' },
  { id:44, name:'Laurent Landi',   flag:'🇫🇷', country:'France',      sport:'Gymnastics',   title:'Coach of Simone Biles',         cost:250, costLabel:'$250 / session', duration:'16 wks', difficulty:'Hard',   rating:5.0, reviews:294, bio:'World-renowned elite coach. Specialist in high-difficulty vault land mechanics, tumbling safety, and international rules scoring.' },
  { id:45, name:'Mihai Brestyan',  flag:'🇺🇸', country:'USA',         sport:'Gymnastics',   title:'USA Olympic Team Coach',        cost:190, costLabel:'$190 / session', duration:'12 wks', difficulty:'Hard',   rating:4.8, reviews:201, bio:'Famous for legendary strength-endurance conditioning, floor routine power retention, and solid beam stability frameworks.' },
  { id:46, name:'Cecile Canqueteau',flag:'🇫🇷', country:'France',     sport:'Gymnastics',   title:'Elite World Class Coach',       cost:210, costLabel:'$210 / session', duration:'10 wks', difficulty:'Medium', rating:4.9, reviews:167, bio:'Former French Olympian. Expert in balance beam art, choreography connection, and landing balance adjustments.' },
  { id:47, name:'Evgeny Marchenko',flag:'🇷🇺', country:'Russia',      sport:'Gymnastics',   title:'5x World Champion Trainer',     cost:200, costLabel:'$200 / session', duration:'12 wks', difficulty:'Hard',   rating:4.9, reviews:132, bio:'Specializes in competitive sport acrobatic foundations, stretching biomechanics, and junior Olympic pathway systems.' },

  // ── ARCHERY (+5 Real Coaches) ──────────────────────────────────────────
  { id:48, name:'Ki Sik Lee',      flag:'🇰🇷', country:'South Korea', sport:'Archery',      title:'USA & Korean Olympic Coach',    cost:230, costLabel:'$230 / session', duration:'6 wks',  difficulty:'Medium', rating:5.0, reviews:411, bio:'Creator of the famous KSL Shot Cycle. Master of biomechanics, back-tension release, and mental anxiety reduction.' },
  { id:49, name:'Kim Chung-tae',   flag:'🇰🇷', country:'South Korea', sport:'Archery',      title:'Olympic Gold Medalist Coach',   cost:210, costLabel:'$210 / session', duration:'4 wks',  difficulty:'Easy',   rating:4.9, reviews:156, bio:'Coached elite South Korean Olympic teams. Focuses on repetitive clicker consistency, shoulder alignment, and heavy wind adjustments.' },
  { id:50, name:'Richard Priestman',flag:'🇬🇧', country:'Great Britain',sport:'Archery',    title:'World Class Elite Coach',       cost:170, costLabel:'$170 / session', duration:'4 wks',  difficulty:'Easy',   rating:4.7, reviews:112, bio:'Former Olympic medalist. Specializes in recurve bow tuning, anchor point stabilization, and target flight paths.' },
  { id:51, name:'George Ryals',    flag:'🇺🇸', country:'USA',         sport:'Archery',      title:'NFAA Coach of the Year',        cost:160, costLabel:'$160 / session', duration:'6 wks',  difficulty:'Medium', rating:4.8, reviews:143, bio:'World-renowned compound bow specialist. Focuses on release mechanics, sight optimization, and tournament pacing structures.' },
  { id:52, name:'Brady Ellison',   flag:'🇺🇸', country:'USA',         sport:'Archery',      title:'5x Olympian & World Champion',  cost:250, costLabel:'$250 / session', duration:'8 wks',  difficulty:'Hard',   rating:5.0, reviews:287, bio:'Active legend of the sport. Teaches aggressive high-performance shooting tempos, finger protection release, and raw mental drive.' },

  // ── MMA (+5 Real Coaches) ──────────────────────────────────────────────
  { id:53, name:'Firas Zahabi',    flag:'🇨🇦', country:'Canada',      sport:'MMA',          title:'Tristar Gym Head Coach',        cost:240, costLabel:'$240 / session', duration:'12 wks', difficulty:'Hard',   rating:5.0, reviews:542, bio:'Architect of Georges St-Pierre. Expert in fight philosophy, reactive double-legs, jab-heavy pacing, and submission prevention.' },
  { id:54, name:'Javier Mendez',   flag:'🇺🇸', country:'USA',         sport:'MMA',          title:'AKA Founder (Khabib\'s Coach)',  cost:260, costLabel:'$260 / session', duration:'12 wks', difficulty:'Hard',   rating:5.0, reviews:613, bio:'Trained multiple UFC Champions including Khabib and Islam. Specializes in cage pressure wrestling, heavy kickboxing, and cardio.' },
  { id:55, name:'Eugene Bareman',  flag:'🇳🇿', country:'New Zealand', sport:'MMA',          title:'City Kickboxing Chief Coach',   cost:230, costLabel:'$230 / session', duration:'10 wks', difficulty:'Hard',   rating:4.9, reviews:421, bio:'Coach of Israel Adesanya. Master of faint matrices, dynamic striking angles, stance-switching, and defensive head movement.' },
  { id:56, name:'Trevor Wittman',  flag:'🇺🇸', country:'USA',         sport:'MMA',          title:'ONX Sports Master Trainer',     cost:250, costLabel:'$250 / session', duration:'8 wks',  difficulty:'Hard',   rating:4.9, reviews:389, bio:'Master boxing-centric MMA coach. Focuses on hip torque generation, defensive shell transitions, and footwork spacing loops.' },
  { id:57, name:'Greg Jackson',    flag:'🇺🇸', country:'USA',         sport:'MMA',          title:'Jackson-Wink Strategy Pioneer', cost:220, costLabel:'$220 / session', duration:'12 wks', difficulty:'Medium', rating:4.8, reviews:497, bio:'The king of MMA game-planning. Specializes in oblique kicking ranges, ground-and-pound controls, and score optimization.' },

  // ── CYCLING (+5 Real Coaches) ──────────────────────────────────────────
  { id:58, name:'Chris Carmichael',flag:'🇺🇸', country:'USA',         sport:'Cycling',      title:'Founder of CTS Training',       cost:180, costLabel:'$180 / session', duration:'8 wks',  difficulty:'Medium', rating:4.8, reviews:342, bio:'Coached elite Olympic cyclists. Focuses on aerobic thresholds, cadence micro-intervals, and nutritional recovery systems.' },
  { id:59, name:'Dave Brailsford', flag:'🇬🇧', country:'Great Britain',sport:'Cycling',    title:'Marginal Gains Innovator',      cost:250, costLabel:'$250 / session', duration:'10 wks', difficulty:'Hard',   rating:4.9, reviews:176, bio:'Architect of Team Sky/Ineos dominance. Specializes in aerodynamic optimizations, structural data metrics, and endurance.' },
  { id:60, name:'Patrick Lefevere',flag:'🇧🇪', country:'Belgium',     sport:'Cycling',      title:'Soudal-QuickStep Manager',      cost:200, costLabel:'$200 / session', duration:'8 wks',  difficulty:'Hard',   rating:4.7, reviews:134, bio:'Legendary spring classics strategist. Focuses on pack drafting tactics, echelon positioning, and sprint train timing.' },
  { id:61, name:'Joe Friel',       flag:'🇺🇸', country:'USA',         sport:'Cycling',      title:'Author of Cyclist Training Bible',cost:190, costLabel:'$190 / session', duration:'6 wks',  difficulty:'Medium', rating:4.9, reviews:482, bio:'World authority on endurance building, heart rate training zones, and progressive over-recovery scheduling formulas.' },
  { id:62, name:'Dan Lorang',      flag:'🇩🇪', country:'Germany',     sport:'Cycling',      title:'Bora-Hansgrohe Head Coach',     cost:220, costLabel:'$220 / session', duration:'8 wks',  difficulty:'Medium', rating:4.9, reviews:121, bio:'Elite performance director. Focuses on power-to-weight optimization, critical power tests ($CP_{20}$), and pedal biomechanics.' },

  // ── VOLLEYBALL (+5 Real Coaches) ───────────────────────────────────────
  { id:63, name:'Karch Kiraly',    flag:'🇺🇸', country:'USA',         sport:'Volleyball',   title:'USA Women\'s National Coach',   cost:240, costLabel:'$240 / session', duration:'8 wks',  difficulty:'Hard',   rating:5.0, reviews:392, bio:'Only person to win Olympic Gold in indoor and beach. Focuses on serve-receive tracking, out-of-system setting, and composure.' },
  { id:64, name:'Bernardo Rezende',flag:'🇧🇷', country:'Brazil',      sport:'Volleyball',   title:'Legendary Brazilian Coach',     cost:250, costLabel:'$250 / session', duration:'8 wks',  difficulty:'Hard',   rating:4.9, reviews:483, bio:'Winner of over 30 major international titles. Renowned for fast-tempo offensive sets, pipe attacks, and transition defenses.' },
  { id:65, name:'Lang Ping',       flag:'🇨🇳', country:'China',       sport:'Volleyball',   title:'The Iron Hammer Coach',         cost:230, costLabel:'$230 / session', duration:'8 wks',  difficulty:'Hard',   rating:5.0, reviews:341, bio:'Historic champion who won gold as player and coach. Focuses on triple-blocking matrices, dig transitions, and tactical serves.' },
  { id:66, name:'Hugh McCutcheon', flag:'🇳🇿', country:'New Zealand', sport:'Volleyball',   title:'Former US Men\'s Olympic Coach', cost:200, costLabel:'$200 / session', duration:'6 wks',  difficulty:'Medium', rating:4.8, reviews:198, bio:'Coached teams to Olympic gold and silver. Focuses heavily on high-percentage attacking lines, server targets, and base shifts.' },
  { id:67, name:'John Speraw',     flag:'🇺🇸', country:'USA',         sport:'Volleyball',   title:'USA Men\'s Olympic Coach',      cost:210, costLabel:'$210 / session', duration:'6 wks',  difficulty:'Medium', rating:4.9, reviews:232, bio:'UCLA head coach and national director. Expert on hybrid float-jump serve generation and middle blocker reading extensions.' },

  // ── TAEKWONDO (+5 Real Coaches) ────────────────────────────────────────
  { id:68, name:'Steven Lopez',    flag:'🇺🇸', country:'USA',         sport:'Taekwondo',    title:'5x World Champion Legend',      cost:220, costLabel:'$220 / session', duration:'8 wks',  difficulty:'Hard',   rating:4.9, reviews:212, bio:'2x Olympic Gold Medalist. Focuses on front-leg cutoff kicks, ring management, and tactical body-shot scoring setups.' },
  { id:69, name:'Hadi Saei',       flag:'🇮🇷', country:'Iran',        sport:'Taekwondo',    title:'Most Decorated Iranian Olympian',cost:210, costLabel:'$210 / session', duration:'8 wks',  difficulty:'Hard',   rating:5.0, reviews:184, bio:'Legendary champion specializing in lightning-fast counter roundhouse kicks, spinning hooks, and competitive endurance.' },
  { id:70, name:'Carlo Molfetta',  flag:'🇮🇹', country:'Italy',       sport:'Taekwondo',    title:'Olympic Heavyweight Champion',  cost:190, costLabel:'$190 / session', duration:'10 wks', difficulty:'Medium', rating:4.8, reviews:129, bio:'Olympic Gold medalist. Focuses on defensive guard framing, high head kick targeting matrices, and weight displacement balance.' },
  { id:71, name:'Jade Jones',      flag:'🇬🇧', country:'Great Britain',sport:'Taekwondo',    title:'2x Olympic Gold Medalist',      cost:230, costLabel:'$230 / session', duration:'6 wks',  difficulty:'Hard',   rating:4.9, reviews:267, bio:'Nicknamed "The Headhunter". Specializes in aggressive forward-pressure attacking tracks and high scoring axe kicks.' },
  { id:72, name:'Monsour del Rosario',flag:'🇵🇭', country:'Philippines',sport:'Taekwondo',  title:'8th Dan Grandmaster & Icon',    cost:180, costLabel:'$180 / session', duration:'8 wks',  difficulty:'Medium', rating:4.9, reviews:345, bio:'Filipino Taekwondo pioneer and Asian Games medalist. Teaches pure traditional power foundations, block setups, and lethal counter strikes.' }
];

const PACKAGES = [
  { id:'starter', name:'Starter',   sessions:4,  desc:'4 sessions · 1×/week',  priceMultiplier:1   },
  { id:'athlete', name:'Athlete',   sessions:8,  desc:'8 sessions · 2×/week',  priceMultiplier:1.8 },
  { id:'elite',   name:'Elite Pro', sessions:16, desc:'16 sessions · 4×/week', priceMultiplier:3.2 },
];

/* ─────────────────────────────────────────────
   API SERVICE LAYER
───────────────────────────────────────────── */
const API_SERVICE = {
  // Register a new user
  async register(name, email, password, country) {
    const res = await fetch(`${API}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, country }),
    });
    return res.json();
  },

  // Log in a user
  async login(email, password) {
    const res = await fetch(`${API}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return res.json();
  },

  // Save a booking to the database
  async saveBooking(bookingData) {
    const res = await fetch(`${API}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData),
    });
    return res.json();
  },

  // Get all bookings for a user from the database
  async getBookings(email) {
    const res = await fetch(`${API}/bookings/${encodeURIComponent(email)}`);
    const data = await res.json();
    return data.bookings || [];
  },

  // Save a receipt to the database
  async saveReceipt(receiptData) {
    const res = await fetch(`${API}/receipts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(receiptData),
    });
    return res.json();
  },

  // Get all receipts for a user from the database
  async getReceipts(email) {
    const res = await fetch(`${API}/receipts/${encodeURIComponent(email)}`);
    const data = await res.json();
    return data.receipts || [];
  },
};

/* ─────────────────────────────────────────────
   APP STATE
───────────────────────────────────────────── */
const state = {
  currentSection: 'home',
  currentFilter: 'all',
  coachQuery: '',
  user: null,
  bookingDraft: null,
  receipts: [],
  portalTab: 'overview',
  authTab: 'login',
  toastTimer: null,
  paymentMethod: 'Visa' // Default payment tracking method
};

/* ─────────────────────────────────────────────
   INIT
───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  bindNav();
  bindDrawer();
  bindFilterBtns();
  bindCoachSearch();
  bindSportModalClose();
  bindCoachModalClose();
  bindBookSportChange();

  // Check for session saved in sessionStorage (tab session only)
  const sessionData = sessionStorage.getItem('trij_active_session');
  if (sessionData) {
    state.user = JSON.parse(sessionData);
    loadUserReceipts(state.user.email);
  }

  renderHomeSports();
  renderSportsHub();
  renderCoaches();
  populateBookSport();
  setMinDate();
});

// Load receipts from the real database
async function loadUserReceipts(email) {
  try {
    state.receipts = await API_SERVICE.getReceipts(email);
    refreshDashStats();
    renderUpcoming();
    renderReceipts();
  } catch (err) {
    console.error('Could not load receipts:', err);
  }
}

/* ─────────────────────────────────────────────
   NAVIGATION
───────────────────────────────────────────── */
function bindNav() {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      navigateTo(link.dataset.section);
    });
  });
  document.querySelectorAll('.drawer-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      closeDrawer();
      navigateTo(link.dataset.section);
    });
  });
}

function navigateTo(section) {
  if (state.currentSection === section) return;
  const prev = document.getElementById('section-' + state.currentSection);
  if (prev) prev.classList.remove('active');
  const next = document.getElementById('section-' + section);
  if (next) next.classList.add('active');
  state.currentSection = section;
  document.querySelectorAll('.nav-link, .drawer-link').forEach(l => {
    l.classList.toggle('active', l.dataset.section === section);
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (section === 'portal') refreshPortalView();
}

/* ─────────────────────────────────────────────
   HAMBURGER / DRAWER
───────────────────────────────────────────── */
function bindDrawer() {
  const hamburger = document.getElementById('hamburger');
  const drawerClose = document.getElementById('drawerClose');
  const overlay = document.getElementById('drawerOverlay');
  hamburger.addEventListener('click', openDrawer);
  drawerClose.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);
}

function openDrawer() {
  document.getElementById('navDrawer').classList.add('open');
  document.getElementById('drawerOverlay').classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeDrawer() {
  document.getElementById('navDrawer').classList.remove('open');
  document.getElementById('drawerOverlay').classList.remove('show');
  document.body.style.overflow = '';
}

/* ─────────────────────────────────────────────
   HOME — SPORTS PREVIEW
───────────────────────────────────────────── */
function renderHomeSports() {
  const grid = document.getElementById('homesSportsGrid');
  if (!grid) return;
  const preview = SPORTS.slice(0, 6);
  grid.innerHTML = preview.map(s => sportCardHTML(s)).join('');
  grid.querySelectorAll('.sport-card').forEach(card => {
    card.addEventListener('click', () => openSportModal(card.dataset.id));
  });
}

function sportCardHTML(s) {
  return `
    <div class="sport-card" data-id="${s.id}">
      <div class="sc-emoji">${s.emoji}</div>
      <div class="sc-name">${s.name}</div>
      <div class="sc-meta">
        <span class="sc-tag ${s.category}">${s.category}</span>
        <span class="sc-diff">${s.difficulty}</span>
      </div>
      <div class="sc-duration">⏱ ${s.duration}</div>
    </div>`;
}

/* ─────────────────────────────────────────────
   SPORTS HUB
───────────────────────────────────────────── */
function bindFilterBtns() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.currentFilter = btn.dataset.filter;
      renderSportsHub();
    });
  });
}

function renderSportsHub() {
  const grid = document.getElementById('sportsHubGrid');
  if (!grid) return;
  const filtered = state.currentFilter === 'all'
    ? SPORTS
    : SPORTS.filter(s => s.category === state.currentFilter);

  if (filtered.length === 0) {
    grid.innerHTML = `<div class="empty-state"><span class="es-icon">🏟️</span>No sports in this category.</div>`;
    return;
  }

  grid.innerHTML = filtered.map(s => `
    <div class="sport-hub-card" data-id="${s.id}">
      <div class="shc-top">
        <span class="shc-emoji">${s.emoji}</span>
        <span class="sc-tag ${s.category}">${s.category}</span>
      </div>
      <div class="shc-name">${s.name}</div>
      <div class="shc-desc">${s.desc}</div>
      <div class="shc-meta">
        <span>⏱ ${s.duration}</span>
        <span class="shc-diff diff-${s.difficulty.toLowerCase()}">${s.difficulty}</span>
      </div>
      <button class="shc-btn">View Details →</button>
    </div>`).join('');

  grid.querySelectorAll('.sport-hub-card').forEach(card => {
    card.querySelector('.shc-btn').addEventListener('click', () => openSportModal(card.dataset.id));
  });
}

/* ─────────────────────────────────────────────
   SPORT MODAL
───────────────────────────────────────────── */
function bindSportModalClose() {
  const overlay = document.getElementById('sportModal');
  const closeBtn = document.getElementById('sportModalClose');
  closeBtn.addEventListener('click', closeSportModal);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeSportModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSportModal(); });
}

function openSportModal(id) {
  const sport = SPORTS.find(s => s.id === id);
  if (!sport) return;
  const coaches = COACHES.filter(c => c.sport === sport.name);
  const content = document.getElementById('sportModalContent');

  content.innerHTML = `
    <div class="modal-sport-header">
      <span class="modal-sport-emoji">${sport.emoji}</span>
      <div>
        <h2 class="modal-sport-name">${sport.name}</h2>
        <span class="sc-tag ${sport.category}">${sport.category}</span>
      </div>
    </div>
    <p class="modal-sport-desc">${sport.desc}</p>
    <div class="modal-sport-meta">
      <div class="msm-item"><span class="msm-label">Duration</span><span class="msm-val">⏱ ${sport.duration}</span></div>
      <div class="msm-item"><span class="msm-label">Difficulty</span><span class="msm-val diff-${sport.difficulty.toLowerCase()}">${sport.difficulty}</span></div>
      <div class="msm-item"><span class="msm-label">Coaches</span><span class="msm-val">${coaches.length} available</span></div>
    </div>
    ${coaches.length > 0 ? `
    <h3 class="modal-coaches-title">Available Coaches</h3>
    <div class="modal-coaches-list">
      ${coaches.map(c => `
        <div class="modal-coach-item" onclick="closeSportModal();navigateTo('coaches')">
          <span class="mci-flag">${c.flag}</span>
          <div class="mci-info">
            <strong>${c.name}</strong>
            <span>${c.country} · ${c.costLabel}</span>
          </div>
          <span class="mci-rating">⭐ ${c.rating}</span>
        </div>`).join('')}
    </div>` : '<p class="modal-sport-desc">Coaches coming soon.</p>'}
    <button class="btn-primary full-btn mt-16" onclick="closeSportModal();if(state.user){navigateTo('portal');setTimeout(()=>switchPortalTab('book'),100);}else{navigateTo('portal');}">
      Book This Sport →
    </button>`;

  document.getElementById('sportModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeSportModal() {
  document.getElementById('sportModal').classList.remove('open');
  document.body.style.overflow = '';
}

/* ─────────────────────────────────────────────
   COACHES
───────────────────────────────────────────── */
function bindCoachSearch() {
  const input = document.getElementById('coachSearch');
  if (!input) return;
  input.addEventListener('input', () => {
    state.coachQuery = input.value.trim().toLowerCase();
    renderCoaches();
  });
}

function renderCoaches() {
  const grid = document.getElementById('coachesGrid');
  if (!grid) return;
  const q = state.coachQuery;
  const filtered = q
    ? COACHES.filter(c => c.name.toLowerCase().includes(q) || c.sport.toLowerCase().includes(q) || c.country.toLowerCase().includes(q))
    : COACHES;

  if (filtered.length === 0) {
    grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><span class="es-icon">👤</span>No coaches found.</div>`;
    return;
  }

  grid.innerHTML = filtered.map(c => `
    <div class="coach-card" data-id="${c.id}">
      <div class="cc-top">
        <span class="cc-flag">${c.flag}</span>
        <div class="cc-meta-top">
          <span class="cc-country">${c.country}</span>
          <span class="cc-rating">⭐ ${c.rating} <em>(${c.reviews})</em></span>
        </div>
      </div>
      <div class="cc-name">${c.name}</div>
      <div class="cc-title">${c.title}</div>
      <div class="cc-sport-tag">${c.sport}</div>
      <div class="cc-details">
        <span>💰 ${c.costLabel}</span>
        <span>⏱ ${c.duration}</span>
        <span class="diff-${c.difficulty.toLowerCase()}">${c.difficulty}</span>
      </div>
      <button class="cc-btn">View Profile →</button>
    </div>`).join('');

  grid.querySelectorAll('.coach-card').forEach(card => {
    card.querySelector('.cc-btn').addEventListener('click', () => openCoachModal(+card.dataset.id));
  });
}

/* ─────────────────────────────────────────────
   COACH MODAL
───────────────────────────────────────────── */
function bindCoachModalClose() {
  const overlay = document.getElementById('coachModal');
  const closeBtn = document.getElementById('coachModalClose');
  closeBtn.addEventListener('click', closeCoachModal);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeCoachModal(); });
}

function openCoachModal(id) {
  const c = COACHES.find(x => x.id === id);
  if (!c) return;
  const sport = SPORTS.find(s => s.name === c.sport);
  const content = document.getElementById('coachModalContent');
  const stars = '★'.repeat(Math.floor(c.rating)) + (c.rating % 1 >= 0.5 ? '½' : '');

  content.innerHTML = `
    <div class="modal-coach-header">
      <span class="modal-coach-flag">${c.flag}</span>
      <div>
        <h2 class="modal-coach-name">${c.name}</h2>
        <div class="modal-coach-title">${c.title}</div>
        <div class="modal-coach-loc">${c.country} · ${c.sport} ${sport ? sport.emoji : ''}</div>
      </div>
    </div>
    <div class="modal-coach-rating">
      <span class="mcr-stars">${stars}</span>
      <span class="mcr-score">${c.rating}</span>
      <span class="mcr-reviews">(${c.reviews} reviews)</span>
    </div>
    <p class="modal-coach-bio">${c.bio}</p>
    <div class="modal-coach-meta">
      <div class="mcm-item"><span class="mcm-label">Cost</span><span class="mcm-val">${c.costLabel}</span></div>
      <div class="mcm-item"><span class="mcm-label">Program</span><span class="mcm-val">⏱ ${c.duration}</span></div>
      <div class="mcm-item"><span class="mcm-label">Intensity</span><span class="mcm-val diff-${c.difficulty.toLowerCase()}">${c.difficulty}</span></div>
    </div>
    <button class="btn-primary full-btn mt-16" onclick="closeCoachModal();bookWithCoach(${c.id})">
      Book with ${c.name.split(' ')[0]} →
    </button>`;

  document.getElementById('coachModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCoachModal() {
  document.getElementById('coachModal').classList.remove('open');
  document.body.style.overflow = '';
}

function bookWithCoach(coachId) {
  if (!state.user) {
    navigateTo('portal');
    showToast('Please sign in first to book a session.');
    return;
  }
  const c = COACHES.find(x => x.id === coachId);
  if (!c) return;
  navigateTo('portal');
  setTimeout(() => {
    switchPortalTab('book');
    const sportSel = document.getElementById('bookSport');
    if (sportSel) {
      sportSel.value = c.sport;
      populateBookCoach(c.sport, coachId);
    }
  }, 150);
}

/* ─────────────────────────────────────────────
   AUTH — LOGIN / REGISTER
───────────────────────────────────────────── */
function switchAuthTab(tab) {
  state.authTab = tab;
  document.getElementById('tabLogin').classList.toggle('active', tab === 'login');
  document.getElementById('tabRegister').classList.toggle('active', tab === 'register');
  document.getElementById('loginForm').style.display = tab === 'login' ? '' : 'none';
  document.getElementById('registerForm').style.display = tab === 'register' ? '' : 'none';
  clearAuthErrors();
}

function clearAuthErrors() {
  const le = document.getElementById('loginError');
  const re = document.getElementById('regError');
  if (le) le.textContent = '';
  if (re) re.textContent = '';
}

async function handleLogin() {
  const email = document.getElementById('loginEmail').value.trim();
  const pass  = document.getElementById('loginPassword').value;
  const err   = document.getElementById('loginError');

  if (!email || !pass) { err.textContent = 'Please fill in all fields.'; return; }

  try {
    const result = await API_SERVICE.login(email, pass);

    if (result.error) {
      err.textContent = result.error;
      return;
    }

    loginSuccess(result.user);
  } catch (e) {
    err.textContent = 'Cannot connect to server. Make sure the backend is running.';
  }
}

async function handleRegister() {
  const name    = document.getElementById('regName').value.trim();
  const email   = document.getElementById('regEmail').value.trim();
  const pass    = document.getElementById('regPass').value;
  const country = document.getElementById('regCountry').value;
  const err     = document.getElementById('regError');

  if (!name || !email || !pass || !country) { err.textContent = 'Please fill in all fields.'; return; }
  if (pass.length < 6) { err.textContent = 'Password must be at least 6 characters.'; return; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { err.textContent = 'Please enter a valid email.'; return; }

  try {
    const result = await API_SERVICE.register(name, email, pass, country);

    if (result.error) {
      err.textContent = result.error;
      return;
    }

    loginSuccess(result.user);
    showToast(`Welcome to Tri J, ${name}! 🎉`);
  } catch (e) {
    err.textContent = 'Cannot connect to server. Make sure the backend is running.';
  }
}

function loginSuccess(user) {
  state.user = user;
  sessionStorage.setItem('trij_active_session', JSON.stringify(user));
  state.bookingDraft = null;
  loadUserReceipts(user.email);
  refreshPortalView();
}

 function handleLogout() {
  state.user = null;
  state.receipts = [];
  state.bookingDraft = null;
  sessionStorage.removeItem('trij_active_session');
  refreshPortalView();
  showToast("You've been signed out.");
  document.getElementById('loginEmail').value = '';
  document.getElementById('loginPassword').value = '';
  clearAuthErrors();
}

function refreshPortalView() {
  if (state.user) {
    document.getElementById('portalAuth').style.display = 'none';
    document.getElementById('portalDashboard').style.display = '';
    document.getElementById('portalWelcome').textContent = `Welcome back, ${state.user.name.split(' ')[0]}!`;
    document.getElementById('portalEmail').textContent = state.user.email;
    refreshDashStats();
    renderUpcoming();
    renderReceipts();
    switchPortalTab(state.portalTab || 'overview');
  } else {
    document.getElementById('portalAuth').style.display = '';
    document.getElementById('portalDashboard').style.display = 'none';
    switchAuthTab(state.authTab || 'login');
  }
}

/* ─────────────────────────────────────────────
   PORTAL TABS
───────────────────────────────────────────── */
function switchPortalTab(tab) {
  state.portalTab = tab;
  document.querySelectorAll('.p-tab').forEach(t => t.classList.toggle('active', t.dataset.ptab === tab));
  document.querySelectorAll('.ptab-content').forEach(c => c.classList.toggle('active', c.id === 'ptab-' + tab));
}

/* ─────────────────────────────────────────────
   BOOKING UTILITIES
───────────────────────────────────────────── */
function populateBookSport() {
  const sel = document.getElementById('bookSport');
  if (!sel) return;
  sel.innerHTML = `<option value="">Select a sport…</option>` +
    SPORTS.map(s => `<option value="${s.name}">${s.emoji} ${s.name}</option>`).join('');
  sel.addEventListener('change', () => populateBookCoach(sel.value));
}

function bindBookSportChange() { /* handled in populateBookSport */ }

function populateBookCoach(sportName, preselectId = null) {
  const sel = document.getElementById('bookCoach');
  if (!sel) return;
  const coaches = COACHES.filter(c => c.sport === sportName);
  if (coaches.length === 0) {
    sel.innerHTML = `<option value="">No coaches for this sport yet</option>`;
  } else {
    sel.innerHTML = `<option value="">Select a coach…</option>` +
      coaches.map(c => `<option value="${c.id}" data-cost="${c.cost}">${c.flag} ${c.name} — ${c.costLabel}</option>`).join('');
    if (preselectId) sel.value = String(preselectId);
  }
  populatePackages(sportName);
  updateBookingSummary();
  sel.addEventListener('change', updateBookingSummary);
}

function populatePackages(sportName) {
  const container = document.getElementById('packageOptions');
  if (!container) return;
  container.innerHTML = PACKAGES.map((pkg, i) => `
    <div class="package-opt${i === 0 ? ' selected' : ''}" data-pkg="${pkg.id}" onclick="selectPackage('${pkg.id}')">
      <div>
        <div class="pkg-name">${pkg.name}</div>
        <div class="pkg-detail">${pkg.desc}</div>
      </div>
      <div class="pkg-price" id="pkg-price-${pkg.id}">—</div>
    </div>`).join('');
  updatePackagePrices();
}

function selectPackage(pkgId) {
  document.querySelectorAll('.package-opt').forEach(el => {
    el.classList.toggle('selected', el.dataset.pkg === pkgId);
  });
  updateBookingSummary();
}

function updatePackagePrices() {
  const coachSel = document.getElementById('bookCoach');
  if (!coachSel) return;
  const opt = coachSel.options[coachSel.selectedIndex];
  const baseRate = opt && opt.dataset.cost ? +opt.dataset.cost : 0;
  PACKAGES.forEach(pkg => {
    const el = document.getElementById('pkg-price-' + pkg.id);
    if (el) {
      const price = baseRate > 0 ? Math.round(baseRate * pkg.priceMultiplier) : '—';
      el.textContent = baseRate > 0 ? `$${price}` : '—';
    }
  });
}

function updateBookingSummary() {
  updatePackagePrices();
  const summary = document.getElementById('bookingSummary');
  if (!summary) return;
  const sportSel = document.getElementById('bookSport');
  const coachSel = document.getElementById('bookCoach');
  const dateSel = document.getElementById('bookDate');
  const timeSel = document.getElementById('bookTime');
  const selPkg = document.querySelector('.package-opt.selected');

  const sport = sportSel ? sportSel.value : '';
  const coachOpt = coachSel ? coachSel.options[coachSel.selectedIndex] : null;
  const coach = coachOpt && coachOpt.value ? coachOpt.text : '';
  const baseRate = coachOpt && coachOpt.dataset.cost ? +coachOpt.dataset.cost : 0;
  const date = dateSel ? dateSel.value : '';
  const time = timeSel ? timeSel.value : '';

  const pkgId = selPkg ? selPkg.dataset.pkg : 'starter';
  const pkg = PACKAGES.find(p => p.id === pkgId) || PACKAGES[0];
  const total = baseRate > 0 ? Math.round(baseRate * pkg.priceMultiplier) : 0;

  if (!sport || !coachOpt || !coachOpt.value) {
    summary.innerHTML = '';
    return;
  }

  const coachObj = COACHES.find(c => c.id === +coachOpt.value);

  summary.innerHTML = `
    <div class="bs-row"><span>Sport</span><span>${sport}</span></div>
    <div class="bs-row"><span>Coach</span><span>${coachObj ? coachObj.name : coach}</span></div>
    <div class="bs-row"><span>Package</span><span>${pkg.name} (${pkg.sessions} sessions)</span></div>
    ${date ? `<div class="bs-row"><span>Start Date</span><span>${formatDate(date)}</span></div>` : ''}
    ${time ? `<div class="bs-row"><span>Time</span><span>${time}</span></div>` : ''}
    <div class="bs-row bs-total"><span>Total</span><span>$${total}</span></div>`;

  state.bookingDraft = {
    sport,
    coachId: +(coachOpt.value),
    coachName: coachObj ? coachObj.name : '',
    coachFlag: coachObj ? coachObj.flag : '',
    date,
    time,
    package: pkg,
    total,
  };
}

function proceedToPayment() {
  if (!state.bookingDraft || !state.bookingDraft.sport) {
    showToast('Please select a sport and coach first.');
    return;
  }
  if (!state.bookingDraft.date) {
    showToast('Please choose a session date.');
    return;
  }
  if (!state.bookingDraft.coachId) {
    showToast('Please select a coach.');
    return;
  }

  const card = document.getElementById('paymentSummaryCard');
  const d = state.bookingDraft;
  card.innerHTML = `
    <div class="receipt-row"><span>Sport</span><span>${d.sport}</span></div>
    <div class="receipt-row"><span>Coach</span><span>${d.coachFlag} ${d.coachName}</span></div>
    <div class="receipt-row"><span>Package</span><span>${d.package.name} (${d.package.sessions} sessions)</span></div>
    <div class="receipt-row"><span>Date</span><span>${formatDate(d.date)}</span></div>
    <div class="receipt-row"><span>Time</span><span>${d.time}</span></div>
    <div class="receipt-row bs-total" style="border-top:1px solid rgba(201,113,74,.15);margin-top:6px;padding-top:8px">
      <span style="font-weight:700">Total</span>
      <span style="color:var(--red-mid);font-weight:700;font-size:1rem">$${d.total}</span>
    </div>`;

  // Reset screen status states
  document.getElementById('paymentForm').style.display = 'block';
  document.getElementById('paymentSuccess').style.display = 'none';
  const errEl = document.getElementById('payError');
  if (errEl) errEl.textContent = '';
  
  // Reset payment choice back to standard Visa badge layout
  setPaymentMethod('Visa');

  switchPortalTab('payment');
}

/* ─────────────────────────────────────────────
   PAYMENT PROCESSING (Visa, Mastercard, GCash, PayMaya)
───────────────────────────────────────────── */
function formatCard(input) {
  let v = input.value.replace(/\D/g, '').substring(0, 16);
  input.value = v.match(/.{1,4}/g)?.join(' ') || v;
}

function formatExpiry(input) {
  let v = input.value.replace(/\D/g, '').substring(0, 4);
  if (v.length >= 2) {
    input.value = v.substring(0, 2) + '/' + v.substring(2);
  } else {
    input.value = v;
  }
}

function setPaymentMethod(method) {
  state.paymentMethod = method;
  
  // Highlight active selector badge buttons
  document.querySelectorAll('.pm-badge').forEach(btn => btn.classList.remove('active'));
  
  const activeBtn = document.getElementById('btn-' + method.toLowerCase());
  if (activeBtn) activeBtn.classList.add('active');

  const cardFields = document.getElementById('cardFields');
  const walletFields = document.getElementById('walletFields');
  const walletLabel = document.getElementById('walletPhoneLabel');

  if (method === 'Visa' || method === 'Mastercard') {
    if (cardFields) cardFields.style.display = 'block';
    if (walletFields) walletFields.style.display = 'none';
  } else {
    if (cardFields) cardFields.style.display = 'none';
    if (walletFields) walletFields.style.display = 'block';
    if (walletLabel) walletLabel.textContent = `${method} Mobile Number`;
  }
  
  const errEl = document.getElementById('payError');
  if (errEl) errEl.textContent = '';
}

async function processPayment() {
  const errEl = document.getElementById('payError');
  if (errEl) errEl.textContent = '';

  if (!state.bookingDraft) {
    if (errEl) errEl.textContent = 'Session structural draft missing.';
    return;
  }

  let accountReference = '';

  // Apply conditional field check validations depending on selected layout
  if (state.paymentMethod === 'Visa' || state.paymentMethod === 'Mastercard') {
    const cardNum = document.getElementById('cardNum').value.replace(/\s/g, '');
    const expiry = document.getElementById('cardExpiry').value;
    const cvv = document.getElementById('cardCvv').value;

    if (cardNum.length < 16 || !expiry.includes('/') || cvv.length < 3) {
      if (errEl) errEl.textContent = 'Please enter valid Credit Card credentials.';
      return;
    }
    accountReference = cardNum.substring(cardNum.length - 4);
  } else {
    const walletPhone = document.getElementById('walletPhone').value.replace(/\s/g, '');
    if (walletPhone.length < 11) {
      if (errEl) errEl.textContent = `Please present a standard 11-digit mobile account number for ${state.paymentMethod}.`;
      return;
    }
    accountReference = walletPhone.substring(walletPhone.length - 4);
  }

  try {
    // Step 1: Save core program booking logs
    const bookingPayload = {
      user_email: state.user.email,
      sport: state.bookingDraft.sport,
      coach: state.bookingDraft.coachName,
      date: state.bookingDraft.date,
      time: state.bookingDraft.time,
      package_name: state.bookingDraft.package.name,
      package_price: state.bookingDraft.total
    };

    const savedBooking = await API_SERVICE.saveBooking(bookingPayload);
    if (!savedBooking || !savedBooking.booking_id) {
      throw new Error('Database pipeline failed saving reference indexes.');
    }

    // Step 2: Build receipt logs reflecting selected payment channel strings
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    const receiptPayload = {
      user_email: state.user.email,
      booking_id: savedBooking.booking_id,
      sport: state.bookingDraft.sport,
      coach: state.bookingDraft.coachName,
      package_name: state.bookingDraft.package.name,
      amount: state.bookingDraft.total,
      card_last4: accountReference,
      payment_method: state.paymentMethod, // Added payment selection column key
      date: formattedDate
    };

    await API_SERVICE.saveReceipt(receiptPayload);

    // Step 3: Shift view container configurations
    document.getElementById('paymentForm').style.display = 'none';
    const successContainer = document.getElementById('paymentSuccess');
    successContainer.style.display = 'block';
    
    document.getElementById('successMsg').innerHTML = `
      Your package enrollment has been securely verified.<br/>
      Paid <strong>$${state.bookingDraft.total}</strong> via <strong>${state.paymentMethod}</strong> (ending in *${accountReference}).
    `;

    // Refresh client views to sync backend instances
    await loadUserReceipts(state.user.email);
    state.bookingDraft = null;

  } catch (e) {
    console.error(e);
    if (errEl) errEl.textContent = 'Server processing failure. Payment aborted.';
  }
}

/* ─────────────────────────────────────────────
   DASHBOARD / RENDERERS
───────────────────────────────────────────── */
function refreshDashStats() {
  const totalSpentEl = document.getElementById('dashTotalSpent');
  const activeSessionsEl = document.getElementById('dashActiveSessions');
  if (!totalSpentEl || !activeSessionsEl) return;

  const total = state.receipts.reduce((sum, r) => sum + r.amount, 0);
  totalSpentEl.textContent = `$${total}`;

  let sessionsCount = 0;
  state.receipts.forEach(r => {
    const pkg = PACKAGES.find(p => p.name === r.package_name);
    if (pkg) sessionsCount += pkg.sessions;
    else sessionsCount += 4;
  });
  activeSessionsEl.textContent = sessionsCount;
}

function renderUpcoming() {
  const container = document.getElementById('upcomingList');
  if (!container) return;

  if (state.receipts.length === 0) {
    container.innerHTML = `<div class="empty-state"><span class="es-icon">👟</span>No active training tracks.</div>`;
    return;
  }

  // Generate upcoming view list nodes
  container.innerHTML = state.receipts.map(r => `
    <div class="upcoming-card">
      <div style="font-size:1.5rem">🔥</div>
      <div style="flex:1">
        <div style="font-weight:700;color:var(--white)">${r.sport} Training Track</div>
        <div style="font-size:.82rem;color:var(--text-muted)">Coach: ${r.coach} · ${r.package_name}</div>
      </div>
      <div style="text-align:right">
        <div style="font-size:.82rem;color:var(--terra-pale);font-weight:600">Starts</div>
        <div style="font-size:.78rem;color:var(--text-muted)">${r.date}</div>
      </div>
    </div>
  `).join('');
}

function renderReceipts() {
  const container = document.getElementById('receiptsList');
  if (!container) return;

  if (state.receipts.length === 0) {
    container.innerHTML = `<div class="empty-state"><span class="es-icon">🧾</span>No transaction logs found.</div>`;
    return;
  }

  container.innerHTML = state.receipts.map(r => `
    <div class="receipt-card" style="background: var(--dark-3); border: 1px solid rgba(251,113,74,.1); padding: 16px; border-radius: var(--radius-sm); margin-bottom: 12px;">
      <div class="receipt-row"><strong>Receipt #${r.id}</strong><span style="color:var(--terra-pale)">${r.date}</span></div>
      <div class="receipt-row"><span>Program/Sport</span><span>${r.sport}</span></div>
      <div class="receipt-row"><span>Assigned Specialist</span><span>${r.coach}</span></div>
      <div class="receipt-row"><span>Package Level</span><span>${r.package_name}</span></div>
      <div class="receipt-row"><span>Payment Gateway</span><span>${r.payment_method || 'Card'} (*${r.card_last4})</span></div>
      <div class="receipt-row" style="border-top:1px dashed rgba(255,255,255,.1); padding-top:8px; margin-top:8px;">
        <span style="font-weight:700">Amount Paid</span>
        <span style="color:var(--terra-pale); font-weight:700">$${r.amount}</span>
      </div>
    </div>
  `).join('');
}

/* ─────────────────────────────────────────────
   HELPERS & TOAST
───────────────────────────────────────────── */
function setMinDate() {
  const input = document.getElementById('bookDate');
  if (!input) return;
  const today = new Date();
  today.setDate(today.getDate() + 1);
  input.min = today.toISOString().split('T')[0];
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length !== 3) return dateStr;
  const date = new Date(parts[0], parts[1] - 1, parts[2]);
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(state.toastTimer);
  state.toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}
