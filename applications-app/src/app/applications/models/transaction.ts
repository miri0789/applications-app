import { Card } from "./card";

export enum TransactionType {
    AUTH = 1,
    COMMIT,
    REFUND
}

export class Transaction {
    id: number;
    amount: string;
    transType: TransactionType
    cardId: number;
    card?: Card;

    constructor(transaction: Transaction, cards: Card[]) {
        Object.assign(this, transaction);
        this.card = cards.find(card => card.id === this.cardId);
    }
}
