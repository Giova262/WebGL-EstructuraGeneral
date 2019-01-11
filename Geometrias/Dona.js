
class Dona extends SuperficieDeRevolucion{

    constructor(_puntosCurva,_puntosRevolucion,_angulo,_radioInt,_radioExt,_alturaMin,_alturaMax,_color){

        super(_puntosCurva,_puntosRevolucion,_angulo,_color);

        this.radioInterior = _radioInt;
        this.radioExterior = _radioExt;
        this.alturaMin = _alturaMin;
        this.alturaMax = _alturaMax;

        this.medio = (this.radioExterior -  this.radioInterior ) / 2.0 ;

        this.initControlPoints();
        this.initGeometria();
    }

    initControlPoints(){

        /** Creo los puntos */
        var p0 = [this.medio,0,this.alturaMin];
        var p1 = [this.radioExterior,0,this.alturaMin];
        var p2 = [this.radioExterior,0,this.alturaMax];
        var p3 = [this.medio,0,this.alturaMax];

        var p4 = [this.medio,0,this.alturaMax];
        var p5 = [this.radioInterior,0,this.alturaMax];
        var p6 = [this.radioInterior,0,this.alturaMin];
        var p7 = [this.medio,0,this.alturaMin];

        /** Lleno la lista de puntos de control */
        this.puntosControl.push(p0);
        this.puntosControl.push(p1);
        this.puntosControl.push(p2);
        this.puntosControl.push(p3);

        this.puntosControl.push(p4);
        this.puntosControl.push(p5);
        this.puntosControl.push(p6);
        this.puntosControl.push(p7);

        /** Cantidad de tramos de curva */ 
        this.tramos = this.puntosControl.length / 4.0 ;
    }

}