export type notificationStructure = {
    title: string,
    body: any,
    action: 'pickup' | 'delivered' | 'inProgress' | 'outForDelivery',
    url: string,
    additionData:any,
    viewed:boolean,
    id?:string,
    date:any,
}