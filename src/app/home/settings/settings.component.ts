import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataProvider } from 'src/app/providers/data.provider';
import { AlertsAndNotificationsService } from 'src/services/alerts-and-notification/alerts-and-notifications.service';
import { DatabaseService } from 'src/services/database/database.service';

import { AddNewBannerComponent } from './add-new-banner/add-new-banner.component';
import { AddNewClothComponent } from './add-new-cloth/add-new-cloth.component';
import { AddNewServiceComponent } from './add-new-service/add-new-service.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  banners: Banner[] = []
  holidays: Date[] = []

  reasons: Reason[] = [];
  time: Date[] = []

  clothes: { title: string; id?: string }[] = []
  discounts: Discount[] = []
  services: Service[] = []
  days: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  icons: any[] = []
  slots: any[] = []
  policyForm: FormGroup = new FormGroup({
    privacyPolicy: new FormControl(''),
    termsAndConditions: new FormControl(''),
  })
  areas: { title: string; id?: string }[] = []
  contactForm: FormGroup = new FormGroup({
    phone: new FormControl(''),
    whatsapp: new FormControl(''),
  })
  addReasonsForm: FormGroup = new FormGroup({
    title: new FormControl(''),
  })
  constructor(private dialog: Dialog, private databaseService: DatabaseService, private alertify: AlertsAndNotificationsService, private dataProvider: DataProvider, private router:ActivatedRoute) { }

  ngOnInit(): void {
    this.databaseService.policy().then((res) => {
      const policy:any = res.data()
      this.policyForm.patchValue(policy)
    });
    // this.policyForm.patchValue()
    // get this file in json from https://fonts.google.com/metadata/icons

    fetch('./assets/icons.json').then(res => res.json()).then(data => {
      this.icons = data.icons.splice(0, 500)
      console.log(this.icons);
    })
    // generate sequential time for 24 hours
    let time = new Date()
    time.setHours(0, 0, 0, 0)
    for (let i = 0; i < 24; i++) {
      this.time.push(new Date(time))
      time.setMinutes(time.getMinutes() + 30)
    }
    this.getBanners()
    this.getClothes()
    this.getAreas()
    this.getServices()
    this.getSlots()
    this.getReasons()
  }


  getBanners(){
    this.databaseService.getBanners().then(res => {
      this.banners = []
      res.forEach((banner) => {
        this.banners.push({...banner.data() as Banner,id:banner.id})
      })
      console.log("Banners",this.banners);
    })
  }

  getBanners(){
    this.databaseService.getBanners().then(res => {
      this.banners = []
      res.forEach((banner) => {
        this.banners.push({...banner.data() as Banner,id:banner.id})
      })
      console.log("Banners",this.banners);
    })
  }

  setDate(date:Date){
    // change the date year month to today 
    let today = new Date()
    date.setFullYear(today.getFullYear(), today.getMonth(), today.getDate())
    return date
  }

  getSlots() {
    this.databaseService.getSettings().then(res => {
      let data = res.data()
      if (data) {
        console.log(data);
        this.slots = data['slots']
        console.log("this.slots", this.slots);
        this.contactForm.patchValue(data['contact'])
        // this.privacyPolicy = data['privacyPolicy']
        // this.termsAndConditions = data['termsAndConditions']
      }
    })
  }

  getServices() {
    this.databaseService.getServices().then(res => {
      this.services = []
      res.forEach((service) => {
        this.services.push({ ...service.data() as Service, id: service.id })
      })
      console.log("Services", this.services);
    })
  }
  getAreas() {
    this.databaseService.getAreas().then(res => {
      this.areas = []
      res.forEach((area) => {
        this.areas.push({ title: area.data()['name'], id: area.id })
      })
      console.log("this.areas", this.areas);

    })
  }

  getClothes() {
    this.databaseService.getClothes().then(res => {
      this.clothes = []
      res.forEach((cloth) => {
        this.clothes.push({ title: cloth.data()['name'], id: cloth.id })
      })
      console.log("this.clothes", this.clothes);
    })
  }

  saveServices() {
    this.services.filter((service) => !service.id).forEach((service) => {
      console.log("new service", service);
    })
  }

  addClothesToService(service: Service) {
    let cloth: Cloth = {
      title: '',
      cost: 0,
      mode: 'add'
    }
    service.clothes.push(cloth)
  }

  dateToTimeStamp(date: Date) {

  }

  addNewSlot() {
    this.slots.push({ startTime: '', endTime: '' })
  }

  addNewBanner(){
    const dialog = this.dialog.open(AddNewBannerComponent,{data:{mode:'add'}})
  }

  addClothes() {
    const addClothDialog = this.dialog.open(AddNewClothComponent, { data: 'Add New Cloth' })
    addClothDialog.closed.subscribe((cloth: any) => {
      console.log(cloth);
      if (cloth?.name) {
        this.dataProvider.pageSetting.blur = true
        this.databaseService.addCloth(cloth).then(res => {
          this.alertify.presentToast('Cloth Added Successfully')
          this.getClothes();
        }).catch(err => {
          this.alertify.presentToast('Error Adding Cloth')
        }).finally(() => {
          this.dataProvider.pageSetting.blur = false;
        })
        this.clothes.push({ title: cloth.name })
      }
    })
  }

  addAreas() {
    const addAreaDialog = this.dialog.open(AddNewClothComponent, { data: 'Add New Area' })
    addAreaDialog.closed.subscribe((area: any) => {
      console.log(area);
      if (area?.name) {
        this.dataProvider.pageSetting.blur = true
        this.databaseService.addArea(area).then(res => {
          this.alertify.presentToast('Area Added Successfully')
        }).catch(err => {
          this.alertify.presentToast('Error Adding Area')
        }).finally(() => {
          this.dataProvider.pageSetting.blur = false;
        })
        this.areas.push({ title: area.name })
      }
    })
  }

  addNewService() {
    const addAreaDialog = this.dialog.open(AddNewServiceComponent, { data: { clothes: this.clothes, mode: 'add' } })
    addAreaDialog.closed.subscribe((area: any) => {
      console.log(area);
      if (area?.name) {
        this.services.push(area)
      }
    })
  }

  addHoliday(event: any) {
    this.holidays.push(event.value)
  }

  deleteService(serviceId: string) {
    this.dataProvider.pageSetting.blur = true
    this.databaseService.deleteService(serviceId).then(res => {
      this.alertify.presentToast('Service Deleted Successfully')
      this.getServices()
    }).catch(err => {
      this.alertify.presentToast('Error Deleting Service', 'error')
    }).finally(() => {
      this.dataProvider.pageSetting.blur = false;
    })
  }

  editService(service: any) {
    const addAreaDialog = this.dialog.open(AddNewServiceComponent, { data: { clothes: this.clothes, mode: 'edit', previousData: service } })
    addAreaDialog.closed.subscribe((area: any) => {
      console.log(area);
      if (area?.name) {
        this.services.push(area)
      }
      this.getServices()
    })
  }

  // deleteReason(is: string) {
  //   this.reasons = this.reasons.filter(reason => reason.id !== is)
  // }
  deleteCloth(id: string) {
    this.clothes = this.clothes.filter(cloth => cloth.id !== id)
  }
  deleteArea(id: string) {
    this.areas = this.areas.filter(area => area.id !== id)
  }

  deleteSlot(slot: any) {
    this.slots = this.slots.filter(s => s !== slot)
  }

  deleteHoliday(date: Date) {
    this.holidays = this.holidays.filter(holiday => holiday !== date)
  }

  saveContactSettings() {
    console.log(this.contactForm.value);
    this.dataProvider.pageSetting.blur = true
    this.databaseService.updateSettings({ contact: this.contactForm.value }).then(() => {
      this.alertify.presentToast('Contact Updated')
    }).catch(err => {
      this.alertify.presentToast('Error Updating Contact', 'error')
    }).finally(() => {
      this.dataProvider.pageSetting.blur = false;
    })
  }

  // saveReasonSettings() {
  //   console.log(this.reasons);
  //   this.dataProvider.pageSetting.blur = true
  //   this.databaseService.addReasons({ reasons: this.reasons }).then(() => {
  //     this.alertify.presentToast('Reasons Updated')
  //   }).catch(err => {
  //     this.alertify.presentToast('Error Updating Reasons', 'error')
  //   }).finally(() => {
  //     this.dataProvider.pageSetting.blur = false;
  //   })
  // }


 

  saveSlots() {
    console.log(this.slots);
    this.dataProvider.pageSetting.blur = true
    this.databaseService.updateSettings({ slots: this.slots }).then(() => {
      this.alertify.presentToast('Slots Updated')
    }).catch(err => {
      this.alertify.presentToast('Error Updating Slots', 'error')
    }).finally(() => {
      this.dataProvider.pageSetting.blur = false;
    })
  }

  // dateFilter
  myFilter = (d: Date | null): boolean => {
    // Prevent duplicates from holidays
    return !this.holidays.some(holiday => holiday.getTime() === d?.getTime());
  };


  updatePolicy() {
    this.dataProvider.pageSetting.blur = true

    this.databaseService.updatePolicy(this.policyForm.value).then(() => {
      this.alertify.presentToast('Policy Updated')
    }).catch(err => {
      this.alertify.presentToast('Error Updating Policy', 'error')
    }).finally(() => {
      this.dataProvider.pageSetting.blur = false;
    })
  }

  addReasons() {
    console.log(this.addReasonsForm.value);
    this.databaseService.addReasons(this.addReasonsForm.value).then(res => {
      this.addReasonsForm.reset()
      this.alertify.presentToast('Reason Added');
      
    })
    
    
  }


  getReasons(){
    this.databaseService.getReasons().then((res) => {
      res.forEach((element: any) => {
        this.reasons.push({
          ...element.data(),
          id: element.id,
        });
        console.log(this.reasons);
      });
    });
  }

  deleteReason(id: string) {
    this.databaseService.deleteReasons(id).then(() => {
      this.alertify.presentToast('Reason Deleted')
    })
  }


  

}

interface Banner {
  id?: string;
  enabled: boolean;
  title: string;
  bannerUrlType: 'url' | 'inApp';
  bannerUrl: string;
  bannerImage: string;
  startDate?: any;
  endDate?: any;
}
interface Reason {
  id?: string;
  title: string;
}
interface Service {
  id?: string;
  name: string;
  image: string;
  clothes: Cloth[];
  costPerKg: number;
  type: null | true;
  description: string;
  enabled: boolean;
}
interface Cloth {
  id?: string;
  title: string;
  cost: number;
  mode: 'add' | 'edit' | 'read';
  form?: FormGroup;
}
interface Icon {
  title: string;
  icon: string;
}
interface Discount {
  id?: string;
  title: string;
  type: 'percentage' | 'flat';
  value: number;
  min: number;
  max: number;
  startDate: any;
  endDate: any;
  enabled: boolean;
}