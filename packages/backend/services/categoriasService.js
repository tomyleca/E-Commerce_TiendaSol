import { Categoria } from "../models/entities/catagoria.js"

export class CategoriaService {
	constructor(categoriasRepository){
        this.categoriasRepository=categoriasRepository
    }
	
    async crearCategoria(categoria){

        const catego= new Categoria(categoria.nombre);
        return await this.categoriasRepository.create(catego)
    }
    
    async buscarTodos(){
        return await this.categoriasRepository.findAll();
    }


}