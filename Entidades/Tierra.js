/** Contiene un plano */

class Tierra{

    constructor(){

        var planoGeometria = new Plano(250,250,[1.0,1.0,0.2]);
        this.tierra = new Objeto(planoGeometria);
     
        this.init();
    }

    init(){

        this.tierra.setMapaDifuso(tierraTextura);
        this.tierra.setMapaNormal(tierraNormalTextura);
        this.tierra.setMapaRelieve(tierraTextura);
        
        this.tierra.textura(true);
        this.tierra.normalMap(true);
        this.tierra.animacion(false);
        this.tierra.relieve(true);

        this.tierra.rotar(-Math.PI/2.0-0.5,[0,0,1]);

        this.tierra.phongCoheficientes(0.1,0.7,1,60);
    }

    update(){
        // No se mueve!
    }

    dibujar(){

        this.tierra.dibujar();
    }
}