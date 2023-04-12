import GameContext from './unityContext'
import { ContractHelpers } from '../../../../blockchain/contract-helpers'

export const GameUtility = {}

GameUtility.unityContext = (gameName) => {
  return GameContext.instance(gameName)
}

GameUtility.getSlotMachineOrb = async (tokenId) => {
  const slotMachineOrb = await ContractHelpers.getSlotMachineOrb(tokenId)
  return slotMachineOrb
}
