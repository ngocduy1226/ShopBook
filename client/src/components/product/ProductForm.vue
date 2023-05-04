<template>

    <div class="container">
        <div class="card card-container" >
           <Form @submit="submitProduct" :validation-schema="productFormSchema"  style="max-width: 500px;"
        class="form-signin">
        <div class="form-group">
            <label for="nameProduct">Tên sản phẩm</label>
            <Field name="nameProduct" type="text" class="form-control" v-model="productLocal.nameProduct" />
            <ErrorMessage name="nameProduct" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="description">Mô tả</label>
            <Field name="description" type="description" class="form-control" v-model="productLocal.description" />
            <ErrorMessage name="description" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="author">Tác giả</label>
            <Field name="author" type="text" class="form-control" v-model="productLocal.author" />
            <ErrorMessage name="author" class="error-feedback" />
        </div>

        <div class="form-group">
            <label for="publishing_company">Nhà xuất bản</label>
            <Field name="publishing_company" type="text" class="form-control" v-model="productLocal.publishing_company" />
            <ErrorMessage name="publishing_company" class="error-feedback" />
        </div>
        
        <div class="form-group">
            <label for="supplier">Nhà cung cấp</label>
            <Field name="supplier" type="text" class="form-control" v-model="productLocal.supplier" />
            <ErrorMessage name="supplier" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="imageProduct">Hình</label>
            <Field name="imageProduct" type="text" class="form-control" v-model="productLocal.imageProduct" />
            <ErrorMessage name="imageProduct" class="error-feedback" />
        </div>

        <div style="display: none ;" class="form-group">
            <label for="id_brand">Danh mục</label>
            <Field name="id_brand" type="text" class="form-control" v-model="productLocal.id_brand" />
            <ErrorMessage name="id_brand" class="error-feedback" />
        </div>

        <div class="form-group">
            <label for="id_brand">Danh mục</label>
            <select name="id_brand" v-model="productLocal.id_brand"  class="form-control">
               <option v-for="brand in brands"  :value="brand.nameBrand">{{  brand.nameBrand }}</option>
            </select>
           <!-- <ErrorMessage name="id_brand" class="error-feedback" /> -->
        </div>
    
        <div class="form-group text-center">
            <button class="btn btn-primary">Lưu</button>
            <button v-if="productLocal._id" type="button" class="ml-2 btn btn-danger" @click="deleteProduct">
                Xóa
            </button>
        </div>
    </Form> 
        </div>

    </div>

   
</template>


<script>
import * as yup from "yup";
import BrandService from "@/services/brand.service";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["submit:product", "delete:product"],
    props: {
        product: { type: Object, required: true }
    },
    data() {
        const productFormSchema = yup.object().shape({
            nameProduct: yup
                .string()
                .required("Tên sản phẩm phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự."),
                
            supplier: yup
                .string()
                .required("Nhà cung cấp phải có giá trị.")
                .min(2, "Nhà cung cấp phải ít nhất 2 ký tự."),
             
            author: yup
                .string()
                .required("Nhà cung cấp phải có giá trị.")
                .min(2, "Nhà cung cấp phải ít nhất 2 ký tự."),
               
            publishing_company: yup
                .string()
                .required("Nhà cung cấp phải có giá trị.")
                .min(2, "Nhà cung cấp phải ít nhất 2 ký tự."),
                
            description: yup
                .string()
                .min(10, "Địa chỉ tối đa 10 ký tự."),
            imageProduct: yup
                .string()
                .required('Hình phải có giá trị')
                .min(2, "Giá phải ít nhất 2 ký tự."),
            id_brand: yup
                .string()
                .required('Danh mục phải có giá trị')
        })
        return {
            // Chúng ta sẽ không muốn hiệu chỉnh props, nên tạo biến cục bộ
            // contactLocal để liên kết với các input trên form
            productLocal: this.product,
            productFormSchema,
        };
    },
    methods: {
        submitProduct() {
            this.$emit("submit:product", this.productLocal);
        },
        deleteProduct() {
            this.$emit("delete:product", this.productLocal.id);
        },
        async getBrand() {
            this.brands = await BrandService.getAll()
         //   console.log(this.brands);
        }
    },

    mounted() {
        this.getBrand()
    }
};
</script>
<style scoped>
@import "@/assets/form.css";
</style>