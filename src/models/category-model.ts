import mongoose, { Schema } from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    isEditable: {
        type: Boolean,
        default: true,
        required: false
    },
    color: {
        id: String,
        name: String,
        code: String
    },
    icon: {
        id: String,
        name: String,
        symbol: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
},
    {
        timestamps: true
    }
)

const Category = mongoose.model('category', categorySchema);

export default Category;