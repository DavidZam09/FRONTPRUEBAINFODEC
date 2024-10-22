import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon'; // Asegúrate de importar MatIconModule

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.scss'],
})
export class LanguageSwitcherComponent {
  currentLang = 'es'; // Idioma actual
  constructor(public translate: TranslateService) {
    translate.addLangs(['es', 'de']);
    translate.setDefaultLang('es');
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang?.match(/es|de/) ? browserLang : 'es');
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
  }

  toggleLanguage() {
    this.currentLang = this.currentLang === 'es' ? 'de' : 'es';
    this.translate.use(this.currentLang);
  }
}
