import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataProvider } from 'src/app/providers/data.provider';
import { AlertsAndNotificationsService } from 'src/services/alerts-and-notification/alerts-and-notifications.service';
import { DatabaseService } from 'src/services/database/database.service';


@Component({
  selector: 'app-add-new-banner',
  templateUrl: './add-new-banner.component.html',
  styleUrls: ['./add-new-banner.component.scss']
})
export class AddNewBannerComponent {
  types:string[] = ['Url','App']
  appLinks:AppLink[] = []
  imageSource:string = '';
  imageFile:any;
  newBannerForm = new FormGroup({
    title: new FormControl('',Validators.required),
    bannerUrlType: new FormControl('url',Validators.required),
    bannerUrl: new FormControl('',Validators.required),
    bannerImage: new FormControl(''),
    startDate: new FormControl(''),
    endDate: new FormControl(''),
    enabled: new FormControl(true,Validators.required),
  })
  constructor(private databaseService:DatabaseService,private alertify:AlertsAndNotificationsService,private dataProvider:DataProvider,public dialogRef: DialogRef<AddNewBannerComponent>,@Inject(DIALOG_DATA) private data:any) { }
  async submit(){
    if (this.newBannerForm.status =='VALID' && this.imageFile){
      this.dataProvider.pageSetting.blur = true
      if (this.imageFile) {
        try {
          let imageRes = await this.databaseService.upload('images/',this.imageFile)
          this.newBannerForm.value.bannerImage = imageRes
        } catch (error) {
          console.log(error);
          this.alertify.presentToast('Error uploading image')
          this.dataProvider.pageSetting.blur = false
          return
        }
      } else {
        this.alertify.presentToast('Please select an image')
        this.dataProvider.pageSetting.blur = false
        return
      }
      if (this.data && this.data.mode == 'add') {
        // handle image upload
        this.databaseService.addBanner(this.newBannerForm.value).then(res => {
          this.alertify.presentToast('Banner added successfully')
        }).catch(err => {
          this.alertify.presentToast('Error adding banner')
        }).finally(() => {
          this.newBannerForm.reset()
          this.dataProvider.pageSetting.blur = false
        })
      } else if (this.data && this.data.mode == 'edit'){
        this.dataProvider.pageSetting.blur = true
        this.databaseService.updateBanner(this.data.id,this.newBannerForm.value).then(res => {
          this.alertify.presentToast('Banner updated successfully')
        }).catch(err => {
          this.alertify.presentToast('Error updating banner')
        }).finally(() => {
          this.newBannerForm.reset()
          this.dataProvider.pageSetting.blur = false
        })
      } else {
        this.alertify.presentToast('Error adding banner. Mode not specified')
        this.dataProvider.pageSetting.blur = false
      }
    } else {
      console.log(this.newBannerForm);
      this.alertify.presentToast('Please fill all required fields')
      this.dataProvider.pageSetting.blur = false
    }
  }

  setImage(event:any){
    // check if the image is valid and less than 500kb
    if (event.target.files[0].size > 1000000) {
      this.alertify.presentToast('Image size is too large')
      return
    }
    if (event.target.files[0].type != 'image/jpeg' && event.target.files[0].type != 'image/png') {
      this.alertify.presentToast('Invalid image format')
      return
    }
    this.imageFile = event.target.files[0]
    var selectedFile = event.target.files[0];
    var reader = new FileReader();
    reader.onload = (event:any)=>{
      this.imageSource = event.target.result;
    };

    reader.readAsDataURL(selectedFile);
    
  }

  clearImage(){
    this.imageFile = undefined
    this.imageSource = ''
  }
}

interface AppLink {
  title:string,
  url:string
}