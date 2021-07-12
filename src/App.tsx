import "./App.css";

import { getFollowerCount, getSubscriberCount } from "./lib/twitch";

import Twitter from "./twitter";
import Twitch from "./twitch";
import TikTok from "./tiktok";
import YouTube from "./youtube";

import Goal from "./goal";
import Task from "./task";
import Chat from "./chat";

const App = () => {
  return (
    <div className="app">
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
    </div>
  );
};

export default App;
