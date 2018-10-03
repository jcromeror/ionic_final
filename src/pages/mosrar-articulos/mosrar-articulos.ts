import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ArticulosProvider } from '../../providers/articulos/articulos';


/**
 * Generated class for the MosrarArticulosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mosrar-articulos',
  templateUrl: 'mosrar-articulos.html',
})
export class MosrarArticulosPage {

	articulos:Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  	private _articulosProvider:ArticulosProvider) {
  	this.articulos=[{titulo:"",contenido:""}];
  }


  traerArticulos(){

  	this._articulosProvider.traerArticulos().subscribe(respuesta=>{
  		console.log("se traeen los articulos",respuesta);
  		this.articulos = respuesta;
  	},error=>{
  		console.log("error",error)
  	})

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad MosrarArticulosPage');
    this.traerArticulos();
  }

  mostrarArticulo(idArticulo){
    /*para navegar entre paginas y push agrega un elemento*/
    this.navCtrl.push('VerArticuloPage', {id:idArticulo});
    /*para pasar parametros a travez de paginas se usa lo siguiente, 
    {id:idArticulo}*/

    /*para VerArticuloPage se debe crear un modulo completo*/

  }

}
