import create from 'zustand';
import axios  from "axios";
import {getEmail, setEmail, unauthorized} from "../utility/utility.js";
import Cookies from "js-cookie";
const ReviewStore=create((set)=>({

    isReviewSubmit:false,
    ReviewFormData:{des:"",rating:"5",productID:""},
    ReviewFormOnChange:(name,value)=>{
        set((state)=>({
            ReviewFormData:{
                ...state.ReviewFormData,
                [name]:value
            }
        }))
    },

    ReviewSaveRequest:async(PostBody)=>{
        try {
            set({isReviewSubmit:true})
            let res=await axios.post(`/api/v1/CreateReview`,PostBody);
            return res.data['status'] === "success";
        }catch (e) {
            unauthorized(e.response.status)
        }finally {
            set({isReviewSubmit:false})
        }
    },


}))

export default ReviewStore;