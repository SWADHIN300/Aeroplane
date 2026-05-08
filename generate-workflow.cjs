const fs = require('fs');
let c = 0;
const uid = () => `e${++c}`;
const seed = () => Math.floor(Math.random() * 2e9);
const elements = [];

function box(x, y, w, h, label, bg, stroke, fs2 = 18) {
  const rid = uid(), tid = uid();
  elements.push({
    id: rid, type: "rectangle", x, y, width: w, height: h, angle: 0,
    strokeColor: stroke, backgroundColor: bg, fillStyle: "solid",
    strokeWidth: 2, roughness: 0, opacity: 100, groupIds: [],
    roundness: { type: 3 }, seed: seed(), version: 1, versionNonce: seed(),
    isDeleted: false, boundElements: [{ id: tid, type: "text" }],
    updated: Date.now(), link: null, locked: false
  });
  elements.push({
    id: tid, type: "text", x: x + 10, y: y + h / 2 - (fs2 * 1.25) / 2,
    width: w - 20, height: fs2 * 1.25, angle: 0,
    strokeColor: stroke, backgroundColor: "transparent", fillStyle: "solid",
    strokeWidth: 1, roughness: 0, opacity: 100, groupIds: [],
    roundness: null, seed: seed(), version: 1, versionNonce: seed(),
    isDeleted: false, boundElements: null, updated: Date.now(), link: null, locked: false,
    text: label, fontSize: fs2, fontFamily: 1,
    textAlign: "center", verticalAlign: "middle",
    containerId: rid, originalText: label, lineHeight: 1.25
  });
  return rid;
}

function arrow(fromId, fx, fy, fw, fh, toId, tx, ty, tw, th, color = "#495057", dir = "right") {
  let x1, y1, x2, y2;
  if (dir === "right") { x1 = fx + fw; y1 = fy + fh / 2; x2 = tx; y2 = ty + th / 2; }
  else if (dir === "down") { x1 = fx + fw / 2; y1 = fy + fh; x2 = tx + tw / 2; y2 = ty; }
  else { x1 = fx + fw; y1 = fy + fh / 2; x2 = tx; y2 = ty + th / 2; }
  elements.push({
    id: uid(), type: "arrow", x: x1, y: y1, width: x2 - x1, height: y2 - y1, angle: 0,
    strokeColor: color, backgroundColor: "transparent", fillStyle: "solid",
    strokeWidth: 2, roughness: 0, opacity: 100, groupIds: [],
    roundness: { type: 2 }, seed: seed(), version: 1, versionNonce: seed(),
    isDeleted: false, boundElements: null, updated: Date.now(), link: null, locked: false,
    points: [[0, 0], [x2 - x1, y2 - y1]], lastCommittedPoint: null,
    startBinding: { elementId: fromId, focus: 0, gap: 5 },
    endBinding: { elementId: toId, focus: 0, gap: 5 },
    startArrowhead: null, endArrowhead: "arrow"
  });
}

function label(x, y, text, fs2 = 28, color = "#1e1e1e") {
  elements.push({
    id: uid(), type: "text", x, y, width: text.length * fs2 * 0.6, height: fs2 * 1.25,
    angle: 0, strokeColor: color, backgroundColor: "transparent", fillStyle: "solid",
    strokeWidth: 1, roughness: 0, opacity: 100, groupIds: [], roundness: null,
    seed: seed(), version: 1, versionNonce: seed(), isDeleted: false,
    boundElements: null, updated: Date.now(), link: null, locked: false,
    text, fontSize: fs2, fontFamily: 1, textAlign: "left", verticalAlign: "top",
    containerId: null, originalText: text, lineHeight: 1.25
  });
}

// ===== TITLE =====
label(350, 20, "NexFly - Project Workflow", 36, "#1864ab");

// ===== SECTION 1: USER JOURNEY =====
label(60, 100, "[USER JOURNEY]", 24, "#495057");
const bw = 170, bh = 65, gap = 40;
const uy = 145;
const journeyData = [
  "Home Page", "Register", "Login", "Search Flights",
  "Available\nFlights", "Book Flight", "Seat\nSelection", "My Bookings"
];
const journeyIds = [];
const journeyPositions = [];
journeyData.forEach((lbl, i) => {
  const x = 60 + i * (bw + gap);
  journeyPositions.push({ x, y: uy, w: bw, h: bh });
  journeyIds.push(box(x, uy, bw, bh, lbl, "#d0ebff", "#1971c2", 16));
});
for (let i = 0; i < journeyIds.length - 1; i++) {
  const f = journeyPositions[i], t = journeyPositions[i + 1];
  arrow(journeyIds[i], f.x, f.y, f.w, f.h, journeyIds[i + 1], t.x, t.y, t.w, t.h, "#1971c2");
}

// ===== SECTION 2: ARCHITECTURE =====
label(60, 260, "[SYSTEM ARCHITECTURE]", 24, "#495057");
const ay = 305;
const archData = [
  { l: "Frontend\nReact + Vite + Tailwind", w: 280, bg: "#d0bfff", s: "#6741d9" },
  { l: "REST API\nAxios HTTP Client", w: 220, bg: "#fff3bf", s: "#e67700" },
  { l: "Backend\nSpring Boot + Java", w: 280, bg: "#b2f2bb", s: "#2f9e44" },
  { l: "Database\nNeon PostgreSQL", w: 240, bg: "#ffd8a8", s: "#e8590c" },
];
const archIds = [], archPos = [];
let ax = 60;
archData.forEach((d) => {
  archPos.push({ x: ax, y: ay, w: d.w, h: 80 });
  archIds.push(box(ax, ay, d.w, 80, d.l, d.bg, d.s, 16));
  ax += d.w + 50;
});
for (let i = 0; i < archIds.length - 1; i++) {
  const f = archPos[i], t = archPos[i + 1];
  arrow(archIds[i], f.x, f.y, f.w, f.h, archIds[i + 1], t.x, t.y, t.w, t.h, "#495057");
}

// ===== SECTION 3: BACKEND COMPONENTS =====
label(60, 430, "[BACKEND COMPONENTS]", 24, "#495057");
const ctrlData = ["AuthController", "FlightController", "BookingController", "SeatController", "CharterController"];
const svcData = ["AuthService", "FlightService", "BookingService", "SeatService", "CharterService"];
const cy = 475, cw = 200, ch = 45, cGap = 12;
const ctrlIds = [], ctrlPos = [], svcIds = [], svcPos = [];
ctrlData.forEach((lbl, i) => {
  const y2 = cy + i * (ch + cGap);
  ctrlPos.push({ x: 60, y: y2, w: cw, h: ch });
  ctrlIds.push(box(60, y2, cw, ch, lbl, "#d3f9d8", "#2f9e44", 14));
});
svcData.forEach((lbl, i) => {
  const y2 = cy + i * (ch + cGap);
  svcPos.push({ x: 340, y: y2, w: cw, h: ch });
  svcIds.push(box(340, y2, cw, ch, lbl, "#e3fafc", "#0c8599", 14));
});
for (let i = 0; i < ctrlIds.length; i++) {
  arrow(ctrlIds[i], ctrlPos[i].x, ctrlPos[i].y, ctrlPos[i].w, ctrlPos[i].h,
    svcIds[i], svcPos[i].x, svcPos[i].y, svcPos[i].w, svcPos[i].h, "#868e96");
}

// ===== SECTION 4: DATA MODELS =====
label(620, 430, "[DATA MODELS / ENTITIES]", 24, "#495057");
const entityData = ["User", "Flight", "Booking", "Seat", "Charter", "Destination"];
const ew = 150, eh = 50, eGap = 15;
const entityIds = [], entityPos = [];
entityData.forEach((lbl, i) => {
  const row = Math.floor(i / 3), col = i % 3;
  const ex = 620 + col * (ew + eGap), ey = 475 + row * (eh + eGap);
  entityPos.push({ x: ex, y: ey, w: ew, h: eh });
  entityIds.push(box(ex, ey, ew, eh, lbl, "#fff9db", "#e67700", 16));
});

// ===== SECTION 5: SECURITY =====
label(620, 600, "[SECURITY & CONFIG]", 24, "#495057");
const secData = ["JWT Authentication", "BCrypt Password\nEncryption", "CORS Config", "HikariCP\nConnection Pool"];
const sw2 = 180, sh = 50;
secData.forEach((lbl, i) => {
  const row = Math.floor(i / 2), col = i % 2;
  box(620 + col * (sw2 + 15), 645 + row * (sh + 12), sw2, sh, lbl, "#fcc2d7", "#c2255c", 13);
});

// ===== SECTION 6: API ENDPOINTS =====
label(60, 770, "[API ENDPOINTS]", 24, "#495057");
const endpoints = [
  "POST /api/auth/register",
  "POST /api/auth/login",
  "GET /api/flights",
  "GET /api/flights/search",
  "POST /api/bookings",
  "GET /api/bookings",
  "DELETE /api/bookings/{id}",
  "GET /api/seats/{flightId}",
  "GET /api/charters",
  "GET /api/destinations"
];
const epw = 260, eph = 35, epGap = 8;
endpoints.forEach((lbl, i) => {
  const col = Math.floor(i / 5), row = i % 5;
  box(60 + col * (epw + 20), 815 + row * (eph + epGap), epw, eph, lbl, "#e9ecef", "#495057", 12);
});

// ===== OUTPUT =====
const excalidraw = {
  type: "excalidraw",
  version: 2,
  source: "nexfly-generator",
  elements,
  appState: { gridSize: null, viewBackgroundColor: "#ffffff" },
  files: {}
};

fs.writeFileSync('nexfly-workflow.excalidraw', JSON.stringify(excalidraw, null, 2));
console.log(`Generated ${elements.length} elements -> nexfly-workflow.excalidraw`);
