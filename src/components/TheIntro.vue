<template>
  <header :class="$style.TheIntro">
    <div :class="$style.TheIntro__Body">
      <h1 :class="$style.TheIntro__Title">Connecting developers with charities</h1>
      <p :class="$style.TheIntro__Description">Pitch a charitable project for developer to work on</p>
      <div
        v-if="!currentUser"
        :class="$style.TheIntro__Login"
      >
        <AppBtn @click="login" color="white">Sign in with Google</AppBtn>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'

@Component
export default class TheIntro extends Vue {
  @Action('login') actionLogin: () => Promise<void>

  @Getter currentUser: any

  login () {
    this.actionLogin()
  }
}
</script>

<style lang="stylus" module>
@require "../styles/config.styl"

.TheIntro
  background: $colorPrimary linear-gradient(150deg, darken($colorPrimary, 10) 0%, $colorPrimary 100%)
  color: #fff
  margin-bottom: $spacingBase

  &__Body
    container()
    text-align: center
    padding: 8vmin $spacingBase 8vmin

  &__Title
    font-size: (1rem + 1vmin)
    margin-bottom: 0.5rem

  &__Description
    textHeading()
    font-weight: 400
    opacity: .7

  &__Btns
    navbar()

  &__Login
    margin-top: $spacingBase
</style>
