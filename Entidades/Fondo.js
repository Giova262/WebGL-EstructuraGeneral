/** Contiene un Sol */

/** Boveda celeste */

class Fondo{

    constructor(){
        //tierraTextura
        var esferaGeometria = new Esfera(380,Math.PI,cieloTextura,true,false,[0.0,0.0,0.4],70,70);     
        this.cielo = new Objeto(esferaGeometria);
        
        var esferaGeometria2 = new Esfera(122,Math.PI/2,cieloTextura,false,true,[0.6,0.6,0.6],20,20);
        this.boveda = new Objeto(esferaGeometria2);

        this.init();
    }

    init(){
        this.cielo.animacion( true);
        this.cielo.rotar(1,[1.5,1,1]);
        this.cielo.phongCoheficientes(1,1,0,60);
        this.boveda.phongCoheficientes(0.2,1,5,60);
    }

    update(){
        // En el shader provoco el movimiento
    }

    dibujar(){
        gl.uniform1f(offsetLocation,offset);
        this.cielo.dibujar();
        this.boveda.dibujar();
    }
}