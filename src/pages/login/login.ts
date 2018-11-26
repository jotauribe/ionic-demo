import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController
} from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UsersProvider } from '../../providers/users/users';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  form: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    private usersService: UsersProvider,
    private toastCtrl: ToastController
  ) {
    this.form = formBuilder.group({
      username: [null],
      password: [null]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  goToSignUp() {
    this.navCtrl.push(RegisterPage, {}, { animate: false });
  }

  goToWelcomePage() {
    this.navCtrl.push(HomePage, {}, { animate: false });
  }

  onSubmit() {
    const data = this.form.value;

    this.usersService
      .authenticateUser({ email: data.username, password: data.password })
      .subscribe(
        () => {
          this.form.reset();
          this.goToWelcomePage();
        },
        error => {
          console.log('ERROR: ', error);
          this.showErrorMsg();
        }
      );
  }

  showErrorMsg(message = 'Invalid Credentials', position = 'botton') {
    const toast = this.toastCtrl.create({
      message,
      position,
      duration: 3000
    });

    toast.present();
  }
}
