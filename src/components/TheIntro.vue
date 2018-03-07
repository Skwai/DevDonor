<template>
  <header :class="$style.TheIntro">
    <div :class="$style.TheIntro__Body">
      <h1 :class="$style.TheIntro__Title">Connecting programmers with charities</h1>
      <p :class="$style.TheIntro__Description">A free platform for charities to pitch projects for programmers to work on.</p>
      <p>
        <AppBtn :to="{ name: 'CreateProject' }" size="large" color="primary">Create a project</AppBtn>
      </p>
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
  background: $colorPrimary;
  color: #fff;

  &__Body {
    container();
    text-align: center;
    padding: 10vmin $spacingBase 10vmin;
  }

  &__Title {
    font-size: 1rem + 1vmin;
    margin-bottom: 0.5rem;
    font-weight: 700;
  }

  &__Description {
    textHeading();
    font-weight: 400;
    opacity: 0.8;
  }

  &__Login {
    margin-top: $spacingBase;
  }
}
</style>
