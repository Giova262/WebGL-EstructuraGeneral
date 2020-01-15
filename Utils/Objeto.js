/** Clase Objeto */

class Objeto{

    constructor(geometria){

        /** Datos */
        this.geometria = geometria;
        this.childrenList = [];

        /** Caracteristicas */
        this.angulo = 0;
		this.anguloX = 0;
        this.anguloY = 0;
        this.anguloZ = 0;
		
        this.eje = [0,0,1];
        this.posicion = [0,0,0];
        this.escala = [1,1,1];
		
		this.relieve_valor = 7.0;

        /** Modelo de Phong */
        this.ka = 1;
        this.kd = 1;
        this.ks = 1;
        this.n = 60;

        /** Matrices */
        this.padreMatrix = mat4.create();        
        this.modelMatrix = mat4.create(); 
        this.normalMatrix = mat3.create();     
        
        /** Condicionales */
        this.useAnimacion = false;
        this.useTextura = false;
        this.useNormalMap = false;
        this.useRelieveMap = false;

        /** Mapas */
        this.mapaDifuso = null;
        this.mapaNormal = null;
        this.mapaRelieve = null;
    }
	
	coheficienteRelieve(_valor){
        this.relieve_valor = _valor;
    }

    addMatriz(_matrix){
        mat4.identity(this.padreMatrix);
		mat4.copy(this.padreMatrix, _matrix );
    }

    addChildren(_children){
        this.childrenList.push(_children);
    }

    deleteChildren(_children){
        this.childrenList.delete(_children);
    }

    clearChildrens(){
        this.childrenList = [];
    }

    rotar(_angulo,_eje){
        this.angulo =  _angulo ;
        this.eje = _eje;
    }
	
	rotarX(_angulo){
        this.anguloX =  _angulo ;
    }

    rotarY(_angulo){
        this.anguloY =  _angulo ;
    }

    rotarZ(_angulo){
        this.anguloZ =  _angulo ;
    }

    trasladar(_posicion){
        this.posicion = _posicion;
    }

    escalar(_escala){
        this.escala = _escala;
    }

    reset(){
        this.angulo = 0;
        this.eje = [0,0,1];
        this.posicion = [0,0,0];
        this.escala = [1,1,1]; 
    }

    phongCoheficientes(_ka,_kd,_ks,_n){
        this.ka = _ka;
        this.kd = _kd;
        this.ks = _ks;
        this.n  = _n;
    }

    normalMap( _condicion ){
        this.useNormalMap = _condicion;
    }

    animacion( _condicion ){
        this.useAnimacion = _condicion;
    }

    textura( _condicion ){
        this.useTextura = _condicion;
    }

    relieve( _condicion2 ){
        this.useRelieveMap = _condicion2;
    }

    setMapaDifuso( _mapa){
        this.mapaDifuso = _mapa;
        
    }

    setMapaNormal(_mapa){
        this.mapaNormal = _mapa;
        
    }

    setMapaRelieve(_mapa){
        this.mapaRelieve = _mapa;
       
    }

    setDrawType(_type){
        this.geometria.setDrawType(_type);
    }


    dibujar(){
		
		/** Mapas*/
		gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.mapaDifuso);
        gl.uniform1i(sampler1Location, 0);
		
		gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, this.mapaNormal);
        gl.uniform1i(sampler2Location, 1);
		
		 gl.activeTexture(gl.TEXTURE2);
        gl.bindTexture(gl.TEXTURE_2D, this.mapaRelieve);
        gl.uniform1i(sampler3Location,2);
	
        /** Condicionales */
        gl.uniform1i(useTextureLocation, this.useTextura);
        gl.uniform1i(useNormalMapLocation, this.useNormalMap);
        gl.uniform1i(useNormalMapFragLocation, this.useNormalMap);
        gl.uniform1i(useDisplacementMapLocation, this.useRelieveMap);
        gl.uniform1i(texturaAnimacionLocation, this.useAnimacion);
        gl.uniform1f(offsetLocation,offset);
        gl.uniform1f(offsetRelieveLocation,this.relieve_valor);

        /** Iluminacion */   
		gl.uniform1f(kaLocation, this.ka);
		gl.uniform1f(kdLocation, this.kd);	
		gl.uniform1f(ksLocation, this.ks);	
        gl.uniform1f(nLocation,this.n);
        
        /** Matriz de modelado */
        mat4.identity(this.modelMatrix);
        mat4.multiply(this.modelMatrix,this.modelMatrix, this.padreMatrix );
        
        //mat4.rotate(this.modelMatrix,this.modelMatrix, this.angulo, this.eje);
		mat4.rotate(this.modelMatrix,this.modelMatrix, this.anguloX, [1,0,0]);
        mat4.rotate(this.modelMatrix,this.modelMatrix, this.anguloY, [0,1,0]);
        mat4.rotate(this.modelMatrix,this.modelMatrix, this.anguloZ, [0,0,1]);
        mat4.translate(this.modelMatrix, this.modelMatrix, this.posicion);
        mat4.scale(this.modelMatrix,this.modelMatrix, this.escala);
       

        gl.uniformMatrix4fv(modelMatrixLocation, false, this.modelMatrix);
      
        /** Matriz de normales */
		mat3.fromMat4(this.normalMatrix, this.modelMatrix);
		mat3.invert(this.normalMatrix, this.normalMatrix);
		mat3.transpose(this.normalMatrix, this.normalMatrix);
		gl.uniformMatrix3fv(normalMatrixLocation, false, this.normalMatrix);


		/**Dibujo */
		this.geometria.dibujar();

		/**Dibujo Hijos */
		for(var i = 0 ; i < this.childrenList.length ; i++){
			this.childrenList[i].addMatriz(this.modelMatrix);
			this.childrenList[i].dibujar();
        }	

    }

}