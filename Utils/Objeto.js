/** Clase */

class Objeto{

    constructor(_geometria){
        this.geometria = _geometria;

        this.hijos = [];

        this.escala = [1,1,1];
        this.angulo = 0;
        this.eje = [0,0,1];
        this.posicion = [0,0,0];

        this.ka = 1;
        this.kd = 1;
        this.ks = 1;
        this.n = 1;

        this.padre = mat4.create();

        this.modelo = mat4.create();
        this.normalMatrix = mat3.create();

        this.animacionTextura = false;
        this.useNormalMap = false;
        this.useDisplacementMap = false;

    }

    escalar(_escala){
        this.escala = _escala;
    }
    rotar(_angulo,_eje){
        this.angulo =_angulo;
        this.eje = _eje;
    }

    trasladar(_position){
        this.posicion = _position;
    }

    phong(_ka,_kd,_ks,_n){
        this.ka = _ka;
        this.kd = _kd;
        this.ks = _ks;
        this.n = _n;
    }
    
    addChildren(_children){
        this.hijos.push(_children);
    }

    deleteChildren(_children){
        this.hijos.delete(_children);
    }

    addPadre(_padre){
        mat4.identity(this.padre);
        mat4.copy(this.padre,_padre);
    }

    animacion( _condicion ){
        this.animacionTextura = _condicion;
    }

    normalMap( _condicion ){
        this.useNormalMap = _condicion;
    }

    displacementMap( _condicion2 ){
        this.displacementMap = _condicion2;
    }


    dibujar(){  

        /**Condicionales */
        gl.uniform1i(useAnimacionLocation, this.animacionTextura);
        gl.uniform1i(useNormalVertexLocation, this.useNormalMap);
        gl.uniform1i(useNormalFragmentLocation, this.useNormalMap);
        gl.uniform1i(useDisplacementLocation, this.displacementMap);

        /** Iluminacion */   
		gl.uniform1f(kaLocation, this.ka);
		gl.uniform1f(kdLocation, this.kd);	
		gl.uniform1f(ksLocation, this.ks);	
        gl.uniform1f(nLocation,this.n);

        /** Matriz de modelo */
        mat4.identity(this.modelo);
        mat4.multiply(this.modelo,this.modelo, this.padre );
        mat4.scale(this.modelo,this.modelo, this.escala);
        mat4.rotate(this.modelo,this.modelo, this.angulo, this.eje);
        mat4.translate(this.modelo, this.modelo, this.posicion);
        gl.uniformMatrix4fv(modelMatrixLocation, false, this.modelo);

        /** Matriz de normales */
		mat3.fromMat4(this.normalMatrix, this.modelo);
		mat3.invert(this.normalMatrix, this.normalMatrix);
		mat3.transpose(this.normalMatrix, this.normalMatrix);
		gl.uniformMatrix3fv(normalMatrixLocation, false, this.normalMatrix);

      
        /** Dibujar */
        this.geometria.dibujar();

        for(var i=0; i < this.hijos.length ; i++){
            this.hijos[i].addPadre(this.modelo);
            this.hijos[i].dibujar();
        }

    }
}