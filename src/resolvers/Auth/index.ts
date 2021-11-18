import jwt from "jsonwebtoken";
import {Context} from "../../types";
import {config} from "../../config";
import * as ethers from "ethers";
import {generateNonce} from "../../services/utils";

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
  const recoveredUserAddress = ethers.utils.recoverAddress(
    nonce,
    userSignedNonce
  );
  const recoveredAppAddress = ethers.utils.recoverAddress(
    nonce,
    appSignedNonce
  );
  return (
    recoveredUserAddress === publicAddress &&
    recoveredAppAddress === config.PUBLIC_KEY
  );
};

type GetNonceArgs = {input: {publicAddress: string}};

const Mutation = {
  login: async (
    _: object,
    {input: {nonce, userSignedNonce, appSignedNonce, publicAddress}}: LoginArgs,
    {Model}: Context
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
        const accessToken = jwt.sign(
          {publicAddress, id: user.id},
          config.ACCESS_TOKEN_SECRET
        );
        return {accessToken, isNew: false};
      } else {
        const newUser = await Model.User.create({publicAddress});
        const accessToken = jwt.sign(
          {publicAddress, id: newUser.id},
          config.ACCESS_TOKEN_SECRET
        );
        return {accessToken, isNew: true};
      }
    }
  },
  getNonce: async (
    _: object,
    {input: {publicAddress}}: GetNonceArgs,
    {Model}: Context
  ) => {
    const nonce = generateNonce(12);
    const wallet = new ethers.Wallet(config.PRIVATE_KEY);
    const appSignedNonce = wallet.signMessage(nonce);
    return {nonce, appSignedNonce};
  },
};

module.exports = {Mutation};
