import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuariosProvider } from '../../providers/usuarios/usuarios'
import { HomePage } from '../home/home'

/**
 * Generated class for the CrearCuentaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-crear-cuenta',
  templateUrl: 'crear-cuenta.html',
})
export class CrearCuentaPage {

	formulario:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  	private _usuariosProvider:UsuariosProvider) {

  	this.formulario = {
  		user:{
  			name:"",
  			email:"",
  			password:"",
  			passwordConfirmation:""
  		}
  	}

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CrearCuentaPage');
  }

  crearCuenta(){
  	this._usuariosProvider.crearCuenta(this.formulario).subscribe(
  		respuesta=>{
  			console.log("respuesta",respuesta);
  			let userLogin = {auth:{
  												email:this.formulario.user.email,
  												password:this.formulario.user.password
  											}}

  			this._usuariosProvider.iniciarSesion(userLogin).subscribe(
  				respuesta=>{
  					localStorage.setItem("SessionToken",respuesta.jwt);
  					/*Alert*/
  					this.navCtrl.setRoot(HomePage);
  					this.navCtrl.popToRoot();
  				},error=>{

  				});
  		},
  		error=>{
  			console.log("error",error);
  		})
  }

}
