import web3 from './web3';
import config from '../config';
import ChildArt from '../../truffle/build/contracts/ChildArt.json';

const instance = new web3.eth.Contract(ChildArt.abi, config.contract_address);

export default instance;
