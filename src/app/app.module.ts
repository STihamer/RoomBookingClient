import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { RoomsComponent } from './admin/rooms/rooms.component';
import { UsersComponent } from './admin/users/users.component';
import {RouterModule, Routes, ROUTES} from "@angular/router";
import { CalendarComponent } from './calendar/calendar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RoomDetailComponent } from './admin/rooms/room-detail/room-detail.component';
import { UserDetailComponent } from './admin/users/user-detail/user-detail.component';
import { UserEditComponent } from './admin/users/user-edit/user-edit.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { RoomEditComponent } from './admin/rooms/room-edit/room-edit.component';
import { EditBookingComponent } from './calendar/edit-booking/edit-booking.component';
import {HttpClientModule} from "@angular/common/http";
import {PrefetchRoomsService} from "./prefetch-rooms.service";
import {PrefetchUsersService} from "./prefetch-users.service";

 const routes: Routes =[
   {path: 'admin/users', component: UsersComponent},
   {path: 'admin/rooms', component: RoomsComponent},
   {path: '', component: CalendarComponent},
   {path: 'editBooking', component: EditBookingComponent, resolve : {rooms: PrefetchRoomsService, users: PrefetchUsersService}},
   {path: 'addBooking', component: EditBookingComponent, resolve : {rooms: PrefetchRoomsService, users: PrefetchUsersService}},
   {path: '404', component: PageNotFoundComponent},
   {path: '**', redirectTo: '/404'},


 ];
@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    RoomsComponent,
    UsersComponent,
    CalendarComponent,
    PageNotFoundComponent,
    RoomDetailComponent,
    UserDetailComponent,
    UserEditComponent,
    RoomEditComponent,
    EditBookingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ PrefetchRoomsService, PrefetchUsersService,
    { provide: LOCALE_ID, useValue: 'en-Us'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
