import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

userData: {email: string, password: string} = {email: '', password: ''};

constructor() { }

populateStorage(email: string, password: string){
  localStorage.setItem("email", email);
  localStorage.setItem("password", password);

  this.setUserData();
}

setUserData(){
  this.userData.email = localStorage.getItem("email");
  this.userData.password = localStorage.getItem("password");
}

retrieveDataFromStorage(){
  this.setUserData();

  return this.userData;
}

clearStorage(){
  localStorage.clear();
}
}
