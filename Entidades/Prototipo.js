class Prototipo{

    constructor(){

        var geo = new Cilindro(10,50,20,20,[0.6,0.6,0.8]);
        this.plano = new Objeto(geo);

        this.configuracion();
    }

    configuracion(){

        /** Valores de mapas */
        this.plano.setMapaDifuso(ejemplo_textura);
        this.plano.setMapaNormal(ejemplo_normal);
        this.plano.setMapaRelieve(ejemplo_normal);

        /** Estilo */
        this.plano.textura(false);
        this.plano.normalMap(false);
        this.plano.relieve(false);
        this.plano.animacion(false);

        /** Iluminacion */
        this.plano.phongCoheficientes(1,1.2,1,10);

        /** Movimientos iniciales */
        this.plano.escalar([1,2,1]);
        this.plano.rotarY(Math.PI);
        this.plano.trasladar([50,0,80]);

        /** Formato de vetices */
        this.plano.setDrawType(gl.TRIANGLES);
    }

    update(){
        //Posibles movimientos con el tiempo
    }

    dibujar(){
        this.plano.dibujar();
    }
}