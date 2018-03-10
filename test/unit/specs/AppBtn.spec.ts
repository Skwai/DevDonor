import { mount } from '@vue/test-utils'
import AppBtn from '@/components/AppBtn.vue'

describe('AppBtn.vue', () => {
  it('Should render correct button text', () => {
    const wrapper = mount(AppBtn, {
      slots: {
        default: 'Example'
      }
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
    expect(wrapper.text()).toEqual('Example')
  })

  it('Should emit click event when clicked', () => {
    const wrapper = mount(AppBtn, {
      slots: {
        default: 'Example'
      }
    })
    wrapper.trigger('click')
    expect(wrapper.emitted().click).toBeTruthy()
  })

  it('Should be disabled if `disabled` prop passed', () => {
    const wrapper = mount(AppBtn, {
      slots: {
        default: 'Example'
      },
      propsData: {
        disabled: true
      }
    })
    const attrs = wrapper.attributes()
    expect(attrs).toHaveProperty('disabled')
    expect(attrs).toBeTruthy()
  })
})
