import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { MenubarModule } from 'primeng/menubar';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { TabViewModule } from 'primeng/tabview';
import { HttpClientModule } from '@angular/common/http';
import { DropdownModule } from 'primeng/dropdown';

// Import standalone components
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AddProductComponent } from './add-product/add-product.component';
import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './category/category.component';
import { AffCategoryComponent } from './aff-category/aff-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { ProductComponent } from './product/product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { RequestResetEmailComponent } from './request-reset-email/request-reset-email.component';
import { VerifyOtpComponent } from './verify-otp/verify-otp.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { CommandeComponent } from './commande/commande.component';
import { ContactComponent } from './contact/contact.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AddProductComponent,
    HomeComponent,
    CategoryComponent,
    AffCategoryComponent,
    EditCategoryComponent,
    ProductComponent,
    EditProductComponent,
    RequestResetEmailComponent,
    VerifyOtpComponent,
    ResetPasswordComponent,
    ProductDetailsComponent,
    CartComponent,
    CommandeComponent,
    ContactComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    CardModule,
    MenubarModule,
    AvatarModule,
    BadgeModule,
    ReactiveFormsModule,
    TabViewModule,
    HttpClientModule,
    DropdownModule,
    BrowserAnimationsModule,
    NavBarComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
