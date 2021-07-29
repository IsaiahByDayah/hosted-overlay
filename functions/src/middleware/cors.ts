import cors, { CorsOptionsDelegate, CorsOptions } from "cors"

import constants from "../lib/constants"

const WHITELIST_ORIGINS = [
  "https://hosted-overlay.web.app",
  "https://hosted-overlay.firebaseapp.com",
  // "https://photoalamode.com",
  // "https://photomode.io",
]
const WHITELIST_PATTERNS = [
  // eslint-disable-next-line no-useless-escape
  new RegExp(`(https://hosted-overlay--.*\.web\.app)`),
  new RegExp(`(https?://localhost:*)`),
]

// REF: https://github.com/expressjs/cors#configuring-cors-asynchronously
const corsOptionsDelegate: CorsOptionsDelegate = (req, callback) => {
  let options: CorsOptions
  if (constants.IS_EMULATOR) {
    console.log("Origin: ", req.headers.origin)
  }

  if (constants.IS_EMULATOR) {
    // allow if emulator
    options = { origin: true }
  } else if (!req.headers.origin) {
    // disable if no origin
    options = { origin: false }
  } else if (WHITELIST_PATTERNS.find((r) => req.headers.origin?.match(r))) {
    // allow if emulator
    options = { origin: true }
  } else if (WHITELIST_ORIGINS.indexOf(req.headers.origin) !== -1) {
    // reflect (enable) the requested origin in the CORS response
    options = { origin: true }
  } else {
    // disable CORS for this request
    options = { origin: false }
  }

  callback(null, options) // callback expects two parameters: error and options
}

const corsMiddleware = cors(corsOptionsDelegate)

export default corsMiddleware
