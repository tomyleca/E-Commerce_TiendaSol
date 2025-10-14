import {CategoriaModel} from '../../schemas/categoriaSchema.js'
import mongoose from 'mongoose';

export class CategoriasRepository {
	    constructor() {
        this.model = CategoriaModel;
    }

    
    async findAll() {
        return await this.model.find();
    }

    async findById(id) {
        return await this.model.findById(id);
    }

    async findByNombre(nombre) {
        return await this.model.findOne({ nombre });
    }

    async create(categoria) {
        const nuevaCategoria = new this.model(categoria);
        return await nuevaCategoria.save();
    }

    async update(id, categoriaActualizada) {
        return await this.model.findByIdAndUpdate(id, categoriaActualizada, {
            new: true,            
            runValidators: true   
        });
    }

    async delete(id) {
        return await this.model.findByIdAndDelete(id);
    }

    async count() {
        return this.model.countDocuments();
    }

	 
}