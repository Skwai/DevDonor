<template>
  <AppLoading v-if="loading" />
  <div v-else-if="project">
    <header :class="$style.Project__Header">
      <AppContainer>
        <div :class="$style.Project__Meta">
          <div :class="$style.Project__Created">
            <span :class="$style.Project__New">
              <AppLabel v-if="isNew">New</AppLabel>
            </span>
            <AppGlyph>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path></svg>
            </AppGlyph>
            {{createdAt}}
          </div>
          <div :class="$style.Project__Region">
            <AppGlyph>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"></path></svg>
            </AppGlyph>
            {{project.country}}, {{project.city}}
          </div>
        </div>
        <h1 :class="$style.Project__Title">{{project.title}}</h1>
        <div :class="$style.Project__Skills">
          <AppTag
            v-for="(skill, index) in skills"
            :key="index"
          >{{skill}}</AppTag>
        </div>
      </AppContainer>
    </header>

    <AppContainer>
      <div :class="$style.Project__Body">
        <div :class="$style.Project__Description">
          <AppSubheading>About the project</AppSubheading>
          <div v-html="description" :class="$style.Project__Description"></div>
        </div>
        <article :class="$style.Project__Sidebar">
          <div :class="$style.Project__Volunteer">
            <AppBtn
              color="primary"
              :block=true
            >Volunteer for this project</AppBtn>
          </div>

          <div :class="$style.Project__Organization">
            <div :class="$style.Project__LogoWrap">
              <img
                :class="$style.Project__Logo"
                :src="project.organizationLogo"
              >
            </div>
            <h3>{{project.organizationName}}</h3>
            <h4>{{project.country}}</h4>
            <div>{{project.organizationDescription}}</div>
          </div>
        </article>
      </div>
    </AppContainer>
  </div>
</template>

<script lang="ts">
import marked from 'marked'
import moment from 'moment'
import { Component, Vue } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'

import AppBtn from '../components/AppBtn.vue'
import AppContainer from '../components/AppContainer.vue'
import AppGlyph from '../components/AppGlyph.vue'
import AppHelpText from '../components/AppHelpText.vue'
import AppLabel from '../components/AppLabel.vue'
import AppLoading from '../components/AppLoading.vue'
import AppMediaObject from '../components/AppMediaObject.vue'
import AppModal from '../components/AppModal.vue'
import Project from '../models/Project'

@Component({
  components: {
    AppBtn,
    AppContainer,
    AppGlyph,
    AppHelpText,
    AppLabel,
    AppLoading,
    AppMediaObject,
    AppModal
  }
})
export default class ProjectPage extends Vue {
  private loading: boolean = true
  private project: Project | null = null

  @Action private loadProjectByID: (projectID: string) => Promise<void>

  @Getter('getProjectByID') private getProject: (projectID: string) => Project | null

  get skills() {
    return ['UX', 'Apps']
  }

  get projectID() {
    return this.$route.params.projectID
  }

  get isNew() {
    return true
  }

  get createdAt() {
    if (this.project) {
      return moment(this.project.createdAt).fromNow()
    }
  }

  get description(): string | null {
    if (!this.project || !this.project.description) {
      return null
    }
    return marked(this.project.description)
  }

  private close() {
    this.$router.push('/')
  }

  private async created() {
    try {
      await this.loadProjectByID(this.projectID)
      this.project = this.getProject(this.projectID)
    } catch (err) {
    } finally {
      this.loading = false
    }
  }
}
</script>

<style lang="stylus" module>
@import '../styles/config.styl';
@import '../styles/text.styl';

.Project {
  &__Header {
    background: #fff;
    padding: $spacingBase 0;
    margin-bottom: $spacingBase;
    border-bottom: $colorGray solid 1px;
    // background: $colorPrimary
    // color: #fff
  }

  &__Meta {
    display: flex;
    align-items: center;
    color: rgba($fontColorBase, 0.5);
    textSmallCaps();
    margin-bottom: 1rem;
    white-space: nowrap;
  }

  &__Organization {
    background: #fff;
    padding: $spacingBase;
    font-size: 0.875rem;
    border: $colorGray solid 1px;

    h3 {
      text-align: center;
    }

    h4 {
      text-align: center;
      margin-bottom: 1rem;
    }
  }

  &__Description {
    textMarkdown();
  }

  &__Logo {
    width: 100%;
    height: auto;

    &Wrap {
      margin: 0 auto 1rem;
      width: 5rem;
    }
  }

  &__Volunteer {
    margin: 0 0 $spacingBase;
  }

  &__Title {
    font-size: 2rem;
    margin-bottom: 1.25rem;
  }

  &__New {
    margin-right: $spacingBase;
  }

  &__Region, &__Created {
    display: flex;
    align-items: center;
    margin-right: $spacingBase;
  }

  &__Body {
    display: grid;
    grid-template-columns: 1fr 20rem;
    grid-gap: 3rem;
  }
}
</style>
