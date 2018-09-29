import axios from 'axios';
import ChildArt from './ChildArt';
import config from '../config';

const getTokenUriById = async (tokenId) => {
  const tokenUri = await ChildArt.methods.tokenURI(tokenId).call();
  return tokenUri;
}

const getTokenIdByIndex = async (i) => {
  const tokenId = await ChildArt.methods.tokenByIndex(i).call();
  return tokenId;
}

const getTokenIdByIpfsHash = async (hash) => {
  const tokenId = await ChildArt.methods.tokenIdByIpfsHash(hash).call();
  return tokenId;
}

const getTokenDetailByIpfsHash = async (ipfsHash) => {
  let tokenId;
  let tokenDetail;
  let res;
  try {
    tokenId = await getTokenIdByIpfsHash(ipfsHash);
    tokenDetail = await getTokenDetail(tokenId);
  } catch (err) {
    console.log(err);
    return;
  }

  return tokenDetail;
}

const getTokenDetail = async (tokenId) => {
  let res;
  let tokenUri;
  try {
    tokenUri = await getTokenUriById(tokenId);
    res = await axios.get(tokenUri);
    if (res.status != 200) {
      return;
    }
  } catch (err) {
    console.log(err);
    return;
  }

  const name = res.data.name;
  const description = res.data.description;
  const image = res.data.image;
  const linkUrl = `${config.opensea_assets_url}${config.contract_address}/${tokenId}`;
  const ipfsHash = res.data.ipfs_hash;
  return {
    tokenId,
    name,
    description,
    image,
    linkUrl,
    ipfsHash,
  };
}

export {
  getTokenIdByIndex,
  getTokenDetail,
  getTokenDetailByIpfsHash,
};
