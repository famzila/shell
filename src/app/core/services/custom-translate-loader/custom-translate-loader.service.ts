import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';


@Injectable({
  providedIn: 'root',
})
export class TranslationUpdaterService {
  isMfe1Loaded = false;
  isMfe2Loaded = false;

  constructor(private http: HttpClient, private translate: TranslateService) { }

  /**
   * Merge translation of both shell and loaded mfe
   * @param remoteName the mfe assets directory name (e.g. assets/remoteName/i18n/...)
   */
  mergeTranslations(remoteName: string) {
    console.log("Merge translations");
    // Get current translation and mfe translation observables
    const currentLang = this.translate.currentLang;
    console.log(`assets/${remoteName}/i18n/${currentLang}.json`);
    const mfeTranslation$ = this.http.get(`assets/${remoteName}/i18n/${currentLang}.json`);
    const currentTranslations$ = this.translate.getTranslation(currentLang);

    // Merge both current and mfe translations
    forkJoin([mfeTranslation$, currentTranslations$]).subscribe(([mfeTranslation, currentTranslation]) => {
      const mergedTranslations = { ...mfeTranslation, ...currentTranslation };
      this.translate.setTranslation(currentLang, mergedTranslations, false);
    });
  }
}