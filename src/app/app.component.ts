import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private readonly translate = inject(TranslateService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  title = 'shell';

  isOpen = false;

  constructor() {
    this.translate.setDefaultLang('en');
    this.translate.use('en');

    // let navigation = this.router.getCurrentNavigation();
    // let state = this.routeSnapshot.data;
    
    // console.log("state", state);
    // this.isOpen = state ? state['isOpen'] : false;
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.isOpen = params['isOpen'] ?? false;
    });
  }

  onClose() {
    // this.router.navigate(['/',{ outlets: { mfe1: ['mfe1'] } }]);
    this.router.navigate([{ outlets: { mfe1: 'mfe1', mfe2: null } }]);
  }
}
