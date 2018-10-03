/*este modulo se genera con este comando ionic generate page verArticulo*/
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ArticulosProvider } from '../../providers/articulos/articulos';
import { MosrarArticulosPage } from '../mosrar-articulos/mosrar-articulos';

/**
 * Generated class for the VerArticuloPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ver-articulo',
  templateUrl: 'ver-articulo.html',
})
export class VerArticuloPage {

	idArticulo:number;
	articulo:any;

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	private _articulosProvider:ArticulosProvider,
  	public alertCtrl:AlertController){

  	this.idArticulo= this.navParams.get('id');
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

  eliminarArticulo(){
    let confirmacion = this.alertCtrl.create({
      title: "Eliminar Articulo",
      subTitle: "¿Estas seguro?",
      /*texto acompañado de una funcion con dos objetos*/
      buttons:[{text:"Confirmar", handler:data=>{
        this._articulosProvider.eliminarArticulo(this.idArticulo).subscribe(
        respuesta=>{
          /*Estas dos lineas ayuda que al momento de eliminar no pueda 
          volver a la vista anterior */
          this.navCtrl.setRoot(MosrarArticulosPage);
          this.navCtrl.popToRoot();
        },
        error=>{}
        );
      }
    },
    {
      text:"Cancelar",
      handler:data=>{}
    }]
    });
    /*present muestra osea se muestra en la pantalla*/
    confirmacion.present();
  	
  }

  editarArticulo(idArticuloEditar){
    /*navegar entre paginas */
    this.navCtrl.push('EditarArticuloPage',{id:idArticuloEditar});
  }

}
