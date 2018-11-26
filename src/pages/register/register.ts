import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { FormBuilder, FormGroup } from '@angular/forms';
import { tap } from 'rxjs/operators';

import { UsersProvider } from '../../providers/users/users';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  form: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public usersService: UsersProvider,
    formBuilder: FormBuilder
  ) {
    this.form = formBuilder.group({
      firstname: [null],
      lastname: [null],
      email: [null],
      telephone: [null],
      city: [null],
      password: [null]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  goToLogin() {
    this.navCtrl.push(LoginPage, {}, { animate: false });
  }

  onSubmit() {
    const userData = this.form.value;

    this.usersService.registerUser(userData).subscribe(response => {
      console.log(response);
      this.form.reset();
    });
  }
}
