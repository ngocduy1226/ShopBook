<!-- dinh nghi trang hien thi danh sach cac lien he -->

<template>
    <div class="page row">
        <div class="col-md-10">
            <InputSearch v-model="searchText" />
        </div>
        <div class="mt-3 col-md-12">
            <h4 class="p-4 text-center">
                <i class="fa-solid fa-book"></i>
                SẢN PHẨM

            </h4>

            <div class="m-3 row justify-content-around align-items-center">
                <button class="btn btn-sm btn-primary" @click="refreshList()">
                    <i class="fa-sharp fa-solid fa-rotate-right"></i> Làm mới
                </button>
                <button class="btn btn-sm btn-success" @click="goToAddProduct">
                    <i class="fas fa-plus"></i> Thêm mới
                </button>
                <button
                    class="btn btn-sm btn-danger"
                    @click="removeAllProducts"
                >
                    <i class="fas fa-trash"></i> Xóa tất cả
                </button>
            </div>

            <ProductList
                v-if="filteredProductsCount > 0"
                :products="filteredProducts"
                v-model:activeIndex="activeIndex"
            />
            <p v-else>Không có sản phẩm nào.</p>
          
        </div>
    </div>
</template>


    <script>
    
       // import ProductCard from "@/components/product/ProductCard.vue";
        import InputSearch from "@/components/InputSearch.vue";
        import ProductList from "@/components/product/ProductList.vue";
        import ProductService from "@/services/Product.service";
        export default {
            components: {
                // ProductCard,
                InputSearch,
                ProductList,
             },
            data() {
                return {
                    products: [],
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
                productStrings() {
                    return this.products.map((product) => {
                        const { nameProduct, author, publishing_company, supplier , id_brand, imageProduct, description} = product;
                        return [nameProduct, author, publishing_company, supplier , id_brand, imageProduct, description].join("");
                    });
                },
                // Trả về các contact có chứa thông tin cần tìm kiếm.
                filteredProducts() {
                    if (!this.searchText) return this.products;
                        return this.products.filter((_product, index) =>
                        this.productStrings[index].includes(this.searchText)
                    );
                },
                activeProduct() {
                    if (this.activeIndex < 0) return null;
                    return this.filteredProducts[this.activeIndex];
                },
                filteredProductsCount() {
                    return this.filteredProducts.length;
                },
            },
            methods: {
                async retrieveProducts() {
                    try {
                        this.products = await ProductService.getAll();
                    } catch (error) {
                        console.log(error);
                    }
                },
                refreshList() {
                    this.retrieveProducts();
                    this.activeIndex = -1;
                },
                async removeAllProducts() {
                    if (confirm("Bạn muốn xóa tất cả sản phẩm?")) {
                        try {
                            await ProductService.deleteAll();
                            this.refreshList();
                        } catch (error) {
                            console.log(error);
                        }
                    }
                },
                goToAddProduct() {
                     this.$router.push({ name: "product.add" });
                },
            },
            mounted() {
                this.refreshList();
            },
        };
    </script>

    <style scoped>
    
    </style>