const { Schema, model } = require("mongoose");

const EventoSchema = Schema({
    
    title: {
        type: String,
        required: true
    },
    notes: {
        type: String
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user: {
        //De esta manera le indicamos a mongoose que es una referencia a otra tabla
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
});

//Menejo del json como lo quiero ver en pantalla al ser json
EventoSchema.method('toJSON', function(){
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object
})

module.exports = model('Evento', EventoSchema);