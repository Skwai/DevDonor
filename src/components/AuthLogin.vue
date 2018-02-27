<template>
  <div :class="$style.AuthLogin">
    <AppLoading v-if="pendingAuth" />
    <div v-else :class="$style.AuthLogin__Buttons">
      <AppBtn @click="login('google')" color="primary">
        <svg slot="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path data-color="color-2" d="M24 11h-2V9h-2v2h-2v2h2v2h2v-2h2v-2z"/><path d="M16.526 11.004L9 11v3h4.301c-.232 1.27-1.504 3.586-4.801 3.586-2.902 0-5.27-2.404-5.27-5.367S5.598 6.852 8.5 6.852c1.651 0 2.756.704 3.388 1.311l2.307-2.222c-1.481-1.384-3.4-2.222-5.695-2.222-4.7 0-8.5 3.8-8.5 8.5s3.8 8.5 8.5 8.5c5.848 0 8.86-4.854 8.026-9.715z"/></svg>
        Sign in with Google
      </AppBtn>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'

@Component
export default class AuthLogin extends Vue {
  @Action('login') private actionLogin: (provider: string) => Promise<void>
  @Getter private pendingAuth: boolean
  @Getter private getCurrentUser: {} | null

  private async login(provider: string) {
    try {
      await this.actionLogin(provider)
      this.$emit('authenticated', this.getCurrentUser)
    } catch (err) {}
  }
}
</script>

<style lang="stylus" module>
@require '../styles/config.styl';

.AuthLogin {
  &__Buttons {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
}
</style>
