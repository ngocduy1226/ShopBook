<!-- dinh nghi trang hien thi danh sach cac lien he -->

<template>
    <div class="page row">
        <div class="col-md-10">
            <InputSearch v-model="searchText" />
        </div>
        <div class="mt-3 col-md-12">
            <h4 class="p-4 text-center">
                <i class="fa-solid fa-list"></i>
                DANH MỤC
               
            </h4>
          
            <div class="m-3 row justify-content-around align-items-center">
                <button class="btn btn-sm btn-primary" @click="refreshList()">
                    <i class="fa-sharp fa-solid fa-rotate-right"></i> Làm mới
                </button>
                <button class="btn btn-sm btn-success" @click="goToAddBrand">
                    <i class="fas fa-plus"></i> Thêm mới
                </button>
                <button
                    class="btn btn-sm btn-danger"
                    @click="removeAllBrands"
                >
                    <i class="fas fa-trash"></i> Xóa tất cả
                </button>
            </div>

            <BrandList
                v-if="filteredBrandsCount > 0"
                :brands="filteredBrands"
                v-model:activeIndex="activeIndex"
            />
            <p v-else>Không có danh mục nào.</p>
            
        </div>
      
    </div>
</template>


    <script>
    
        //import BrandCard from "@/components/brand/BrandCard.vue";
        import InputSearch from "@/components/InputSearch.vue";
        import BrandList from "@/components/brand/BrandList.vue";
        import BrandService from "@/services/Brand.service";
        export default {
            components: {
             //   BrandCard,
                InputSearch,
                BrandList,
             },
            data() {
                return {
                    brands: [],
                    activeIndex: -1,
                    searchText: "",
                };
             },
            watch: {
                // Giám sát các thay đổi của biến searchText.
                // Bỏ chọn phần tử đang được chọn trong danh sách.
                searchText() {
                    this.activeIndex = -1;
                },
            },
            computed: {
                // Chuyển các đối tượng contact thành chuỗi để tiện cho tìm kiếm.
                brandStrings() {
                    return this.brands.map((brand) => {
                        const { nameBrand, descriptionBrand} = brand;
                        return [ nameBrand, descriptionBrand].join("");
                    });
                },
                // Trả về các contact có chứa thông tin cần tìm kiếm.
                filteredBrands() {
                    if (!this.searchText) return this.brands;
                        return this.brands.filter((_brand, index) =>
                        this.brandStrings[index].includes(this.searchText)
                    );
                },
                activeBrand() {
                    if (this.activeIndex < 0) return null;
                    return this.filteredBrands[this.activeIndex];
                },
                filteredBrandsCount() {
                    return this.filteredBrands.length;
                },
            },
            methods: {
                async retrieveBrands() {
                    try {
                        this.brands = await BrandService.getAll();
                    } catch (error) {
                        console.log(error);
                    }
                },
                refreshList() {
                    this.retrieveBrands();
                    this.activeIndex = -1;
                },
                async removeAllBrands() {
                    if (confirm("Bạn muốn xóa tất cả Liên hệ?")) {
                        try {
                            await BrandService.deleteAll();
                            this.refreshList();
                        } catch (error) {
                            console.log(error);
                        }
                    }
                },
                goToAddBrand() {
                    this.$router.push({ name: "brand.add" });
                },
            },
            mounted() {
                this.refreshList();
            },
        };
    </script>

    <style scoped>
    .page {
        text-align: left;
        
    } 
    </style>