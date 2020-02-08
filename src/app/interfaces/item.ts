
export enum ItemState {
    Not_Seen,
    Learning,
    Mastered
}

export enum ItemType {
    Doctrine,
    Reference
}


export class Item {
    public static readonly MaxScore: number = 3;
    public static readonly MinScore: number = 0;

    private itemStateData: ItemStateData;

    constructor(
        readonly ID: number,
        readonly type: ItemType,
        readonly question: string,
        readonly answer: string,
        options: ItemStateOptions = {}) {
        this.itemStateData = {
            score: options.score || 0,
            state: options.state || ItemState.Not_Seen,
            numOfWrongAnswers: options.numOfWrongAnswers || 0
        };
    }

    get bookNumber(): number {
        return Math.floor(this.ID / 100);
    }

    get score(): number {
        return this.itemStateData.score;
    }

    get state(): ItemState {
        return this.itemStateData.state;
    }

    get numOfWrongAnswers(): number {
        return this.itemStateData.numOfWrongAnswers;
    }

    get mastered(): boolean {
        return this.score >= Item.MaxScore;
    }

    setItemStateData(data: ItemStateOptions) {
        this.itemStateData = {
            score: data.score || this.itemStateData.score,
            state: data.state || this.itemStateData.state,
            numOfWrongAnswers: data.numOfWrongAnswers || this.itemStateData.numOfWrongAnswers
        };
    }

    getItemStateData(): ItemStateData {
        return { score: this.score, state: this.state, numOfWrongAnswers: this.numOfWrongAnswers };
    }

    incrementScore(amount: number = 1): void {
        this.itemStateData.score += amount;
        if (this.itemStateData.score > Item.MaxScore) { this.itemStateData.score = Item.MaxScore; }
        this.updateStateBasedOnScore();
    }

    decrementScore(amount: number = 1): void {
        this.itemStateData.score -= amount;
        if (this.itemStateData.score < Item.MinScore) { this.itemStateData.score = Item.MinScore; }
        this.itemStateData.numOfWrongAnswers++;
        this.updateStateBasedOnScore();
    }

    private updateStateBasedOnScore(): void {
        this.itemStateData.state = ItemState.Learning;
        if (this.mastered) { this.itemStateData.state = ItemState.Mastered; }
    }
}

interface ItemStateData {
    score: number;
    state: ItemState;
    numOfWrongAnswers: number;
}

export interface ItemStateOptions {
    score?: number;
    state?: ItemState;
    numOfWrongAnswers?: number;
}
