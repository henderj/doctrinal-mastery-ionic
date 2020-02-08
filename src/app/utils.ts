
export function removeItemFromArray<T>(item: T, array: T[]): T[] {
    const index = array.indexOf(item);
    if (index !== -1) { array.splice(index, 1); }

    return array;
}
