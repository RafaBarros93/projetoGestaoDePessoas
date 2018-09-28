import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { PeopleProvider, People } from '../../providers/people/people'


@IonicPage()
@Component({
  selector: 'page-edit-people',
  templateUrl: 'edit-people.html',
})
export class EditPeoplePage {
  model: People;


  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    private toast: ToastController, private peopleProvider: PeopleProvider, ) {

    this.model = new People();

    if (this.navParams.data.id) {
      this.peopleProvider.get(this.navParams.data.id)
        .then((result: any) => {
          this.model = result;
        })
    }
  }
  save() {
    this.savePeopleProvider()
      .then(() => {
        this.toast.create({ message: 'Colaborador salvo.', duration: 3000, position: 'botton' }).present();
        this.navCtrl.pop();
      })
      .catch(() => {
        this.toast.create({ message: 'Erro ao salvar o colaborador.', duration: 3000, position: 'botton' }).present();
      });
  }

  private savePeopleProvider() {
    if (this.model.id) {
      return this.peopleProvider.update(this.model);
    } else {
      return this.peopleProvider.insert(this.model);
    }
  }
}