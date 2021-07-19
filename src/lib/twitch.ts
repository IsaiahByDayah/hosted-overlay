import TwitchJS from "twitch-js"
import fetchUtil from "twitch-js/lib/utils/fetch"

const onAuthenticationFailure = async (): Promise<string> => {
  console.log("onAuthenticationFailure!")

  const response: any = await fetchUtil("https://id.twitch.tv/oauth2/token", {
    method: "post",
    search: {
      grant_type: "refresh_token",
      refresh_token: process.env.REACT_APP_REFRESH_TOKEN,
      client_id: process.env.REACT_APP_CLIENT_ID,
      client_secret: process.env.REACT_APP_CLIENT_SECRET,
    },
  })

  console.log("Response: ", response)
  return response.accessToken
}

const twitchJS = new TwitchJS({
  token: process.env.REACT_APP_ACCESS_TOKEN,
  clientId: process.env.REACT_APP_CLIENT_ID,
  username: process.env.REACT_APP_USERNAME,
  onAuthenticationFailure,
  log: { level: "warn" },
})

export const chat = twitchJS.chat

export const api = twitchJS.api

export const getFollowerCount = async (): Promise<number> => {
  const res = await api.get("users/follows", {
    search: {
      to_id: process.env.REACT_APP_USER_ID,
    },
  })
  console.log("Response: ", res)
  return res.total
}

export const getSubscriberCount = async (): Promise<number> => {
  const res = await api.get("subscriptions", {
    search: {
      broadcaster_id: process.env.REACT_APP_USER_ID,
    },
  })
  console.log("Response: ", res)
  return res.total
}
