<template>
  <header :class="$style.TheIntro">
    <div :class="$style.TheIntro__Body">
      <h1 :class="$style.TheIntro__Title">Connecting programmers with charities</h1>
      <p :class="$style.TheIntro__Description">A free platform for charities to pitch projects for programmers to work on.</p>
      <div :class="$style.TheIntro__Ctas">
        <AppBtn :to="{ name: 'CreateProject' }" size="large" color="primary">Create a project</AppBtn>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'

@Component
export default class TheIntro extends Vue {}
</script>

<style lang="stylus" module>
@require '../styles/config';

.TheIntro {
  background: #010e28;
  color: #fff;

  &__Body {
    container();
    text-align: center;
    padding: 15vmin $spacingBase 15vmin;
  }

  &__Title {
    margin-top: 0;
    font-size: 1rem + 1vmin;
    margin-bottom: 0.5rem;
    font-weight: 700;
  }

  &__Description {
    textHeading();
    font-weight: 600;
    opacity: 0.6;
  }

  &__Ctas {
    margin-top: 2rem;
  }
}
</style>
