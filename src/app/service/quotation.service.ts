import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { QuotationModel } from '../model/quotation-model';

@Injectable()
export class QuotationService {

    private urlGetQuotation = "./assets/quotation.json";
    //private urlGetQuotation = "http://localhost:8080/quotation";

    constructor(private http: HttpClient) {
    }

    /**
    * Find quotation
    * @returns {Observable<QuotationModel>}
    */
    public getQuotation(): Observable<QuotationModel[]> {
        return this.http
            .get<QuotationModel[]>(this.urlGetQuotation)
            .map(res => res);
    }

    /**
    * Find quotation
    * @returns {<QuotationModel>}
    */
    public getQuotationMoreRecent(listQuotation: QuotationModel[]): QuotationModel[] {
        let listQuotationMoreRecent: QuotationModel[] = [];
        
        listQuotation.forEach(function (quotation) {

            if(listQuotationMoreRecent.length === 0){
                listQuotationMoreRecent.push(quotation);
            } else {
                let dateNextQuotation = new Date(quotation.dataHoraCotacao);
                let dateMoreRecentList = new Date(listQuotationMoreRecent[0].dataHoraCotacao);
    
                // se tiver cotacoes mais recentes, descarta as antigas
                if(dateNextQuotation > dateMoreRecentList){
                    listQuotationMoreRecent = new Array();
                }
    
                listQuotationMoreRecent.push(quotation);
            }
            
        });

        

        return listQuotationMoreRecent;
    }

    
    
}