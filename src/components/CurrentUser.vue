<template>
  <AppCard>
    <AppMediaObject align="center">
      <img slot="object" :src="currentUser.photoURL" width="64" height="64">
      <div slot="body">
        <div><strong>{{currentUser.displayName}}</strong></div>
        <div>{{currentUser.email}}</div>
        <AppLink @click="logout">Sign out of Google+</AppLink>
      </div>
    </AppMediaObject>
  </AppCard>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Action } from 'vuex-class'

@Component
export default class CurrentUser extends Vue {
  @Prop() private currentUser: firebase.UserInfo

  @Action('logout') private actionLogout: () => void

  private logout() {
    this.actionLogout()
  }
}
</script>

<style lang="stylus">
</style>
