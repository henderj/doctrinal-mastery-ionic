import { Item } from './item';
import { MemorizeChallenges } from '../enums/memorize-challenges.enum';
export interface NextItemPayload {
  item: Item;
  view: MemorizeChallenges;
}
