import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatRoomPage } from './chat-room';

//room chat c3 rieng nhe
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
const socketIOConfigC3: SocketIoConfig = { url: 'http://localhost:9235', options: {} };

@NgModule({
  declarations: [
    ChatRoomPage,
  ],
  imports: [
    IonicPageModule.forChild(ChatRoomPage),
    SocketIoModule.forRoot(socketIOConfigC3)
  ],
})
export class ChatRoomPageModule {}
