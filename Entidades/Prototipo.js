class Prototipo{

    constructor(){

        var geo = new Cilindro(50,50,2*Math.PI,1,2,10,[0.3,0.6,0.4]);
        this.plano = new Objeto(geo);

        this.configuracion();
    }

    configuracion(){

        /** Valores de mapas */
        this.plano.setMapaDifuso(ejemplo_textura);
        this.plano.setMapaNormal(ejemplo_normal);
        this.plano.setMapaRelieve(ejemplo_normal);

        /** Estilo */
        this.plano.textura(true);
        this.plano.normalMap(false);
        this.plano.relieve(false);
        this.plano.animacion(false);

        /** Iluminacion */
        this.plano.phongCoheficientes(1,1.2,1,10);

        /** Movimientos iniciales */
        this.plano.escalar([10,10,5]);
        this.plano.rotarY(0);
        this.plano.trasladar([0,0,-20]);

        /** Formato de vetices */
        this.plano.setDrawType(gl.TRIANGLE_STRIP); // POINTS  LINES LINE_STRIP LINE_LOOP TRIANGLES TRIANGLE_STRIP TRIANGLE_FAN
    }

    update(){
        //Posibles movimientos con el tiempo
    }

    dibujar(){
        this.plano.dibujar();
    }
}