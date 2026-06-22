import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import * as fs from "fs/promises";
import * as path from "path";
import { defaultContent } from "../cms";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "cms.json");

async function ensureDataFile() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    try {
      await fs.access(DATA_FILE);
    } catch {
      await fs.writeFile(DATA_FILE, JSON.stringify(defaultContent, null, 2), "utf-8");
    }
  } catch (err) {
    console.error("Error ensuring data file:", err);
  }
}

export const getCMSContent = createServerFn({ method: "GET" })
  .handler(async () => {
    await ensureDataFile();
    try {
      const data = await fs.readFile(DATA_FILE, "utf-8");
      return JSON.parse(data);
    } catch (err) {
      console.error("Error reading CMS content from file:", err);
      return defaultContent;
    }
  });

export const updateCMSContent = createServerFn({ method: "POST" })
  .inputValidator(z.any())
  .handler(async ({ data }) => {
    await ensureDataFile();
    try {
      await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
      return { success: true };
    } catch (err) {
      console.error("Error writing CMS content to file:", err);
      return { success: false, error: String(err) };
    }
  });
