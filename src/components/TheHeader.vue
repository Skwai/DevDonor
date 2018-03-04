<template>
  <header :class="$style.TheHeader">
    <router-link
      to="/"
      :class="$style.TheHeader__Logo"
    >
      <h1><img :class="$style.TheHeader__LogoImage" src="/logo.svg" alt="DevDonor"></h1>
    </router-link>
    <nav :class="$style.TheHeader__Nav" data-foo="true">
      <router-link
        to="/"
        :class="$style.TheHeader__NavItem"
        :exact-active-class="$style.TheHeader__NavItemActive"
      >Projects</router-link>
      <router-link
        :to="{ name: 'CreateProject' }"
        :class="$style.TheHeader__NavItem"
        :active-class="$style.TheHeader__NavItemActive"
      >Create a Project</router-link>
      <router-link
        :to="{ name: 'About' }"
        :class="$style.TheHeader__NavItem"
        :active-class="$style.TheHeader__NavItemActive"
      >About</router-link>
    </nav>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class TheHeader extends Vue {}
</script>

<style lang="stylus" module>
@require '../styles/config.styl';
@require '../styles/text.styl';

.TheHeader {
  transition: transitionBase;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0.25rem 1rem; // , rgba($colorGray, 1) 0 1px 1px
  display: flex;
  align-items: stretch;
  z-index: 2;
  background: #fff;
  padding: 0 $spacingBase;
  top: 0;
  left: 0;
  width: 100vw;

  h1 {
    margin: 0;
  }

  &__Logo {
    transition: transitionBase;
    color: $colorPrimary;
    padding: 1rem 0;
    transition: $transitionBase;
    will-change: transform;
    margin-right: 1rem;
    position: relative;

    &::after {
      content: 'Beta';
      position: absolute;
      right: 0;
      top: 0;
      background: $colorDarkBlue;
      color: #fff;
      textCaps();
      font-size: 10px;
      line-height: 1;
      padding: 3px 5px;
    }

    &Image {
      height: 1.25rem;
    }

    &:hover, &:focus {
      box-shadow: inset currentColor 0 -3px 0;
    }
  }

  &__Nav {
    display: flex;
    margin-left: auto;

    &Item {
      padding: 0.5rem 0;
      margin: 0 1rem;
      white-space: nowrap;
      transition: $transitionBase;
      position: relative;
      display: flex;
      align-items: center;
      font-weight: 600;

      &::before {
        content: '';
        left: 0;
        bottom: 0;
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
</style>
