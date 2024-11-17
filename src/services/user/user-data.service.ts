import { Injectable } from '@angular/core';
import { User } from '@angular/fire/auth';

import {
  Firestore,
  DocumentReference,
  CollectionReference,
  collection,
  setDoc,
  doc,
  Timestamp,
  getDocs,
  getDoc,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { DataProvider } from 'src/app/providers/data.provider';
import { ExtraLoginGoogleInfo, ExtraLoginEmailInfo } from 'src/structures/method.structure';
import { UserData } from 'src/structures/user.structure';
import { AlertsAndNotificationsService } from '../alerts-and-notification/alerts-and-notifications.service';
import { urls } from '../url';


@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  usersDoc: CollectionReference;
  userDoc: DocumentReference | undefined;
  constructor(
    private fs: Firestore,
    private router: Router,
    private alertify: AlertsAndNotificationsService,
    private dataProvider: DataProvider
  ) {
    this.usersDoc = collection(this.fs, 'users');
  }
  public async setGoogleUserData(user: User, userData: ExtraLoginGoogleInfo) {
    this.dataProvider.pageSetting.blur = true;
    this.dataProvider.pageSetting.lastRedirect = '';
    let data: UserData = {
      id: user.uid,
      access: {access:'customer'},
      created: Timestamp.now(),
      displayName:user.displayName|| '',
      email: user.email || '',
      emailVerified: false,
      phone: userData.phoneNumber,
      photoURL: user.photoURL || '',
      phoneVerify:false,
      currentLanguage:'english',
      termsCondition:false
    };
    this.userDoc = doc(this.fs, 'users/' + user.uid);
    await setDoc(this.userDoc, data).then(() => {
      this.alertify.presentToast('Signed in successfully');
    });
    this.dataProvider.pageSetting.blur = false;
    this.router.navigate(['admin']);
  }
  public async setEmailUserData(user: User, userData: ExtraLoginEmailInfo) {
    this.dataProvider.pageSetting.blur = true;
    this.dataProvider.pageSetting.lastRedirect = '';
    let data: UserData = {
      id: user.uid,
      access: {access:'customer'},
      created: Timestamp.now(),
      displayName:user.displayName|| '',
      email: user.email || '',
      emailVerified: false,
      phone: userData.phoneNumber,
      photoURL: user.photoURL || '',
      phoneVerify:false,
      currentLanguage:'english',
      termsCondition:false
    };
    this.userDoc = doc(this.fs, 'users/' + user.uid);
    await setDoc(this.userDoc, data).then(() => {
      this.alertify.presentToast('Signed in successfully');
    });
    this.dataProvider.pageSetting.blur = false;
    this.router.navigate(['admin']);
  }
  getRandomImage(): string {
    return (
      'https://avatars.dicebear.com/api/gridy/' +
      (Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15)) +
      '.svg'
    );
  }

  public getAllUsers() {
    return getDocs(collection(this.fs, urls.users));
  }

  public getUser(USER_ID: any) {
    const userIDUrl = urls.user.replace('{USER_ID}', USER_ID);
    return getDoc(doc(this.fs, userIDUrl));
  }
}
