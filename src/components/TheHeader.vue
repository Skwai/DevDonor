<template>
  <header :class="$style.TheHeader">
    <div :class="$style.TheHeader__Container">
      <router-link
        to="/"
        :class="$style.TheHeader__Logo"
      >
        <h1><img :class="$style.TheHeader__LogoImage" src="/logo.svg" alt="DevDonor"></h1>
      </router-link>
      <div :class="$style.TheHeader__Nav">
        <button
          aria-hidden="true"
          :class="$style.TheHeader__NavToggle"
          @click="toggleMenu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><g fill="currentColor"><path d="M23 13H1c-.6 0-1-.4-1-1s.4-1 1-1h22c.6 0 1 .4 1 1s-.4 1-1 1z"/><path d="M23 6H1c-.6 0-1-.4-1-1s.4-1 1-1h22c.6 0 1 .4 1 1s-.4 1-1 1zm0 14H1c-.6 0-1-.4-1-1s.4-1 1-1h22c.6 0 1 .4 1 1s-.4 1-1 1z"/></g></svg>
        </button>
        <nav :class="$style.TheHeader__NavMenu" :open="showMenu" @click="onMenuClick">
          <router-link
            to="/"
            :class="$style.TheHeader__NavItem"
            :exact-active-class="$style.TheHeader__NavItemActive"
          >Projects</router-link>
          <router-link
            :to="{ name: 'CreateProject' }"
            :class="$style.TheHeader__NavItem"
            :active-class="$style.TheHeader__NavItemActive"
          >Create a project</router-link>
          <router-link
            :to="{ name: 'About' }"
            :class="$style.TheHeader__NavItem"
            :active-class="$style.TheHeader__NavItemActive"
          >How it works</router-link>
        </nav>
      </div>
      <AccountMenu />
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AccountMenu from './AccountMenu.vue'

@Component({
  components: {
    AccountMenu
  }
})
export default class TheHeader extends Vue {
  private showMenu = false

  private onDocumentClick({ target }: MouseEvent) {
    if (!this.$el.contains(target as HTMLElement)) {
      this.closeMenu()
    }
  }

  private onMenuClick(ev: MouseEvent) {
    ev.stopPropagation()
    this.closeMenu()
  }

  private toggleMenu() {
    this.showMenu = !this.showMenu
  }

  private closeMenu() {
    this.showMenu = false
  }

  private created() {
    this.onDocumentClick = this.onDocumentClick.bind(this)
  }

  private mounted() {
    document.addEventListener('click', this.onDocumentClick)
  }
}
</script>

<style lang="stylus" module>
@require '../styles/config.styl';
@require '../styles/text.styl';
@require '../styles/container';

.TheHeader {
  transition: transitionBase;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0.25rem 1rem; // , rgba(0, 0, 0, 0.1) 0 1px 1px;
  z-index: 2;
  background: #fff;
  top: 0;
  left: 0;
  width: 100vw;

  &__Container {
    container();
    display: flex;
    align-items: stretch;
    padding: 0 $spacingBase;
  }

  h1 {
    margin: 0;
  }

  &__Logo {
    transition: transitionBase;
    color: $colorPrimary;
    padding: 1.5rem 0;
    transition: $transitionBase;
    will-change: opacity;
    margin-right: 1rem;
    position: relative;

    &::after {
      content: 'Beta';
      position: absolute;
      right: 0;
      top: 0.5rem;
      background: $colorPrimary;
      color: #fff;
      textCaps();
      font-size: 10px;
      line-height: 1;
      padding: 3px 5px;
      border-radius: 2px;
      font-weight: 600;
    }

    &Image {
      height: 1.25rem;
    }

    &:hover, &:focus {
      opacity: 0.8;
    }
  }

  &__Nav {
    position: relative;
    display: flex;
    margin-left: auto;

    @media (max-width: 767px) {
      &Menu {
        padding: 0.5rem 0;
        width: 12rem;
        right: -1rem;
        top: -999rem;
        transform: translateY(0);
        background: #fff;
        position: absolute;
        box-shadow: rgba(0, 0, 0, 0.1) 0 2px 10px, rgba($colorGray, 0.8) 0 1px 1px;
        transition: transform $transitionBase;
        border-radius: 3px;

        &[open] {
          top: 100%;
          transform: translate(0, 1rem);
        }

        &::before {
          content: '';
          right: 1rem;
          bottom: 100%;
          border-bottom: #fff solid 8px;
          border-left: transparent solid 8px;
          border-right: transparent solid 8px;
          position: absolute;
        }
      }

      &Item {
        display: block;
        white-space: nowrap;
        padding: 1rem;
        font-weight: 600;

        &:hover, &:focus {
          color: $colorPrimary;
        }
      }
    }

    &Toggle {
      appearance: none;
      border: 0;
      background: transparent;
      margin-left: auto;
      padding: 0.5rem;
      align-self: center;
      display: flex;
      align-items: center;

      &:hover {
        color: $colorPrimary;
      }

      @media (min-width: 768px) {
        display: none;
      }
    }

    @media (min-width: 768px) {
      margin-left: auto;

      &Menu {
        display: flex;
      }

      &Item {
        padding: 0 0.5rem;
        margin: 0 0.5rem;
        white-space: nowrap;
        transition: $transitionBase;
        position: relative;
        display: flex;
        align-items: center;
        font-weight: 600;

        &::before {
          content: '';
          left: 0;
          top: 0;
          width: 100%;
          height: 3px;
          background: $colorPrimary;
          position: absolute;
          transform: scale(0, 1);
          transform-origin: left center;
          transition: $transitionBase;
        }

        &:hover, &:focus {
          color: $colorPrimary;
        }

        &Active {
          color: $colorPrimary;

          &::before {
            transform: scale(1, 1);
          }
        }
      }
    }
  }
}
</style>
