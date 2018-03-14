<template>
  <div :class="$style.AccountMenu" :open="open" v-if="currentUser">
    <button
      v-if="currentUser"
      :class="$style.AccountMenu__Toggle"
      type="button"
      @click="toggleOpen"
    >
      <img :class="$style.AccountMenu__Avatar" v-if="currentUser.photoURL" :src="currentUser.photoURL">
    </button>
    <AppLoading v-else-if="pendingAUth" size="small" />
    <div :class="$style.AccountMenu__Menu">
      <AppNavList>
        <AppNavListItem @click="logout">Sign out</AppNavListItem>
      </AppNavList>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'

@Component
export default class AccountMenu extends Vue {
  private open = false

  @Action('logout') private actionLogout: () => void

  @Getter('getCurrentUser') private currentUser: firebase.UserInfo
  @Getter('getPendingAuth') private pendingAUth: firebase.UserInfo

  private created() {
    this.onDocumentClick = this.onDocumentClick.bind(this)
    document.addEventListener('click', this.onDocumentClick)
  }

  private destroyed() {
    document.removeEventListener('click', this.onDocumentClick)
  }

  private onDocumentClick(ev: MouseEvent) {
    if (!this.$el.contains(ev.target as HTMLElement)) {
      this.open = false
    }
  }

  private toggleOpen() {
    this.open = !this.open
  }

  private logout() {
    this.actionLogout()
    this.open = false
  }
}
</script>

<style lang="stylus" module>
@require '../styles/config';

.AccountMenu {
  display: flex;
  align-items: stretch;
  position: relative;
  margin-left: 1rem;

  &__Toggle {
    display: flex;
    align-items: center;
    border: 0;
    background: transparent;
    cursor: pointer;
    padding: 0;
  }

  &__Avatar {
    border-radius: 50%;
    width: 2rem;
    height: 2rem;
    transition: $transitionBase;

    &:hover {
      box-shadow: $colorPrimary 0 0 0 2px;
    }
  }

  &__Menu {
    padding: 0.5rem 0;
    width: 12rem;
    right: -0.5rem;
    top: -999rem;
    transform: translateY(0);
    background: #fff;
    position: absolute;
    box-shadow: rgba(0, 0, 0, 0.1) 0 2px 10px, rgba($colorGray, 0.8) 0 1px 1px;
    transition: transform $transitionBase;
    border-radius: 3px;

    &::before {
      content: '';
      right: 1rem;
      bottom: 100%;
      border-bottom: #fff solid 8px;
      border-left: transparent solid 8px;
      border-right: transparent solid 8px;
      position: absolute;
    }

    [open] & {
      top: 100%;
      transform: translate(0, 1rem);
    }
  }
}
</style>
