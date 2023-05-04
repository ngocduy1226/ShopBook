
<template>
    
    
    <div v-if="product" class="page">
        <div v-if="message.length > 0 " class="alert alert-primary" role="alert">
    {{ message }}
</div>
        <h4 class="text-center mt-5" style="font-size: 1.9rem; font-weight: 600;" >THÊM SẢN PHẨM</h4>
            <ProductForm
                :product="product"
                @submit:product="createProduct"
                @delete:product="deleteProduct"
        />
      
    </div>
</template>
<script>
    import ProductForm from "@/components/product/ProductForm.vue";
    import ProductService from "@/services/Product.service";
    export default {
        components: {
         ProductForm,
        },
        data() {
            return {
                product: {},
                message: "",
            };
        },
        methods: {

            async createProduct(data) {
                try {
                    await ProductService.create(data);
                    this.message = "Sản phẩm được thêm thành công.";
                } catch (error) {
                    console.log(error);
                }
            },
            async deleteProduct() {
                if (confirm("Bạn muốn xóa Sản phẩm này?")) {
                    try {
                        await ProductService.delete(this.product._id);
                        this.$router.push({ name: "product" });
                    } catch (error) {
                        console.log(error);
                    }
                }
            },
        },
    };
</script>