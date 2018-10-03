import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { UsuariosProvider } from '../../providers/usuarios/usuarios';
import { HomePage } from '../home/home'

/**
 * Generated class for the IniciarSesionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-iniciar-sesion',
  templateUrl: 'iniciar-sesion.html',
})
export class IniciarSesionPage {

	formulario:any;

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	private _usuariosProvider:UsuariosProvider,
  	public alertCtrl: AlertController) {

  	this.formulario = {
  		auth: {
  			email:"",
  			password:""
  		}
  	}
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IniciarSesionPage');
  }

  iniciarSesion() {
  	this._usuariosProvider.iniciarSesion(this.formulario).subscribe(
  		respuesta=>{
  			console.log("ok",respuesta)
  			localStorage.setItem("SessionToken", respuesta.jwt);
  			let alerta = this.alertCtrl.create({
  				title:"Bienvenido",
  				subTitle:"Autenticacion correcta",
  				buttons: ['ok']
  			})

  			alerta.present();
  			this.navCtrl.setRoot(HomePage);
  			this.navCtrl.popToRoot();
  		},
  		error=>{
  			console.log("error",error);
  			let alerta = this.alertCtrl.create({
  				title: "Error",
  				subTitle: "Fallo la autenticacion, intenta de nuevo",
  				buttons: ['Ok']
  			});

  			alerta.present();
  		})
  }

}
