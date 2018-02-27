<template>
  <header :class="$style.TheHeader">
    <router-link
      to="/"
      :class="$style.TheHeader__Logo"
    ><h1>DevDonor</h1></router-link>
    <nav :class="$style.TheHeader__Nav" data-foo="true">
      <router-link
        to="/"
        :class="$style.TheHeader__NavItem"
        :exact-active-class="$style.TheHeader__NavItemActive"
      >Browse Projects</router-link>
      <router-link
        :to="{ name: 'CreateProject' }"
        :class="$style.TheHeader__NavItem"
        :active-class="$style.TheHeader__NavItemActive"
      >Create a Project</router-link>
      <router-link
        :to="{ name: 'About' }"
        :class="$style.TheHeader__NavItem"
        :active-class="$style.TheHeader__NavItemActive"
      >How It Works</router-link>
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

.TheHeader {
  transition: transitionBase;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0.25rem 1rem; // , rgba($colorGray, 1) 0 1px 1px
  display: flex;
  align-items: center;
  z-index: 2;
  background: #fff;
  padding: 0 $spacingBase;
  position: sticky;
  top: 0;
  left: 0;
  width: 100vw;

  h1 {
    margin: 0;
  }

  &__Logo {
    transition: transitionBase;
    color: $colorPrimary;
    padding: $spacingBase 0;
    transition: $transitionBase;
    will-change: transform;

    &:hover, &:focus {
      transform: scale(1.1);
    }
  }

  &__Nav {
    display: flex;
    margin-left: auto;

    &Item {
      padding: $spacingBase;
      font-weight: 500;

      &:hover, &:focus {
        color: $colorPrimary;
      }

      &Active {
        color: $colorPrimary;
      }
    }
  }
}
</style>
