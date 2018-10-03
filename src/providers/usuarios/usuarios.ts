import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/*
  Generated class for the UsuariosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsuariosProvider {

	private url:string;

	private encabezados:any;

	constructor(private http:HttpClient) {
		this.url = "https://apidocumentospiensadigital.herokuapp.com";
		this.encabezados = {headers: new HttpHeaders({'Content-Type': 'application/json'})}
	}

	iniciarSesion(auth:any):Observable<any>{
		return this.http.post<any>(this.url+'/user_token',auth,this.encabezados);
	}

	crearCuenta(user):Observable<any>{
	return this.http.post<any>(this.url+'/users',user)
	}


}
