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
  svgDoc
    .querySelectorAll("path")
    .forEach((p) => p.setAttribute("fill", fillColor));
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

let speed = 0.05; // animation speed (0 < speed <= 1)

// Handles visualize button click to toggle visualization and animate lines
document.getElementById("visualize").addEventListener("click", () => {
  const skillDivs = document.querySelectorAll("#skill > div[id^='skill-']");
  const softwareDivs = document.querySelectorAll(".software-item");
  const skillLines = document.getElementById("skill-lines");
  skillLines.classList.toggle("visualized");

  skillDivs.forEach((div) => div.classList.toggle("visualized"));
  // skillDivs.forEach((div) => div.classList.remove("selected"));

  softwareDivs.forEach((div) => {
    div.classList.toggle("visualized");
    div.classList.toggle("darker");
    div.classList.toggle("lighter");
  });

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

  const softwares = Array.from(
    container.querySelectorAll('[id^="software-"]')
  ).map((el) => {
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
  const mapArray = Array.from(container.querySelectorAll('[id^="skill-"]')).map(
    (skillEl) => {
      const skillId = skillEl.id.replace(/^skill-/, "");
      const linkedSoftwareIds = (
        skillEl.getAttribute("data-software-text") || ""
      )
        .split(",")
        .map((s) => s.trim().toLowerCase())
        .filter(Boolean);
      return [skillId.toLowerCase(), linkedSoftwareIds];
    }
  );

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
  const softwareIds = mapping[skillCenter[0]] || [];
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
      drawArrow(
        ctx,
        line.from.x,
        line.from.y,
        line.to.x,
        line.to.y,
        headLength
      );
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

function drawOrganicArrow(
  ctx,
  fromX,
  fromY,
  toX,
  toY,
  headLength,
  segments = 10,
  amp = 10
) {
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

  // Restart animation
  btn.classList.remove("heartbeat");
  void btn.offsetWidth; // force reflow
  btn.classList.add("heartbeat");

  // Heart burst triggered right at the first big pulse (20% of anim time)
  setTimeout(() => {
    createHeartBurst(btn);
  }, 100); // 0.5s animation → 100ms hits ~20%
});

function createHeartBurst(element) {
  const rect = element.getBoundingClientRect();
  const count = Math.round(Math.random() * 10); // number of hearts per burst

  const centerX = rect.left + window.scrollX + rect.width / 2;
  const centerY = rect.top + window.scrollY + rect.height / 2;

  for (let i = 0; i < count; i++) {
    const heart = document.createElement("span");
    heart.className = "flying-heart";
    heart.textContent = "❤︎";

    // Size scales with button size
    const size = Math.max(12, rect.width * 0.25) * (0.8 + Math.random());
    const dx = (Math.random() - 0.5) * size * 5;
    const duration = 600 + Math.random() * 1200 + "ms";

    // Center position (with slight vertical nudge for visual balance)
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

  // Trigger heartbeat on button
  element.classList.remove("heartbeat");
  void element.offsetWidth; // restart CSS animation
  element.classList.add("heartbeat");
}

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault(); // stop default jump

    const targetId = link.getAttribute("href").slice(1); // remove #
    const targetEl = document.getElementById(targetId);

    if (targetEl) {
      const offset = window.innerHeight / 20; // 10vh offset in pixels
      const elementPosition =
        targetEl.getBoundingClientRect().top + window.pageYOffset;
      const scrollToPosition = elementPosition - offset;

      window.scrollTo({
        top: scrollToPosition,
        behavior: "smooth", // smooth scroll
      });
    }
  });
});

const backHome = document.getElementById("back-home");

window.addEventListener("scroll", () => {
  if (window.scrollY > window.innerHeight / 20) {
    backHome.classList.add("scrolled"); // Add class when shown (rotated 0°)
  } else {
    backHome.classList.remove("scrolled"); // Remove class when hidden (rotated -90°)
  }
});

backHome.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // for smooth scrolling
  });
});

function darkenColor(color, percent) {
  // Convert HEX to RGB if needed
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

  // If RGB format
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

  if (!svgObject.contentDocument) return; // SVG not loaded yet
  if (!avatar.naturalWidth || !avatar.naturalHeight) return; // image not loaded yet

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
          avatar.style.opacity = 1; // Fade in avatar
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

  // Event listeners (fires every time they reload)
  svgObject.addEventListener("load", markSvgReady);
  avatar.addEventListener("load", markImgReady);

  // Initial readiness check
  if (avatar.complete) imgReady = true;
  if (svgObject.contentDocument) svgReady = true;

  tryAlign();

  // Mutation observer to watch for src/data changes
  const observer = new MutationObserver(() => {
    svgReady = false;
    imgReady = false;
  });

  observer.observe(svgObject, { attributes: true, attributeFilter: ["data"] });
  observer.observe(avatar, { attributes: true, attributeFilter: ["src"] });
}

window.addEventListener("load", setupAlignment);
window.addEventListener("resize", alignAndClipAvatar);
