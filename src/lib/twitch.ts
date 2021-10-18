// import TwitchJS from "twitch-js"
// import fetchUtil from "twitch-js/lib/utils/fetch"
import tmi from "tmi.js"

import { toArray } from "lib/util"
import constants from "lib/constants"

const CLIENT_ID = "fnrk8bg5ah3jh0pyrq341045l6n1o6"
const PROD_REDIRECT_URL = "https://hosted-overlay.web.app/twitch-integration"
const DEV_REDIRECT_URL = "http://localhost:3000/twitch-integration"
const REDIRECT_URL = constants.IS_EMULATOR
  ? DEV_REDIRECT_URL
  : PROD_REDIRECT_URL
const RESPONSE_TYPE = "token"
const SCOPES = [
  "chat:read",
  "chat:edit",
  "channel:moderate",
  "whispers:read",
  "whispers:edit",
  "channel_editor",
]
const FORCE_VERIFY = true
export const TWITCH_IMPLICIT_OAUTH_URL = `https://id.twitch.tv/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&response_type=${RESPONSE_TYPE}&scope=${encodeURIComponent(
  SCOPES.join(" ")
)}&force_verify=${FORCE_VERIFY}`

// const onAuthenticationFailure = async (): Promise<string> => {
//   console.log("onAuthenticationFailure!")

//   const response: any = await fetchUtil("https://id.twitch.tv/oauth2/token", {
//     method: "post",
//     search: {
//       grant_type: "refresh_token",
//       refresh_token: process.env.REACT_APP_REFRESH_TOKEN,
//       client_id: process.env.REACT_APP_CLIENT_ID,
//       client_secret: process.env.REACT_APP_CLIENT_SECRET,
//     },
//   })

//   return response.accessToken
// }

// // const onAuthenticationFailure = async () =>
// //   fetchUtil("https://id.twitch.tv/oauth2/token", {
// //     method: "post",
// //     search: {
// //       grant_type: "refresh_token",
// //       refresh_token: process.env.REACT_APP_REFRESH_TOKEN,
// //       client_id: process.env.REACT_APP_CLIENT_ID,
// //       client_secret: process.env.REACT_APP_CLIENT_SECRET,
// //     },
// //   }).then((response: any) => response.accessToken)

// let _twitch: TwitchJS
// const getTwitch = () => {
//   if (_twitch) {
//     return _twitch
//   } else {
//     _twitch = new TwitchJS({
//       token: process.env.REACT_APP_ACCESS_TOKEN,
//       clientId: process.env.REACT_APP_CLIENT_ID,
//       username: process.env.REACT_APP_USERNAME,
//       onAuthenticationFailure,
//       log: { level: "warn" },
//     })
//     return _twitch
//   }
// }

// // export const getChat = () => getTwitch().chat
// // const getApi = () => getTwitch().api

// export const getFollowerCount = async (): Promise<number> => {
//   const res = await getTwitch().api.get("users/follows", {
//     search: {
//       to_id: process.env.REACT_APP_USER_ID,
//     },
//   })
//   // console.log("Response: ", res)
//   return res.total
//   // return 69
// }

// export const getSubscriberCount = async (): Promise<number> => {
//   const res = await getTwitch().api.get("subscriptions", {
//     search: {
//       broadcaster_id: process.env.REACT_APP_USER_ID,
//     },
//   })
//   // console.log("Response: ", res)
//   return res.total
//   // return 69
// }

export const getChatClient = (
  channel: string | string[],
  identity?: tmi.Options["identity"]
): tmi.Client =>
  new tmi.Client({
    channels: toArray(channel),
    identity,
  })
