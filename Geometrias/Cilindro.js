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
      

       /* var p4 = [this.radioExterior,0,this.altura];
        var p5 = [this.radioExterior,0,this.altura*1/3];
        var p6 = [this.radioExterior,0,this.altura*2/3];
        var p7 = [this.radioExterior,0,1];*/

        var p4 = [this.radioExterior,0,this.altura];
        var p5 = [this.radioExterior,0,this.altura*23/24];
        var p6 = [this.radioExterior,0,this.altura*22/24];
        var p7 = [this.radioExterior,0,this.altura*21/24];

        var p7_2 =  [this.radioExterior,0,this.altura*21/24];
        var p7_3 =  [this.radioExterior,0,this.altura*20/24];
        var p7_4 =  [this.radioExterior,0,this.altura*19/24];
        var p7_5 =  [this.radioExterior,0,this.altura*18/24];

        var p7_6 =  [this.radioExterior,0,this.altura*18/24];
        var p7_7 =  [this.radioExterior,0,this.altura*17/24];
        var p7_8 =  [this.radioExterior,0,this.altura*16/24];
        var p7_9 =  [this.radioExterior,0,this.altura*15/24];

        var p7_10 = [this.radioExterior,0,this.altura*15/24];
        var p7_11 = [this.radioExterior,0,this.altura*14/24];
        var p7_12 = [this.radioExterior,0,this.altura*13/24];
        var p7_13 = [this.radioExterior,0,this.altura*12/24];

        var p7_14 = [this.radioExterior,0,this.altura*12/24];
        var p7_15 = [this.radioExterior,0,this.altura*11/24];
        var p7_16 = [this.radioExterior,0,this.altura*10/24];
        var p7_17 = [this.radioExterior,0,this.altura*9/24];

        var p7_18 = [this.radioExterior,0,this.altura*9/24];
        var p7_19 = [this.radioExterior,0,this.altura*8/24];
        var p7_20 = [this.radioExterior,0,this.altura*7/24];
        var p7_21 = [this.radioExterior,0,this.altura*6/24];

        var p7_22 = [this.radioExterior,0,this.altura*6/24];
        var p7_23 = [this.radioExterior,0,this.altura*5/24];
        var p7_24 = [this.radioExterior,0,this.altura*4/24];
        var p7_25 = [this.radioExterior,0,this.altura*3/24];

        var p7_26 = [this.radioExterior,0,this.altura*3/24];
        var p7_27 = [this.radioExterior,0,this.altura*2/24];
        var p7_28 = [this.radioExterior,0,this.altura*1/24];
        var p7_29 = [this.radioExterior,0,0.1];

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


        this.puntosControl.push(p7_2);
        this.puntosControl.push(p7_3);
        this.puntosControl.push(p7_4);
        this.puntosControl.push(p7_5);
        this.puntosControl.push(p7_6);
        this.puntosControl.push(p7_7);
        this.puntosControl.push(p7_8);
        this.puntosControl.push(p7_9);
        this.puntosControl.push(p7_10);
        this.puntosControl.push(p7_11);
        this.puntosControl.push(p7_12);
        this.puntosControl.push(p7_13);
        this.puntosControl.push(p7_14);
        this.puntosControl.push(p7_15);
        this.puntosControl.push(p7_16);
        this.puntosControl.push(p7_17);
        this.puntosControl.push(p7_18);
        this.puntosControl.push(p7_19);
        this.puntosControl.push(p7_20);
        this.puntosControl.push(p7_21);
        this.puntosControl.push(p7_22);
        this.puntosControl.push(p7_23);
        this.puntosControl.push(p7_24);
        this.puntosControl.push(p7_25);
        this.puntosControl.push(p7_26);
        this.puntosControl.push(p7_27);
        this.puntosControl.push(p7_28);
        this.puntosControl.push(p7_29);


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