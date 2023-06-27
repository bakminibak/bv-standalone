import React, { useState, useEffect } from "react";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";
import logo from "./logo.svg";
import "./App.css";

import { Level } from "./components/Level";
import { LevelMobile } from "./components/LevelMobile";
import { LevelPoints } from "./components/LevelPoints";
import { WelcomeDesk } from "./components/WelcomeDesk";
import { IntroAnimation } from "./components/IntroAnimationDesk/IntroAnimation";
import { EndScr } from "./components/EndScr";
import { EndScrMobile } from "./components/EndScrMobile";
import { SessionEnd } from "./components/SessionEnd";
import { SessionEndMobile } from "./components/SessionEnd_Mobile";

import { WelcomeDeskMobile } from "./components/WelcomeDesk_Mobile";
import { IntroAnimationMobile } from "./components/introMobile/IntroAnimationMobile";
import { Fader } from "./components/FaderComponent";

function App() {
  //const animationContainer = useRef(null);
  const [totalPoints, setTotalPoints] = useState(0);
  const [currentLevel, setCurrentlevel] = useState(-1); //default -1 - Welcome Scr
  const [numChestOpened, setNumChestOpened] = useState(0);
  const [isSessionActive, setIsSessionActive] = useState(true);
  // const [showInfoScr, setShowInfoScr] = useState(false);

  const orentation = isMobile;

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const levelPrizes = [
    [500, -200, -50],
    [100, 100, -500],
    [-100, 2500, 500],
  ];

  const getChestReward = (level) => {
    fetch("https://api.example.com/items")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };

  const animatePoints = (_points) => {
    let _toPoints = totalPoints + _points;
  };
  const updateTotalPoints = () => {
    let _points = Number(levelPrizes[currentLevel - 1][numChestOpened]);

    setNumChestOpened(numChestOpened + 1);
    //animatePoints(_points);
    setTotalPoints(totalPoints + _points);
  };
  const updateLevel = (level) => {
    setCurrentlevel(level);
  };
  const loadNextLevel = () => {
    setNumChestOpened(0);
    currentLevel < 4 ? setCurrentlevel(currentLevel + 1) : setCurrentlevel(-1);
  };
  //Preload animation images
  useEffect(() => {
    let levelBgImgs;
    console.log("images loding.......");
    if (isMobile) {
      levelBgImgs = [
        "./images/mobile/level1/img_13.jpg",
        "./images/mobile/level2/img_21.jpg",
        "./images/mobile/level3/img_21.jpg",
        "./images/mobile/welcome/img_15.png",
        "./images/mobile/welcome/img_1.png",
        "./images/kovcheg_prazen/img_5.png",
        "./images/kovcheg_prazen/img_1.png",
        "./images/kovcheg_prazen/img_6.png",
        "./images/kovcheg_zlato/img_6.png",
        "./images/kovcheg_zlato/img_7.png",
        "./images/kovcheg_zlato/img_9.png",
        "./images/kovcheg_zlato/img_2.png",
        "./images/kovcheg_zlato/img_1.png",
      ];
    } else {
      levelBgImgs = [
        "./images/nivo1/img_13.jpg",
        "./images/nivo2/img_21.jpg",
        "./images/nivo3/img_19.jpg",
        "./images/welcome_desk/img_15.png",
        "./images/welcome_desk/img_1.png",
        "./images/kovcheg_prazen/img_5.png",
        "./images/kovcheg_prazen/img_1.png",
        "./images/kovcheg_prazen/img_6.png",
        "./images/kovcheg_zlato/img_6.png",
        "./images/kovcheg_zlato/img_7.png",
        "./images/kovcheg_zlato/img_9.png",
        "./images/kovcheg_zlato/img_2.png",
        "./images/kovcheg_zlato/img_1.png",
      ];
    }

    cacheImages(levelBgImgs);

    //setIsLoading(false);
    return () => {
      //second;
    };
  }, []);

  const cacheImages = async (levelBgImgs) => {
    const promises = await levelBgImgs.map((src) => {
      return new Promise(function (resolve, reject) {
        const img = new Image();
        img.src = src;
        img.onload = resolve();
        img.onerror = reject();
        console.log("loaded img src: ", src);
      });
    });
    await Promise.all(promises).then(() => {
      console.log("images loaded");
      setIsLoading(false);
    });
  };
  return (
    <div className="App">
      <header className="App-header"></header>

      {isLoading && currentLevel < 4 && (
        <div className="loaderIcon">
          <img src="./images/loader.gif" />
        </div>
      )}
      <main>
        {(isMobile && (
          <MobileView className="mobile-view">
            {!isSessionActive && <SessionEndMobile />}
            {currentLevel === -1 && (
              <WelcomeDeskMobile updateLevel={updateLevel} />
            )}
            {currentLevel === 0 && (
              <IntroAnimationMobile updateLevel={updateLevel} />
            )}
            {currentLevel === 1 && (
              <LevelMobile
                updatePoints={() => {
                  updateTotalPoints();
                }}
                levelPrizes={levelPrizes[currentLevel - 1]}
                currentLevel={currentLevel}
                handleNextLevel={() => {
                  loadNextLevel();
                }}
              />
            )}
            {currentLevel === 2 && (
              <LevelMobile
                updatePoints={() => {
                  updateTotalPoints();
                }}
                levelPrizes={levelPrizes[currentLevel - 1]}
                currentLevel={currentLevel}
                handleNextLevel={() => {
                  loadNextLevel();
                }}
              />
            )}
            {currentLevel === 3 && (
              <LevelMobile
                updatePoints={() => {
                  updateTotalPoints();
                }}
                levelPrizes={levelPrizes[currentLevel - 1]}
                currentLevel={currentLevel}
                handleNextLevel={() => {
                  loadNextLevel();
                }}
              />
            )}
            {currentLevel > 0 && currentLevel < 4 && (
              <LevelPoints totalPoints={totalPoints} />
            )}
            {currentLevel > 3 && (
              <EndScrMobile
                totalPoints={totalPoints}
                handleNextLevel={() => {
                  loadNextLevel();
                }}
              />
            )}
          </MobileView>
        )) || (
          <BrowserView className="desktop-view">
            {!isSessionActive && <SessionEnd />}
            {currentLevel === -1 && <WelcomeDesk updateLevel={updateLevel} />}
            {currentLevel === 0 && <IntroAnimation updateLevel={updateLevel} />}
            {currentLevel === 1 && (
              <Level
                updatePoints={() => {
                  updateTotalPoints();
                }}
                levelPrizes={levelPrizes[currentLevel - 1]}
                currentLevel={currentLevel}
                handleNextLevel={() => {
                  loadNextLevel();
                }}
              />
            )}
            {currentLevel === 2 && (
              <Level
                updatePoints={() => {
                  updateTotalPoints();
                }}
                levelPrizes={levelPrizes[currentLevel - 1]}
                currentLevel={currentLevel}
                handleNextLevel={() => {
                  loadNextLevel();
                }}
              />
            )}
            {currentLevel === 3 && (
              <Level
                updatePoints={() => {
                  updateTotalPoints();
                }}
                levelPrizes={levelPrizes[currentLevel - 1]}
                currentLevel={currentLevel}
                handleNextLevel={() => {
                  loadNextLevel();
                }}
              />
            )}
            {currentLevel > 0 && currentLevel < 4 && (
              <LevelPoints totalPoints={totalPoints} />
            )}
            {currentLevel > 3 && (
              <EndScr
                totalPoints={totalPoints}
                handleNextLevel={() => {
                  loadNextLevel();
                }}
              />
            )}
          </BrowserView>
        )}
      </main>
    </div>
  );
}

export default App;
