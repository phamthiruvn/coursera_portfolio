/** @format */

// Theme color pairs for light/dark variants
const themePairs = {
  pink: ["#ffddf5ff", "#ea77a3ff"],
  orange: ["#fdf5b6ff", "#ffa600ff"],
  green: ["#ecfcafff", "#aba807ff"],
  blue: ["#9ae5faff", "#0083d4ff"],
};

let currentTheme = "pink";

// Colors SVG <object> elements based on theme and class
function colorSVG(obj) {
  const [lightColor, darkColor] = themePairs[currentTheme];
  const svgDoc = obj.contentDocument;
  if (svgDoc) {
    const fillColor = obj.classList.contains("darker") ? darkColor : lightColor;
    svgDoc
      .querySelectorAll("path")
      .forEach((p) => p.setAttribute("fill", fillColor));
  }
}

// Applies theme colors to page elements
function applyTheme() {
  const [lightColor, darkColor] = themePairs[currentTheme];
  document.body.style.color = lightColor;
  document.body.style.backgroundColor = lightColor;

  // Style elements with .darker class
  document.querySelectorAll(".darker").forEach((el) => {
    el.style.color = lightColor;
    if (el.tagName.toLowerCase() !== "object") {
      el.style.backgroundColor = darkColor;
      el.style.borderColor = lightColor;
    }
  });

  // Style elements with .lighter class
  document.querySelectorAll(".lighter").forEach((el) => {
    el.style.color = darkColor;
    if (el.tagName.toLowerCase() !== "object") {
      el.style.backgroundColor = lightColor;
      el.style.borderColor = darkColor;
    }
  });

  // Color all SVG objects
  document.querySelectorAll('object[id^="mySVG"]').forEach(colorSVG);
}

// Sets the current theme and applies it
function setTheme(themeName) {
  if (themePairs[themeName]) {
    currentTheme = themeName;
    applyTheme();
    startAnimation(100); // max speed on resize to quickly redraw lines
  }
}

// On DOM ready, color SVGs and apply theme
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('object[id^="mySVG"]').forEach((obj) => {
    obj.addEventListener("load", () => colorSVG(obj));
  });
  applyTheme();
});

// Creates a div of software icons from a comma-separated string
function createIconsDiv(text) {
  const width = document.getElementById("skill").getBoundingClientRect().width;
  const softwares = text.split(",").map((s) => s.trim());
  const div = document.createElement("div");
  div.classList.add("software-icons");
  const toolsLabel = document.createElement("p");
  toolsLabel.textContent = "Tools";
  div.appendChild(toolsLabel);

  softwares.forEach((name) => {
    const fileName = name.toLowerCase().replace(/\s+/g, "") + ".svg";
    const img = document.createElement("img");
    img.src = `icons/${fileName}`;
    img.alt = name;
    img.width = img.height = width / 20;
    img.classList.add("software-icon");
    div.appendChild(img);
  });

  return div;
}

// Creates a <p> element for software text
function createSoftwareP(text) {
  const p = document.createElement("p");
  p.classList.add("sorfware");
  p.textContent = text;
  return p;
}

// Handles click events for skill divs to toggle icons/text
document.querySelectorAll("#skill > div").forEach((skillDiv) => {
  const p = skillDiv.querySelector("p.sorfware");
  if (p) skillDiv.dataset.softwareText = p.textContent;

  skillDiv.addEventListener("click", (event) => {
    event.stopPropagation();
    if (skillDiv.classList.contains("selected")) return;

    document.querySelectorAll("#skill > div").forEach((d) => {
      if (d === skillDiv) {
        d.classList.add("selected");
        const p = d.querySelector("p.sorfware");
        if (p) p.replaceWith(createIconsDiv(d.dataset.softwareText));
      } else {
        d.classList.remove("selected");
        const iconsDiv = d.querySelector(".software-icons");
        if (iconsDiv)
          iconsDiv.replaceWith(createSoftwareP(d.dataset.softwareText));
      }
    });
  });
});

// Deselects all skill divs on document click
document.addEventListener("click", () => {
  document.querySelectorAll("#skill > div.selected").forEach((div) => {
    div.classList.remove("selected");
    const iconsDiv = div.querySelector(".software-icons");
    if (iconsDiv)
      iconsDiv.replaceWith(createSoftwareP(div.dataset.softwareText));
  });
});

// Resizes icons on window resize
window.addEventListener("resize", () => {
  const skillWidth = document
    .getElementById("skill")
    .getBoundingClientRect().width;
  document.querySelectorAll(".software-icons img").forEach((img) => {
    img.width = img.height = skillWidth / 20;
  });
  document.querySelectorAll(".software-item img").forEach((img) => {
    img.width = img.height = skillWidth / 10;
  });
});

// List of software skills and their values
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

// Sort skills by value descending
softwareSkills.sort((a, b) => b.value - a.value);

// Gets mapping of skill divs to their software lists
function getSkillSoftwares() {
  const skills = document.querySelectorAll('div[id^="skill-"]');
  const skillSoftwares = {};
  skills.forEach((skillDiv) => {
    const p = skillDiv.querySelector("p.sorfware");
    if (p) {
      skillSoftwares[skillDiv.id] = p.textContent
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    }
  });
  return skillSoftwares;
}

const skillSoftwares = getSkillSoftwares();

// Gets the value for a software by name
function getSoftwareValue(name) {
  const skill = softwareSkills.find((s) => s.name === name);
  return skill ? skill.value : 0;
}

// Sets the clipPath for skill loading bars based on average software value
document.querySelectorAll('div[class^="loading-"]').forEach((div) => {
  const skillId = div.parentElement.id;
  const softwares = skillSoftwares[skillId] || [];
  const skillNumber = parseInt(skillId.split("-")[1], 10);
  const avg = Math.max(
    softwares.length
      ? softwares.reduce((sum, soft) => sum + getSoftwareValue(soft), 0) /
      softwares.length -
      skillNumber ** 2
      : 0,
    0
  );
  div.style.clipPath = `polygon(0 0, ${avg}% 0, ${avg}% 100%, 0 100%)`;
});

// Creates software skill items with icon, circle, and value
const container = document.getElementById("sorfware-0");

softwareSkills.forEach(({ name, value }) => {
  const div = document.createElement("div");
  div.classList.add("software-item", "darker");
  div.style.position = "relative";

  const img = document.createElement("img");
  img.src = `icons/${name.toLowerCase().replace(/\s+/g, "")}.svg`;
  img.alt = name;
  img.style.position = "relative";

  const circleDiv = document.createElement("div");
  circleDiv.classList.add("circle-shape");
  circleDiv.style.clipPath = angleToClipPath(value * 3.6);

  const valueP = document.createElement("p");
  valueP.classList.add("value-style");
  valueP.textContent = value + "/100";

  div.append(img, circleDiv, valueP);
  div.id = `software-${name.toLowerCase().replace(/\s+/g, "")}`;
  container.appendChild(div);
});

// Converts an angle to a CSS polygon clipPath for circular progress
function angleToClipPath(angle) {
  angle = Math.max(0, Math.min(angle, 360));
  const points = [
    [100, 0],
    [100, 50],
    [100, 100],
    [50, 100],
    [0, 100],
    [0, 50],
    [0, 0],
    [50, 0],
    [100, 0],
  ];
  const sector = Math.floor(angle / 45);
  const remainder = angle % 45;
  const start = points[sector];
  const end = points[sector + 1];
  const interp = remainder / 45;
  const interpX = start[0] + (end[0] - start[0]) * interp;
  const interpY = start[1] + (end[1] - start[1]) * interp;
  const polygonPoints = ["100% 0%"];
  for (let i = 1; i <= sector; i++)
    polygonPoints.push(points[i][0] + "% " + points[i][1] + "%");
  polygonPoints.push(interpX + "% " + interpY + "%", "50% 50%");
  return `polygon(${polygonPoints.join(", ")})`;
}

let speed = 0.1; // animation speed (0 < speed <= 1)

// Handles visualize button click to toggle visualization and animate lines
document.getElementById("visualize").addEventListener("click", () => {
  const skillDivs = document.querySelectorAll("#skill > div[id^='skill-']");
  const softwareDivs = document.querySelectorAll(".software-item");
  const skillLines = document.getElementById("skill-lines");

  skillLines.classList.toggle("visualized");

  skillDivs.forEach((div) => div.classList.toggle("visualized"));
  softwareDivs.forEach((div) => {
    div.classList.toggle("visualized");
    div.classList.toggle("darker");
    div.classList.toggle("lighter");
  });

  // Set width for visualized software items
  softwareSkills.forEach(({ name, value }) => {
    const el = document.getElementById(
      `software-${name.toLowerCase().replace(/\s+/g, "")}`
    );
    if (el) {
      if (el.classList.contains("visualized")) {
        el.style.width = value + "%";
      } else {
        el.style.width = "";
        el.style.height = "";
      }
    }
  });
  applyTheme();
  speed = 0.5; // reset speed for animation
  // Wait for layout update before animating
  if (skillLines.classList.contains("visualized")) {
    requestAnimationFrame(() => {
      setTimeout(() => animateLines(speed), 500);
    });
  }
  window.addEventListener("resize", () => {
    startAnimation(1); // max speed on resize to quickly redraw lines
  });
});

// Gets center coordinates for skills and softwares, and their mapping
function getCentersWithMapping() {
  const container = document.getElementById("skill-sorfwares");
  const containerRect = container.getBoundingClientRect();

  // Skill centers (middle right)
  const skills = Array.from(container.querySelectorAll('[id^="skill-"]')).map(
    (el) => {
      const rect = el.getBoundingClientRect();
      return [
        el.id.replace(/^skill-/, ""),
        rect.right - containerRect.left, // right edge x
        rect.top - containerRect.top + rect.height / 2, // vertical center y
      ];
    }
  );

  // Software centers (middle left)
  const softwares = Array.from(
    container.querySelectorAll('[id^="software-"]')
  ).map((el) => {
    const rect = el.getBoundingClientRect();
    return [
      el.id.replace(/^software-/, ""),
      rect.left - containerRect.left, // left edge x
      rect.top - containerRect.top + rect.height / 2, // vertical center y
    ];
  });

  // Mapping of skills to their software IDs
  const mapping = Array.from(container.querySelectorAll('[id^="skill-"]')).map(
    (skillEl) => {
      const skillId = skillEl.id.replace(/^skill-/, "");
      const linkedSoftwareIds = (
        skillEl.querySelector(".sorfware")?.textContent || ""
      )
        .split(",")
        .map((s) => s.trim().toLowerCase()) // normalize to lowercase
        .filter(Boolean);

      return [skillId.toLowerCase(), linkedSoftwareIds]; // also normalize skillId if needed
    }
  );

  return { skills, softwares, mapping };
}

// Draws an arrow from one point to another on canvas
function drawArrow(ctx, fromX, fromY, toX, toY, headLength) {
  const dx = toX - fromX;
  const dy = toY - fromY;
  const angle = Math.atan2(dy, dx);

  ctx.beginPath();
  ctx.moveTo(fromX, fromY);
  ctx.lineTo(toX, toY);
  ctx.stroke();

  // Draw arrowhead
  ctx.beginPath();
  ctx.moveTo(toX, toY);
  ctx.lineTo(
    toX - headLength * Math.cos(angle - Math.PI / 6),
    toY - headLength * Math.sin(angle - Math.PI / 6)
  );
  ctx.lineTo(
    toX - headLength * Math.cos(angle + Math.PI / 6),
    toY - headLength * Math.sin(angle + Math.PI / 6)
  );
  ctx.lineTo(toX, toY);
  ctx.fillStyle = ctx.strokeStyle; // match arrowhead color to line color
  ctx.fill();
}

// Animates drawing lines/arrows between skills and softwares
function animateLines(s) {
  const { skills, softwares, mapping } = getCentersWithMapping();
  const canvas = document.getElementById("skill-lines");
  const ctx = canvas.getContext("2d");

  const container = document.getElementById("skill-sorfwares");
  const containerRect = container.getBoundingClientRect();

  const dpr = window.devicePixelRatio || 1;
  canvas.width = containerRect.width * dpr;
  canvas.height = containerRect.height * dpr;
  canvas.style.width = containerRect.width + "px";
  canvas.style.height = containerRect.height + "px";
  const headLength = containerRect.width / 200; // arrowhead length

  ctx.scale(dpr, dpr);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Extract theme colors (e.g. first color of each pair)
  const themeColors = Object.values(themePairs).map((pair) => pair[0]);
  shuffleArray(themeColors); // optional shuffle for drawing order

  // Prepare all line segments to draw, assign color based on skillId
  const lines = [];

  mapping.forEach(([skillId, softwareIds]) => {
    const skillCenter = skills.find((s) => s[0] === skillId);
    if (!skillCenter) return;

    // Map skillId to a color index (mod by available colors)
    // If skillId is numeric string, convert to number
    const colorIndex = Number(skillId)
      ? (Number(skillId) - 1) % themeColors.length
      : 0;
    const color = themeColors[colorIndex];

    softwareIds.forEach((softwareId) => {
      const softwareCenter = softwares.find((s) => s[0] === softwareId);
      if (softwareCenter) {
        lines.push({
          from: { x: skillCenter[1], y: skillCenter[2] },
          to: { x: softwareCenter[1], y: softwareCenter[2] },
          color,
        });
      }
    });
  });

  shuffleArray(lines); // optional shuffle for drawing order

  let currentLine = 0;
  let progress = 0;
  const speed = s; // animation speed (0 < speed <= 1)

  // Draws lines one by one with animation
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = containerRect.width / 750; // line thickness
    ctx.lineCap = "round"; // round line ends

    // Draw fully completed lines with arrows
    for (let i = 0; i < currentLine; i++) {
      const line = lines[i];
      ctx.strokeStyle = line.color;
      drawArrow(
        ctx,
        line.from.x,
        line.from.y,
        line.to.x,
        line.to.y,
        headLength
      );
    }

    // Draw the current animating line with arrow
    if (currentLine < lines.length) {
      const line = lines[currentLine];
      const x = line.from.x + (line.to.x - line.from.x) * progress;
      const y = line.from.y + (line.to.y - line.from.y) * progress;

      ctx.strokeStyle = line.color;
      drawArrow(ctx, line.from.x, line.from.y, x, y, headLength);

      progress += speed;
      if (progress >= 1) {
        progress = 0;
        currentLine++;
      }
      requestAnimationFrame(draw);
    }
  }

  draw();
}

// Shuffles array in place (Fisher-Yates)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

let animationFrameId;

// Starts the line animation, cancels previous if running
function startAnimation(speed) {
  if (animationFrameId) cancelAnimationFrame(animationFrameId);
  animateLines(speed);
}

// Redraws lines on window resize
window.addEventListener("resize", () => {
  startAnimation(1); // max speed on resize to quickly redraw lines
});
