import { Injectable} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  showLogo = new BehaviorSubject(true);

  constructor() { }

}
