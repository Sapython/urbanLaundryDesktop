import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataProvider } from 'src/app/providers/data.provider';
import { AlertsAndNotificationsService } from 'src/services/alerts-and-notification/alerts-and-notifications.service';
import { DatabaseService } from 'src/services/database/database.service';


@Component({
  selector: 'app-add-new-service',
  templateUrl: './add-new-service.component.html',
  styleUrls: ['./add-new-service.component.scss'],
})
export class AddNewServiceComponent implements OnInit {
  clothes: any[] = [];
  clothTypes: any[] = []
  imageSource:string = "";
  imageFile:File|undefined;
  constructor(@Inject(DIALOG_DATA) public data:{clothes:any[], mode:'edit'|'add',previousData:any},private databaseService:DatabaseService,private alertify:AlertsAndNotificationsService,private dataProvider:DataProvider,public dialogRef: DialogRef<AddNewServiceComponent>){}
  addNewServiceForm:FormGroup = new FormGroup({
    name: new FormControl(''),
    image: new FormControl(''),
    type:new FormControl(),
    costPerKg: new FormControl(0),
    enabled: new FormControl(true),
    clothes: new FormControl(this.clothes),
    description: new FormControl(''),
  })
  
  ngOnInit(){
    console.log(this.data);
    this.clothTypes = this.data.clothes
    if (this.data.mode =='edit'){
      this.addNewServiceForm.patchValue(this.data.previousData)
      this.imageSource = this.data.previousData.image
      this.clothes = this.data.previousData.clothes
    }
  }

  imageSelected(event:any){
    let image:File = event.target.files[0];
    // should be less than 500kb in size
    if(image.size > 500000){
      this.alertify.presentToast('Image size should be less than 500kb','error');
      return;
    }
    let reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => {
      this.imageSource = reader.result as string;
    }
    this.imageFile = image;
  }

  deleteCloth(cloth: any, index: number) {
    this.clothes.splice(index, 1);
  }


  addCloth() {
    this.clothes.push({
      title: '',
      cost: 0,
      mode: 'read',
    });
  }

  getRandomId(){
    return Math.random().toString(36).substr(2, 9);
  }

  async submitService(){
      if(this.data.mode == 'add') { 
        if (!this.imageFile){
          this.alertify.presentToast('Please select an image','error')
          return;
        }
        try {
          this.dataProvider.pageSetting.blur = true;
          let service = {
            ...this.addNewServiceForm.value,
            image: await this.databaseService.upload('services/images/'+(this.getRandomId())+this.imageFile.name,this.imageFile),
          }
          console.log(service);
          await this.databaseService.addService(service)
          this.alertify.presentToast('Service added successfully')
          this.dialogRef.close();
        } catch (error) {
          this.alertify.presentToast('Error adding service','error')
        } finally {
          this.dataProvider.pageSetting.blur = false;
        }
      } else if (this.data.mode=='edit'){
        try {
          this.dataProvider.pageSetting.blur = true;
          if (this.imageFile){
            var service = {
              ...this.addNewServiceForm.value,
              image: await this.databaseService.upload('services/images/'+(this.getRandomId())+this.imageFile.name,this.imageFile),
            }
          } else {
            var service = {
              ...this.addNewServiceForm.value,
            }
          }
          console.log(service);
          await this.databaseService.updateService(this.data.previousData.id,service)
          this.alertify.presentToast('Service added successfully')
          this.dialogRef.close();
        } catch (error) {
          this.alertify.presentToast('Error adding service','error')
        } finally {
          this.dataProvider.pageSetting.blur = false;
        }
      }
  }
}
