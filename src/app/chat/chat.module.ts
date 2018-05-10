import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { StartingCompComponent } from './starting-comp/starting-comp.component';
import { FormsModule } from '@angular/forms';
import { RouteGuardService } from '../route-guard.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {path : "chat", component : ChatComponent, canActivate : [RouteGuardService]}
    ])
  ],
  declarations: [ChatComponent, StartingCompComponent]
})
export class ChatModule { }
