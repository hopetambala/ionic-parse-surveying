import { Component } from '@angular/core';

import { App, ViewController } from 'ionic-angular';

// Providers
import { ParseProvider } from '../../../providers/parse/parse';
import { AuthProvider } from '../../../providers/auth/auth';
import { UiUxProvider} from '../../../providers/ui-ux/ui-ux';

@Component({
  selector: 'medicalhistory',
  templateUrl: 'medicalhistory.html'
})
export class MedicalHistoryForm {
  isenabled:boolean=false;
  
  client = {
    objectID: null,
    fname: null,
    lname: null
  }

  medicalHistory = {
    majorEvents: null,
    surgeryWhatKind: null,
    medicalIllnesses:null,
    whenDiagnosed: null,
    whatDoctorDoyousee: null,
    treatment: null,
    familyhistory: null,
    preventativeCare: null,
    allergies:null
    //socialHistory: null,
    //nutritionHistory: null
  };
  
  //Design Element: Content Drawer
  drawerOptions: any;
  
  constructor(private parseProvider: ParseProvider,
    private auth: AuthProvider,  
    private viewCtrl: ViewController,
    public themeCtrl:UiUxProvider) {

    console.log('Hello MedicalHistoryForm ');
    this.auth.authenticated();

    this.drawerOptions = {
      handleHeight: 50,
      thresholdFromBottom: 200,
      thresholdFromTop: 200,
      bounceBack: true
    };
  }

  post_n_clear(){
    this.parseProvider.postObjectsToClassWithRelation(this.medicalHistory,'HistoryMedical','SurveyData',this.client.objectID).then(()=> {
      for (var key in this.medicalHistory){
        this.medicalHistory[key] = null;
      }
      this.client.fname=null; 
      this.client.lname=null;
      this.isenabled=false;
      this.themeCtrl.toasting('Submitted | Entregado', "bottom");
    }, (error) => {
      console.log(error);
      alert('Error Confirming.');
    });
  }

  close() {
    this.viewCtrl.dismiss();
    this.isenabled = false;
  }

  inputObjectIDfromComponent(selectedItem) {
    this.isenabled=true;
    this.client.objectID= selectedItem.id; //Retrieve RESERVED Parse-Server Object ID Value
    this.client.fname = selectedItem.get('fname');
    this.client.lname = selectedItem.get('lname');
    console.log(this.client.objectID);
  }




}
