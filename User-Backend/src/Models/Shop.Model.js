import { mongoose, Schema } from "mongoose";

const shopSchema = new Schema(
  {
    title:{
        type:String,
        required:[true,'Title is required'],
        trim:true,
    },
    description:{
        type:String,
        required:[true,'Description is required'],
       
        trim:true,
    },
    category:{
        type:String,
        required:[true,'Category is required'],
        trim:true,
    },
    
    Products: [
      {
        title: String,
        description: String,
        category:String,
        thumbnails:[
            {
                public_id: {
                    type: String,
                    required: true
                  },
                  secure_url: {
                    type: String,
                    required: true
                  }
            }
        ],
        quantity: {
          type: Number,
          required: true
        },
        offers: {
          type: String
        },

        rating: [
          {
            userId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User",
              
            },
            point: {
              type: Number
            }
          }
        ],
        comments: [
          {
            userId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User",
              required: true
            },
            text: {
              type: String,
              required: true
            },
            replies: [
              {
                userId: {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: "User"
                },
                text: {
                  type: String
                }
              }
            ]
          }
        ]
      }
    ],

    
    createdBy:{
        type: String,
        required:true
    },
    thumbnail:{
        public_id:{
            type:String,
            required:true,
        },
        secure_url:{
            type:String,
            required:true,
        }
    },

    Orders: [
      {
        title: String,
        quantity: Number,
        orderedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true
        },
        address: String,
        mobileNumber:Number
      },
    ]
  },
  {
    timestamps: true
  }
);

export const Shop = mongoose.model("Shop", shopSchema);
