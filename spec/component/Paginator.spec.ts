/**
 * @jest-environment jsdom
 */
import {mount} from '@vue/test-utils'
import Paginator from '@/components/Paginator.vue'
import {waitNextTick} from '../utils'

describe('Table', () => {
  describe('Pagination', () => {
    describe('Paginator component', () => {
      it('should show number of entries', async () => {
        const wrapper = mount(Paginator, {
          propsData: {
            currentPage: 1,
            perPage: 25,
            entries: 13,
          },
          mocks: {
            $t: (key: string) => key,
          },
        })
        await waitNextTick(wrapper.vm)
        expect(wrapper.text()).toContain('Total 13')
        wrapper.destroy()
      })
      it('should show starting index item on page', async () => {
        const wrapper = mount(Paginator, {
          propsData: {
            currentPage: 3,
            perPage: 27,
            entries: 1134,
          },
          mocks: {
            $t: (key: string) => key,
          },
        })
        await waitNextTick(wrapper.vm)
        expect(wrapper.text()).toContain('55')
        wrapper.destroy()
      })
      it('should show current page', async () => {
        const wrapper = mount(Paginator, {
          propsData: {
            currentPage: 13,
            perPage: 3,
            entries: 1134,
          },
          mocks: {
            $t: (key: string) => key,
          },
        })
        await waitNextTick(wrapper.vm)
        expect(wrapper.text()).toContain('13')
        wrapper.destroy()
      })
    })
  })
})
