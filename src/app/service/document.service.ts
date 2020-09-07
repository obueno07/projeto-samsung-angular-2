import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { DocumentModel } from '../model/document-model';

@Injectable()
export class DocumentService {

    //private urlGetDocumentQuotation = "./assets/document.json";
    private urlGetDocumentQuotation = "http://localhost:8080/documents";

    constructor(private http: HttpClient) {
    }

    /**
    * Find quotation document 
    * @returns {Observable<DocumentModel>}
    */
    public getQuotationDocument(): Observable<DocumentModel[]> {
        return this.http
            .get<DocumentModel[]>(this.urlGetDocumentQuotation)
            .map(res => res);
    }

    /**
    * convert currency
    * @returns {Observable<DocumentModel>}
    */
   public convertCurrency(listQuotationDocument: DocumentModel[]): DocumentModel[] {
        let listDocument: DocumentModel[] = [];
        let newCurrency = "USD, PEN e BRL";

        listQuotationDocument.forEach(function (document) {
            document.currencyCode = newCurrency;
            listDocument.push(document);
            //console.log("document.currencyCode = " + document.currencyCode);
        });

        return listDocument;
    }

}