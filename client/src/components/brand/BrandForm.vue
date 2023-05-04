<template>
    <div class="container">
        <div class="card card-container">
            <img
                src="https://thuthuatnhanh.com/wp-content/uploads/2021/11/Hinh-anh-cuon-sach-mo-ra-doc-dao-an-tuong-day-tam-trang.jpg" />
            <p id="profile-name" class="profile-name-card"></p>
            <Form @submit="submitBrand" :validation-schema="brandFormSchema" style="max-width: 500px;" class="form-signin">
                <div class="form-group">
                    <label for="nameBrand">Tên danh mục</label>
                    <Field name="nameBrand" type="text" class="form-control" v-model="brandLocal.nameBrand" />
                    <ErrorMessage name="nameBrand" class="error-feedback" />
                </div>
                <div class="form-group">
                    <label for="descriptionBrand">Mô tả</label>
                    <Field name="descriptionBrand" type="descriptionBrand" class="form-control" cols="30" rows="7"
                        v-model="brandLocal.descriptionBrand" />
                    <ErrorMessage name="descriptionBrand" class="error-feedback" />
                </div>

                <div class="form-group text-center">
                    <button class="btn btn-primary">Lưu</button>
                    <button v-if="brandLocal._id" type="button" class="ml-2 btn btn-danger" @click="deleteBrand">
                        Xóa
                    </button>
                </div>
            </Form>
        </div>
    </div>
</template>


<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["submit:brand", "delete:brand"],
    props: {
        brand: { type: Object, required: true }
    },
    data() {
        const brandFormSchema = yup.object().shape({
            nameBrand: yup
                .string()
                .required("Tên danh mục phải có giá trị.")
                .min(5, "Tên danh mục phải ít nhất 5 ký tự.")
                .max(100, "Tên danh mục có nhiều nhất 100 ký tự."),
            descriptionBrand: yup
                .string()
                .required("Mô tả phải có giá trị.")
                .min(5, "Mô phải ít nhất 10 ký tự.")
               

        });
        return {
            // Chúng ta sẽ không muốn hiệu chỉnh props, nên tạo biến cục bộ
            // contactLocal để liên kết với các input trên form
            brandLocal: this.brand,
            brandFormSchema,
        };
    },
    methods: {
        submitBrand() {
            this.$emit("submit:brand", this.brandLocal);
        },
        deleteBrand() {
            this.$emit("delete:brand", this.brandLocal.id);
        },
    },
};
</script>
<style scoped>
@import "@/assets/form.css";
</style>