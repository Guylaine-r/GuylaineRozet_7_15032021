import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() {}

  // Définir le token
  setToken(token : any) {
    localStorage.setItem("token", token);
  }

  //Obtenir le token
  getToken() {
    return localStorage.getItem("token");
  }

  // Etre connecter 
  isConnected() : boolean {
    return this.getToken() != undefined;
  }

  // Déconnecter
  disconnect() {
    localStorage.removeItem("token");
  }
}
