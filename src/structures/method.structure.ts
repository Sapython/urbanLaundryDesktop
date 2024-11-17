export type PageSetting = {
  blur: boolean;
  lastRedirect: string;
  message: string;
  messageType: 'Error' | 'Warning' | 'Success' | 'Info';
  spinner: boolean;
};

export type ExtraLoginGoogleInfo = {
  phoneNumber: string;
};

export type ExtraLoginEmailInfo = {
  
  displayName: string;
  phoneNumber: string;
  photoURL: string;
};
