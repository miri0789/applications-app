import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, shareReplay } from 'rxjs';
import { Application } from './models/application';
import { Card } from './models/card';
import { Transaction } from './models/transaction';

@Injectable({
  providedIn: 'root'
})
export class ApplicationsService {

  constructor(private http: HttpClient) {
  }


  getApplications$ = this.http.get<Application[]>('api/applications')
    .pipe(shareReplay(1));

  getApplication(appId: number): Observable<Application> {
    return this.getApplications$.pipe(map(applications => {
      const app = applications.find(app => app.id === appId);
      if (!app)
        throw new Error('app not exist');
      return app;
    }));
  }

  getCards(appId: number): Observable<Card[]> {
    return this.http.get<Card[]>(`api/cards/${appId}`);
  }

  getTransactions(appId: number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`api/trans/${appId}`);
  }

  getCardsTransactions(appId: number): Observable<Transaction[]> {
    return forkJoin([
      this.getCards(appId),
      this.getTransactions(appId)]
    ).pipe(map(([cards, transactions]: [Card[], Transaction[]]) =>
      transactions.map(transaction => new Transaction(transaction, cards))));
  }
}
