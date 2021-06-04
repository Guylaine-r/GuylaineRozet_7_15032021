import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) { }

  //Inscription
  signup(lastname, firstname, email, password): Observable<any> {
    return this.http.post<any>(this.BACKEND_URL + 'signup', {
      lastname: lastname,
      firstname: firstname,
      email: email,
      password: password,
    });
  };

  // Connexion
  login(email, password): Observable<any> {
    // permet d'appeler l'api en post sur la route Backend_Url
    return this.http.post<any>(this.BACKEND_URL + 'login', {
      email: email,
      password: password
    });
  };

  //Supprimer un compte
  deleteAccount(token): Observable<any> {
    return this.http.post<any>(this.BACKEND_URL + 'deleteAccount', {
      token: token
    });
  };

  //Ajouter un post
  addPost(token, title, text, file: Blob) : Observable<any> {
    let formData = new FormData();
    formData.append("token", token);
    formData.append("title", title);
    formData.append("text", text);
    formData.append("file", file, "myfile.png");
    return this.http.post<any>(this.BACKEND_URL + 'addPost', formData);
  }

  BACKEND_URL = "http://localhost:3000/";
}
