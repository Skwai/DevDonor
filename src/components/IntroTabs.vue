<template>
  <nav class="IntroTabs">
    <router-link to="/" class="IntroTabs__Tab" active-class="-active" exact>
      <svg class="IntroTabs__TabIcon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="square" stroke-miterlimit="10"><path d="M20 9c0-4.4-3.6-8-8-8S4 4.6 4 9c0 3.4 2.1 6.2 5 7.4V19h6v-2.6c2.9-1.2 5-4 5-7.4zM9 22h6"/><path d="M8 9l2 2 2-2 2 2 2-2"/></g></svg>
      <div>
        <strong class="IntroTabs__TabLabel">New Projects</strong>
        <div class="IntroTabs__TabDescription">Projects seeking volunteers</div>
      </div>
    </router-link>
    <router-link to="/projects" class="IntroTabs__Tab" active-class="-active">
      <svg class="IntroTabs__TabIcon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="square" stroke-miterlimit="10"><path d="M12.5 16.5L17 21l5 1-1-5-4.5-4.5M11.5 7.5L6 2 2 6l5.5 5.5"/><path d="M2 17L17 2l5 5L7 22z" stroke-width="1"/><path d="M11 8l1 1M14 5l2 2M8 11l2 2M5 14l1 1"/></g></svg>
      <div>
        <strong class="IntroTabs__TabLabel">Established</strong>
        <div class="IntroTabs__TabDescription">Browse underway projects</div>
      </div>
    </router-link>
  </nav>
</template>

<script>
export default {}
</script>

<style lang="stylus">
@require "../styles/config"
@require "../styles/text"

.IntroTabs
  justify-content: center
  display: flex
  container()

  &__Tab
    display: flex
    align-items: center
    justify-content: center
    transition: transitionBase
    background: colorDarkBlue
    padding: spacingBase

    @media (min-width: 768px)
      padding: spacingBase spacingLarge

    &.-active
      opacity: 1
      background: #fff
      color: colorDarkBlue

    &:hover
      opacity: 1

    &Icon
      width: 3rem
      height: 3rem
      margin-right: 1rem

    &Label
      textBigCaps()
      display: block

    &Description
      opacity: .5
      display: block
      font-weight: 400
      line-height: lineHeightTiny
</style>
