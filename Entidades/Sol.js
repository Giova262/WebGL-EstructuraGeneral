/** Contiene un Sol */

class Sol{

    constructor(){

        var esferaGeometria = new Esfera(2,Math.PI,[1,1,0],60,60);
        this.sol = new Objeto(esferaGeometria);

        this.radio = 80;
        this.position = [0,0,0];
        this.altura = 50;

        this.init();
    }

    init(){
        

        this.sol.setMapaDifuso(tierraTextura);
        this.sol.setMapaNormal(tierraNormalTextura);
        this.sol.setMapaRelieve(tierraTextura);
        
        this.sol.textura(false);
        this.sol.normalMap(false);
        this.sol.animacion(false);
        this.sol.relieve(false);

        this.sol.phongCoheficientes(1,25,2,60);
    }

    getPosition(){
        return this.position;
    }

    setAltura(_altura){
        this.altura = _altura;
    }

    setRadio(_radio){
        this.radio = _radio;
    }

    update(){ 

        var theta = -(tiempo*2*Math.PI)/86400 + Math.PI;
        var x = this.radio * Math.cos(theta ) ;
        var y = this.radio * Math.sin(theta )  ;
        var z = this.altura ;

        this.position[0] = x;
        this.position[1] = y;
        this.position[2] = z;

        this.sol.trasladar([x,y,z]);
    }

    dibujar(){
        this.sol.dibujar();
    }
}