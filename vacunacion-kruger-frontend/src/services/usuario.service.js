import apiBaseConsume from "./apiBaseConsume.service";

export default class usuarioService extends apiBaseConsume{

    constructor(){
        super();
        this.endPoint = "usuario";
    }

    getUsuarioById(id){
        let usuario = super.getMethod(this.endPoint+"/"+id);
        return usuario;
    }
    getAllUsuarios(){
        let usuarios = super.getMethod(this.endPoint);
        return usuarios;
    }

    login(userCredentials){
        let response = super.postMethod("login",userCredentials)
        return response
    }

}

