// src/app/app-routing.module.ts
import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HistoryComponent } from './history/history.component'; // Asegúrate de importar tu nuevo componente

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'history', component: HistoryComponent }, // Ruta para el historial
  { path: '**', redirectTo: '' }, // Redirigir cualquier otra ruta a inicio
];
