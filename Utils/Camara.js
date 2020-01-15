/** Arreglar Bug del zoom o usar la camara de Three.js*/

var previousClientX = 0,
    previousClientY = 0,
    radio = 400,
    radio2 = 0;
    escala= 1.0;
    /*alfa = Math.PI, 
    beta = Math.PI/4.0, */
    alfa = Math.PI/2, 
    beta = Math.PI/2, 
    factorVelocidad = 0.01;
    ZOOM = 0.007;

    mouseX=0;
    mouseY=0;
    isMouseDown = false;

    deltaX = 0;
    deltaY = 0;

    fristTime = true ;

    tipoCamara= 0;

    avanzar = false;
    retoceder = false;

    x2 = 0;
    y2= 0;
    parar = false;

    pasoEscala = 0.01;
    contador = 0;


class Camara{

    constructor(){
        
    }

    event(){
        /** Guardo posicion del mouse dentro del canvas */
        $("#canvas").mousemove(function(e){     
            mouseX = e.clientX || e.pageX; 
            mouseY = e.clientY || e.pageY;
        });

        /** Evaluo si presione el boton del mouse dentro del canvas */
        $("#canvas").mousedown(function(e){
            isMouseDown = true;       
        });

        /** Pongo false si suelto el boton del mouse */
        $("body").mouseup(function(e){
            isMouseDown = false;
            fristTime = true;
        });

        /** Rueda del mouse */    
        $("#canvas").bind('mousewheel', function(e){
              
            // Chrome
            if(e.originalEvent.wheelDelta > 0) {
                escala = escala - pasoEscala; 
                if( escala <= 0.01 ) escala = 0.01 ;
                
            }else  if( e.originalEvent.wheelDelta < 0 ){ 
                escala = escala + pasoEscala; 
                if( escala >= 1.0 ) escala = 1.0 ;          
            }

             /** Para evitar el scroll del fondo dentro del canvas */
             e.preventDefault()
        });

        /** Eventos disparados por el teclado */
        window.addEventListener("keydown", function (e) {
            if ( e.keyCode == 90) {
                escala = escala - pasoEscala; 
                if( escala <= 0.01 ) escala = 0.01 ;
            }
            if ( e.keyCode == 88) {
                escala = escala + pasoEscala; 
                if( escala >= 1.0 ) escala = 1.0 ; 
            }
            if ( e.keyCode == 49) {
                tipoCamara = 0 ;        
            }
            if ( e.keyCode == 50) {
                tipoCamara = 1 ;        
            }
            if ( e.keyCode == 51) {
                tipoCamara = 2 ;        
            }
            if ( e.keyCode == 52) {
                tipoCamara = 3 ;        
            }
            if ( e.keyCode == 53) {
                tipoCamara = 4 ;        
            }
            if ( e.keyCode == 54) {
                tipoCamara = 5 ;
            }

            // Movimientos
            if ( e.keyCode == 87) { // w
                radio2-=0.0001;    
                avanzar = true;
            }
            if ( e.keyCode == 83) { //s
                radio2+=0.0001;    
                retoceder = true;   
            }
            if ( e.keyCode == 65) { //a
                       
            }
            if ( e.keyCode == 68) { //d
                       
            }
            
        }, true);
          
    }

    update(){

        if(isMouseDown) {

            if(fristTime){
                previousClientX = mouseX;
                previousClientY = mouseY;   
                fristTime = false;
            }
    
            deltaX = mouseX - previousClientX;
            deltaY = mouseY - previousClientY;
               
            previousClientX = mouseX;
            previousClientY = mouseY;
    
         
            alfa = alfa - deltaX * factorVelocidad;
            beta = beta - deltaY * factorVelocidad;
            
        } 

        //console.log(escala);
        if(tipoCamara == 0) this.orbital();
        if(tipoCamara == 1) this.primeraPersona();
         
    }

    orbital(){

        if (alfa<0) alfa=Math.PI*2;
        if (alfa>Math.PI*2) alfa=0;

        //if (beta<  -Math.PI/2 +0.08) beta = -Math.PI/2 + 0.08;
        if( beta >= 0.0 ) beta =  -beta ;
       
        /** Camara update */   
        var x = radio * escala * Math.cos(alfa) * Math.sin(beta);
        var y = radio * escala * Math.sin(alfa) * Math.sin(beta);
        var z = radio * escala * Math.cos(beta);

        mat4.lookAt(viewMatrix, [x, y, z], [0, 0, 0], [0,0,1]);
        gl.uniformMatrix4fv(viewMatrixLocation, false, viewMatrix);
        
        gl.uniform3f(cameraPosLocation,x,y,z);

        radio2 = 0;
        x2 = 0;
        y2= 0;
    }

    primeraPersona(){

        var x = radio  * escala * Math.cos(alfa) * Math.sin(beta);
        var y = radio  * escala * Math.sin(alfa) * Math.sin(beta);
        var z = radio * escala * Math.cos(beta);
   
        if(avanzar){   
             x2 += radio2   * Math.cos(alfa);
             y2 += radio2   * Math.sin(alfa);        
        }
        if(retoceder){
            x2 -= radio2   * Math.cos(alfa);
            y2 -= radio2   * Math.sin(alfa);   
        }

        var distancia = Math.sqrt(Math.pow(x2, 2.0) + Math.pow(y2, 2.0) ); 
     
        if( distancia >= 80 ) {
            x2 = 0;
            y2 = 0 ;
        }

        avanzar = false;
        retoceder = false;

        mat4.lookAt(viewMatrix, [x2, y2, 15], [x, y, z], [0,0,1]);
        gl.uniformMatrix4fv(viewMatrixLocation, false, viewMatrix); 
        gl.uniform3f(cameraPosLocation,...[x2, y2, 15]);

    }

}