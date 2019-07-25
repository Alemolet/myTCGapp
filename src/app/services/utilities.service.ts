import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  collectionClicked = new EventEmitter<boolean>();

constructor() { }

}
