/** @format */

const themePairs = {
  pink: ["#ffddf5ff", "#d86cbaff"],
  orange: ["#f3e6c6ff", "#e3980cff"],
  green: ["#e5d9f0ff", "#7e57b4ff"],
  blue: ["#d5f3fcff", "#0083d4ff"],
};
let currentTheme =
  Object.keys(themePairs)[
    Math.floor(Math.random() * Object.keys(themePairs).length)
  ];

function colorSVG(e) {
  const [t, n] = themePairs[currentTheme],
    a = e.contentDocument;
  if (!a) return;
  const o = e.classList.contains("darker") ? n : t;
  a.querySelectorAll("path").forEach((e) => e.setAttribute("fill", o));
}

function setFaviconFromFile(e) {
  fetch("/icons/favicon.svg")
    .then((e) => e.text())
    .then((t) => {
      const n = t.replace(/<path /g, `<path fill="${e}" `),
        a = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(n);
      let o = document.querySelector("link[rel~='icon']");
      o ||
        ((o = document.createElement("link")),
        (o.rel = "icon"),
        document.head.appendChild(o)),
        (o.href = a);
    });
}

function applyTheme() {
  const [e, t] = themePairs[currentTheme];
  (document.body.style.color = e),
    (document.body.style.backgroundColor = e),
    setFaviconFromFile(t),
    document.querySelectorAll(".darker").forEach((n) => {
      (n.style.color = e),
        "object" !== n.tagName.toLowerCase() &&
          ((n.style.backgroundColor = t), (n.style.borderColor = e));
    }),
    document.querySelectorAll(".lighter").forEach((n) => {
      (n.style.color = t),
        "object" !== n.tagName.toLowerCase() &&
          ((n.style.backgroundColor = e), (n.style.borderColor = t));
    }),
    document.querySelectorAll('object[id^="mySVG"]').forEach(colorSVG);
}

function setTheme(e) {
  themePairs[e] && ((currentTheme = e), applyTheme());
}

function createIconsDiv(e) {
  const t = document.getElementById("skill").getBoundingClientRect().width,
    n = e.split(",").map((e) => e.trim()),
    a = document.createElement("div");
  a.classList.add("software-icons");
  const o = document.createElement("p");
  return (
    (o.textContent = "Tools"),
    a.appendChild(o),
    n.forEach((e) => {
      const n = e.toLowerCase().replace(/\s+/g, "") + ".svg",
        o = document.createElement("img");
      (o.src = `icons/${n}`),
        (o.alt = e),
        (o.width = o.height = t / 20),
        o.classList.add("software-icon"),
        a.appendChild(o);
    }),
    a
  );
}
function createSoftwareP(e) {
  const t = document.createElement("p");
  return t.classList.add("sorfware"), (t.textContent = e), t;
}
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('object[id^="mySVG"]').forEach((e) => {
    e.addEventListener("load", () => colorSVG(e));
  }),
    applyTheme();
}),
  document.querySelectorAll("#skill > div").forEach((e) => {
    const t = e.querySelector("p.sorfware");
    t && (e.dataset.softwareText = t.textContent),
      e.addEventListener("click", (t) => {
        t.stopPropagation(),
          e.classList.contains("selected") ||
            document.querySelectorAll("#skill > div").forEach((t) => {
              if (t === e) {
                t.classList.add("selected");
                const e = t.querySelector("p.sorfware");
                e && e.replaceWith(createIconsDiv(t.dataset.softwareText));
              } else {
                t.classList.remove("selected");
                const e = t.querySelector(".software-icons");
                e && e.replaceWith(createSoftwareP(t.dataset.softwareText));
              }
            });
      });
  });
const infoSections = document.querySelectorAll(
  "#my-info .job, #my-info .school, #my-info .certifications, #my-info .awards, .about-bio"
);
infoSections.forEach((e) => {
  e.addEventListener("click", (t) => {
    t.stopPropagation(),
      infoSections.forEach((t) => {
        t !== e && t.classList.remove("info-selected");
      }),
      e.classList.toggle("info-selected");
  });
}),
  document.addEventListener("click", (e) => {
    e.target.closest(".side-bar, #year-buttons", "#visualize") ||
      (document.querySelectorAll("#skill > div.selected").forEach((e) => {
        e.classList.remove("selected");
        const t = e.querySelector(".software-icons");
        t && t.replaceWith(createSoftwareP(e.dataset.softwareText));
      }),
      infoSections.forEach((t) => {
        t.classList.contains("info-selected") &&
          !t.contains(e.target) &&
          t.classList.remove("info-selected");
      })),
      startAnimation(100);
  }),
  window.addEventListener("resize", () => {
    const e = document.getElementById("skill").getBoundingClientRect().width;
    document.querySelectorAll(".software-icons img").forEach((t) => {
      t.width = t.height = e / 20;
    }),
      document.querySelectorAll(".software-item img").forEach((t) => {
        t.width = t.height = e / 10;
      });
  });
const softwareSkillsNow = [
    { name: "Photoshop", value: 80 },
    { name: "Illustrator", value: 80 },
    { name: "InDesign", value: 50 },
    { name: "AfterEffects", value: 55 },
    { name: "PowerPoint", value: 80 },
    { name: "JavaScript", value: 60 },
    { name: "HTML", value: 70 },
    { name: "CSS", value: 70 },
    { name: "Blender", value: 25 },
    { name: "Cinema4D", value: 30 },
    { name: "UK", value: 60 },
    { name: "RU", value: 70 },
  ],
  diffsByYear = {
    2023: [
      { name: "Photoshop", value: 80 },
      { name: "Illustrator", value: 80 },
      { name: "InDesign", value: 30 },
      { name: "AfterEffects", value: 45 },
      { name: "PowerPoint", value: 80 },
      { name: "JavaScript", value: 60 },
      { name: "HTML", value: 70 },
      { name: "CSS", value: 70 },
      { name: "Blender", value: 25 },
      { name: "Cinema4D", value: 25 },
      { name: "UK", value: 60 },
      { name: "RU", value: 70 },
    ],
    2021: [
      { name: "Photoshop", value: 70 },
      { name: "Illustrator", value: 70 },
      { name: "InDesign", value: 0 },
      { name: "AfterEffects", value: 30 },
      { name: "PowerPoint", value: 70 },
      { name: "JavaScript", value: 50 },
      { name: "HTML", value: 50 },
      { name: "CSS", value: 50 },
      { name: "Blender", value: 0 },
      { name: "Cinema4D", value: 15 },
      { name: "UK", value: 50 },
      { name: "RU", value: 70 },
    ],
    2018: [
      { name: "Photoshop", value: 50 },
      { name: "Illustrator", value: 50 },
      { name: "InDesign", value: 0 },
      { name: "AfterEffects", value: 20 },
      { name: "PowerPoint", value: 60 },
      { name: "JavaScript", value: 30 },
      { name: "HTML", value: 30 },
      { name: "CSS", value: 30 },
      { name: "Blender", value: 0 },
      { name: "Cinema4D", value: 0 },
      { name: "UK", value: 30 },
      { name: "RU", value: 50 },
    ],
  };
function sortSkills(e) {
  const t = e
      .map((e, t) => ({ skill: e, i: t }))
      .filter(({ skill: e }) => 2 === e.name.length),
    n = e.filter((e) => 2 !== e.name.length);
  return (
    n.sort((e, t) => t.value - e.value),
    t.forEach(({ skill: e, i: t }) => {
      n.splice(t, 0, e);
    }),
    n
  );
}
const years = [2018, 2021, 2023, 2025];
let currentYear = 2025,
  currentYearIndex = years.indexOf(currentYear),
  visualizedState = !1;
function getSkillsForYear(e) {
  return sortSkills(diffsByYear[e] ? diffsByYear[e] : softwareSkillsNow);
}
function getSkillSoftwares() {
  const e = document.querySelectorAll('div[id^="skill-"]'),
    t = {};
  return (
    e.forEach((e) => {
      const n = e.querySelector("p.sorfware");
      n &&
        (t[e.id] = n.textContent
          .split(",")
          .map((e) => e.trim())
          .filter(Boolean));
    }),
    t
  );
}
const skillSoftwares = getSkillSoftwares();
function getSoftwareValue(e) {
  const t = getSkillsForYear(currentYear).find((t) => t.name === e);
  return t ? t.value : 0;
}
function createYearCarousel() {
  const e = document.getElementById("year-buttons");
  e.innerHTML = "";
  const t = document.createElement("button");
  t.textContent = "◀";
  const n = document.createElement("span");
  (n.id = "year-label"), (n.textContent = currentYear);
  const a = document.createElement("button");
  function o() {
    0 === currentYearIndex
      ? ((t.style.opacity = "0"), (t.style.pointerEvents = "none"))
      : ((t.style.opacity = "1"), (t.style.pointerEvents = "auto")),
      currentYearIndex === years.length - 1
        ? ((a.style.opacity = "0"), (a.style.pointerEvents = "none"))
        : ((a.style.opacity = "1"), (a.style.pointerEvents = "auto"));
  }
  (a.textContent = "▶"),
    t.addEventListener("click", () => {
      currentYearIndex > 0 &&
        (currentYearIndex--,
        (currentYear = years[currentYearIndex]),
        updateYearDisplay(),
        o());
    }),
    a.addEventListener("click", () => {
      currentYearIndex < years.length - 1 &&
        (currentYearIndex++,
        (currentYear = years[currentYearIndex]),
        updateYearDisplay(),
        o());
    }),
    e.append(t, n, a),
    o();
}
function updateYearDisplay() {
  (document.getElementById("year-label").textContent = currentYear),
    renderSoftwareSkills(currentYear);
}
function renderSoftwareSkills(e) {
  const t = document.getElementById("sorfware-0");
  t.innerHTML = "";
  const n = document.querySelectorAll('[id^="skill-"]');
  getSkillsForYear(e).forEach(({ name: e, value: n }) => {
    const a = e.toLowerCase().replace(/\s+/g, ""),
      o = document.createElement("div");
    if (
      (o.classList.add("software-item"),
      (o.style.position = "relative"),
      0 == n)
    )
      return;
    const r = document.createElement("img");
    (r.src = `icons/${a}.svg`), (r.alt = e);
    const l = document.createElement("div");
    l.classList.add("circle-shape"),
      (l.style.clipPath = angleToClipPath(3.6 * n));
    const i = document.createElement("p");
    i.classList.add("value-style"),
      (i.textContent = n + "/100"),
      o.append(r, l, i),
      (o.id = `software-${a}`),
      visualizedState
        ? (o.classList.add("visualized", "lighter"),
          (o.style.width = n + "%"),
          0 == n && (o.style.display = "none"))
        : (o.classList.add("darker"), (o.style.width = "90%")),
      t.appendChild(o);
  }),
    Array.from(n).find(
      (e) => "DIV" === e.tagName && e.classList.contains("selected")
    ) && startAnimation(speed),
    visualizedState ||
      document.querySelectorAll('div[class^="loading-"]').forEach((e) => {
        const t = e.parentElement.id,
          n = skillSoftwares[t] || [],
          a = Math.max(
            n.length
              ? n.reduce((e, t) => e + getSoftwareValue(t), 0) / n.length
              : 0,
            0
          );
        e.style.clipPath = `polygon(0 0, ${a}% 0, ${a}% 100%, 0 100%)`;
      }),
    applyTheme();
}
function toggleVisualization(e) {
  const t = document.getElementById("skill-lines"),
    n = document.querySelectorAll("#skill > div[id^='skill-']");
  (visualizedState = !visualizedState),
    t.classList.toggle("visualized"),
    n.forEach((e) => e.classList.toggle("visualized")),
    renderSoftwareSkills(e),
    n.forEach((e) => {
      e.addEventListener("click", () => {
        e.classList.contains("visualized") && startAnimation(speed);
      });
    });
}
function angleToClipPath(e) {
  e = Math.max(0, Math.min(e, 360));
  const t = [
      [100, 0],
      [100, 50],
      [100, 100],
      [50, 100],
      [0, 100],
      [0, 50],
      [0, 0],
      [50, 0],
      [100, 0],
    ],
    n = Math.floor(e / 45),
    a = t[n],
    o = t[n + 1],
    r = (e % 45) / 45,
    l = a[0] + (o[0] - a[0]) * r,
    i = a[1] + (o[1] - a[1]) * r,
    s = ["100% 0%"];
  for (let e = 1; e <= n; e++) s.push(t[e][0] + "% " + t[e][1] + "%");
  return s.push(l + "% " + i + "%", "50% 50%"), `polygon(${s.join(", ")})`;
}
createYearCarousel(),
  renderSoftwareSkills(currentYear),
  document.getElementById("visualize").addEventListener("click", () => {
    toggleVisualization(currentYear);
  });
let speed = 0.05;
function getCentersWithMapping() {
  const e = document.getElementById("skill-sorfwares"),
    t = e.getBoundingClientRect();
  return {
    skills: Array.from(e.querySelectorAll('[id^="skill-"]'))
      .map((e) => {
        if (e.classList.contains("selected")) {
          const n = e.getBoundingClientRect();
          return [
            e.id.replace(/^skill-/, ""),
            n.right - t.left - n.width / 2,
            n.top - t.top + n.height / 2,
          ];
        }
        return null;
      })
      .filter(Boolean),
    softwares: Array.from(e.querySelectorAll('[id^="software-"]'))
      .filter((e) => "none" !== window.getComputedStyle(e).display)
      .map((e) => {
        const n = e.getBoundingClientRect();
        return [
          e.id.replace(/^software-/, ""),
          n.left - t.left,
          n.top - t.top + n.height / 2,
        ];
      }),
  };
}
let animationFrameId,
  mapping = {};
function afterMappingReady() {}
function animateLines(e) {
  const { skills: t, softwares: n } = getCentersWithMapping(),
    a = document.getElementById("skill-lines"),
    o = a.getContext("2d"),
    r = document.getElementById("skill-sorfwares").getBoundingClientRect(),
    l = window.devicePixelRatio || 1;
  (a.width = r.width * l),
    (a.height = r.height * l),
    (a.style.width = r.width + "px"),
    (a.style.height = r.height + "px");
  const i = r.width / 200;
  o.scale(l, l), o.clearRect(0, 0, a.width, a.height);
  const s = [];
  if (!t[0]) return null;
  const c = t[0],
    d = n.filter((e) => new Set(mapping[c[0]] || []).has(e[0])),
    u = darkenColor(themePairs[currentTheme][0], 5);
  d.forEach((e) => {
    const t = n.find((t) => t[0] === e[0]);
    s.push({ from: { x: c[1], y: c[2] }, to: { x: t[1], y: t[2] }, color: u });
  });
  let h = 0,
    m = 0;
  const g = e;
  !(function e() {
    o.clearRect(0, 0, a.width, a.height),
      (o.lineWidth = r.width / 500),
      (o.lineCap = "round");
    for (let e = 0; e < h; e++) {
      const t = s[e];
      (o.strokeStyle = t.color),
        drawArrow(o, t.from.x, t.from.y, t.to.x, t.to.y, i);
    }
    if (h < s.length) {
      const t = s[h],
        n = t.from.x + (t.to.x - t.from.x) * m,
        a = t.from.y + (t.to.y - t.from.y) * m;
      (o.strokeStyle = t.color),
        drawOrganicArrow(o, t.from.x, t.from.y, n, a, i),
        (m += g),
        m >= 1 && ((m = 0), h++),
        requestAnimationFrame(e);
    }
  })();
}
function drawOrganicArrow(e, t, n, a, o, r, l = 10, i = 10) {
  const s = (a - t) / l,
    c = (o - n) / l;
  e.beginPath(), e.moveTo(t, n);
  for (let a = 1; a < l; a++) {
    const o = a / l,
      r = t + s * a,
      d = n + c * a,
      u = i * Math.sin(o * Math.PI),
      h = (Math.random() - 0.25) * u,
      m = (Math.random() - 0.25) * u;
    e.lineTo(r + h, d + m);
  }
  e.lineTo(a, o), e.stroke(), drawArrowhead(e, t, n, a, o, r);
}
function drawArrowhead(e, t, n, a, o, r) {
  const l = Math.atan2(o - n, a - t);
  e.beginPath(),
    e.moveTo(a, o),
    e.lineTo(
      a - r * Math.cos(l - Math.PI / 6),
      o - r * Math.sin(l - Math.PI / 6)
    ),
    e.moveTo(a, o),
    e.lineTo(
      a - r * Math.cos(l + Math.PI / 6),
      o - r * Math.sin(l + Math.PI / 6)
    ),
    e.stroke();
}
function drawArrow(e, t, n, a, o, r) {
  const l = a - t,
    i = o - n,
    s = Math.atan2(i, l);
  e.beginPath(),
    e.moveTo(t, n),
    e.lineTo(a, o),
    e.stroke(),
    e.beginPath(),
    e.moveTo(a, o),
    e.lineTo(
      a - r * Math.cos(s - Math.PI / 6),
      o - r * Math.sin(s - Math.PI / 6)
    ),
    e.lineTo(
      a - r * Math.cos(s + Math.PI / 6),
      o - r * Math.sin(s + Math.PI / 6)
    ),
    e.lineTo(a, o),
    (e.fillStyle = e.strokeStyle),
    e.fill();
}
function shuffleArray(e) {
  for (let t = e.length - 1; t > 0; t--) {
    const n = Math.floor(Math.random() * (t + 1));
    [e[t], e[n]] = [e[n], e[t]];
  }
}
function startAnimation(e) {
  animationFrameId && cancelAnimationFrame(animationFrameId), animateLines(e);
}
document.addEventListener("DOMContentLoaded", () => {
  const e = document.getElementById("skill-sorfwares"),
    t = Array.from(e.querySelectorAll('[id^="skill-"]')).map((e) => {
      const t = e.id.replace(/^skill-/, ""),
        n = (e.getAttribute("data-software-text") || "")
          .split(",")
          .map((e) => e.trim().toLowerCase())
          .filter(Boolean);
      return [t.toLowerCase(), n];
    });
  (mapping = {}),
    t.forEach(([e, t]) => {
      mapping[e] = t;
    }),
    afterMappingReady();
}),
  window.addEventListener("resize", () => {
    startAnimation(100);
  });
const likeInfo = document.getElementById("like-info");
function createHeartBurst(e) {
  const t = e.getBoundingClientRect(),
    n = Math.round(10 * Math.random()),
    a = t.left + window.scrollX + t.width / 2,
    o = t.top + window.scrollY + t.height / 2;
  for (let e = 0; e < n; e++) {
    const e = document.createElement("span");
    (e.className = "flying-heart"), (e.textContent = "❤︎");
    const n = Math.max(12, 0.25 * t.width) * (0.8 + Math.random()),
      r = (Math.random() - 0.5) * n * 5,
      l = 300 + 1200 * Math.random() + "ms";
    (e.style.left = a - n / 2 + "px"),
      (e.style.top = o - n / 2 + "px"),
      (e.style.fontSize = n + "px"),
      (e.style.color = themePairs[currentTheme][1]),
      (e.style.filter = `saturate(${1 + 2 * Math.random()})`),
      e.style.setProperty("--dx", r + "px"),
      e.style.setProperty("--duration", l),
      document.body.appendChild(e),
      requestAnimationFrame(() => e.classList.add("animate")),
      e.addEventListener("animationend", () => e.remove());
  }
  e.classList.remove("heartbeat"), e.offsetWidth, e.classList.add("heartbeat");
}
likeInfo.addEventListener("click", (e) => {
  const t = e.currentTarget;
  t.classList.remove("heartbeat"),
    t.offsetWidth,
    t.classList.add("heartbeat"),
    setTimeout(() => {
      createHeartBurst(t);
    }, 100),
    changeAvatar();
}),
  document.querySelectorAll(".nav-links a").forEach((e) => {
    e.addEventListener("click", (t) => {
      t.preventDefault();
      const n = e.getAttribute("href").slice(1),
        a = document.getElementById(n);
      if (a) {
        const e = window.innerHeight / 25,
          t = a.getBoundingClientRect().top + window.pageYOffset - e;
        window.scrollTo({ top: t, behavior: "smooth" });
      }
    });
  });
const backHome = document.getElementById("back-home");
function darkenColor(e, t) {
  if (e.startsWith("#")) {
    let n, a, o;
    return (
      4 === e.length
        ? ((n = parseInt(e[1] + e[1], 16)),
          (a = parseInt(e[2] + e[2], 16)),
          (o = parseInt(e[3] + e[3], 16)))
        : ((n = parseInt(e[1] + e[2], 16)),
          (a = parseInt(e[3] + e[4], 16)),
          (o = parseInt(e[5] + e[6], 16))),
      darkenRGB(n, a, o, t)
    );
  }
  const n = e.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  if (n) return darkenRGB(+n[1], +n[2], +n[3], t);
  throw new Error("Unsupported color format: " + e);
}
function darkenRGB(e, t, n, a) {
  const o = 1 - a / 100;
  return `rgb(${(e = Math.round(e * o))}, ${(t = Math.round(t * o))}, ${(n =
    Math.round(n * o))})`;
}
function alignAndClipAvatar() {
  const e = document.getElementById("mySVG1"),
    t = document.getElementById("avatar");
  if (!e.contentDocument) return;
  if (!t.naturalWidth || !t.naturalHeight) return;
  const n = e.getBoundingClientRect(),
    a = t.naturalWidth / t.naturalHeight;
  let o, r;
  a > n.width / n.height
    ? ((r = n.height), (o = r * a))
    : ((o = n.width), (r = o / a)),
    (t.style.width = o + "px"),
    (t.style.height = r + "px");
  const l = getClip(e, t);
  l &&
    ((t.style.clipPath = `path("${l}")`),
    (t.style.webkitClipPath = `path("${l}")`));
}
function getClip(e, t) {
  const n = e.contentDocument;
  if (!n) return null;
  const a = n.querySelector("svg"),
    o = n.querySelector("path");
  if (!a || !o) return null;
  const r = o.getAttribute("d"),
    l = a.viewBox.baseVal,
    i = e.getBoundingClientRect(),
    s = t.getBoundingClientRect(),
    c = i.width,
    d = i.height,
    u = i.left - s.left,
    h = i.top - s.top;
  return scalePathToPixels(r, l.x, l.y, l.width, l.height, c, d, u, h);
}
function scalePathToPixels(e, t, n, a, o, r, l, i = 0, s = 0) {
  const c = r / a,
    d = l / o,
    u = e.match(/[a-zA-Z]|-?\d*\.?\d+(?:e[-+]?\d+)?/g);
  if (!u) return e;
  let h = 0,
    m = "",
    g = "";
  const f = (e) => /^[a-zA-Z]$/.test(e),
    p = (e) => (Math.round(100 * e) / 100).toString(),
    y = () => parseFloat(u[h++]),
    v = (e, t, n) => {
      for (; h < u.length && !f(u[h]); ) {
        const a = [];
        for (let t = 0; t < e; t++) a.push(y());
        const o = g === g.toUpperCase() ? t(a) : n(a);
        m += o.join(" ") + " ";
      }
    };
  for (; h < u.length; )
    switch ((f(u[h]) && ((g = u[h++]), (m += g + " ")), g)) {
      case "M":
      case "L":
      case "T":
      case "m":
      case "l":
      case "t":
        v(
          2,
          ([e, a]) => [p(i + (e - t) * c), p(s + (a - n) * d)],
          ([e, t]) => [p(e * c), p(t * d)]
        );
        break;
      case "H":
      case "h":
        v(
          1,
          ([e]) => [p(i + (e - t) * c)],
          ([e]) => [p(e * c)]
        );
        break;
      case "V":
      case "v":
        v(
          1,
          ([e]) => [p(s + (e - n) * d)],
          ([e]) => [p(e * d)]
        );
        break;
      case "C":
      case "c":
        v(
          6,
          ([e, a, o, r, l, u]) => [
            p(i + (e - t) * c),
            p(s + (a - n) * d),
            p(i + (o - t) * c),
            p(s + (r - n) * d),
            p(i + (l - t) * c),
            p(s + (u - n) * d),
          ],
          ([e, t, n, a, o, r]) => [
            p(e * c),
            p(t * d),
            p(n * c),
            p(a * d),
            p(o * c),
            p(r * d),
          ]
        );
        break;
      case "S":
      case "s":
        v(
          4,
          ([e, a, o, r]) => [
            p(i + (e - t) * c),
            p(s + (a - n) * d),
            p(i + (o - t) * c),
            p(s + (r - n) * d),
          ],
          ([e, t, n, a]) => [p(e * c), p(t * d), p(n * c), p(a * d)]
        );
        break;
      case "Q":
      case "q":
        v(
          4,
          ([e, a, o, r]) => [
            p(i + (e - t) * c),
            p(s + (a - n) * d),
            p(i + (o - t) * c),
            p(s + (r - n) * d),
          ],
          ([e, t, n, a]) => [p(e * c), p(t * d), p(n * c), p(a * d)]
        );
        break;
      case "A":
      case "a":
        for (; h < u.length && !f(u[h]); ) {
          const e = y(),
            a = y(),
            o = y(),
            r = y(),
            l = y(),
            u = y(),
            h = y();
          m +=
            "A" === g
              ? [
                  p(Math.abs(e) * c),
                  p(Math.abs(a) * d),
                  p(o),
                  p(r),
                  p(l),
                  p(i + (u - t) * c),
                  p(s + (h - n) * d),
                ].join(" ") + " "
              : [
                  p(Math.abs(e) * c),
                  p(Math.abs(a) * d),
                  p(o),
                  p(r),
                  p(l),
                  p(u * c),
                  p(h * d),
                ].join(" ") + " ";
        }
        break;
      case "Z":
      case "z":
        break;
      default:
        for (; h < u.length && !f(u[h]); ) m += u[h++] + " ";
        break;
    }
  return m.trim();
}
function setupAlignment() {
  const e = document.getElementById("mySVG1"),
    t = document.getElementById("avatar");
  let n = !1,
    a = !1;
  function o() {
    n &&
      a &&
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          alignAndClipAvatar(), (t.style.opacity = 1);
        });
      });
  }
  e.addEventListener("load", function () {
    (n = !0), o();
  }),
    t.addEventListener("load", function () {
      (a = !0), o();
    }),
    t.complete && (a = !0),
    e.contentDocument && (n = !0),
    o();
  const r = new MutationObserver(() => {
    (n = !1), (a = !1);
  });
  r.observe(e, { attributes: !0, attributeFilter: ["data"] }),
    r.observe(t, { attributes: !0, attributeFilter: ["src"] });
}
window.addEventListener("scroll", () => {
  window.scrollY > window.innerHeight / 20
    ? backHome.classList.add("scrolled")
    : backHome.classList.remove("scrolled");
}),
  backHome.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }),
  window.addEventListener("load", setupAlignment),
  window.addEventListener("resize", alignAndClipAvatar);
const circle = document.getElementById("avatar-circle");
function updateRotation(e, t) {
  const n = circle.getBoundingClientRect(),
    a = n.left + n.width / 2,
    o = n.top + n.height / 2,
    r = Math.atan2(t - o, e - a) * (180 / Math.PI);
  circle.style.transform = `rotate(${r}deg)`;
}
function applyParentHighlight(e) {
  const [t, n] = themePairs[currentTheme];
  e.classList.add("search-parent-highlight"),
    (e.style.backgroundColor = t),
    (e.style.color = n);
}
document.addEventListener("mousemove", (e) => {
  updateRotation(e.clientX, e.clientY);
}),
  document.addEventListener("scroll", () => {
    const e = window.MouseEvent;
    e && updateRotation(e.clientX, e.clientY);
  }),
  document.addEventListener("mousemove", (e) => {
    window.MouseEvent = e;
  });
const searchBox = document.getElementById("search-box"),
  searchIcon = document.querySelector(".search-icon");
let currentIndex = 0,
  matches = [],
  lastMatch = null;
function clearParentHighlight(e) {
  e &&
    (e.classList.remove("search-parent-highlight"),
    (e.style.backgroundColor = ""),
    (e.style.border = ""),
    (e.style.color = ""));
}
function findVisibleHighlightTarget(e) {
  let t = 3 === e.nodeType ? e.parentNode : e;
  for (; t && t !== document.body; ) {
    const e = getComputedStyle(t);
    if ("none" === e.display || "hidden" === e.visibility) {
      t = t.parentNode;
      continue;
    }
    let n = t.parentNode,
      a = !1;
    for (; n && n !== document.body; ) {
      const e = getComputedStyle(n);
      if ("none" === e.display || "hidden" === e.visibility) {
        a = !0;
        break;
      }
      n = n.parentNode;
    }
    if (!a) return t;
    t = t.parentNode;
  }
  return null;
}
function pruneMatches(e) {
  return e.filter((t) => !e.some((e) => e !== t && e.contains(t)));
}
function highlightNextParent() {
  const e = searchBox.value.trim().toLowerCase();
  if (!e) return;
  if (!matches.length || matches[0].dataset.searchText !== e) {
    matches.forEach(clearParentHighlight), (matches = []);
    const t = new Set();
    !(function n(a) {
      if (3 === a.nodeType) {
        if (a.data.toLowerCase().includes(e)) {
          let n = findVisibleHighlightTarget(a);
          n &&
            !t.has(n) &&
            ((n.dataset.searchText = e), matches.push(n), t.add(n));
        }
      } else
        1 === a.nodeType &&
          a.childNodes &&
          !["SCRIPT", "STYLE"].includes(a.tagName) &&
          a.childNodes.forEach(n);
    })(document.body),
      document.querySelectorAll("img").forEach((n) => {
        if (n.src.toLowerCase().includes(e)) {
          let a = findVisibleHighlightTarget(n.parentNode);
          a &&
            !t.has(a) &&
            ((a.dataset.searchText = e), matches.push(a), t.add(a));
        }
      }),
      (matches = pruneMatches(matches)),
      (currentIndex = 0);
  }
  if (!matches.length) return;
  lastMatch && clearParentHighlight(lastMatch);
  const t = matches[currentIndex];
  applyParentHighlight(t),
    t.scrollIntoView({ behavior: "smooth", block: "center" }),
    (lastMatch = t),
    (currentIndex = (currentIndex + 1) % matches.length);
}
function clearAllHighlights() {
  matches.forEach(clearParentHighlight),
    (matches = []),
    (lastMatch = null),
    (currentIndex = 0),
    (searchBox.value = "");
}
searchBox.addEventListener("keydown", (e) => {
  "Enter" === e.key && highlightNextParent();
}),
  searchIcon.addEventListener("click", highlightNextParent),
  document.addEventListener(
    "click",
    (e) => {
      searchBox.value = "";
      const t = e.target.closest(".search-parent-highlight");
      t &&
        (clearParentHighlight(t),
        (matches = matches.filter((e) => e !== t)),
        lastMatch === t && (lastMatch = null));
    },
    !0
  );
const totalAvatars = 4,
  avatarEl = document.getElementById("avatar");
let imageIndex = 0;
function changeAvatar() {
  setTimeout(() => {
    (imageIndex = (imageIndex + 1) % 4),
      (avatarEl.src = `images/avatar${imageIndex}.jpg`),
      (avatarEl.style.opacity = 1);
  }, 300);
}
function initGalleryAndMagnifier() {
  function e() {
    const e = document.querySelector("#origin-container .origin");
    e.complete && e.naturalWidth && e.naturalHeight
      ? t(e)
      : e.addEventListener("load", () => t(e), { once: !0 });
  }
  function t(e) {
    const t = e.closest('[id^="origin-container"]');
    t &&
      (function (e, t) {
        const n = t.closest('[id^="gallery-origin"]'),
          a = n.getBoundingClientRect(),
          o = e.naturalWidth / e.naturalHeight,
          r = a.width / a.height,
          l = 0.95;
        let i, s;
        o > r
          ? ((i = a.width * l), (s = i / o))
          : ((s = a.height * l), (i = s * o));
        (e.style.width = i + "px"), (e.style.height = s + "px");
        const c = n.querySelector(".blur-bg");
        c && c.remove();
        const d = document.createElement("img");
        (d.src = e.src), (d.className = "blur-bg"), n.append(d);
      })(e, t);
  }
  function n() {
    const e = document.getElementById("gallery");
    if (!e) return;
    e.querySelectorAll("img.cloned").forEach((e) => e.remove());
    const t = e.querySelector(
      "#origin-container img:not(.blur-bg):not(.cloned)"
    );
    if (!t) return;
    e.querySelectorAll('[id^="gallery--"]').forEach((e) => {
      const n = t.cloneNode(!0);
      n.classList.add("cloned"),
        e.appendChild(n),
        n.complete
          ? a(n, e)
          : n.addEventListener("load", () => a(n, e), { once: !0 });
    });
  }
  function a(e, t) {
    const n = t.getBoundingClientRect(),
      a = n.width / n.height,
      o = e.naturalWidth / e.naturalHeight;
    if (
      ((e.style.position = "absolute"),
      (e.style.display = "block"),
      (e.style.margin = "0"),
      (e.style.padding = "0"),
      (e.style.transform = "none"),
      e.classList.remove("slide-horizontal", "slide-vertical"),
      o > a)
    ) {
      (e.style.height = n.height + "px"), (e.style.width = "auto");
      const t = e.scrollWidth - n.width,
        a = Math.max(0, t);
      e.style.setProperty("--move", `-${a}px`),
        e.classList.add("slide-horizontal");
    } else {
      (e.style.width = n.width + "px"), (e.style.height = "auto");
      const t = e.scrollHeight - n.height,
        a = -Math.max(0, t);
      e.style.setProperty("--move", `${a}px`),
        e.classList.add("slide-vertical");
    }
    (e.style.left = "0px"), (e.style.top = "0px");
  }
  function o() {
    const e = document.querySelector("#origin-container .origin"),
      t = e?.parentElement,
      n = document.getElementById("magnifier");
    if (!e || !t || !n) return;
    n.innerHTML = "";
    const a = e.cloneNode();
    a.classList.add("zoom-2x"), n.appendChild(a);
    let o = { x: 0, y: 0 };
    (t.onmousemove = (t) => {
      const r = e.getBoundingClientRect(),
        l = n.offsetWidth,
        i = n.offsetHeight,
        s = t.clientX - r.left,
        c = t.clientY - r.top,
        d = s - o.x,
        u = c - o.y,
        h = Math.sqrt(d * d + u * u);
      o = { x: s, y: c };
      const m =
          parseFloat(getComputedStyle(a).getPropertyValue("--zoom-level")) || 2,
        g = h > 0 ? 0.95 * m : m;
      (a.style.width = r.width * g + "px"),
        (a.style.height = r.height * g + "px"),
        (n.style.left = s - l / 2 + "px"),
        (n.style.top = c - i / 2 + "px"),
        (n.style.display = "block");
      const f = s * g - l / 2,
        p = c * g - i / 2;
      (a.style.left = -f + "px"), (a.style.top = -p + "px");
    }),
      (t.onmouseleave = () => {
        n.style.display = "none";
      });
  }
  e(),
    n(),
    o(),
    window.addEventListener("resize", () => {
      e(), n(), o();
    });
}
setInterval(changeAvatar, 24e3);
let projectIndex = 0,
  galleryIndex = 0,
  projectsData = [];
function showProject(e) {
  const t = document.querySelector("#origin-container .origin"),
    n = projectsData[e];
  if (!n) return;

  const a = document.getElementById("gallery-info");

  if (!n.gallery || 0 === n.gallery.length) {
    a.querySelector(".project-next").style.display = "none";
    a.querySelector(".project-link").style.display = "none";
  } else {  
    a.querySelector(".project-next").style.display = "flex";
    a.querySelector(".project-link").style.display = "flex";
  }
  (a.querySelector(".project-title").textContent = n.title),
    (a.querySelector(".project-description").textContent = n.description),
    (a.querySelector(".project-year").textContent = n.year || ""),
    (a.querySelector(".project-category").textContent = n.category || "");
  const o = a.querySelector(".project-tags");
  (o.innerHTML = ""),
    n.tags.forEach((e) => {
      const t = document.createElement("span");
      (t.textContent = e),
        (t.className = "lighter border-box"),
        o.appendChild(t);
    });
  (a.querySelector(".project-link").href = n.link),
    applyTheme(),
    (galleryIndex = -1),
    (t.src = n.coverImage),
    (t.alt = n.title),
    t.complete
      ? (initGalleryAndMagnifier(), changeImg(!0))
      : (changeImg(!1),
        t.addEventListener("load", initGalleryAndMagnifier, { once: !0 }),
        changeImg(!0));
}
function showGalleryImage(e) {
  changeImg(!1);
  const t = projectsData[projectIndex];
  if (!t) return;
  const n = document.querySelector("#origin-container .origin");

  const a = t.gallery.length;
  (galleryIndex += e),
    galleryIndex < -1 && (galleryIndex = a - 1),
    galleryIndex >= a && (galleryIndex = -1),
    -1 === galleryIndex
      ? ((n.src = t.coverImage), (n.alt = t.title))
      : ((n.src = t.gallery[galleryIndex]),
        (n.alt = `${t.title} design ${galleryIndex + 1}`)),
    n.complete
      ? (initGalleryAndMagnifier(), changeImg(!0))
      : (n.addEventListener("load", initGalleryAndMagnifier, { once: !0 }),
        changeImg(!0));
}
function changeImg(e) {
  const t = [
    ...document.querySelectorAll("#gallery img"),
    ...document.querySelectorAll(".origin"),
  ];
  t.forEach((e) => {
    e.style.opacity = 0.5;
  }),
    t.forEach((t) => {
      (t.style.transition = "opacity 0.5s ease"), (t.style.opacity = e ? 1 : 0);
    });
}
fetch("gallery/gallery-list.json")
  .then((e) => e.json())
  .then((e) => {
    const t = document.getElementById("gallery-list-text");
    (t.innerHTML = ""),
      e.forEach((e) => {
        const n = document.createElement("p");
        (n.textContent = e.id + ". " + e.title), t.appendChild(n);
      }),
      (projectsData = e),
      showProject(projectIndex);
  })
  .catch((e) => {}),
  document.getElementById("prev-design").addEventListener("click", () => {
    showGalleryImage(-1);
  }),
  document.getElementById("next-design").addEventListener("click", () => {
    showGalleryImage(1);
  }),
  document.getElementById("prev-project").addEventListener("click", () => {
    (projectIndex =
      (projectIndex - 1 + projectsData.length) % projectsData.length),
      showProject(projectIndex),
      applyTranslations(currentLang, document.getElementById("gallery-info"));
  }),
  document.getElementById("next-project").addEventListener("click", () => {
    (projectIndex = (projectIndex + 1) % projectsData.length),
      showProject(projectIndex),
      applyTranslations(currentLang, document.getElementById("gallery-info"));
  });
let translations = {},
  currentLang = "en";
const originalContent = new Map();
function normalize(e) {
  return String(e).replace(/\s+/g, " ").trim();
}
function backupOriginalText(e = document.body) {
  const t = document.createTreeWalker(e, NodeFilter.SHOW_TEXT, null, !1);
  let n;
  for (; (n = t.nextNode()); ) originalContent.set(n, n.nodeValue);
  e.querySelectorAll(
    "[placeholder],[title],[alt],[value],[aria-label]"
  ).forEach((e) => {
    ["placeholder", "title", "alt", "value", "aria-label"].forEach((t) => {
      e.hasAttribute(t) &&
        originalContent.set(e, { attr: t, value: e.getAttribute(t) });
    });
  });
}
function translateTextNode(e, t) {
  const n = translations[t],
    a = e.nodeValue,
    o = normalize(a);
  if (!o) return;
  if (n[o]) return void (e.nodeValue = n[o]);
  const r = a.match(/^(\s*\d+\.\s*)([\s\S]+)$/);
  if (r) {
    const t = r[1],
      a = normalize(r[2]);
    n[a] && (e.nodeValue = t + n[a]);
  }
}
function translateAttributes(e, t) {
  const n = translations[t];
  ["placeholder", "title", "alt", "value", "aria-label"].forEach((t) => {
    if (!e.hasAttribute(t)) return;
    const a = normalize(e.getAttribute(t));
    a && n[a] && e.setAttribute(t, n[a]);
  });
}
function applyTranslations(e, t = document.body) {
  if (!translations[e]) return;
  const n = document.createTreeWalker(t, NodeFilter.SHOW_TEXT, null, !1);
  let a;
  for (; (a = n.nextNode()); ) translateTextNode(a, e);
  t.querySelectorAll(
    "[placeholder],[title],[alt],[value],[aria-label]"
  ).forEach((t) => {
    translateAttributes(t, e);
  });
}
function restoreOriginal(e = document.body) {
  for (const [e, t] of originalContent.entries())
    e.nodeType === Node.TEXT_NODE
      ? (e.nodeValue = t)
      : "object" == typeof t && e.setAttribute(t.attr, t.value);
}
function setLanguage(e) {
  (currentLang = e),
    localStorage.setItem("lang", e),
    "en" === e ? restoreOriginal() : applyTranslations(e);
}
function toggleLanguage() {
  setLanguage("en" === currentLang ? "vn" : "en");
}
fetch("vn.json")
  .then((e) => e.json())
  .then((e) => {
    (translations = e), backupOriginalText();
    setLanguage(localStorage.getItem("lang") || "en");
  });
