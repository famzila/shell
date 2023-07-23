import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class TranslationUpdaterService {
  loadedMfes: Record<string, boolean> = {};

  constructor(private http: HttpClient, private translate: TranslateService) {}

  /**
   * Merge translation of both shell and loaded mfe
   * @param remoteName the mfe assets directory name (e.g. assets/remoteName/i18n/...)
   */
  mergeTranslations(remoteName: string) {
    if (!this.loadedMfes[remoteName]) {
      // Get current translation and mfe translation observables
      const currentLang = this.translate.currentLang;
      console.log(`assets/${remoteName}/i18n/${currentLang}.json`);
      const mfeTranslation$ = this.http.get(
        `assets/${remoteName}/i18n/${currentLang}.json`
      );
      const currentTranslations$ = this.translate.getTranslation(currentLang);

      // Merge both current and mfe translations
      forkJoin([mfeTranslation$, currentTranslations$]).subscribe(
        ([mfeTranslation, currentTranslation]) => {
          const mergedTranslations = {
            ...mfeTranslation ,
            ...currentTranslation,
          };
          // console dir
          console.log("Loading MFE: ", remoteName, " - ", JSON.stringify(mergedTranslations, null, 2));
          this.translate.setTranslation(currentLang, mergedTranslations, false);
          // set the mfe as loaded to avoid reloading it
          this.loadedMfes[remoteName] = true;
        }
      );
    }
  }

  // Remove desactivated mfe translation 
  removeMfeTranslations(remoteName: string) {
    // set record remoteName to false
    this.loadedMfes[remoteName] = false;
    // remove remoteName from translations
    const currentLang = this.translate.currentLang;
    const currentTranslations$ = this.translate.getTranslation(currentLang);
    currentTranslations$.subscribe((currentTranslation) => {
      delete currentTranslation[remoteName];
      this.translate.setTranslation(currentLang, currentTranslation, false);
      console.log("Removing MFE: ", remoteName, " - ", JSON.stringify(currentTranslation, null, 2));
    });
  }
}
