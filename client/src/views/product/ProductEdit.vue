    <template>
        <div v-if="product" class="page">
            <div v-if="message.length > 0 " class="alert alert-primary" role="alert">
    {{ message }}
</div>
            <h4 class="text-center mt-5" style="font-size: 1.9rem; font-weight: 600;">HIỆU CHỈNH SẢN PHẨM</h4>
                <ProductForm
                    :product="product"
                    @submit:product="updateProduct"
                    @delete:product="deleteProduct"
            />
            
        </div>
    </template>

    <script>
        import ProductForm from "@/components/product/ProductForm.vue";
        import ProductService from "@/services/product.service";
        export default {
            components: {
             ProductForm,
            },
            props: {
                id: { type: String, required: true },
            },
            data() {
                return {
                    product: null,
                    message: "",
                };
            },
            methods: {
                async getProduct(id) {
                    try {
                        this.product = await ProductService.get(id);
                    } catch (error) {
                        console.log(error);
                    // Chuyển sang trang NotFound đồng thời giữ cho URL không đổi
                    this.$router.push({
                        name: "notfound",
                        params: {
                        pathMatch: this.$route.path.split("/").slice(1)
                        },
                        query: this.$route.query,
                        hash: this.$route.hash,
                    });
                    }
                },
                async updateProduct(data) {
                    try {
                        await ProductService.update(this.product._id, data);
                        this.message = "Sản phẩm được cập nhật thành công.";
                    } catch (error) {
                        console.log(error);
                    }
                },
                async deleteProduct() {
                    if (confirm("Bạn muốn xóa sách này?")) {
                        try {
                            await ProductService.delete(this.product._id);
                            this.$router.push({ name: "product" });
                        } catch (error) {
                            console.log(error);
                        }
                    }
                },
            },
            created() {
                this.getProduct(this.id);
                this.message = "";
            },
        };
    </script>