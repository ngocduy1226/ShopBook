<template>
    <div v-if="account" class="page">
        <div v-if="message.length > 0 " class="alert alert-primary" role="alert">
    {{ message }}
</div>
        <h4 class="text-center mt-5" style="font-size: 1.9rem; font-weight: 600;">ĐĂNG NHẬP</h4>
        <AccountForm :account="account" @submit:account="loginAccount" @delete:account="deleteAccount" />
        <p>{{ message }}</p>
    </div>
</template>
<script>
import AccountForm from "@/components/account/AccountForm.vue";
import AccountService from "@/services/Account.service";
export default {
    components: {
        AccountForm,
    },
    data() {
        return {
            account: {},
            message: "",
        };
    },
    methods: {
        async loginAccount(emitPayload) {
            const exitsAcc = await AccountService.checkExitsAcc(emitPayload.email);


            if (exitsAcc) {
                //console.log(emitPayload); 

                const account = await AccountService.login(emitPayload.email, emitPayload.username, emitPayload.password)
                //console.log(account);
                if (account) {
                    this.$cookies.set('user', account);
                    console.log(this.$cookies.get('user'));
                    
                    await this.$router.push({name: 'account'});
                    location.reload();
                }

            }


        },

        async deleteAccount() {
            if (confirm("Bạn muốn xóa tài khoản này?")) {
                try {
                    await AccountService.delete(this.account._id);
                    this.$router.push({ name: "account" });
                } catch (error) {
                    console.log(error);
                }
            }
        },
    },
};
</script>