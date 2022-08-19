import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl: any = "";
  mediaURL: any = "";

  constructor(
    private http: HttpClient,
  ) { 
    this.baseUrl = environment.apiUrl,
    this.mediaURL = environment.mediaUrl
  }

  JSON_to_URLEncoded(element, key?, list?) {
    let new_list = list || [];
    if (typeof element === "object") {
      for (let idx in element) {
        this.JSON_to_URLEncoded(
          element[idx],
          key ? key + "[" + idx + "]" : idx,
          new_list
        );
      }
    } else {
      new_list.push(key + "=" + encodeURIComponent(element));
    }
    return new_list.join("&");
  }

  post(url, body) {
    const header = {
      headers: new HttpHeaders()
        .set("Content-Type", "application/x-www-form-urlencoded")
        .set("Basic", `${environment.authToken}`),
    };
    const param = this.JSON_to_URLEncoded(body);
    return this.http.post(this.baseUrl + url, param, header);
  }

  get(url) {
    const header = {
      headers: new HttpHeaders()
        .set("Content-Type", "application/x-www-form-urlencoded")
        .set("Basic", `${environment.authToken}`),
    };
    return this.http.get(this.baseUrl + url, header);
  }

}
