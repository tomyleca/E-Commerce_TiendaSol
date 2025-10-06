import mongoose from "mongoose"
import {DireccionEntrega } from "../models/entities/direccionEntrega"

const direccionSchema= new mongoose.Schema({

    calle:{
        type: String,
        required: true

    },
    altura:{
        type: String,
        required: true

    },
    piso :{
        type:String,
        required:true
    },
    departamento:{ 
        type: String,
        required: true
    },
    cosigoPostal:{ 
        type: String,
        requiered : true
    },
    ciudad: { 
        type: String,
        requiered : true
    },
    provincia :{ 
        type: String,
        requiered : true
    },
    pais :{ 
        type: String,
        requiered : true
    },
    lat:{ 
        type: String,
        requiered : true
    },
    lon :{ 
        type: String,
        requiered : true
    }

})

direccionSchema.loadClass(DireccionEntrega);
export const direccionModel = mongoose.model('DireccionEntrega', direccionSchema);