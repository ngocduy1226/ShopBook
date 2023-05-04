<template>
     <div v-if="message.length > 0 " class="alert alert-primary" role="alert">
    {{ message }}
</div>



    <div v-if="brand" class="page">
        <h4 class="text-center mt-5" style="font-size: 1.9rem; font-weight: 600;">THÊM DANH MỤC</h4>
            <BrandForm
                :brand="brand"
                @submit:brand="createBrand"
                @delete:brand="deleteBrand"
        />
    
    </div>


</template>
<script>
    import BrandForm from "@/components/brand/BrandForm.vue";
    import BrandService from "@/services/Brand.service";
    export default {
        components: {
         BrandForm,
        },
        data() {
            return {
                brand: {},
                message: "",
            };
        },
        methods: {

            async createBrand(data) {
                try {
                    await BrandService.create(data);
                    this.message = "Danh mục được thêm thành công.";
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
    };
</script>