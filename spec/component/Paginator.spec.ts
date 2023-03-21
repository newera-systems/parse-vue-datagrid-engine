/**
 * @jest-environment jsdom
 */
import { mount } from '@vue/test-utils';
import Paginator from '@/components/DataGridPaginator.vue';
import { waitNextTick } from '../utils';
import { Component } from 'vue';
import Table from '@components/Table.vue';

describe('Table', () => {
  describe('Pagination', () => {
    describe('Paginator component', () => {
      it('should show number of entries', async () => {
        const TestedComponent: Component = Paginator;
        const wrapper = mount(TestedComponent, {
          propsData: {
            value: 1,
            perPage: 25,
            entries: 13,
          },
          mocks: {
            $t: (key: string) => key,
          },
        });
        await waitNextTick(wrapper.vm);
        expect(wrapper.text()).toContain('Total 13');
        wrapper.destroy();
      });
      it('should show starting index item on page', async () => {
        const TestedComponent: Component = Paginator;
        const wrapper = mount(TestedComponent, {
          propsData: {
            value: 3,
            perPage: 27,
            entries: 1134,
          },
          mocks: {
            $t: (key: string) => key,
          },
        });
        await waitNextTick(wrapper.vm);
        expect(wrapper.text()).toContain('55');
        wrapper.destroy();
      });
      it('should show current page', async () => {
        const TestedComponent: Component = Paginator;
        const wrapper = mount(TestedComponent, {
          propsData: {
            value: 13,
            perPage: 3,
            entries: 1134,
          },
          mocks: {
            $t: (key: string) => key,
          },
        });
        await waitNextTick(wrapper.vm);
        expect(wrapper.text()).toContain('13');
        wrapper.destroy();
      });
    });
  });
});
