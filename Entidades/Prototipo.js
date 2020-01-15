class Prototipo{

    constructor(){

      /*  var geo_plano = new Plano(200,200,[1,0.2,0.6]);
        this.plano = new Objeto(geo_plano);*/

        var geo_rectangulo = new Rectangulo(10,10,10,[0.5,0.5,0.5]);
        this.plano = new Objeto(geo_rectangulo);

        this.configuracion();
    }

    configuracion(){

        /** Valores de mapas */
        this.plano.setMapaDifuso(ejemplo_textura);
        this.plano.setMapaNormal(ejemplo_normal);
        this.plano.setMapaRelieve(ejemplo_normal);

        /** Estilo */
        this.plano.textura(true);
        this.plano.normalMap(true);
        this.plano.relieve(false);
        this.plano.animacion(false);

        /** Iluminacion */
        this.plano.phongCoheficientes(0.2,1,0.2,60);

        /** Movimientos iniciales */
        this.plano.escalar([1,1,1]);
        this.plano.rotar(0,[0,0,1]);
        this.plano.trasladar([0,0,0]);

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