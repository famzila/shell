import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class TranslationUpdaterService {
  loadedMfe: Record<string, boolean> = {};
  // TODO: translate setTranslation(...) is not merging the translations, find why and remove this
  mergedTranslations!: Object;

  constructor(private http: HttpClient, private translate: TranslateService) { }

  /**
   * Merge translation of both shell and loaded mfe
   * @param remoteName the mfe assets directory name (e.g. assets/remoteName/i18n/...)
   */
  mergeTranslations(remoteName: string) {
    if (!this.loadedMfe[remoteName]) {
      // Get current translation and mfe translation for current language
      const currentLang = this.translate.currentLang;
      const mfeTranslation$ = this.http.get(
        `assets/${remoteName}/i18n/${currentLang}.json`
      );
      const currentTranslations$ = this.translate.getTranslation(currentLang);

      // Merge both current and mfe translations
      forkJoin([mfeTranslation$, currentTranslations$]).subscribe(
        ([mfeTranslation, currentTranslation]) => {

          this.mergedTranslations = {
            ...currentTranslation,
            ...this.mergedTranslations,
            ...mfeTranslation,
          };

          this.translate.setTranslation(currentLang, this.mergedTranslations, true);
          this.translate.use(currentLang);

          // set the mfe as loaded to avoid reloading it
          this.loadedMfe[remoteName] = true;
          return true;
        }
      );
    } 
    return false;
  }

  /**
   * 
   
  next: (mfeTranslation, currentTranslation) => {
          
            this.mergedTranslations = {
              ...currentTranslation,
              ...this.mergedTranslations,
              ...mfeTranslation,
            };

            this.translate.setTranslation(
              currentLang,
              this.mergedTranslations,
              true
            );
            this.translate.use(currentLang);

            // set the mfe as loaded to avoid reloading it
            this.loadedMfe[remoteName] = true;
        },
        error: () => {
          console.log('Error while mergine translations');
        },
        complete: () => {
          return true;
        }
   */

  // Remove desactivated mfe translation 
  // removeMfeTranslations(remoteName: string) {
  //   // set record remoteName to false
  //   this.loadedMfes[remoteName] = false;
  //   // remove remoteName from translations
  //   const currentLang = this.translate.currentLang;
  //   const currentTranslations$ = this.translate.getTranslation(currentLang);
  //   currentTranslations$.subscribe((currentTranslation) => {
  //     delete currentTranslation[remoteName];
  //     this.translate.setTranslation(currentLang, currentTranslation, false);
  //     console.log("Removing MFE: ", remoteName, " - ", JSON.stringify(currentTranslation, null, 2));
  //   });
  // }
}
