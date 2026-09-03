import type { NextConfig } from "next";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

// This project is API-only: everything under app/api is a route handler and
// there is no UI, so there is nothing else to configure yet.
const nextConfig: NextConfig = {
  // the frontend at the repository root has its own lockfile, so point Next at
  // this folder instead of letting it guess the workspace root
  turbopack: { root: dirname(fileURLToPath(import.meta.url)) },
};

export default nextConfig;
