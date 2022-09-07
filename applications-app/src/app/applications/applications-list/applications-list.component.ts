import { Component, OnDestroy, OnInit } from '@angular/core';
import { finalize, Subscription } from 'rxjs';
import { ApplicationsService } from '../applications.service';
import { Application } from '../models/application';
import { Router } from '@angular/router';
import { appRoute } from 'src/app/app-routing.module';
import { appInfoRoute } from '../applications-routing.module';

@Component({
  selector: 'app-applications-list',
  templateUrl: './applications-list.component.html',
  styleUrls: ['./applications-list.component.scss']
})
export class ApplicationsListComponent implements OnInit, OnDestroy {
  isDataLoading = true;
  applications: Application[] = [];
  error: Error;
  private subscribers = new Subscription();
  constructor(private applicationsService: ApplicationsService,
    private router: Router) { }

  ngOnInit(): void {
    this.subscribers.add(
      this.applicationsService.getApplications$
        .pipe(finalize(() => this.isDataLoading = false))
        .subscribe(applications => this.applications = applications,
          error => this.error = error));
  }

  goToApp(app: Application) {
    this.router.navigate([appRoute, appInfoRoute, app.id]);
  }

  ngOnDestroy() {
    this.subscribers.unsubscribe();
  }

}
