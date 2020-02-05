import { Item, ItemState, ItemType } from './item';
export class Book {

    constructor(readonly name: string, readonly items: Item[]) {
    }

    get progress(): number {
        const totalLearnedOrMastered: number = this.itemsLearning.length * 1 + this.itemsMastered.length * 2;
        const percent: number = totalLearnedOrMastered / (this.items.length * 2);
        return percent * 100;
    }
    get pointsLeft(): number {
        const maxPoints = this.items.length * Item.MaxScore;
        const currentPoints = this.items.reduce((sum, current) => sum + current.score, 0);
        return maxPoints - currentPoints;
    }
    get doctrines(): Item[] {
        return this.items.filter(item => {
            return item.type === ItemType.Doctrine;
        });
    }
    get references(): Item[] {
        return this.items.filter(item => {
            return item.type === ItemType.Reference;
        });
    }
    get itemsNotSeen(): Item[] {
        return this.items.filter(item => {
            return item.state === ItemState.Not_Seen;
        });
    }
    get itemsLearning(): Item[] {
        return this.items.filter(item => {
            return item.state === ItemState.Learning;
        });
    }
    get itemsMastered(): Item[] {
        return this.items.filter(item => {
            return item.state === ItemState.Mastered;
        });
    }

    findItemByID(ID: number): Item {
        const item: Item | undefined = this.items.find(i => {
            return i.ID === ID;
        });
        if (item === undefined) {
            throw new ReferenceError('No item could be found with ID ' + ID);
        }
        return item;
    }

    getRandomChoices(correctItem: Item): Item[] {
        let otherItems: Item[];
        if (correctItem.type === ItemType.Doctrine) { otherItems = this.doctrines; } else { otherItems = this.references; }

        const index = otherItems.indexOf(correctItem);
        if (index !== -1) { otherItems.splice(index, 1); }

        return this.chooseRandom(otherItems, 3);
    }

    private chooseRandom(items: Item[], num: number): Item[] {
        const shuffled = items.sort(() => 0.5 - Math.random());

        return shuffled.slice(0, num);
    }

    chooseRandomSingle(items: Item[] = this.items): Item {
        const index = Math.floor(Math.random() * items.length);
        return items[index];
    }
}
