import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule, TranslateModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  countries: any[] = []; // Lista de países
  cities: string[] = []; // Lista de ciudades
  selectedCountry: any; // País seleccionado
  selectedCity: string = ''; // Ciudad seleccionada
  exchangeRate: any;
  amountToConvert: number = 1; // Valor inicial
  weather: any;
  climate: string | null = null;
  temperature: number | null = null;
  currentStep: number = 0;
  successMessage: string = ''; // Mensaje de éxito
  errorMessage: string = ''; // Mensaje de error

  constructor(
    private apiService: ApiService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.loadCountries();
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
  }

  loadCountries() {
    this.apiService.getCountries().subscribe(
      (data) => {
        this.countries = data; // Guardar la lista de países
      },
      (error) => {
        console.error('Error al obtener países:', error);
      }
    );
  }

  onCountryChange() {
    this.selectedCity = ''; // Resetear ciudad seleccionada
    this.cities = this.selectedCountry?.cities || []; // Obtener ciudades del país seleccionado
  }

  onCityChange() {
    this.getExchangeRate(); // Obtener tasa de cambio al cambiar de ciudad
    this.getWeather(); // Obtener clima al cambiar de ciudad
  }

  getExchangeRate() {
    const currency = this.selectedCountry?.currency;
    if (currency) {
      this.apiService.getExchangeRate(currency, this.amountToConvert).subscribe(
        (data) => {
          this.exchangeRate = data;
        },
        (error) => {
          console.error('Error al obtener la tasa de cambio:', error);
        }
      );
    }
  }

  onAmountChange(event: any) {
    this.amountToConvert = event.target.value;
    this.getExchangeRate();
  }

  getWeather() {
    if (this.selectedCity) {
      this.apiService.getWeather(this.selectedCity).subscribe(
        (data) => {
          this.weather = data;
          this.climate = this.weather.weather[0].description;
          this.temperature = this.weather.main.temp;
        },
        (error) => {
          console.error('Error al obtener el clima:', error);
        }
      );
    }
  }

  onNextAndSave() {
    if (this.currentStep < 2) {
      this.currentStep++;
      const requestData = {
        pais: this.selectedCountry?.name || '',
        ciudad: this.selectedCity || '',
        cantidad: this.amountToConvert || 0,
        rate: this.exchangeRate?.rate || 0,
        convert_cantidad: this.exchangeRate?.converted_value || 0,
        clima: this.climate || 'Desconocido',
        temperatura: this.temperature ?? 0,
      };

      // Llamar al servicio para guardar los datos
      this.apiService.addRequest(requestData).subscribe(
        (response) => {
          this.successMessage = 'Datos guardados exitosamente';
          console.log('Respuesta del servidor:', response);
        },
        (error) => {
          this.errorMessage = 'Error al guardar los datos';
          console.error('Error al guardar:', error);
        }
      );
    }
  }

  onBack() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  onStart() {
    this.currentStep = 0;
    this.resetForm();
  }
  onNext() {
    if (this.currentStep < 2) {
      this.currentStep++;
    } else {
      // Hacer la solicitud de tasa de cambio y clima aquí
      this.getExchangeRate();
      this.getWeather();
    }
  }

  resetForm() {
    this.selectedCountry = null;
    this.selectedCity = '';
    this.amountToConvert = 1;
    this.exchangeRate = null;
    this.weather = null;
    this.climate = null;
    this.temperature = null;
    this.cities = [];
    this.successMessage = '';
    this.errorMessage = '';
  }
}
