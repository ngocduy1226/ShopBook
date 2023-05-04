    <template>

<div v-if="message.length > 0 " class="alert alert-primary" role="alert">
    {{ message }}
</div>
        <div v-if="account" class="page">
            <h4 class="text-center mt-5" style="font-size: 1.9rem; font-weight: 600;">HIỆU CHỈNH NGƯỜI DÙNG</h4>
                <AccountForm
                    :account="account"
                    @submit:account="updateAccount"
                    @delete:account="deleteAccount"
            />
             
            <p>{{ message }}</p>
        </div>
    </template>
    <script>
        import AccountForm from "@/components/account/AccountForm.vue";
        import AccountService from "@/services/account.service";
        export default {
            components: {
             AccountForm,
            },
            props: {
                id: { type: String, required: true },
            },
            data() {
                return {
                    account: null,
                    message: "",
                };
            },
            methods: {
                async getAccount(id) {
                    try {
                        this.account = await AccountService.get(id);
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
                async updateAccount(data) {
                    try {
                        await AccountService.update(this.account._id, data);
                        this.message = "Thông tin được cập nhật thành công.";

                    } catch (error) {
                        console.log(error);
                    }
                },
                async deleteAccount() {
                    if (confirm("Bạn muốn xóa người dùng này?")) {
                        try {
                            await AccountService.delete(this.account._id);
                            this.$router.push({ name: "account" });
                        } catch (error) {
                            console.log(error);
                        }
                    }
                },
            },
            created() {
                this.getAccount(this.id);
                this.message = "";
            },
        };
    </script>


