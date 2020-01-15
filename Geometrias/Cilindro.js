class Cilindro extends SuperficieDeRevolucion{

    constructor(_puntosCurva,_puntosRevolucion,_angulo,_radioInt,_radioExt,altura,_color){

        super(_puntosCurva,_puntosRevolucion,_angulo,_color);

        this.radioInterior = _radioInt;
        this.radioExterior = _radioExt;
        this.altura = altura;

        this.initControlPoints();
        this.initGeometria();
    }

    initControlPoints(){

        var medio = this.radioExterior - this.radioInterior

        var offset = medio / 3.0

        /** Creo los puntos */
        var p0 = [this.radioInterior,0,this.altura];
        var p1 = [this.radioInterior+offset,0,this.altura];
        var p2 = [this.radioExterior-offset,0,this.altura];
        var p3 = [this.radioExterior,0,this.altura];

        var p4 = [this.radioExterior,0,this.altura];
        var p5 = [this.radioExterior,0,this.altura*1/3];
        var p6 = [this.radioExterior,0,this.altura*1/6];
        var p7 = [this.radioExterior,0,1];

        var p8 = [this.radioExterior,0,0];
        var p9 = [this.radioExterior-offset,0,0];
        var p10 = [this.radioInterior+offset,0,0];
        var p11 = [this.radioInterior,0,0];

        var p12 = [this.radioInterior,0,0];
        var p13 = [this.radioInterior,0,this.altura*1/3];
        var p14 = [this.radioInterior,0,this.altura*2/3];
        var p15 = [this.radioInterior,0,this.altura];

        /** Lleno la lista de puntos de control */
        this.puntosControl.push(p0);
        this.puntosControl.push(p1);
        this.puntosControl.push(p2);
        this.puntosControl.push(p3);

        this.puntosControl.push(p4);
        this.puntosControl.push(p5);
        this.puntosControl.push(p6);
        this.puntosControl.push(p7);

        this.puntosControl.push(p8);
        this.puntosControl.push(p9);
        this.puntosControl.push(p10);
        this.puntosControl.push(p11);

        this.puntosControl.push(p12);
        this.puntosControl.push(p13);
        this.puntosControl.push(p14);
        this.puntosControl.push(p15);

        /** Cantidad de tramos de curva */ 
        this.tramos = this.puntosControl.length / 4.0 ; // cada tramo es una subcurva
    }

}