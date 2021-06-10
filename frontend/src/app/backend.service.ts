import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient, private user: UserService) { }

  // Inscription
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

  // Supprimer un compte
  deleteAccount(): Observable<any> {
    return this.http.post<any>(this.BACKEND_URL + 'deleteAccount', {}, this.createOptions());
  };

  // Créer un post
  createPost(title, text, data): Observable<any> {
    let body = {
      title: title,
      text: text,
      data: data
    };
    return this.http.post<any>(this.BACKEND_URL + 'addPost', body, this.createOptions());
  }

  // Récupérer tous les posts
  getAllPosts(): Observable<any> {
    return this.http.get<any>(this.BACKEND_URL + "posts");
  }

  // Récupérer les informations d'un post
  getPost(id): Observable<any> {
    return this.http.get<any>(this.BACKEND_URL + "posts/" + id);
  }

  getPostComments(id): Observable<any> {
    return this.http.get<any>(this.BACKEND_URL + "posts/" + id + "/comments");
  }

  isModerator(): Observable<any> {
    return this.http.get<any>(this.BACKEND_URL + "users/" + this.user.getId() + "/moderator", this.createOptions());
  }

  deletePost(id): Observable<any> {
    return this.http.delete<any>(this.BACKEND_URL + "posts/" + id, this.createOptions());
  }

  deleteComment(id): Observable<any> {
    return this.http.delete<any>(this.BACKEND_URL + "comments/" + id, this.createOptions());
  }

  createOptions() {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.user.getToken()
      })
    };
    return httpOptions;
  }

  public BACKEND_URL = "http://localhost:3000/";
}
