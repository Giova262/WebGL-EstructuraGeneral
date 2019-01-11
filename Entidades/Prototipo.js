class Prototipo{

    constructor(){

        var geometria = new Plano(200,200,[1,0.2,0.6]);
        this.plano = new Objeto(geometria);

        this.configuracion();
    }

    configuracion(){

        this.plano.setMapaDifuso(ejemplo_textura);
        this.plano.setMapaNormal(ejemplo_normal);
        this.plano.setMapaRelieve(ejemplo_normal);

        this.plano.textura(true);
        this.plano.normalMap(true);
        this.plano.relieve(true);
        this.plano.animacion(false);

        this.plano.phongCoheficientes(1,1,1,60);

        this.plano.escalar([1,1,1]);
        this.plano.rotar(0,[0,0,1]);
        this.plano.trasladar([0,0,0]);

        this.plano.setDrawType(gl.TRIANGLES);
    }

    update(){
        //Posibles movimientos
    }

    dibujar(){
        this.plano.dibujar();
    }
}