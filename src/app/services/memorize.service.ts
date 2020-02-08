import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../item';

@Injectable({
  providedIn: 'root'
})
export class MemorizeService {
  public currentItem: Observable<Item>;

  constructor() { }
}
