import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { PeopleProvider, People } from '../../providers/people/people'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  peoples: any[] = [];
  onlyInactives: boolean = false;
  searchText: string = null;

  constructor(public navCtrl: NavController, private toast: ToastController, private peopleProvider: PeopleProvider) { }

  ionViewDidEnter() {
    this.getAll();
  }

  getAll() {
    this.peopleProvider.getPeople()
      .then((result: any[]) => {
        this.peoples = result;
      });
  }
  getPeoplesFilter() {
    this.peopleProvider.getAllFilter(!this.onlyInactives, this.searchText)
      .then((result: any[]) => {
        this.peoples = result;
      });
  }

  addPeople() {
    this.navCtrl.push('EditPeoplePage');
  }

  editPeople(id: number) {
    this.navCtrl.push('EditPeoplePage', { id: id });
  }

  removePeople(people: People) {
    this.peopleProvider.remove(people.id)
      .then(() => {
        // Removendo do array de pessoas
        var index = this.peoples.indexOf(people);
        this.peoples.splice(index, 1);
        this.toast.create({ message: 'Pessoa removida.', duration: 3000, position: 'botton' }).present();
      })
  }

  filterPeoples(ev: any) {
    this.getPeoplesFilter();
  }

}