import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize, forkJoin, Subscription } from 'rxjs';
import { appRoute } from 'src/app/app-routing.module';
import { ApplicationsService } from '../applications.service';
import { Application } from '../models/application';
import { Transaction, TransactionType } from '../models/transaction';

@Component({
  selector: 'app-application-info',
  templateUrl: './application-info.component.html',
  styleUrls: ['./application-info.component.scss']
})
export class ApplicationInfoComponent implements OnInit, OnDestroy {
  application: Application;
  transactions: Transaction[] = [];
  transactionType = TransactionType;
  isDataLoading: boolean;
  error: Error;
  appRoute = appRoute;
  private subscribers = new Subscription();
  constructor(private applicationsService: ApplicationsService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    const appId = Number(this.route.snapshot.paramMap.get('appId'));
    if (appId && !isNaN(appId)) {
      this.isDataLoading = true;
      forkJoin([this.applicationsService.getApplication(appId),
        this.applicationsService.getCardsTransactions(appId)])
        .pipe(finalize(() => this.isDataLoading = false))
        .subscribe(([app, transactions]) => {
          this.transactions = transactions;
          this.application = app;
        }, error => this.error = error);
    } else {
      this.error = new Error('invalid app id');
    }
  }

  ngOnDestroy() {
    this.subscribers.unsubscribe();
  }

}
