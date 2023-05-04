    <template>
        <div v-if="brand" class="page">
            <div v-if="message.length > 0 " class="alert alert-primary" role="alert">
    {{ message }}
</div>
            <h4 class="text-center mt-5" style="font-size: 1.9rem; font-weight: 600;" >HIỆU CHỈNH DANH MỤC</h4>
                <BrandForm
                    :brand="brand"
                    @submit:brand="updateBrand"
                    @delete:brand="deleteBrand"
            />
    
        </div>
    </template>
    <script>
        import BrandForm from "@/components/brand/BrandForm.vue";
        import BrandService from "@/services/brand.service";
        export default {
            components: {
             BrandForm,
            },
            props: {
                id: { type: String, required: true },
            },
            data() {
                return {
                    brand: null,
                    message: "",
                };
            },
            methods: {
                async getBrand(id) {
                    try {
                        this.brand = await BrandService.get(id);
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
                async updateBrand(data) {
                    try {
                        await BrandService.update(this.brand._id, data);
                        this.message = "Danh mục được cập nhật thành công.";
                    } catch (error) {
                        console.log(error);
                    }
                },
                async deleteBrand() {
                    if (confirm("Bạn muốn xóa Danh mục này?")) {
                        try {
                            await BrandService.delete(this.brand._id);
                            this.$router.push({ name: "brand" });
                        } catch (error) {
                            console.log(error);
                        }
                    }
                },
            },
            created() {
                this.getBrand(this.id);
                this.message = "";
            },
        };
    </script>