import { Component } from '@angular/core';
import { ANIMALES } from "../../data/data.animales";
import { Animal } from './../../interfaces/animal.interface';
import { reorderArray } from "ionic-angular";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  animales:Animal[] = [];
  audio = new Audio();
  audioTiempo: any;
  ordenando:boolean = false;

  constructor() {
    this.animales = ANIMALES.slice(0);
  }

  reproducir(animal:Animal){
    console.log(animal);

    this.pausar_audio(animal);

    if(animal.reproduciendo){
      animal.reproduciendo = false;
      return;
    }

    this.audio.src = animal.audio;

    this.audio.load();
    this.audio.play();

    animal.reproduciendo = true;

    this.audioTiempo = setTimeout(
      ()=>animal.reproduciendo = false,
      animal.duracion * 1000
    );
  }

  private pausar_audio(animalSel:Animal){
    clearTimeout(this.audioTiempo);
    this.audio.pause();
    this.audio.currentTime = 0;

    for(let animal of this.animales){
      if (animal.nombre != animalSel.nombre){
        animal.reproduciendo = false;
      }
    }
  }

  borrar_animal(idx:number){
    this.animales.splice(idx,1);
  }

  actualizar_animales(refresher:any){
    console.log("Inicio del refresh");
    
    //Como la operacion la hace muy rapido, se coloca un timeout de 2 segundos para ver la animacion 
    setTimeout(()=>{
      console.log("Final del refresh");
      // Recrea una copia de la lista original
      this.animales = ANIMALES.slice(0);
      refresher.complete();
    },2000);
  }

  reordenar_animales(idx:any){
    console.log(idx);

    this.animales = reorderArray(this.animales, idx);
  }

}
