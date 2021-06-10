import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() {}

  // Définir le token
  setToken(token : any) {
    localStorage.setItem("token", token);
  }

  setId(id) {
    localStorage.setItem("id", id);
  }

  // Obtenir le token
  getToken() {
    return localStorage.getItem("token");
  }

  getId() {
    return localStorage.getItem("id");
  }

  // Être connecté 
  isConnected() : boolean {
    return this.getToken() != undefined;
  }

  // Déconnecter
  disconnect() {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
  }
}
