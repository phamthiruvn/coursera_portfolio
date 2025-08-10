/** @format */

const themePairs = {
  pink: ["#ffddf5ff", "#ea77a3ff"], // [lightColor, darkColor]
  orange: ["#fdf5b6ff", "#ffa600ff"],
  green: ["#ecfcafff", "#aba807ff"],
  blue: ["#9ae5faff", "#0083d4ff"],
};

let keys = Object.keys(themePairs);
let currentTheme = keys[Math.floor(Math.random() * keys.length)];

function colorSVG(obj) {
  const [lightColor, darkColor] = themePairs[currentTheme];
  const svgDoc = obj.contentDocument;
  if (svgDoc) {
    const isDarker = obj.classList.contains("darker");
    const fillColor = isDarker ? darkColor : lightColor;
    svgDoc
      .querySelectorAll("path")
      .forEach((p) => p.setAttribute("fill", fillColor));
  }
}

function applyTheme() {
  const [lightColor, darkColor] = themePairs[currentTheme];
  document.body.style.color = lightColor;
  document.body.style.backgroundColor = lightColor;

  // Apply to darker elements
  document.querySelectorAll(".darker").forEach((el) => {
    el.style.color = lightColor;
    if (!(el.tagName.toLowerCase() === "object")) {
      el.style.backgroundColor = darkColor;
      el.style.borderColor = lightColor;
    }
  });

  // Apply to lighter elements
  document.querySelectorAll(".lighter").forEach((el) => {
    el.style.color = darkColor;
    if (!(el.tagName.toLowerCase() === "object")) {
      el.style.backgroundColor = lightColor;
      el.style.borderColor = darkColor;
    }
  });

  // Update SVG colors
  document.querySelectorAll('object[id^="mySVG"]').forEach((obj) => {
    colorSVG(obj);
  });
}

function setTheme(themeName) {
  if (themePairs[themeName]) {
    currentTheme = themeName;
    applyTheme();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const svgObjects = document.querySelectorAll('object[id^="mySVG"]');
  svgObjects.forEach((obj) => {
    obj.addEventListener("load", () => {
      colorSVG(obj); // set color on initial load
    });
  });
  applyTheme();
});

// Helper: create icons div from text
function createIconsDiv(text) {
  const width = document.getElementById("skill").getBoundingClientRect().width;
  const softwares = text.split(",").map((s) => s.trim());
  const div = document.createElement("div");
  // Add <p>Tools</p> at the beginning
  const toolsLabel = document.createElement("p");
  toolsLabel.textContent = "Tools";
  div.appendChild(toolsLabel);

  div.classList.add("software-icons");

  softwares.forEach((name) => {
    const fileName = name.toLowerCase().replace(/\s+/g, "") + ".svg";
    const filePath = `icons/${fileName}`;

    const img = document.createElement("img");
    img.src = filePath;
    img.alt = name;
    img.width = width / 20;
    img.height = width / 20;
    img.classList.add("software-icon");

    div.appendChild(img);
  });

  return div;
}

// Helper: create original <p> from text
function createSoftwareP(text) {
  const p = document.createElement("p");
  p.classList.add("sorfware");
  p.textContent = text;
  return p;
}

// Initialize: store original <p> text in data attribute
document.querySelectorAll("#skill > div").forEach((skillDiv) => {
  const p = skillDiv.querySelector("p.sorfware");
  if (p) {
    skillDiv.dataset.softwareText = p.textContent;
  }

  skillDiv.addEventListener("click", (event) => {
    event.stopPropagation(); // Prevent document click from firing immediately

    if (skillDiv.classList.contains("selected")) {
      // Already selected, do nothing or toggle off if you want
      return;
    }

    // Select this div and unselect others
    document.querySelectorAll("#skill > div").forEach((d) => {
      if (d === skillDiv) {
        d.classList.add("selected");
        const p = d.querySelector("p.sorfware");
        if (p) {
          const iconsDiv = createIconsDiv(d.dataset.softwareText);
          p.replaceWith(iconsDiv);
        }
      } else {
        d.classList.remove("selected");
        const iconsDiv = d.querySelector(".software-icons");
        if (iconsDiv) {
          const p = createSoftwareP(d.dataset.softwareText);
          iconsDiv.replaceWith(p);
        }
      }
    });
  });
});

// Click outside to unselect all
document.addEventListener("click", () => {
  document.querySelectorAll("#skill > div.selected").forEach((div) => {
    div.classList.remove("selected");
    const iconsDiv = div.querySelector(".software-icons");
    if (iconsDiv) {
      const p = createSoftwareP(div.dataset.softwareText);
      iconsDiv.replaceWith(p);
    }
  });
});

// Click outside to unselect all
document.addEventListener("click", () => {
  document.querySelectorAll("#skill > div.selected").forEach((div) => {
    div.classList.remove("selected");
    const iconsDiv = div.querySelector(".software-icons");
    if (iconsDiv) {
      const p = createSoftwareP(div.dataset.softwareText);
      iconsDiv.replaceWith(p);
    }
  });
});

// Resize handler to update SVG icon sizes dynamically
window.addEventListener("resize", () => {
  const skillWidth = document
    .getElementById("skill")
    .getBoundingClientRect().width;
  document.querySelectorAll(".software-icons img").forEach((img) => {
    const newSize = skillWidth / 20;
    img.width = newSize;
    img.height = newSize;
  });

  document.querySelectorAll(".software-item img").forEach((img) => {
    const newSize = skillWidth / 10;
    img.width = newSize;
    img.height = newSize;
  });
});

const softwareSkills = [
  { name: "Photoshop", value: 80 },
  { name: "Illustrator", value: 80 },
  { name: "InDesign", value: 50 },
  { name: "AfterEffects", value: 55 },
  { name: "PowerPoint", value: 80 },
  { name: "JavaScript", value: 60 },
  { name: "HTML", value: 70 },
  { name: "CSS", value: 70 },
  { name: "Blender", value: 25 },
  { name: "Cinema4D", value: 45 },
];

function getSkillSoftwares() {
  const skills = document.querySelectorAll('div[id^="skill-"]');
  const skillSoftwares = {};

  skills.forEach((skillDiv) => {
    const skillId = skillDiv.id; // e.g. "skill-1"
    const p = skillDiv.querySelector("p.sorfware");
    if (p) {
      // Get text, split by comma, trim whitespace
      const softwares = p.textContent
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      skillSoftwares[skillId] = softwares;
    }
  });

  return skillSoftwares;
}

const skillSoftwares = getSkillSoftwares();

function getSoftwareValue(name) {
  const skill = softwareSkills.find((s) => s.name === name);
  return skill ? skill.value : 0;
}

const loadingDivs = document.querySelectorAll('div[class^="loading-"]');

loadingDivs.forEach((div) => {
  // Get skill id from parent div id (e.g. skill-1)
  const skillId = div.parentElement.id;
  const softwares = skillSoftwares[skillId] || [];

  // Calculate average skill value for this skill
  let total = 0;
  softwares.forEach((soft) => {
    total += getSoftwareValue(soft);
  });
  const skillNumber = parseInt(skillId.split("-")[1], 10); // extract number from skill-3 → 3

  let avg = softwares.length ? total / softwares.length : 0;

  // subtract square of skill number
  avg = avg - skillNumber ** 2;

  // optionally, clamp avg to minimum 0 so it doesn't go negative
  avg = Math.max(avg, 0);
  // Map average (0-100) to percent for clip-path
  const percent = avg; // direct mapping, or you can adjust scale

  // Apply clip-path to loading div
  div.style.clipPath = `polygon(0 0, ${percent}% 0, ${percent}% 100%, 0 100%)`;
});

const container = document.getElementById("sorfware-0");

softwareSkills.forEach(({ name, value }) => {
  const div = document.createElement("div");
  div.classList.add("software-item");
  div.classList.add("darker"); // apply darker theme
  div.style.position = 'relative';  // needed for absolute positioning children

  // Create img for software icon
  const img = document.createElement("img");
  const fileName = name.toLowerCase().replace(/\s+/g, "") + ".svg";
  img.src = `icons/${fileName}`;
  img.alt = name;
  img.style.position = 'relative';  // keep on top

  // Create circular overlay div with clip-path
  const circleDiv = document.createElement("div");
  circleDiv.classList.add("circle-shape");
  console.log(value);
  circleDiv.style.clipPath = angleToClipPath(value * 3.6);

  // Create <p> to display value
  const valueP = document.createElement("p");
  valueP.classList.add("value-style");
  
  valueP.textContent = value +'%';

  // Append elements
  div.appendChild(img);
  div.appendChild(circleDiv);
  div.appendChild(valueP);

  container.appendChild(div);
});

function angleToClipPath(angle) {
  // clamp angle
  angle = Math.max(0, Math.min(angle, 360));

  // Define perimeter points in order (every 45°)
  const points = [
    [100, 0],   // 0°    top-right corner
    [100, 50],  // 45°   mid-right edge
    [100, 100], // 90°   bottom-right corner
    [50, 100],  // 135°  mid-bottom edge
    [0, 100],   // 180°  bottom-left corner
    [0, 50],    // 225°  mid-left edge
    [0, 0],     // 270°  top-left corner
    [50, 0],    // 315°  mid-top edge
    [100, 0]    // 360°  back to top-right corner (close loop)
  ];

  // Determine sector and remainder within 45° slice
  const sector = Math.floor(angle / 45);
  const remainder = angle % 45;

  // Get start and end points for interpolation
  const start = points[sector];
  const end = points[sector + 1];

  // Linear interpolate between start and end
  const interp = remainder / 45;
  const interpX = start[0] + (end[0] - start[0]) * interp;
  const interpY = start[1] + (end[1] - start[1]) * interp;

  // Build polygon points:
  // Start with top-right corner (100 0)
  // Add all full points up to sector (exclusive first point)
  // Add interpolated point
  // Add center point (50 50)
  let polygonPoints = ['100% 0%'];

  // Add all full points after first point up to sector
  for (let i = 1; i <= sector; i++) {
    polygonPoints.push(points[i][0] + '% ' + points[i][1] + '%');
  }

  // Add interpolated point
  polygonPoints.push(interpX + '% ' + interpY + '%');

  // Add center
  polygonPoints.push('50% 50%');

  // Return clip-path polygon string
  return `polygon(${polygonPoints.join(', ')})`;
}