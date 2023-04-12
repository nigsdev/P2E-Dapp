import { ContractHelpers } from '../../../../blockchain/contract-helpers'
import { Helpers } from '../../../utils/helpers'
import gemsDefaultData from '../../../../blockchain/gemsDefaultData'

export const GemUtility = {}

GemUtility.handleAddChips = async ({
  tokenId,
  amount,
  setIsLoading,
  setLoadingProgress,
  connectedAddress,
  notifyUser,
}) => {
  console.log('handleAddChips.js')
  setIsLoading(true)
  setLoadingProgress('Adding Chips to Gem')
  const options = {
    from: connectedAddress,
    tokenId: tokenId,
    chipsAmount: amount,
    setLoadingProgress,
  }

  try {
    const response = await ContractHelpers.addChips(options)
    setLoadingProgress('Getting Transaction Details!')
    const { txReceipt } = response
    if (txReceipt.status) {
      const type = 'addChips'
      const message = `You have successfully added ${amount} chips`
      notifyUser('success', type, message)
    } else if (!txReceipt.status) {
      notifyUser('danger', 'transactionError', '')
    }
    return await Helpers.updateWallet(connectedAddress)
  } catch (err) {
    notifyUser('danger', 'transactionError', '')
    return false
  } finally {
    setIsLoading(false)
  }
}

GemUtility.handleReleaseChips = async ({
  tokenId,
  amount,
  setIsLoading,
  setLoadingProgress,
  connectedAddress,
  notifyUser,
}) => {
  setIsLoading(true)
  setLoadingProgress('Releasing Chips from Gem')
  const options = {
    from: connectedAddress,
    tokenId: tokenId,
    chipsAmount: amount,
    setLoadingProgress,
  }
  try {
    const response = await ContractHelpers.withdrawChips(options)
    setLoadingProgress('Getting Transaction Details!')
    const { txReceipt } = response
    if (txReceipt.status) {
      const type = 'withdrawChips'
      const message = `You have successfully withdraw ${amount} chips`
      notifyUser('success', type, message)
    } else if (!txReceipt.status) {
      notifyUser('danger', 'transactionError', '')
    }

    return await Helpers.updateWallet(connectedAddress)
  } catch (err) {
    notifyUser('danger', 'transactionError', '')
    return false
  } finally {
    setIsLoading(false)
  }
}

GemUtility.getGemData = (gemType) => {
  return gemsDefaultData.filter((item) => item.type === gemType)[0]
}

GemUtility.getUserGemData = (allGemsData, gemName) => {
  return allGemsData.filter((gem) => gem.name === gemName)[0]
}
