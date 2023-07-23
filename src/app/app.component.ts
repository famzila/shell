import { Component, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private readonly translate = inject(TranslateService);

  title = 'shell';

  constructor() { 
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }
}
