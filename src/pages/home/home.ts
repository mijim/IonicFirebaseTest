import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AngularFireList, AngularFireDatabase} from 'angularfire2/database';
import { Observable } from '@firebase/util';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  
  users: Observable<any[]>
  usersRef: AngularFireList<any>;

  constructor(public navCtrl: NavController, public database: AngularFireDatabase, public alertCtrl: AlertController){
    //Referencia a la clave de la BD

    this.usersRef = database.list('/users');
    //Observable de los cambios en la BD
    this.users = this.usersRef.valueChanges();

  }
  addUser(nombre, apellidos, edad, sexo){
    if(apellidos.value == "" || nombre.value == "" || edad.value == "" || sexo.value == ""){
      let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: 'Rellena todos los campos',
        buttons: ['De acuerdo']
      });
      alert.present();
    }else{
      this.usersRef.push({
        nombre: nombre.value,
        apellido: apellidos.value,
        edad: edad.value,
        sexo: sexo.value,
      });
    }
  }

  deleteUser(user){
    console.log(user);
    //this.usersRef.remove(user);
  }

}
