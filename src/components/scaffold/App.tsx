import { getFollowerCount, getSubscriberCount } from "lib/twitch"

import Root from "components/scaffold/Root"

import Twitter from "components/svgs/Twitter"
import Twitch from "components/svgs/Twitch"
import TikTok from "components/svgs/TikTok"
import YouTube from "components/svgs/YouTube"

import Chat from "components/twitch-chat/Chat"

import Goal from "components/common/Goal"
import Task from "components/common/Task"

const App = () => {
  return (
    <Root className="app">
      <div className="main">
        <div className="content rounded shadow greenscreen" />
        <div className="details">
          <div className="socials-section">
            <div className="social">
              <Twitter />
              <p className="bold medium-text">@IsaiahByDayah</p>
            </div>
            <div className="social">
              <TikTok />
              <p className="bold medium-text">@IsaiahByDayah</p>
            </div>
            <div className="social">
              <Twitch />
              <p className="bold medium-text">/IsaiahByDayah</p>
            </div>
            <div className="social">
              <YouTube />
              <p className="bold medium-text">/IsaiahByDayah</p>
            </div>
          </div>
          <div className="tasks-section">
            <p className="bold large-text title">Current Tasks</p>
            <div className="tasks-wrapper">
              <Task
                label="fugiat qui quod"
                description="Recusandae impedit repellendus iure distinctio sint eligendi voluptatem."
              />
              <Task label="qui dolore odit" />
              <Task label="pariatur dignissimos ipsa" />
            </div>
          </div>
          <div className="goals-section">
            <p className="bold medium-text title centered">Goals</p>
            <div className="goals-wrapper">
              <Goal value={getFollowerCount} total={600} label="Followers" />
              <Goal value={getSubscriberCount} total={75} label="Subs" />
            </div>
          </div>
        </div>
      </div>
      <div className="sidebar">
        <div className="topics-section">
          <p className="bold large-text title centered">Current Topic</p>
          <p className="topic bold medium-text rounded shadow ">Design</p>
        </div>
        {/* <iframe
          title="twitch chat"
          className="chat rounded shadow"
          src="https://www.twitch.tv/embed/isaiahbydayah/chat?parent=localhost"
          height="100%"
          width="100%"
        ></iframe> */}
        <Chat className="chat rounded shadow" />
        <div className="camera rounded shadow greenscreen" />
      </div>
    </Root>
  )
}

export default App
