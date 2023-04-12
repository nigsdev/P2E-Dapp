// App Components
import { ContractFactory } from './contract-factory';

// Contract Data
import USDTData from './contracts/USDT.json';
import GemData from './contracts/Gem.json';
import SupraorbsCasinoData from './contracts/SupraorbsCasino.json';
import ChargedStateData from './contracts/ChargedState.json';


// const Dai = ContractFactory.create({name: DaiData.contractName,       
//     abi: DaiData.abi});

const Usdt = ContractFactory.create({name: USDTData.contractName,       
    abi: USDTData.abi});

const Gem = ContractFactory.create({name: GemData.contractName,       
    abi: GemData.abi});

// const ChargedParticles = ContractFactory.create({name: ChargedParticlesData.contractName,       
//     abi: ChargedParticlesData.abi});

const SupraorbsCasino = ContractFactory.create({name: SupraorbsCasinoData.contractName,       
    abi: SupraorbsCasinoData.abi});

const ChargedState = ContractFactory.create({name: ChargedStateData.contractName,       
    abi: ChargedStateData.abi});

export {
    // Dai,
    Usdt,
    Gem,
    // ChargedParticles,
    SupraorbsCasino,
    ChargedState
}

