import React, { useState, useEffect, useRef } from 'react';

import { Button } from '@material-ui/core';
import TelegramIcon from '@material-ui/icons/Telegram';
import './App.css';

import GaneshCover from './assets/gamesh_pic.jpeg';

import GaneshCeleb1 from './assets/celeb1.jpeg';
import GaneshCeleb2 from './assets/celeb2.jpeg';
import GaneshCeleb3 from './assets/celeb3.jpeg';

// import CoverPic from './assets/cover.jpg';
// import Image1 from './assets/img1.jpeg';
// import Image2 from './assets/img2.jpeg';
import Invitation1 from './assets/invitation1.jpg';
import Invitation2 from './assets/invitation2.jpg';
import loading from './assets/loading.gif';

import ganpatiSong from './assets/ganpatiSong.mp3';
//import eVideo from './assets/e-video.mp4'

const buttonConfig = [
  {
    label: '📅 When is the Celebration?',
    id: 'celebration date',
  },
  {
    label: 'Where is the Celebration?',
    id: 'where date',
  },
  {
    label: 'How can I contribute (Donation)',
    id: 'contribute',
  },
  {
    label: 'Want to see how we celebrated 😍',
    id: 'celebration pics',
  },
  // {
  //   label: 'Where do I need to come?',
  //   id: 'location'
  // },
];

const botConfig = {
  'celebration date': {
    text: [
      `It's a <b>10 days</b> event starting from <b>31st August</b> - <b>9th September</b>.`,
      `Yeah we know, it's a grand event and we are also planing for regular Aarti, Prashad  followed by <b>Maha-Bhoj</b>!`,
    ],
    audio: ganpatiSong,
  },
  'where date': {
    text: [`It's in Purva Skywood <b>Club House</b>.`],
  },
  'celebration pics': {
    image: [GaneshCeleb1, GaneshCeleb2, GaneshCeleb3],
    text: [`Here you go`],
  },
  'reception date': {
    text: [
      `It's on the <b>12th</b> of December at <b>Sports assembly, Raniganj</b>`,
      'you can just follow google maps:',
    ],
    location:
      'https://tars-file-upload.s3.amazonaws.com/ByNADi/e8e72425e745b4a32703175a09276c0a--staticmap.png',
    link: 'https://goo.gl/maps/qmqbnXyqk1abKGuT9',
  },
  // 'location': {
  //   text: [`It's at <b>Sports assembly, Raniganj</b>`, 'you can just follow google maps:'],
  //   location: 'https://tars-file-upload.s3.amazonaws.com/ByNADi/e8e72425e745b4a32703175a09276c0a--staticmap.png',
  //   link: 'https://goo.gl/maps/AA7CtMdjwJcqzzs68'
  // },
  contribute: {
    text: [`Please select your block.`],
    blockType: [
      'Block A',
      'Block B',
      'Block C',
      'Block D',
      'Block E',
      'Block G',
      'Block H',
    ],
    //video: eVideo
  },
  'Block A': {
    text: [`Block A SPOC`, 'Rashmi Nangia A1304', `<a>rashmiashish20@okicici</a>, <a>9900053705@paytm</a>`],
  },
  'Block B': {
    text: [`Block B SPOC`, 'Shardul Tamane: B207', `<a>9404500900@paytm</a>`],
  },
  'Block C': {
    text: [`Block C SPOC`, 'Anupam Kalia C 1102', `<a>9535194612@paytm</a>`],
  },
  'Block D': {
    text: [`Block D SPOC`, 'Samina D1303', `<a>saminasahoo@okhdfcbank</a>`],
  },
  'Block E': {
    text: [`Block E SPOC`, 'Neha Sharma Rao E002', `<a>nehasharmayz@okhdfcbank</a>, <a>9972091979@paytm</a>`],
  },
  'Block G': {
    text: [`Block G SPOC`, 'Divya Nayar G 1107', `<a>nayardivya79@okicici</a>, <a>9845678165@paytm</a>`],
  },
  'Block H': {
    text: [`Block H SPOC`, 'Tuhina H1801', `<a>9620181138@upi</a>`],
  }
};

function App() {
  const [chatData, setChatData] = useState([
    {
      image: [GaneshCover],
      text: [
        'Hey! 😊',
        `<b>Skywoodians</b>, are celebrating Ganesh Utsav 🐀`,
        'And we want you to be a part of this celebration.',
      ],
    },
  ]);

  const [isInput, setInput] = useState(true);
  const [currentButtonFlow, setCurrentButtonFlow] = useState(buttonConfig);
  const [userSelection, setUserSelection] = useState('');
  const [userData, setuserData] = useState(null);

  const chatRef = useRef(false);
  const audioRef = useRef(false);
  const videoRef = useRef(false);

  const renderChat = (data, i) => (
    <>
      {i % 2 === 1 ? (
        <div className="user-response">
          <div className="message user-chat-bubble">{data.userSays}</div>
        </div>
      ) : (
        <div className="bot-response">
          <>
            <div>
              {data.text &&
                data.text.map((dataText) => (
                  <div className="message chat-bubble">
                    <span dangerouslySetInnerHTML={{ __html: dataText }}></span>
                  </div>
                ))}
              {data.image &&
                data.image.map((image) => (
                  <div className="message-image">
                    <img data-action="zoom" src={image} />
                  </div>
                ))}
              {data.location && (
                <div className="message chat-bubble">
                  <a href={data.link} target="_blank">
                    <img src={data.location} style={{ width: '100%' }} />
                  </a>
                </div>
              )}
              {data.audio && (
                <audio ref={audioRef} id="audio">
                  <source type="audio/mpeg" />
                </audio>
              )}
              {data.video && (
                <div className="video-container">
                  <video ref={videoRef} width="200" height="240" controls>
                    <source src={data.video} type="video/mp4" />
                  </video>
                </div>
              )}
              {data.blockType && data.blockType.length > 0 && (
                <div className="block-container">
                  {data.blockType.map((block) => (
                    <div className="block-bubble" onClick={(e) => buttonHandler(e, block, block)}>
                      <span dangerouslySetInnerHTML={{ __html: block }}></span>
                    </div>
                  ))}
                </div>
              )}

              {data.typing && (
                <div className="loading chat-bubble">
                  <img src={loading} />
                </div>
              )}
            </div>
          </>
        </div>
      )}
    </>
  );

  useEffect(() => {
    if (chatRef.current) {
      const newNode = chatRef;
      newNode.current.scrollTop = newNode.current.scrollHeight;
    }
  });

  useEffect(() => {
    if (userSelection === 'celebration date') {
      audioRef.current.src = ganpatiSong;
      audioRef.current.pause();
      audioRef.current.play();
    }
  }, [userSelection]);

  const inputHandler = (e) => {
    setInput(!isInput);
  };

  useEffect(() => {
    if (userData) {
      setTimeout(() => chatLogicHandler(userData), 2000);
    }
  }, [userData]);

  const chatLogicHandler = (id) => {
    const cloneChatData = [...chatData];
    cloneChatData.pop();
    const botObj = {
      ...botConfig[id],
    };
    cloneChatData.push(botObj);
    setChatData(cloneChatData);
    setUserSelection(id);
    setInput(!isInput);
  };

  const buttonHandler = (e, id, label) => {
    e.preventDefault();
    const cloneChatData = [...chatData];
    const buttons = currentButtonFlow.filter(
      (buttonFlow) => buttonFlow.id !== id
    );
    const userObj = {
      userSays: label,
    };
    const botObj = {
      typing: true,
    };
    cloneChatData.push(userObj);
    cloneChatData.push(botObj);
    setChatData(cloneChatData);
    setCurrentButtonFlow(buttons);
    setuserData(id);
    setInput(!isInput);
  };

  return (
    <div className="bot">
      <div className="bot-container">
        <div className="bot-section">
          <div
            className="bot-messages"
            ref={chatRef}
            style={isInput ? { height: '72%' } : { height: '88%' }}
          >
            {chatData.map((obj, i) => renderChat(obj, i))}
          </div>
          <div className="bot-footer">
            <div className="bot-input-container" onClick={inputHandler}>
              <input
                type="text"
                placeholder="👇🏻👇🏻 Choose from below... 👇🏻👇🏻"
                className="input"
                disabled
              />
              <TelegramIcon className="input-send" />
            </div>
            {isInput && (
              <div className="bot-button-container">
                {currentButtonFlow.slice(0, 2).map((config, i) => (
                  <Button
                    type="button"
                    className="button"
                    variant="contained"
                    onClick={(e) => buttonHandler(e, config.id, config.label)}
                  >
                    {config.label}
                  </Button>
                ))}
              </div>
            )}
            <div className="created-by">
              Created by :{' '}
              <a href="https://www.facebook.com/abhineet.modi/" target="_blank">
                {' '}
                Abhineet Modi
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
