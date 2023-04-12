import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  Nav, NavItem, NavLink, TabContent, TabPane,
} from 'reactstrap';
import classnames from 'classnames';
import GemDetail from './GemDetail';
import { WalletProps, GemProps } from '../../../shared/prop-types/ReducerProps';
import { ContractHelpers } from '../../../blockchain/contract-helpers.js';
import { Helpers } from '../../utils/helpers';
import { Globals } from '../../utils/helpers';

const GemsTabs = ({ walletState, gems , notifyUser, setLoadingProgress, setIsLoading }) => {
  const { isFetching } = walletState
  const [activeTab, setActiveTab] = useState('1');
  const [gemData, setGemData] = useState(gems.data.filter(gem => gem.id === parseInt(activeTab)));
  const [userGemData, setUserGemData] = useState(walletState.gemsAttributes.filter(gem => gem.id === parseInt(activeTab)));

  useEffect(() => {
    setUserGemData(walletState.gemsAttributes.filter(gem => gem.id === parseInt(activeTab)));
  }, [isFetching]);
 
  const toggle = (tab) => {
    if (activeTab !== tab) {
      setGemData(gems.data.filter(gem => gem.id === parseInt(tab)));
      setUserGemData(walletState.gemsAttributes.filter(gem => gem.id === parseInt(tab)));
      setActiveTab(tab);
    } 
  };

  const refreshUserData = async () => {
    await Helpers.updateWallet(walletState.connectedAddress);
    return true;
  }

  const sendErrorNotification = () => {
    const type = 'transactionError';
    notifyUser('danger', type, '');
  }

  const handleBuyGem = async ({ tokenId }) => {
    setIsLoading(true);
    setLoadingProgress('Activating Gem');
    const options = {
        from: walletState.connectedAddress,
        tokenId: tokenId,
        setLoadingProgress
    };
    try {
      const response = await ContractHelpers.buyGem(options);
      setLoadingProgress('Getting Transaction Details!')
      const {txReceipt} = response;
      if (txReceipt.status) {
        const type = 'buyGem';
        notifyUser('success', type, '');        
      }
      else if (!txReceipt.status) {
        sendErrorNotification();
      }

      return await refreshUserData();
    }
    catch (err) {
      sendErrorNotification();
      return false;
    }
    finally {
      setIsLoading(false);
    }
  }

  const handleDAIApproving = async () => {
    setIsLoading(true);
    setLoadingProgress ('Allow Your Gem to Spend DAI');
    const options = {
      from: walletState.connectedAddress,
      setLoadingProgress
    };
    try {
      const response = await ContractHelpers.allowDaiSpending(options);
      setLoadingProgress('Getting Transaction Details!')
      const {txReceipt} = response;
      if (txReceipt.status) {
        const type = 'DAIApprove';
        notifyUser('success', type, '');  
      }
      else if (!txReceipt.status) {
        sendErrorNotification();
      }

      return await refreshUserData();
    }
    catch (err) {
      sendErrorNotification();
      return false;
    }
    finally {
      setIsLoading(false);
    }
  }

  const handleAddChips = async ({ tokenId, amount }) => {
    //Checking if user has approved DAI transfer for the contract
    if (!walletState.isDaiSpendingAllowed) {
      return await handleDAIApproving();
    }
    setIsLoading(true);
    setLoadingProgress('Adding Chips to Gem')
    const options = {
      from: walletState.connectedAddress,
      tokenId: tokenId,
      chipsAmount: amount,
      setLoadingProgress
    };

    try {
      const response = await ContractHelpers.addChips(options);
      setLoadingProgress('Getting Transaction Details!')
      const {txReceipt} = response;
      if (txReceipt.status) {
        const type = 'addChips';
        const message = `You have successfully added ${amount} chips`;
        notifyUser('success', type, message);
      }
      else if (!txReceipt.status) {
        sendErrorNotification();
      }
      return await refreshUserData();
    }
    catch (err) {
      sendErrorNotification();
      return false;
    }
    finally {
      setIsLoading(false);
      setUserGemData(walletState.gemsAttributes.filter(gem => gem.id === parseInt(activeTab))); 
    }
  }

  const handleReleaseChips = async ({ tokenId, amount }) => {
    setIsLoading(true);
    setLoadingProgress('Releasing Chips from Gem')
      const options = {
          from: walletState.connectedAddress,
          tokenId: tokenId,
          chipsAmount: amount,
          setLoadingProgress
      };
    try {
      const response = await ContractHelpers.withdrawChips(options);
      setLoadingProgress('Getting Transaction Details!')
      const {txReceipt} = response;
      if (txReceipt.status) {
        const type = 'withdrawChips';
        const message = `You have successfully withdraw ${amount} chips`;
        notifyUser('success', type, message); 
      }
      else if (!txReceipt.status) {
        sendErrorNotification();
      }

      return await refreshUserData();
    }
    catch (err) {
      sendErrorNotification();
      return false;
    }
    finally {
      setIsLoading(false);
      setUserGemData(walletState.gemsAttributes.filter(gem => gem.id === parseInt(activeTab))); 
    }
  }

  const handleSubmit = async ({ action, amount, tokenId }) => {
    switch (action) {
      case 'buy': {
        return await handleBuyGem({ tokenId });
      }
      case 'add': {
        return await handleAddChips({ tokenId, amount });
      }
      case 'release': {
        return await handleReleaseChips({ tokenId, amount });
      }
      default:
        return false;
    }    
  };

  return (
    <div className="tabs__wrap">
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => toggle('1')}
          >
            Garnet
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => toggle('2')}
          >
            Ruby
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '3' })}
            onClick={() => toggle('3')}
          >
            Amethyst
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '4' })}
            onClick={() => toggle('4')}
          >
            Emerald
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '5' })}
            onClick={() => toggle('5')}
          >
            Opal
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '6' })}
            onClick={() => toggle('6')}
          >
            Diamond
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <GemDetail onSubmit={handleSubmit} data={gemData} userGemData={userGemData} />
        </TabPane>
        <TabPane tabId="2">
          <GemDetail onSubmit={handleSubmit} data={gemData} userGemData={userGemData} />
        </TabPane>
        <TabPane tabId="3">
          <GemDetail onSubmit={handleSubmit} data={gemData} userGemData={userGemData} />
        </TabPane>
        <TabPane tabId="4">
          <GemDetail onSubmit={handleSubmit} data={gemData} userGemData={userGemData} />
        </TabPane>
        <TabPane tabId="5">
          <GemDetail onSubmit={handleSubmit} data={gemData} userGemData={userGemData} />
        </TabPane>
        <TabPane tabId="6">
          <GemDetail onSubmit={handleSubmit} data={gemData} userGemData={userGemData} />
        </TabPane>
      </TabContent>
    </div>
  );
};

GemsTabs.propTypes = {
  walletState: WalletProps.isRequired,
  gems: GemProps.isRequired,
};

export default withRouter(connect((state) => ({
  walletState: state.walletState,
  gems: state.gems,
}))(GemsTabs));
