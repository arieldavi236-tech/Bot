import fs from "node:fs";
import path from "node:path";

const SETTINGS_FILE = path.resolve(process.cwd(), "assets", "pv-settings.json");

function ensureSettings() {
  const dir = path.dirname(SETTINGS_FILE);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (!fs.existsSync(SETTINGS_FILE)) {
    fs.writeFileSync(
      SETTINGS_FILE,
      JSON.stringify({ enabled: true }, null, 2)
    );
  }
}

export function isPrivateEnabled() {
  ensureSettings();

  try {
    const data = JSON.parse(fs.readFileSync(SETTINGS_FILE, "utf8"));
    return data.enabled !== false;
  } catch {
    return true;
  }
}

export function setPrivateEnabled(enabled) {
  ensureSettings();

  fs.writeFileSync(
    SETTINGS_FILE,
    JSON.stringify({ enabled: Boolean(enabled) }, null, 2)
  );
}
