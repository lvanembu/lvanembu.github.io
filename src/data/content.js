// All site content lives here. Based on Luke_VanEmburgh_Portfolio.pdf (Nov 2026); LV-02 revised after Skipper's fact-check.

export const profile = {
  kicker: "Mechanical Engineering · Villanova University · May 2027",
  name: "Luke VanEmburgh",
  summary:
    "Mechanical engineer working across powertrain hardware, vehicle test data and simulation. Powertrain lead on Villanova Formula SAE, manufacturing engineering intern at Base Power.",
  email: "lvanemburgh1@gmail.com",
  linkedin: "https://linkedin.com/in/lukevanemburgh",
  linkedinLabel: "linkedin.com/in/lukevanemburgh",
  resume: "resume.pdf",
  heroImage: {
    src: "img/hero-cars-sunset.webp",
    label: "FIG. 0",
    caption: "Villanova Formula SAE (NovaRacing).",
  },
  available: "Full-time, May 2027",
  facts: [
    { label: "Degree", value: "BS Mechanical Eng." },
    { label: "Concentration", value: "Dynamic Systems" },
    { label: "Minors", value: "Aero · Mechatronics · Business" },
    { label: "GPA", value: "3.84 / 4.0" },
  ],
};

const img = (file) => `img/${file}`;

export const sheets = [
  {
    id: "LV-01",
    title: "Clutchless downshifting and drivetrain design",
    shortTag: "FSAE · 2025–26",
    header: "Villanova Formula SAE (NovaRacing) · VU17 Lead Drivetrain · VU18 Lead Powertrain",
    specs: [
      ["Downshift time (testing)", "< 100 ms"],
      ["Diff mount mass", "−10%"],
      ["Diff mount factor of safety", "2.0"],
      ["Engine", "Yamaha R6"],
      ["Powertrain team (VU18)", "20 people"],
    ],
    callout: {
      title: "Leading VU18 powertrain",
      text: "Set system targets for a smoother power ramp and wider powerband to fix VU17 drivability. Set budget, schedule and staffing priorities, including an engine dyno redesign and a cooling system overhaul.",
    },
    tools: ["MoTeC i2 / M1 Tune", "SolidWorks", "Ansys Mechanical", "MATLAB"],
    sections: [
      {
        heading: "Downshift failure diagnosis",
        steps: [
          ["Problem", "Clutchless downshifts on the Yamaha R6-powered car were failing, costing time in braking zones and putting the gearbox at risk."],
          ["Investigation", "Overlaid engine speed, gear position, shift state, throttle aim and wheel speeds in MoTeC i2. Ruled out a suspected fuel cut by confirming injector pulse width and fuel pressure stayed live through the blip."],
          ["Root cause", "Two faults: inconsistent wheel speed sensor data feeding the engine speed target, and gear shift controller (GSC) cut and blip parameter errors."],
          ["Fix", "Corrected the sensors, retuned the ignition cut and throttle blip timing, and redesigned the shift actuator mounting."],
          ["Result", "Sub-100 ms downshifts in testing."],
        ],
        figures: [
          { view: "A", src: img("lv01-a-downshift-motec.jpg"), caption: "Garage test of a power-off downshift to second (MoTeC i2). The engine speed limit (red) drops below engine speed during the throttle blips." },
          { view: "B", src: img("lv01-b-gsc-timing.jpg"), caption: "GSC timing table in M1 Tune: duration of each shift phase by gear." },
        ],
      },
      {
        heading: "Differential mounts",
        bullets: [
          "Redesigned the differential mounts within tight packaging constraints.",
          "Cut mass by 10% while holding a 2.0 factor of safety.",
          "Simplified chain tensioning by moving to turnbuckles.",
        ],
        figures: [
          { view: "C", src: img("lv01-c-diff-on-car.jpg"), caption: "VU17: differential and center mount on the car." },
          { view: "D", src: img("lv01-d-diff-cad.jpg"), caption: "VU18: differential assembly in CAD, with center mounts, turnbuckle tensioners and chain guard." },
          { view: "E", src: img("lv01-e-mount-stress.jpg"), caption: "Starboard center mount, von Mises stress in Ansys Mechanical." },
        ],
      },
      {
        heading: "Final drive ratio selection",
        bullets: [
          "Selected the final drive ratio from the engine power curve, tractive force limit and lap time simulation.",
          "Wrote a MATLAB script to calculate optimal shift points from R6 dyno data.",
          "Confirmed powerband coverage with RPM and shift data from track testing, plus driver feedback.",
        ],
        figures: [
          { view: "F", src: img("lv01-f-laptime-fdr.jpg"), caption: "Simulated endurance lap time vs. final drive ratio." },
          { view: "G", src: img("lv01-g-tractive-force.jpg"), caption: "Tractive force by gear, with pre- and post-shift RPM for each upshift." },
          { view: "H", src: img("lv01-h-power-by-gear.jpg"), caption: "Power by gear vs. engine RPM, used to set shift points (MATLAB, R6 dyno data)." },
        ],
      },
    ],
  },
  {
    id: "LV-02",
    title: "VU18 aerodynamics and automated CFD workflow",
    shortTag: "Capstone · 2026–",
    header: "Senior Capstone · VU18 Aerodynamics · Mar 2026 – Present",
    specs: [
      ["VU18 downforce at 50 mph", "952 N"],
      ["VU18 drag at 50 mph", "412 N"],
      ["VU18 L/D", "2.3"],
      ["Front balance", "42%"],
      ["Mesh", "19.5M cells, half car, poly-hexcore"],
      ["Turbulence model", "k-ω SST, y+ ≈ 1"],
      ["Mesh to forces (baseline)", "3.5 h on 28 cores"],
      ["Cases in results database", "229"],
    ],
    note: "All forces are from CFD on one mesh at one speed and have not yet been confirmed on track.",
    tools: ["nTop", "SolidWorks", "SpaceClaim", "Ansys Fluent", "PyFluent (PyAnsys)", "Python", "SQLite"],
    intro:
      "Hand-running each CFD case was the bottleneck: every geometry change meant re-exporting, re-meshing and re-solving by hand. I built the rear wing as a parametric nTop model (five elements, 31 inputs) and the body and undertray in SolidWorks; the front wing was modeled in nTop to my design. I connected the package to scripted geometry checks, meshing and solving, so a design variant runs from a parameter change to forces with no hand steps. AI agents write the scripts and run the queue under my direction. I set the geometry, choose the studies, approve every solver-setup change and review the results.",
    pipeline: {
      steps: [
        ["Geometry", "nTop wings exported headless; SolidWorks body and undertray as Parasolid"],
        ["Automated checks", "Closed surfaces, wall thickness, slits, part overlaps"],
        ["Meshing", "PyFluent, Fluent Watertight Geometry workflow, poly-hexcore, quality gate"],
        ["Solve", "Ansys Fluent, steady RANS, k-ω SST, moving ground, rotating wheels"],
        ["Results", "Forces by part, balance, settled check, database keyed to hashed inputs"],
      ],
      loopNote: "Results set the next study and feed back into step 1",
    },
    sections: [
      {
        figures: [
          { view: "A", src: img("lv02-a-pathlines.jpg"), caption: "Full-car pathlines colored by velocity, from an earlier car iteration (Fluent 2025 R2)." },
          { view: "B", src: img("lv02-b-cp.jpg"), caption: "Centerline pressure coefficient." },
        ],
      },
      {
        heading: "What the loop has found",
        bullets: [
          "Reducing the rear wing's spanwise drop re-attached its main element on the car: +21 N of rear-wing downforce and −5 N of drag. That wing became the baseline.",
          "The same data predicts a stall on the rear wing's upper front element, which is the current study.",
          "229 cases across 133 studies so far, wing-alone and full-car. On the wing-alone tier, mesh sensitivity kept forces within about 1–2%.",
          "Every result is stored against content hashes of its geometry and solver settings, so each number traces back to its exact inputs.",
        ],
      },
      {
        heading: "VU18 full-car baseline",
        bullets: [
          "Steady RANS on a 19.5 million cell half-car model with moving ground and rotating wheels, at 22.4 m/s (50 mph) and 25 mm ride height.",
          "952 N of downforce against 412 N of drag, with 42% of the downforce on the front axle. The rear wing makes 43% of the downforce, the front wing 38% and the body and undertray 23%; the open wheels make 35 N of lift.",
          "Forces settle within 3,800 iterations. Reported values are the mean of iterations 3,001 to 3,800, steady to within 1 N.",
        ],
        figures: [
          { view: "C", src: img("lv02-c-downforce-split.jpg"), caption: "Downforce by component." },
          { view: "D", src: img("lv02-d-convergence.jpg"), caption: "Force convergence." },
        ],
      },
      {
        heading: "Build",
        figures: [
          { view: "E", src: img("lv02-e-layup.jpg"), caption: "Team layup of a carbon fiber wing element. I helped with the layups." },
          { view: "F", src: img("lv02-f-wing-element.jpg"), caption: "Finished wing element. I did much of the post-processing." },
          { view: "G", src: img("lv02-g-rear-wing.jpg"), caption: "Multi-element rear wing model." },
        ],
      },
    ],
  },
  {
    id: "LV-03",
    title: "Non-conforming material cell and line ramp support",
    shortTag: "Base Power · 2026",
    header: "Base Power Company · Manufacturing Engineering Intern · Austin, TX · May – Aug 2026",
    specs: [
      ["Stations built (NCM)", "3"],
      ["Stations owned", "2"],
      ["Line phase", "Production ramp"],
    ],
    note: "Production figures and photos of my stations are left out to respect Base Power's confidentiality.",
    tools: ["SolidWorks", "MES", "8020 extrusion", "Hipot test"],
    intro:
      "Base Power builds home battery systems. I worked on the battery module and inverter lines while they ramped production. My largest project was the non-conforming material (NCM) cell, the place where every unit that fails off the line goes to be diagnosed, recovered or scrapped.",
    sections: [
      {
        figures: [
          { view: "A", src: img("lv03-a-production-floor.webp"), caption: "Base Power production floor (press photo; my stations are not shown)." },
        ],
      },
      {
        heading: "NCM cell",
        bullets: [
          "Designed and built the cell: floor layout, failure process flow, snoop station, hipot test station and firmware reflash station.",
          "Developed MES-integrated NCM software that pulls part data, guides operators through rework, records retest results and updates unit disposition automatically.",
        ],
      },
      {
        heading: "Line ramp support",
        bullets: [
          "Owned the enclosure blindmate and PCBA press stations during the ramp.",
          "Redesigned and installed pallet check stops, tool nests, guides and hard stops, and reorganized station layouts.",
          "Planned lineside storage and part staging for higher material consumption, keeping FIFO at buffers and staging areas.",
        ],
      },
    ],
  },
  {
    id: "LV-04",
    title: "Tuned Helmholtz resonator muffler",
    shortTag: "FSAE · 2025–26",
    header: "Villanova Formula SAE · Exhaust Acoustics · Designed and Simulated",
    specs: [
      ["Resonator 1 target", "367 Hz"],
      ["Resonator 2 target", "734 Hz"],
      ["Basis", "R6 at ~11,000 rpm"],
    ],
    note: "A simulation study: the design was developed and evaluated in Ansys and has not been manufactured.",
    tools: ["Ansys Harmonic Acoustics", "Ricardo WAVE", "MATLAB", "SolidWorks"],
    intro:
      "FSAE cars must pass a sound test. I designed a muffler with two Helmholtz resonators tuned to the R6's firing frequency and its second harmonic, combined with a perforated tube and fiberglass absorption, then built the acoustic simulation to predict transmission loss.",
    sections: [
      {
        heading: "Simulation",
        bullets: [
          "Ansys Harmonic Acoustics with shared topology, Johnson-Champoux-Allard porous model for the fiberglass, and anechoic boundaries.",
          "Built a MATLAB pipeline that turns crank-angle-resolved pressure data from Ricardo WAVE (Realis) into surface velocity boundary conditions.",
          "Tracked down simulation artifacts: inflated transmission loss, resonance nulls from coupled resonators and near-field probe placement.",
          "Benchmarked transmission loss against alternative designs.",
        ],
        figures: [
          { view: "A", src: img("lv04-a-muffler-model.jpg"), caption: "Muffler acoustic model in Ansys." },
          { view: "B", src: img("lv04-b-transmission-loss.jpg"), caption: "Transmission loss vs. frequency." },
        ],
      },
    ],
  },
  {
    id: "LV-05",
    title: "Amphibious robot shoulder and fin mechanism",
    shortTag: "HAVLab · 2025–26",
    header: "Villanova HAVLab · Amphibious Robot Project · Oct 2025 – May 2026",
    specs: [
      ["Shoulder axes", "3"],
      ["Range of motion and packaging", "All met"],
    ],
    tools: ["SolidWorks", "Ansys Fluent", "Dynamic mesh"],
    intro: "A turtle-inspired robot meant to swim and crawl. I worked on the shell, the shoulder joints and the fins that drive it.",
    sections: [
      {
        bullets: [
          "Modeled the shell, shoulder joints and fins with three-axis range of motion. Specified and ordered the parts.",
          "Tested the shoulder assembly on an out-of-water rig. It met every range-of-motion and packaging requirement.",
          "Set up and ran Ansys Fluent dynamic mesh simulations to predict fin reaction forces during swimming strokes.",
        ],
        figures: [
          { view: "A", src: img("lv05-a-test-rig.jpg"), caption: "Fin and shoulder assembly on the out-of-water test rig." },
          { view: "B", src: img("lv05-b-cad.jpg"), caption: "Shell, shoulder joints and fins in CAD." },
        ],
      },
    ],
  },
];

export const skills = [
  { category: "Simulation", value: "Ansys Fluent, Ansys Mechanical, Ansys Harmonic Acoustics, CFD, FEA, Ricardo WAVE" },
  { category: "Design and Mfg.", value: "SolidWorks, nTop, SpaceClaim, GD&T, DFM, carbon fiber layup and infusion" },
  { category: "Data and Controls", value: "MoTeC i2 and M1 Tune, MATLAB, PID tuning, Arduino, Python (PyAnsys)" },
];

export const leadership = [
  { role: "Lead Powertrain Engineer, VU18", text: "Leads a 20-person team and sets targets, budget and priorities across engine, cooling and drivetrain." },
  { role: "Philanthropy Chair, Sigma Nu (2025–26)", text: "Raised more than $20,000 for the B+ Foundation." },
];
