<template>
  <header :class="$style.TheHeader">
    <router-link
      to="/"
      :class="$style.TheHeader__Logo"
    ><h1>DevDonor</h1></router-link>
    <nav :class="$style.TheHeader__Nav" data-foo="true">
      <router-link to="/" :class="$style.TheHeader__NavItem">Browse Projects</router-link>
      <router-link
        to="/create" :class="$style.TheHeader__NavItem"
      >Create Project</router-link>
      <router-link to="/" :class="$style.TheHeader__NavItem">How It Works</router-link>
    </nav>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class TheHeader extends Vue {}
</script>

<style lang="stylus" module>
@require "../styles/config.styl"

.TheHeader
  transition: transitionBase
  box-shadow: rgba(0,0,0,.1) 0 0.25rem 1rem
  display: flex
  align-items: center
  position: relative
  z-index: 2
  background: #fff
  padding: 0 $spacingBase

  &__Logo
    transition: transitionBase
    color: $colorPrimary
    padding: $spacingBase 0

    &:hover
      background: rgba(0,0,0,.05)

  &__Nav
    display: flex
    margin-left: auto

    &Item
      padding: $spacingBase
      font-weight: 500

      &:hover,
      &:focus
        color: $colorPrimary
</style>
