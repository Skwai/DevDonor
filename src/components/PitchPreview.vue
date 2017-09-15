<template>
  <article class="PitchPreview">
    <a href="#" class="PitchPreview__Link">
      <div class="PitchPreview__Logo">
        <img class="PitchPreview__LogoImage" :src="pitch.organizationLogo">
      </div>
      <div class="PitchPreview__Details">
        <header class="PitchPreview__Header">
          <h1 class="PitchPreview__Organization">{{pitch.organizationName}}</h1>
          <div class="PitchPreview__Region">{{pitch.organizationRegion}}</div>
        </header>
        <div class="PitchPreview__Description">{{pitch.description}}</div>
      </div>
      <div class="PitchPreview__Meta">
        <time class="PitchPreview__CreatedAt" :datetime="pitch.createdAt">3 days ago</time>
      </div>
    </a>
  </article>
</template>

<script>
export default {
  props: ['pitch']
}
</script>

<style lang="stylus">
@require "../styles/config.styl"
@require "../styles/text.styl"

.PitchPreview
  border: colorLightGray solid
  border-width: 0 0 1px

  + .PitchPreview
    border-top: 1px

  &__Link
    display: flex
    color: inherit
    transition: transitionBase
    padding: spacingBase
    background: #fff

    &:hover
      background: colorOffWhite

  &__Logo
    width: 6rem
    height: 6rem
    display: flex
    align-items: center
    justify-content: center
    background: #fff
    border: colorLightGray solid 1px

  &__LogoImage
    width: 100%
    height: 100%
    object-fit: contain

  &__Organization
    textHeading()

  &__Details
    margin: 0 spacingBase

  &__Region
    textSmallCaps()

  &__Description
    margin-top: spacingSmall

  &__Meta
    margin-left: auto

  &__CreatedAt
    text-align: right
    white-space: nowrap
    opacity: .5
</style>
