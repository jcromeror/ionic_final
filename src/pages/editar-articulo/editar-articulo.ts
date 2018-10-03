/*este modulo se creo con el siguiente comando 
ionic generate page editarArticulo*/
import { Component } from '@angular/core';
/*se importa AlertController*/
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
/*se importan los servicios para hacer uso de de ellos en este archivo*/
import { ArticulosProvider } from '../../providers/articulos/articulos';
import { MosrarArticulosPage } from '../mosrar-articulos/mosrar-articulos';

/**
 * Generated class for the EditarArticuloPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editar-articulo',
  templateUrl: 'editar-articulo.html',
})
export class EditarArticuloPage {

	/*Se crean las variables*/
	idArticulo:number;
	articulo:any;

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	/*se inyectar*/
  	private _articulosProvider:ArticulosProvider,
  	/*se crea una instancia y arriba se importa*/
  	public alertCtrl:AlertController) {

  	this.idArticulo=this.navParams.get('id');
  	/*se crea la forma de la variable articulo*/
  	this.articulo={titulo:"", contenido:""}
  }

  ionViewDidLoad() {
    this._articulosProvider.mostrarArticulo(this.idArticulo).subscribe(
    	respuesta=>{
    		this.articulo=respuesta;
    	}, 
    	error=>{
    		/*ejemplo de alertas en caso de error*/
    		let alerta = this.alertCtrl.create({
    			title:"Articulo no encontrado!",
    			subTitle:"Accede nuevamente",
    			buttons:['Ok']
    		});

    		alerta.present();
    	});
  }

  editarArticulo(){
  	this._articulosProvider.modificarArticulo(this.articulo).subscribe(
  		respuesta=>{
  			this.navCtrl.setRoot(MosrarArticulosPage);
  			/*vacea toda la pagina como si fuera el inicio de la aplicacion*/
  			this.navCtrl.popToRoot();
  		}, 
  		error=>{

  		})
  }

}
