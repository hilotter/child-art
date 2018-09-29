const ChildArt = artifacts.require('./ChildArt.sol');

module.exports = function (deployer) {
  deployer.deploy(ChildArt);
};
