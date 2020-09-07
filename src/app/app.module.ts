import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { QuotationComponent } from './quotation/quotation.component';
import { QuotationService } from './service/quotation.service';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { DocumentService } from './service/document.service';

@NgModule({
  declarations: [
    AppComponent,
    QuotationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
  ],
  providers: [QuotationService, DocumentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
