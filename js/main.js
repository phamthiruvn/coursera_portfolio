/** @format */

// Theme color pairs for light/dark variants
const themePairs = {
  pink: ["#ffddf5ff", "#ea77a3ff"],
  orange: ["#f3e6c6ff", "#e3980cff"],
  green: ["#ecfcafff", "#aba807ff"],
  blue: ["#b5e4f1ff", "#0083d4ff"],
};

let currentTheme = "pink";

// Colors SVG <object> elements based on theme and class
function colorSVG(obj) {
  const [lightColor, darkColor] = themePairs[currentTheme];
  const svgDoc = obj.contentDocument;
  if (!svgDoc) return;
  const fillColor = obj.classList.contains("darker") ? darkColor : lightColor;
  svgDoc.querySelectorAll("path").forEach((p) => p.setAttribute("fill", fillColor));
}

// Applies theme colors to page elements
function applyTheme() {
  const [lightColor, darkColor] = themePairs[currentTheme];
  document.body.style.color = lightColor;
  document.body.style.backgroundColor = lightColor;

  document.querySelectorAll(".darker").forEach((el) => {
    el.style.color = lightColor;
    if (el.tagName.toLowerCase() !== "object") {
      el.style.backgroundColor = darkColor;
      el.style.borderColor = lightColor;
    }
  });

  document.querySelectorAll(".lighter").forEach((el) => {
    el.style.color = darkColor;
    if (el.tagName.toLowerCase() !== "object") {
      el.style.backgroundColor = lightColor;
      el.style.borderColor = darkColor;
    }
  });

  document.querySelectorAll('object[id^="mySVG"]').forEach(colorSVG);
}

// Sets the current theme and applies it
function setTheme(themeName) {
  if (themePairs[themeName]) {
    currentTheme = themeName;
    applyTheme();
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
document.addEventListener("click", (e) => {
  if (e.target.closest(".side-bar")) {
    startAnimation(100);
    return;
  }
  document.querySelectorAll("#skill > div.selected").forEach((div) => {
    div.classList.remove("selected");
    const iconsDiv = div.querySelector(".software-icons");
    if (iconsDiv)
      iconsDiv.replaceWith(createSoftwareP(div.dataset.softwareText));
  });
  animateLines(speed);
});

// Resizes icons on window resize
window.addEventListener("resize", () => {
  const skillWidth = document.getElementById("skill").getBoundingClientRect().width;
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
      ? softwares.reduce((sum, soft) => sum + getSoftwareValue(soft), 0) / softwares.length - skillNumber ** 2
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

let speed = 0.05; // animation speed (0 < speed <= 1)

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

  softwareSkills.forEach(({ name, value }) => {
    const el = document.getElementById(`software-${name.toLowerCase().replace(/\s+/g, "")}`);
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

  skillDivs.forEach((div) => {
    div.addEventListener("click", () => {
      if (!div.classList.contains("visualized")) return;
      startAnimation(speed);
    });
  });
});

// Gets center coordinates for skills and softwares, and their mapping
function getCentersWithMapping() {
  const container = document.getElementById("skill-sorfwares");
  const containerRect = container.getBoundingClientRect();

  const skills = Array.from(container.querySelectorAll('[id^="skill-"]'))
    .map((el) => {
      if (el.classList.contains("selected")) {
        const rect = el.getBoundingClientRect();
        return [
          el.id.replace(/^skill-/, ""),
          rect.right - containerRect.left - rect.width / 2,
          rect.top - containerRect.top + rect.height / 2,
        ];
      }
      return null;
    })
    .filter(Boolean);

  const softwares = Array.from(container.querySelectorAll('[id^="software-"]')).map((el) => {
    const rect = el.getBoundingClientRect();
    return [
      el.id.replace(/^software-/, ""),
      rect.left - containerRect.left,
      rect.top - containerRect.top + rect.height / 2,
    ];
  });
  return { skills, softwares };
}

let mapping = {};

function afterMappingReady() {}

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("skill-sorfwares");
  const mapArray = Array.from(container.querySelectorAll('[id^="skill-"]')).map((skillEl) => {
    const skillId = skillEl.id.replace(/^skill-/, "");
    const linkedSoftwareIds = (skillEl.getAttribute("data-software-text") || "")
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);
    return [skillId.toLowerCase(), linkedSoftwareIds];
  });

  mapping = {};
  mapArray.forEach(([key, value]) => {
    mapping[key] = value;
  });

  afterMappingReady();
});

// Animates drawing lines/arrows between skills and softwares
function animateLines(s) {
  const { skills, softwares } = getCentersWithMapping();
  const canvas = document.getElementById("skill-lines");
  const ctx = canvas.getContext("2d");
  const container = document.getElementById("skill-sorfwares");
  const containerRect = container.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  canvas.width = containerRect.width * dpr;
  canvas.height = containerRect.height * dpr;
  canvas.style.width = containerRect.width + "px";
  canvas.style.height = containerRect.height + "px";
  const headLength = containerRect.width / 200;

  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const lines = [];
  const skillCenter = skills[0];
  const softwareIds = mapping[skillCenter[0]];
  const color = darkenColor(themePairs[currentTheme][0], 20);

  softwareIds.forEach((softwareId) => {
    const softwareCenter = softwares.find((s) => s[0] === softwareId);
    lines.push({
      from: { x: skillCenter[1], y: skillCenter[2] },
      to: { x: softwareCenter[1], y: softwareCenter[2] },
      color,
    });
  });

  let currentLine = 0;
  let progress = 0;
  const speed = s;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = containerRect.width / 500;
    ctx.lineCap = "round";

    for (let i = 0; i < currentLine; i++) {
      const line = lines[i];
      ctx.strokeStyle = line.color;
      drawArrow(ctx, line.from.x, line.from.y, line.to.x, line.to.y, headLength);
    }

    if (currentLine < lines.length) {
      const line = lines[currentLine];
      const x = line.from.x + (line.to.x - line.from.x) * progress;
      const y = line.from.y + (line.to.y - line.from.y) * progress;
      ctx.strokeStyle = line.color;
      drawOrganicArrow(ctx, line.from.x, line.from.y, x, y, headLength);
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

function drawOrganicArrow(ctx, fromX, fromY, toX, toY, headLength, segments = 10, amp = 10) {
  const dx = (toX - fromX) / segments;
  const dy = (toY - fromY) / segments;
  ctx.beginPath();
  ctx.moveTo(fromX, fromY);

  for (let i = 1; i < segments; i++) {
    const t = i / segments;
    const x = fromX + dx * i;
    const y = fromY + dy * i;
    const noiseAmp = amp * Math.sin(t * Math.PI);
    const offsetX = (Math.random() - 0.25) * noiseAmp;
    const offsetY = (Math.random() - 0.25) * noiseAmp;
    ctx.lineTo(x + offsetX, y + offsetY);
  }

  ctx.lineTo(toX, toY);
  ctx.stroke();
  drawArrowhead(ctx, fromX, fromY, toX, toY, headLength);
}

function drawArrowhead(ctx, fromX, fromY, toX, toY, headLength) {
  const angle = Math.atan2(toY - fromY, toX - fromX);
  ctx.beginPath();
  ctx.moveTo(toX, toY);
  ctx.lineTo(
    toX - headLength * Math.cos(angle - Math.PI / 6),
    toY - headLength * Math.sin(angle - Math.PI / 6)
  );
  ctx.moveTo(toX, toY);
  ctx.lineTo(
    toX - headLength * Math.cos(angle + Math.PI / 6),
    toY - headLength * Math.sin(angle + Math.PI / 6)
  );
  ctx.stroke();
}

function drawArrow(ctx, fromX, fromY, toX, toY, headLength) {
  const dx = toX - fromX;
  const dy = toY - fromY;
  const angle = Math.atan2(dy, dx);

  ctx.beginPath();
  ctx.moveTo(fromX, fromY);
  ctx.lineTo(toX, toY);
  ctx.stroke();

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
  ctx.fillStyle = ctx.strokeStyle;
  ctx.fill();
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
  startAnimation(100);
});

const likeInfo = document.getElementById("like-info");

likeInfo.addEventListener("click", (e) => {
  const btn = e.currentTarget;
  btn.classList.remove("heartbeat");
  void btn.offsetWidth;
  btn.classList.add("heartbeat");
  setTimeout(() => {
    createHeartBurst(btn);
  }, 100);
});

function createHeartBurst(element) {
  const rect = element.getBoundingClientRect();
  const count = Math.round(Math.random() * 10);

  const centerX = rect.left + window.scrollX + rect.width / 2;
  const centerY = rect.top + window.scrollY + rect.height / 2;

  for (let i = 0; i < count; i++) {
    const heart = document.createElement("span");
    heart.className = "flying-heart";
    heart.textContent = "❤︎";
    const size = Math.max(12, rect.width * 0.25) * (0.8 + Math.random());
    const dx = (Math.random() - 0.5) * size * 5;
    const duration = 300 + Math.random() * 1200 + "ms";
    heart.style.left = centerX - size / 2 + "px";
    heart.style.top = centerY - size / 2 + "px";
    heart.style.fontSize = size + "px";
    heart.style.color = themePairs[currentTheme][1];
    heart.style.filter = `saturate(${1 + Math.random() * 2})`;
    heart.style.setProperty("--dx", dx + "px");
    heart.style.setProperty("--duration", duration);
    document.body.appendChild(heart);
    requestAnimationFrame(() => heart.classList.add("animate"));
    heart.addEventListener("animationend", () => heart.remove());
  }
  element.classList.remove("heartbeat");
  void element.offsetWidth;
  element.classList.add("heartbeat");
}

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href").slice(1);
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      const offset = window.innerHeight / 20;
      const elementPosition = targetEl.getBoundingClientRect().top + window.pageYOffset;
      const scrollToPosition = elementPosition - offset;
      window.scrollTo({
        top: scrollToPosition,
        behavior: "smooth",
      });
    }
  });
});

const backHome = document.getElementById("back-home");

window.addEventListener("scroll", () => {
  if (window.scrollY > window.innerHeight / 20) {
    backHome.classList.add("scrolled");
  } else {
    backHome.classList.remove("scrolled");
  }
});

backHome.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

function darkenColor(color, percent) {
  if (color.startsWith("#")) {
    let r, g, b;
    if (color.length === 4) {
      r = parseInt(color[1] + color[1], 16);
      g = parseInt(color[2] + color[2], 16);
      b = parseInt(color[3] + color[3], 16);
    } else {
      r = parseInt(color[1] + color[2], 16);
      g = parseInt(color[3] + color[4], 16);
      b = parseInt(color[5] + color[6], 16);
    }
    return darkenRGB(r, g, b, percent);
  }
  const rgbMatch = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  if (rgbMatch) {
    return darkenRGB(+rgbMatch[1], +rgbMatch[2], +rgbMatch[3], percent);
  }
  throw new Error("Unsupported color format: " + color);
}

function darkenRGB(r, g, b, percent) {
  const factor = 1 - percent / 100;
  r = Math.round(r * factor);
  g = Math.round(g * factor);
  b = Math.round(b * factor);
  return `rgb(${r}, ${g}, ${b})`;
}

function alignAndClipAvatar() {
  const svgObject = document.getElementById("mySVG1");
  const avatar = document.getElementById("avatar");
  if (!svgObject.contentDocument) return;
  if (!avatar.naturalWidth || !avatar.naturalHeight) return;
  const rect = svgObject.getBoundingClientRect();
  const imgRatio = avatar.naturalWidth / avatar.naturalHeight;
  const svgRatio = rect.width / rect.height;
  let width, height;
  if (imgRatio > svgRatio) {
    height = rect.height;
    width = height * imgRatio;
  } else {
    width = rect.width;
    height = width / imgRatio;
  }
  avatar.style.width = width + "px";
  avatar.style.height = height + "px";
  const pathData = getClip(svgObject, avatar);
  if (pathData) {
    avatar.style.clipPath = `path("${pathData}")`;
    avatar.style.webkitClipPath = `path("${pathData}")`;
  }
}

function getClip(svgObject, avatar) {
  const svgDoc = svgObject.contentDocument;
  if (!svgDoc) return null;
  const svgEl = svgDoc.querySelector('svg');
  const pathEl = svgDoc.querySelector('path');
  if (!svgEl || !pathEl) return null;
  const d = pathEl.getAttribute('d');
  const vb = svgEl.viewBox.baseVal;
  const svgRect = svgObject.getBoundingClientRect();
  const avatarRect = avatar.getBoundingClientRect();
  const targetW = svgRect.width;
  const targetH = svgRect.height;
  const offsetX = svgRect.left - avatarRect.left;
  const offsetY = svgRect.top  - avatarRect.top;
  return scalePathToPixels(d, vb.x, vb.y, vb.width, vb.height, targetW, targetH, offsetX, offsetY);
}

function scalePathToPixels(d, vbX, vbY, vbW, vbH, targetW, targetH, offsetX = 0, offsetY = 0) {
  const sx = targetW / vbW;
  const sy = targetH / vbH;
  const tokens = d.match(/[a-zA-Z]|-?\d*\.?\d+(?:e[-+]?\d+)?/g);
  if (!tokens) return d;
  let i = 0, out = '', cmd = '';
  const isCmd = (t) => /^[a-zA-Z]$/.test(t);
  const fmt = (n) => (Math.round(n * 100) / 100).toString();
  const num = () => parseFloat(tokens[i++]);
  const writePairs = (count, mapAbs, mapRel) => {
    while (i < tokens.length && !isCmd(tokens[i])) {
      const vals = [];
      for (let k = 0; k < count; k++) vals.push(num());
      const abs = cmd === cmd.toUpperCase();
      const mapped = abs ? mapAbs(vals) : mapRel(vals);
      out += mapped.join(' ') + ' ';
    }
  };
  while (i < tokens.length) {
    if (isCmd(tokens[i])) {
      cmd = tokens[i++];
      out += cmd + ' ';
    }
    switch (cmd) {
      case 'M': case 'L': case 'T':
      case 'm': case 'l': case 't':
        writePairs(2,
          ([x, y]) => [fmt(offsetX + (x - vbX) * sx), fmt(offsetY + (y - vbY) * sy)],
          ([dx, dy]) => [fmt(dx * sx), fmt(dy * sy)]
        );
        break;
      case 'H': case 'h':
        writePairs(1,
          ([x]) => [fmt(offsetX + (x - vbX) * sx)],
          ([dx]) => [fmt(dx * sx)]
        );
        break;
      case 'V': case 'v':
        writePairs(1,
          ([y]) => [fmt(offsetY + (y - vbY) * sy)],
          ([dy]) => [fmt(dy * sy)]
        );
        break;
      case 'C': case 'c':
        writePairs(6,
          ([x1,y1,x2,y2,x,y]) => [
            fmt(offsetX + (x1 - vbX) * sx), fmt(offsetY + (y1 - vbY) * sy),
            fmt(offsetX + (x2 - vbX) * sx), fmt(offsetY + (y2 - vbY) * sy),
            fmt(offsetX + (x  - vbX) * sx), fmt(offsetY + (y  - vbY) * sy)
          ],
          ([dx1,dy1,dx2,dy2,dx,dy]) => [
            fmt(dx1 * sx), fmt(dy1 * sy),
            fmt(dx2 * sx), fmt(dy2 * sy),
            fmt(dx  * sx), fmt(dy  * sy)
          ]
        );
        break;
      case 'S': case 's':
        writePairs(4,
          ([x2,y2,x,y]) => [
            fmt(offsetX + (x2 - vbX) * sx), fmt(offsetY + (y2 - vbY) * sy),
            fmt(offsetX + (x  - vbX) * sx), fmt(offsetY + (y  - vbY) * sy)
          ],
          ([dx2,dy2,dx,dy]) => [
            fmt(dx2 * sx), fmt(dy2 * sy),
            fmt(dx  * sx), fmt(dy  * sy)
          ]
        );
        break;
      case 'Q': case 'q':
        writePairs(4,
          ([x1,y1,x,y]) => [
            fmt(offsetX + (x1 - vbX) * sx), fmt(offsetY + (y1 - vbY) * sy),
            fmt(offsetX + (x  - vbX) * sx), fmt(offsetY + (y  - vbY) * sy)
          ],
          ([dx1,dy1,dx,dy]) => [
            fmt(dx1 * sx), fmt(dy1 * sy),
            fmt(dx  * sx), fmt(dy  * sy)
          ]
        );
        break;
      case 'A': case 'a':
        while (i < tokens.length && !isCmd(tokens[i])) {
          const rx = num(), ry = num(), rot = num(), laf = num(), sf = num(), x = num(), y = num();
          if (cmd === 'A') {
            out += [
              fmt(Math.abs(rx) * sx), fmt(Math.abs(ry) * sy), fmt(rot), fmt(laf), fmt(sf),
              fmt(offsetX + (x - vbX) * sx), fmt(offsetY + (y - vbY) * sy)
            ].join(' ') + ' ';
          } else {
            out += [
              fmt(Math.abs(rx) * sx), fmt(Math.abs(ry) * sy), fmt(rot), fmt(laf), fmt(sf),
              fmt(x * sx), fmt(y * sy)
            ].join(' ') + ' ';
          }
        }
        break;
      case 'Z': case 'z':
        break;
      default:
        while (i < tokens.length && !isCmd(tokens[i])) out += tokens[i++] + ' ';
        break;
    }
  }
  return out.trim();
}

function setupAlignment() {
  const svgObject = document.getElementById("mySVG1");
  const avatar = document.getElementById("avatar");
  let svgReady = false;
  let imgReady = false;
  function tryAlign() {
    if (svgReady && imgReady) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          alignAndClipAvatar();
          avatar.style.opacity = 1;
        });
      });
    }
  }
  function markSvgReady() {
    svgReady = true;
    tryAlign();
  }
  function markImgReady() {
    imgReady = true;
    tryAlign();
  }
  svgObject.addEventListener("load", markSvgReady);
  avatar.addEventListener("load", markImgReady);
  if (avatar.complete) imgReady = true;
  if (svgObject.contentDocument) svgReady = true;
  tryAlign();
  const observer = new MutationObserver(() => {
    svgReady = false;
    imgReady = false;
  });
  observer.observe(svgObject, { attributes: true, attributeFilter: ["data"] });
  observer.observe(avatar, { attributes: true, attributeFilter: ["src"] });
}

window.addEventListener("load", setupAlignment);
window.addEventListener("resize", alignAndClipAvatar);
