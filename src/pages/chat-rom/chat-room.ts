import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams, ToastController } from 'ionic-angular';
import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs/Observable';
import { LoginPage } from '../login/login';
 
@IonicPage()
@Component({
  selector: 'page-chat-room',
  templateUrl: 'chat-room.html',
})
export class ChatRoomPage {
  messages = [];
  nickname = '';
  message = '';

  user:any;
  token:any;
 
  rooms = [
    {
      title:'Noi bo',
    }
    ,
    {
      title:'Gia dinh',
    }
    ,
  ];


  unreadCount = 0;

  constructor(private navCtrl: NavController, 
              private navParams: NavParams, 
              private socket: Socket, 
              private toastCtrl: ToastController) {}

  ngOnInit() {
      
      this.user = this.navParams.get('user'); //dung de view nguoi dung len 
      this.token = this.navParams.get('token'); //dung bao mat du lieu kenh truyen
 
      if (!this.token){
        this.navCtrl.setRoot(LoginPage);
        return;
      }
      //ket noi lai session
      this.socket.connect();
      //gui token de xac thuc gan voi id
      this.socket.emit('set-user-token',this.token);



      this.getMessages().subscribe(message => {
        this.messages.push(message);
      });
  
      this.getUsers().subscribe(data => {
        let user = data['user'];
        if (data['event'] === 'left') {
          this.showToast('User left: ' + user);
        } else {
          this.showToast('User joined: ' + user);
        }
      });
  }
 

  openRoom(room){
    //
  }

  listUnread(){
    
  }


  sendMessage() {
    this.socket.emit('add-message', { text: this.message });
    this.message = '';
  }
 
  getMessages() {
    let observable = new Observable(observer => {
      this.socket.on('message', (data) => {
        observer.next(data);
      });
    })
    return observable;
  }
 
  getUsers() {
    let observable = new Observable(observer => {
      this.socket.on('users-changed', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }
 
  ionViewWillLeave() {
    this.socket.disconnect();
  }
 
  showToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}