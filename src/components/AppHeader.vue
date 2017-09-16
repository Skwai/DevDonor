<template>
  <header class="AppHeader">
    <div class="AppHeader__Intro">
      <h2 class="AppHeader__Tagline">Connecting inspired developers with charities</h2>
      <p class="AppHeader__Description">A platform for charities to pitch ideas for developers to volunteer to work on</p>
    </div>
    <nav class="AppHeader__Tabs">
      <div class="AppHeader__TabsContainer">
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
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  props: ['pitch']
}
</script>

<style lang="stylus">
@require "../styles/config"
@require "../styles/grid"
@require "../styles/text"

.AppHeader
  background: colorPrimaryBlue linear-gradient(180deg, darken(colorPrimaryBlue, 10) 0%, colorPrimaryBlue 100%)
  color: #fff

  &__Intro
    container()
    text-align: center
    padding: 10vmin spacingBase

  &__Tagline
    textTitle()

  &__Description
    textLead()
    opacity: .5

  &__Tabs
    // background: colorOffWhite
    background: #354B62

    &Container
      container()
      display: flex
      justify-content: center

  &__Tab
    display: flex
    // border-radius: 4px 4px 0 0
    padding: spacingBase
    align-items: center
    flex: 1
    opacity: .8

    &.-active
      opacity: 1
      color: fontColorBase
      background: #fff

    &:hover
      opacity: 1

    &Icon
      width: 3rem
      height: 3rem
      margin-right: 1rem
      opacity: .7

    &Label
      textHeading()
      display: block

    &Description
      opacity: .5
      display: block
      font-weight: 500
      line-height: lineHeightTiny
</style>
