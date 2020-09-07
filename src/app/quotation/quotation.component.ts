import { Component, OnDestroy, OnInit } from '@angular/core';
import { QuotationService } from '../service/quotation.service';
import { DocumentService } from '../service/document.service';
import { QuotationModel } from '../model/quotation-model';
import { DocumentModel } from '../model/document-model';
import { DataTablesModule } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
    selector: 'samsung-quotation',
    templateUrl: 'quotation.component.html',
    styleUrls: ['quotation.component.css']
})
export class QuotationComponent implements OnDestroy, OnInit {

    // quotation
    listQuotation: QuotationModel[];

    // quotation document
    listQuotationDocument: DocumentModel[];

    // Data Table
    // We use this trigger because fetching the list of persons can be quite long,
    // thus we ensure the data is fetched before rendering
    dtTrigger: Subject<DocumentModel> = new Subject(); 
    dtOptions: DataTables.Settings = {};

    constructor(private quotationService: QuotationService, private documentService: DocumentService){
    }

     /** 
     * Start
     */
    ngOnInit(): void {
        this.dtOptions = {
          pagingType: 'full_numbers',
          pageLength: 2
        };

         // buscar cotacoes
         this.getQuotation();

         // buscar documento cotacoes
         this.getDocumentsQuotation();
    }

    private getQuotation(){
        this.quotationService.getQuotation()
            .subscribe(listQuotation => {
                console.log(listQuotation[0].fromCurrencyCode);
                // traz apenas cotacoes mais recentes
                this.listQuotation = this.quotationService.getQuotationMoreRecent(listQuotation);
       });
    }

    private getDocumentsQuotation(){
        this.documentService.getQuotationDocument()
            //.map(this.extractData)
            .subscribe(listDocument => {
                console.log(listDocument[0].documentId);
                this.listQuotationDocument = listDocument;

                // convert currency
                //this.listQuotationDocument = this.documentService.convertCurrency(this.listQuotationDocument);

                // Calling the DT trigger to manually render the table
                this.dtTrigger.next();
       });
    }

    ngOnDestroy(): void {
        // Do not forget to unsubscribe the event
        this.dtTrigger.unsubscribe();
      }
  /*  
      private extractData(res: Response) {
        const body = res.json();
        return body.data || {};
      }
*/
}