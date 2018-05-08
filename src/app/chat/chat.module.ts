import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path : "chat", component : ChatComponent}
    ])
  ],
  declarations: [ChatComponent]
})
export class ChatModule { }
