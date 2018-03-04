<template>
  <div :class="$style.AccountMenu" :open="open">
    <button
      v-if="currentUser"
      :class="$style.AccountMenu__Toggle"
      type="button"
      @click="toggleOpen"
    >
      <img :class="$style.AccountMenu__Avatar" v-if="currentUser.photoURL" :src="currentUser.photoURL">
    </button>
    <div :class="$style.AccountMenu__Menu">
      <AppNavList>
        <AppNavListItem>Your projects</AppNavListItem>
        <AppNavListItem>Sign out</AppNavListItem>
      </AppNavList>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

@Component
export default class AccountMenu extends Vue {
  private open = false

  @Getter('getCurrentUser') private currentUser: firebase.UserInfo

  private toggleOpen() {
    this.open = !this.open
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
  }

  &__Menu {
    padding: 0.5rem 0;
    width: 12rem;
    right: -1 * $spacingBase;
    top: -999rem;
    transform: translateY(0);
    background: #fff;
    position: absolute;
    box-shadow: rgba(0, 0, 0, 0.1) 0 0.25rem 1rem; // , rgba(0, 0, 0, 0.1) 0 1px 1px;
    border-left: rgba(0, 0, 0, 0.1) solid 1px;
    border-bottom: rgba(0, 0, 0, 0.1) solid 1px;
    transition: transform $transitionBase;

    [open] & {
      top: 100%;
    }
  }
}
</style>
