"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = require("../../config");
var ethers = __importStar(require("ethers"));
var utils_1 = require("../../services/utils");
var validateUser = function (_a) {
    var nonce = _a.nonce, userSignedNonce = _a.userSignedNonce, appSignedNonce = _a.appSignedNonce, publicAddress = _a.publicAddress;
    console.log({ nonce: nonce, userSignedNonce: userSignedNonce, appSignedNonce: appSignedNonce });
    var recoveredUserAddress = ethers.utils.verifyMessage(nonce, userSignedNonce);
    console.log({ recoveredUserAddress: recoveredUserAddress });
    var recoveredAppAddress = ethers.utils.verifyMessage(nonce, appSignedNonce);
    console.log({ recoveredAppAddress: recoveredAppAddress });
    return recoveredUserAddress === publicAddress && recoveredAppAddress === config_1.config.PUBLIC_KEY;
};
var Mutation = {
    login: function (_, _a, _b) {
        var _c = _a.input, nonce = _c.nonce, userSignedNonce = _c.userSignedNonce, appSignedNonce = _c.appSignedNonce, publicAddress = _c.publicAddress;
        var Model = _b.Model;
        return __awaiter(void 0, void 0, void 0, function () {
            var validated, user, accessToken, newUser, accessToken;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, validateUser({
                            nonce: nonce,
                            userSignedNonce: userSignedNonce,
                            appSignedNonce: appSignedNonce,
                            publicAddress: publicAddress,
                        })];
                    case 1:
                        validated = _d.sent();
                        if (!validated) return [3 /*break*/, 5];
                        return [4 /*yield*/, Model.User.findOne({
                                publicAddress: publicAddress,
                            }).exec()];
                    case 2:
                        user = _d.sent();
                        if (!user) return [3 /*break*/, 3];
                        accessToken = jsonwebtoken_1.default.sign({ publicAddress: publicAddress, id: user.id }, config_1.config.ACCESS_TOKEN_SECRET);
                        return [2 /*return*/, { accessToken: accessToken, isNew: false }];
                    case 3: return [4 /*yield*/, Model.User.create({ publicAddress: publicAddress })];
                    case 4:
                        newUser = _d.sent();
                        accessToken = jsonwebtoken_1.default.sign({ publicAddress: publicAddress, id: newUser.id }, config_1.config.ACCESS_TOKEN_SECRET);
                        return [2 /*return*/, { accessToken: accessToken, isNew: true }];
                    case 5: return [2 /*return*/];
                }
            });
        });
    },
};
var Query = {
    getNonce: function () { return __awaiter(void 0, void 0, void 0, function () {
        var nonce, wallet, appSignedNonce;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    nonce = (0, utils_1.generateNonce)(12);
                    wallet = new ethers.Wallet(config_1.config.PRIVATE_KEY);
                    return [4 /*yield*/, wallet.signMessage(nonce)];
                case 1:
                    appSignedNonce = _a.sent();
                    return [2 /*return*/, { nonce: nonce, appSignedNonce: appSignedNonce }];
            }
        });
    }); },
};
module.exports = { Mutation: Mutation, Query: Query };
