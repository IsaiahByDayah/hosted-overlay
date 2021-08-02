const IS_EMULATOR = process.env.NODE_ENV !== "production"

interface Constants {
  IS_EMULATOR: boolean
}

const constants: Constants = {
  IS_EMULATOR,
}

export default constants
