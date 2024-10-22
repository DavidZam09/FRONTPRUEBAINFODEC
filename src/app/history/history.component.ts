import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [TranslateModule, FormsModule, CommonModule],
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent {
  searchHistory: any[] = []; // Almacenará el historial de búsquedas
  filteredHistory: any[] = []; // Historial filtrado
  searchQuery: string = ''; // Consulta de búsqueda

  constructor(
    private apiService: ApiService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.loadSearchHistory(); // Cargar historial de búsquedas al iniciar
  }

  loadSearchHistory() {
    this.apiService.getRequests().subscribe(
      (response) => {
        this.searchHistory = response.data; // Accede a la propiedad 'data'
        this.filteredHistory = response.data; // Inicializa el historial filtrado
        console.log('Historial de búsquedas:', this.searchHistory);
      },
      (error) => {
        console.error('Error al cargar el historial de búsquedas:', error);
      }
    );
  }

  // Método para filtrar el historial basado en la búsqueda
  getFilteredHistory() {
    if (!this.searchQuery) {
      return this.searchHistory; // Si no hay búsqueda, muestra todo el historial
    }

    const query = this.searchQuery.toLowerCase(); // Convierte la consulta a minúsculas
    return this.searchHistory.filter((request) => {
      return (
        request.pais.toLowerCase().includes(query) ||
        request.ciudad.toLowerCase().includes(query) ||
        request.cantidad.toString().includes(query) ||
        request.rate.toString().includes(query) ||
        request.convert_cantidad.toString().includes(query) ||
        request.clima.toLowerCase().includes(query) ||
        request.temperatura.toString().includes(query)
      );
    });
  }
}
