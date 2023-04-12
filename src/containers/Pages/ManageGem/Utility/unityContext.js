import { UnityContext } from 'react-unity-webgl'
import gamesList from './gamesList'

class GameContext {
  constructor(gameName) {
    this.gameName = gameName
    const { loaderUrl, dataUrl, frameworkUrl, codeUrl } = gamesList.filter(
      (item) => item.type === gameName,
    )[0]

    this.unityContext = new UnityContext({
      loaderUrl: loaderUrl,
      dataUrl: dataUrl,
      frameworkUrl: frameworkUrl,
      codeUrl: codeUrl,
    })
  }

  static instance(gameName) {
    if (!GameContext.__instance || this.gameName !== gameName) {
      GameContext.__instance = new GameContext(gameName)
    }
    return GameContext.__instance
  }

  getUnityContext() {
    return this.unityContext
  }

  prepare(userName, currentBalance) {
    console.log('preparing Game', userName, currentBalance)
    this.unityContext.on('canvas', (canvas) => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    })

    this.unityContext.on('OrbGuiLoaded', () => {
      try {
        this.unityContext.send('OrbHolder', 'OrbLogin', userName)
        this.unityContext.send('Player', 'SetCoinsCount', currentBalance)
      } catch (err) {
        console.error()
      }
    })

    this.unityContext.on('RouletteOrbLoaded', () => {
      try {
        this.unityContext.send('OrbHolder', 'OrbLogin', String(currentBalance))
      } catch (err) {
        console.error()
      }
    })

    // unityContext.on("BaccaratOrbLoaded", () => {
    //   try {
    //     console.log("BaccaratOrbLoaded");
    //     unityContext.send("BBMainMenuController", "setPlayerNickname", games.activeGame.userName);
    //     unityContext.send("BBMainMenuController", "setPlayerBalance", games.activeGame.currentBalance);
    //   } catch (err) {
    //     console.error();
    //   }
    // })

    this.unityContext.on('CrapsOrbLoaded', () => {
      try {
        this.unityContext.send('OrbHolder', 'OrbLogin', String(currentBalance))
      } catch (err) {
        console.error()
      }
    })

    this.unityContext.on('CoinsUpdated', (coins) => {
      console.log('coin updated ', coins)
      // call react page function to dispatch game coin updates
    })
  }

  setFullscreen() {
    this.unityContext.setFullscreen(true)
  }
}
GameContext.__instance = null

export default GameContext
