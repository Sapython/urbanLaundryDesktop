import { Injectable } from '@angular/core';
import { PageSetting } from 'src/structures/method.structure';
import { UserData } from 'src/structures/user.structure';


@Injectable()
export class DataProvider{
    public data:any;
    public pageSetting:PageSetting={
        blur:false,
        lastRedirect:'',
        message:'',
        spinner:false,
        messageType:'Error'
    };
    public electron:boolean = false;
    public userData:UserData | any;
    public authTokenId:string = "";
    public loggedIn:boolean = false;
    public gettingUserData:boolean = true;
    public userID:string | undefined;
    public verifyEmail:boolean | undefined;
    public reloadPage:boolean = false;
    public checkoutData:any;
    public shippingData:any;
    public dataOne:any;
    public dataTwo:any;
    public dataThree:any;
    public dataFour:any;
    public siteData:any = {};
   
}
