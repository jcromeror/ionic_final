import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
/*se importa el servicio*/
import { ArticulosProvider } from '../../providers/articulos/articulos';

/**
 * Generated class for the CrearArticuloPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-crear-articulo',
  templateUrl: 'crear-articulo.html',
})
export class CrearArticuloPage {
	/*se crea la variable*/
	articulo:any;

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	/*se inyecta*/
  	private _articulosProvider:ArticulosProvider) {
  	/*se defini la estructura que va recibir*/
  	this.articulo= {titulo:"",contenido:""}
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CrearArticuloPage');
  }

  crearArticulo(){
  	this._articulosProvider.crearArticulo(this.articulo).subscribe(
  		respuesta=>{
  			this.navCtrl.push('VerArticuloPage', {id:respuesta.id});
  		}, error=>{

  		})
  }

}
