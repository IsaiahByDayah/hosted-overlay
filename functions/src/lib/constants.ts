const IS_EMULATOR = process.env.FUNCTIONS_EMULATOR === "true"

interface Constants {
  IS_EMULATOR: boolean
}

const constants: Constants = {
  IS_EMULATOR,
}

export default constants
