import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router, NavigationEnd} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit, OnDestroy {

  panelRoutes = [
    'offers',
    'categories',
    'companies',
    'users'
  ];

  activatedTabIndex = 0;

  subscription: Subscription;

  constructor(private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.setActivatedTabIndex(this.route.firstChild.snapshot.url[0].path);
    }, 0);

    this.subscription = this.router.events
      .filter((event) => event instanceof NavigationEnd)
      .map(() => this.route)
      .subscribe((event) => {
        this.setActivatedTabIndex(event.firstChild.snapshot.url[0].path);
    });
  }

  setActivatedTabIndex(path: string) {
    this.activatedTabIndex = this.panelRoutes.indexOf(path);
  }

  selectedModeChange(tabIndex: number) {
    if (tabIndex !== this.activatedTabIndex) {
      const selectedRoute = this.panelRoutes[tabIndex];
      if (selectedRoute) {
        this.router.navigate([selectedRoute], {relativeTo: this.route});
      }
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
