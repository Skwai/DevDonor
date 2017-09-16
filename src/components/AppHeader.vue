<template>
  <header class="AppHeader">
    <div class="AppHeader__Intro">
      <h1 class="AppHeader__Title">DevDonor</h1>
      <p class="AppHeader__Description">A platform for charities and developers to connect</p>
      <div class="AppHeader__Btns">
        <Btn to="#" color="stroke">Sign me up</Btn>
        <Btn to="#" color="stroke">How it works</Btn>
      </div>
    </div>
    <nav class="AppHeader__Tabs">
      <router-link to="/" class="AppHeader__Tab" active-class="-active" exact>
        <svg class="AppHeader__TabIcon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="square" stroke-miterlimit="10"><path d="M20 9c0-4.4-3.6-8-8-8S4 4.6 4 9c0 3.4 2.1 6.2 5 7.4V19h6v-2.6c2.9-1.2 5-4 5-7.4zM9 22h6"/><path d="M8 9l2 2 2-2 2 2 2-2"/></g></svg>
        <div>
          <strong class="AppHeader__TabLabel">Pitches</strong>
          <div class="AppHeader__TabDescription">Projects seeking volunteers</div>
        </div>
      </router-link>
      <router-link to="/projects" class="AppHeader__Tab" active-class="-active">
        <svg class="AppHeader__TabIcon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="square" stroke-miterlimit="10"><path d="M12.5 16.5L17 21l5 1-1-5-4.5-4.5M11.5 7.5L6 2 2 6l5.5 5.5"/><path d="M2 17L17 2l5 5L7 22z" stroke-width="1"/><path d="M11 8l1 1M14 5l2 2M8 11l2 2M5 14l1 1"/></g></svg>
        <div>
          <strong class="AppHeader__TabLabel">Projects</strong>
          <div class="AppHeader__TabDescription">Browse established projects</div>
        </div>
      </router-link>
    </nav>
  </header>
</template>

<script>
import Btn from '@/components/Btn'

export default {
  components: {
    Btn
  },
  props: ['pitch']
}
</script>

<style lang="stylus">
@require "../styles/config"
@require "../styles/grid"
@require "../styles/text"
@require "../styles/navbar"

.AppHeader
  background: colorPrimaryBlue linear-gradient(180deg, darken(colorPrimaryBlue, 10) 0%, colorPrimaryBlue 100%)
  color: #fff

  &__Intro
    container()
    text-align: center
    padding: 10vmin spacingBase

  &__Title
    textTitle()

  &__Description
    textLead()
    opacity: .7
    margin-bottom: 1rem

  &__Btns
    navbar()

  &__Tabs
    justify-content: center
    display: flex
    container()

  &__Tab
    display: flex
    padding: spacingBase spacingLarge
    align-items: center
    justify-content: center
    transition: transitionBase
    background: colorDarkGray

    &.-active
      opacity: 1
      background: #fff
      color: colorDarkGray

    &:hover
      opacity: 1

    &Icon
      width: 3rem
      height: 3rem
      margin-right: 1rem

    &Label
      textHeading()
      display: block

    &Description
      opacity: .5
      display: block
      font-weight: 500
      line-height: lineHeightTiny
</style>
