import jwt from "jsonwebtoken";
import { Context } from "../../types";
import { config } from "../../config";
import * as ethers from "ethers";
import { generateNonce } from "../../services/utils";

type LoginArgs = {
  input: {
    nonce: string;
    userSignedNonce: string;
    appSignedNonce: string;
    publicAddress: string;
  };
};

const validateUser = ({
  nonce,
  userSignedNonce,
  appSignedNonce,
  publicAddress,
}: LoginArgs["input"]) => {
  console.log({ nonce, userSignedNonce, appSignedNonce });
  const recoveredUserAddress = ethers.utils.verifyMessage(nonce, userSignedNonce);
  console.log({ recoveredUserAddress });
  const recoveredAppAddress = ethers.utils.verifyMessage(nonce, appSignedNonce);
  console.log({ recoveredAppAddress });
  return recoveredUserAddress === publicAddress && recoveredAppAddress === config.PUBLIC_KEY;
};

const Mutation = {
  login: async (
    _: object,
    { input: { nonce, userSignedNonce, appSignedNonce, publicAddress } }: LoginArgs,
    { Model }: Context
  ) => {
    const validated = await validateUser({
      nonce,
      userSignedNonce,
      appSignedNonce,
      publicAddress,
    });
    if (validated) {
      const user = await Model.User.findOne({
        publicAddress,
      }).exec();
      if (user) {
        const accessToken = jwt.sign({ publicAddress, id: user.id }, config.ACCESS_TOKEN_SECRET);
        return { accessToken, isNew: false };
      } else {
        const newUser = await Model.User.create({ publicAddress });
        const accessToken = jwt.sign({ publicAddress, id: newUser.id }, config.ACCESS_TOKEN_SECRET);
        return { accessToken, isNew: true };
      }
    }
  },
};

const Query = {
  getNonce: async () => {
    const nonce = generateNonce(12);
    const wallet = new ethers.Wallet(config.PRIVATE_KEY);
    const appSignedNonce = await wallet.signMessage(nonce);
    return { nonce, appSignedNonce };
  },
};

module.exports = { Mutation, Query };
