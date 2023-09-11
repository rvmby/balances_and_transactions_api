"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHistoricalBalance = void 0;
function getBalance() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('https://uh4goxppjc7stkg24d6fdma4t40wxtly.lambda-url.eu-central-1.on.aws/balances', {
            method: 'GET',
            headers: {
                'x-api-key': 'b4a4552e-1eac-44ac-8fcc-91acca085b98-f94b74ce-aa17-48f5-83e2-8b8c30509c18'
            },
        });
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return yield response.json();
    });
}
function getTransactions() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('https://uh4goxppjc7stkg24d6fdma4t40wxtly.lambda-url.eu-central-1.on.aws/transactions', {
            method: 'GET',
            headers: {
                'x-api-key': 'b4a4552e-1eac-44ac-8fcc-91acca085b98-f94b74ce-aa17-48f5-83e2-8b8c30509c18'
            },
        });
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return yield response.json();
    });
}
function getHistoricalBalance(from, to) {
    return __awaiter(this, void 0, void 0, function* () {
        const balance = yield getBalance();
        const transactions = (yield getTransactions()).sort((t1, t2) => Number(t2.date) - Number(t1.date));
    });
}
exports.getHistoricalBalance = getHistoricalBalance;
