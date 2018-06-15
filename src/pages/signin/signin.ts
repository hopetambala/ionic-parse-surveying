import { Component } from '@angular/core';
import { AlertController, NavController, LoadingController } from 'ionic-angular';

// Providers
import { AuthProvider } from '../../providers/auth/auth';

// Pages
import { SignupPage } from '../signup/signup';
import { TabsPage } from '../tabs/tabs'; //TO REMOVE, LEGACY
import { HomePage } from '../home/home';

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html'
})
export class SigninPage {
  registerPage = SignupPage;
  password: string = '';
  username: string = '';

  constructor(public alertCtrl: AlertController, 
              public navCtrl: NavController, 
              private loadCtrl: LoadingController, 
              private authPvdr: AuthProvider) { 
    }

  ionViewDidLoad() {
    console.log('Initiated Signin');
  }

  trimWhitespace(str){
    return str.replace(/^\s+/,"").replace(/\s+$/,"");
  }
  public doSignin() {
    
    
    let loader = this.loadCtrl.create({

      content: 'Signing in...'
    });

    let ion_alert = this.alertCtrl.create({
      title: 'Login Timeout',
      subTitle: 'Invalid username and/or password',
      buttons: ['Try Again']
    });
    
    loader.present();
    
    setTimeout(() => {
      loader.dismiss();
      //ion_alert.present();
    }, 3000); 

    this.authPvdr.signin(this.trimWhitespace(this.username), this.password).subscribe((success) => {
      ion_alert.dismiss();
      //this.navCtrl.setRoot(TabsPage);
      this.navCtrl.setRoot(HomePage);
      loader.dismissAll();
    }, (error) => {
      //ion_alert.present();
      loader.dismissAll();
    });
  }

}
