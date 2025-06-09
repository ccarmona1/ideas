"use strict";

function Tarea(minombre) {
  this.completada = false;
  this.minombre = minombre;
  this.marcarComoCompletada = function () {
    this.completada = true;
  };
  this.obtenerEstado = function () {
    return !!this.completada;
  };
  this.pintarMiNombre = function () {
    console.log(`Mi nombre es ${this.minombre}`);
  }
}

function TareaDiaria() {
  Tarea.call(this);
}

TareaDiaria.prototype = Object.create(Tarea.prototype);
TareaDiaria.prototype.constructor = TareaDiaria;

function TareaRecurrente() {
  Tarea.call(this);
}

TareaRecurrente.prototype = Object.create(Tarea.prototype);
TareaRecurrente.prototype.constructor = TareaRecurrente;

function TareaUnica(nombre) {
  Tarea.call(this, nombre);
}

TareaUnica.prototype = Object.create(Tarea.prototype);
TareaUnica.prototype.constructor = TareaUnica;

const tarea = new TareaUnica('crisman');
tarea.pintarMiNombre();

const tarea2 = new TareaUnica('crisman2');
tarea2.pintarMiNombre();
