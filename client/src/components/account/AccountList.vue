
<template>
    <div class="container">
        <table class="table table-hover">
            <thead class="thead-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Username</th>
                    <th scope="col">Email</th>
                    <th scope="col">Chức năng</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(account, index) in accounts"
                      
                   >
                    
                    <th scope="row"> {{ index + 1 }}</th>
                    <td> {{ account.username }}</td>
                    <td> {{ account.email }}</td>
                    <td>
                        <router-link :to="{
                            name: 'account.edit',
                            params: { id: account._id },
                        }">
                            <button class=" btn-primary btn">
                                <i class="fas fa-edit"></i> Hiệu chỉnh</button>
                        </router-link>

                        <button type="button" class="ml-2 btn btn-danger" @click="deleteAccount(account._id)">
                            Xóa
                        </button>


                    </td>
                </tr>


            </tbody>
        </table>
    </div>
</template>


<script>
import AccountService from "@/services/account.service";

export default {


    props: {
        searchText: "",
        accounts: { type: Array, default: [] },
        activeIndex: { type: Number, default: -1 },
    },
    emits: ["update:activeIndex", "delete:account"],

    computed: {
        // Chuyển các đối tượng contact thành chuỗi để tiện cho tìm kiếm.
        accountStrings() {
            return this.accounts.map((account) => {
                const { username, email } = account;
                return [username, email].join("");
            });
        },
        // Trả về các contact có chứa thông tin cần tìm kiếm.
        filteredAccounts() {
            if (!this.searchText) return this.accounts;
            return this.accounts.filter((_account, index) =>
                this.accountStrings[index].includes(this.searchText)
            );
        },
        activeAccount() {
            if (this.activeIndex < 0) return null;
            return this.filteredAccounts[this.activeIndex];
        },
        filteredAccountsCount() {
            return this.filteredAccounts.length;
        },
    },

    methods: {
        updateActiveIndex(index) {
            this.$emit("update:activeIndex", index);
        },

        async deleteAccount(id) {
                    if (confirm("Bạn muốn xóa người dùng này?")) {
                        try {
                            await AccountService.delete(id);
                            location.reload();
                            await this.$router.push({ name: "account" });
                        } catch (error) {
                            console.log(error);
                        }
                    }

                },


    }




};
</script>