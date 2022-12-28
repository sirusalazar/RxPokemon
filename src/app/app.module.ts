import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { FormsModule } from '@angular/forms';
import { PokemonModule } from './pokemon/pokemon.module';

@NgModule({
  declarations: [AppComponent, WelcomeComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule, PokemonModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
