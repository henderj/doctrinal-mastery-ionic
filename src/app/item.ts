
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

    private _itemStateData: ItemStateData;

    constructor(readonly ID: number,
        readonly type: ItemType,
        readonly question: string,
        readonly answer: string,
        options: ItemStateOptions = {}) {
        this._itemStateData = {
            score: options.score || 0,
            state: options.state || ItemState.Not_Seen,
            numOfWrongAnswers: options.numOfWrongAnswers || 0
        };
    }

    get score(): number {
        return this._itemStateData.score;
    }

    get state(): ItemState {
        return this._itemStateData.state;
    }

    get numOfWrongAnswers(): number {
        return this._itemStateData.numOfWrongAnswers;
    }

    get mastered(): boolean {
        return this.score >= Item.MaxScore;
    }

    setItemStateData(data: ItemStateOptions) {
        this._itemStateData = {
            score: data.score || this._itemStateData.score,
            state: data.state || this._itemStateData.state,
            numOfWrongAnswers: data.numOfWrongAnswers || this._itemStateData.numOfWrongAnswers
        };
    }

    getItemStateData(): ItemStateData{
        return {score: this.score, state: this.state, numOfWrongAnswers: this.numOfWrongAnswers};
    }

    incrementScore(amount: number = 1): void {
        this._itemStateData.score += amount;
        if (this._itemStateData.score > Item.MaxScore) this._itemStateData.score = Item.MaxScore;
        this.updateStateBasedOnScore();
    }

    decrementScore(amount: number = 1): void {
        this._itemStateData.score -= amount;
        if (this._itemStateData.score < Item.MinScore) this._itemStateData.score = Item.MinScore;
        this._itemStateData.numOfWrongAnswers++;
        this.updateStateBasedOnScore();
    }

    private updateStateBasedOnScore(): void {
        this._itemStateData.state = ItemState.Learning;
        if (this.mastered) this._itemStateData.state = ItemState.Mastered;
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
