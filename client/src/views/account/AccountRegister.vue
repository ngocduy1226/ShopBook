<template>
  <div v-if="account" class="page">
    <div v-if="message.length > 0" class="alert alert-primary" role="alert">
      {{ message }}
    </div>
    <h4 class="text-center mt-5" style="font-size: 1.9rem; font-weight: 600;">ĐĂNG KÝ</h4>
    <AccountForm
      :account="account"
      @submit:account="createAccount"
      @delete:account="deleteAccount"
    />
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
    async createAccount(data) {
      try {
        await AccountService.create(data);
        this.message = "Tài khoản đăng ký thành công.";
      } catch (error) {
        console.log(error);
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
