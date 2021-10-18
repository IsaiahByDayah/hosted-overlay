import fetch from "cross-fetch"

export interface TwitchValidateTokenResponse {
  client_id: string
  login: string
  scopes: string[]
  user_id: string
  expires_in: number
}

export const validateToken = async (
  token: string
): Promise<TwitchValidateTokenResponse> => {
  const error = new Error("Invalidate Access Token")
  try {
    var res = await fetch("https://id.twitch.tv/oauth2/validate", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (res.status !== 200) {
      console.log("Response status not 200: ", res)
      throw error
    }

    const tokenData = (await res.json()) as TwitchValidateTokenResponse
    const { expires_in } = tokenData

    console.log(`Token valid for another ${expires_in} seconds...`)
    if (expires_in < 60 * 190) {
      throw error
    }

    return tokenData
  } catch (e) {
    console.log("Error Validating Token... ", e)
  }

  throw error
}
