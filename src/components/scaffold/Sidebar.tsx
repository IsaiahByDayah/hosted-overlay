import { Stack } from "@mui/material"

import { getFakeChat } from "lib/util"

import useOverlayChat from "hooks/useOverlayChat"

import { useOverlayContext } from "components/scaffold/OverlayProvider"

import CurrentTopic from "components/widgets/CurrentTopic"
import Chat from "components/widgets/twitch-chat/Chat"

import GreenScreen from "components/common/GreenScreen"

// const useStyles = makeStyles(({ spacing, palette }) => ({
//   root: {
//     padding: spacing(3),
//     display: "flex",
//     flexDirection: "column",
//     height: "100%",
//     backgroundColor: palette.augmentColor({
//       color: {
//         main: palette.background.default,
//       },
//     }).dark,
//   },
//   currentTopic: {
//     flexShrink: 0,
//     flexGrow: 0,
//   },
//   chat: {
//     flexGrow: 1,
//     margin: spacing(3, 0),
//     padding: spacing(),
//     overflow: "hidden",
//   },
//   webcam: {
//     flexShrink: 0,
//     flexGrow: 0,
//   },
// }))

const Sidebar = () => {
  const { overlay } = useOverlayContext()
  let messages = useOverlayChat({ channel: overlay?.channel })

  if (process.env.NODE_ENV === "test") {
    messages = getFakeChat({ seed: 123 })
  }

  return (
    <Stack
      sx={{
        p: 3,
        display: "flex",
        flexDirection: "column",
        height: 1,
        backgroundColor: ({ palette }) =>
          palette.augmentColor({
            color: {
              main: palette.background.default,
            },
          }).dark,
      }}
    >
      <CurrentTopic
      // className={classes.currentTopic}
      />

      <Chat
        // className={classes.chat}
        messages={messages}
      />

      <GreenScreen aspectRatio="4:3" />
    </Stack>
  )
}

export default Sidebar
