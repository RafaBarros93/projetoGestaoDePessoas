import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditPeoplePage } from './edit-people';

@NgModule({
  declarations: [
    EditPeoplePage,
  ],
  imports: [
    IonicPageModule.forChild(EditPeoplePage),
  ],
})
export class EditPeoplePageModule {}
