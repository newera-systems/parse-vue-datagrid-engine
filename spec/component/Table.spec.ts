/**
 * @jest-environment jsdom
 */
import { mount } from "@vue/test-utils";
import Table from "@/components/Table.vue";
import { waitNextTick } from "../utils";
import { type DataGridProviderFunction } from "../../src";

const testItems = [
  { id: "aaa", a: "hello", b: 4, c: new Date() },
  { id: "bbb", a: "hello_2", b: 5, c: new Date() },
  { id: "ccc", a: "hello_3", b: 6, c: new Date() }
];

const fields = [
  {
    identifier: "id",
    name: 'Id title',
    config: {
      canView: false,
      canRead: false,
      canEdit: false,
      canFilter: false,
      canSort: false
    },
    type: "String"
  },
  {
    identifier: 'a',
    name: 'A',
    config: {
      canView: true,
      canRead: false,
      canEdit: false,
      canFilter: false,
      canSort: true
    },
    type: "String"
  },
  {
    identifier: "b",
    name: "b",
    config: {
      canView: true,
      canRead: true,
      canEdit: true,
      canFilter: false,
      canSort: false
    },
    type: "String"
  }
]
describe('Table', () => {
  const $DataGrid = {
    lang: 'fr',
    projectName: '',
    dateFormat: 'ddd DD-MM-YY HH:mm',
    calendarTime: true,
    _ruleSchemas: {},
    ruleEngineConfigs: {}
  }
  describe('items provider', () => {
    it('should accept an array of items', async () => {
      const wrapper = mount(Table, {
        propsData: {
          name: 'Testing',
          items: testItems.slice(),
          fields: fields.slice()
        },
        mocks: {
          $DataGrid,
          $t: (key: string) => key
        }
      })
      await waitNextTick(wrapper.vm)
      expect(wrapper.emitted('itemsRefreshed')).toBeDefined()
      expect(wrapper.find('tbody').exists()).toBe(true)
      expect(wrapper.find('tbody').findAll('tr').exists()).toBe(true)
      expect(wrapper.find('tbody').findAll('tr').length).toBe(testItems.length)
      wrapper.destroy()
    })
    it('should accept a function', async () => {
      const provider = () => {
        return testItems.slice()
      }
      const wrapper = mount(Table, {
        propsData: {
          name: 'Testing',
          items: provider,
          fields: fields.slice()
        },
        mocks: {
          $DataGrid,
          $t: (key: string) => key
        }
      })
      await waitNextTick(wrapper.vm)
      expect(wrapper.emitted('itemsRefreshed')).toBeDefined()
      expect(wrapper.find('tbody').exists()).toBe(true)
      expect(wrapper.find('tbody').findAll('tr').exists()).toBe(true)
      expect(wrapper.find('tbody').findAll('tr').length).toBe(testItems.length)
      wrapper.destroy()
    })
    it('should accept a promise', async () => {
      const promise = new Promise(resolve => {
        resolve(testItems.slice());
      });
      const provider = async () => {
        return await promise;
      };
      const wrapper = mount(Table, {
        propsData: {
          name: "Testing",
          items: provider(),
          fields: fields.slice()
        },
        mocks: {
          $DataGrid,
          $t: (key: string) => key
        }
      })
      await waitNextTick(wrapper.vm)
      expect(wrapper.emitted('itemsRefreshed')).toBeDefined()
      expect(wrapper.find('tbody').exists()).toBe(true)
      expect(wrapper.find('tbody').findAll('tr').exists()).toBe(true)
      expect(wrapper.find('tbody').findAll('tr').length).toBe(testItems.length)
      wrapper.destroy()
    })
    it('should accept a function with callback', async () => {
      const provider: DataGridProviderFunction = (ctx, cb) => {
        cb(testItems.slice())
      }
      const wrapper = mount(Table, {
        propsData: {
          name: 'Testing',
          items: provider,
          fields: fields.slice()
        },
        mocks: {
          $DataGrid,
          $t: (key: string) => key
        }
      })
      await waitNextTick(wrapper.vm)
      expect(wrapper.emitted('itemsRefreshed')).toBeDefined()
      expect(wrapper.find('tbody').exists()).toBe(true)
      expect(wrapper.find('tbody').findAll('tr').exists()).toBe(true)
      expect(wrapper.find('tbody').findAll('tr').length).toBe(testItems.length)
      wrapper.destroy()
    })
    it('should accept async function', async () => {
      const provider: DataGridProviderFunction = async ctx => {
        return testItems.slice();
      };
      const wrapper = mount(Table, {
        propsData: {
          name: "Testing",
          items: provider,
          fields: fields.slice()
        },
        mocks: {
          $DataGrid,
          $t: (key: string) => key
        }
      })
      await waitNextTick(wrapper.vm)
      expect(wrapper.emitted('itemsRefreshed')).toBeDefined()
      expect(wrapper.find('tbody').exists()).toBe(true)
      expect(wrapper.find('tbody').findAll('tr').exists()).toBe(true)
      // update again after resolution
      await waitNextTick(wrapper.vm)
      expect(wrapper.find('tbody').findAll('tr').length).toBe(testItems.length)
      wrapper.destroy()
    })
  })
  describe('fields', () => {
    it('should show only visible customFields', async () => {
      const wrapper = mount(Table, {
        propsData: {
          name: 'Testing',
          items: testItems.slice(),
          fields: fields.slice()
        },
        mocks: {
          $DataGrid,
          $t: (key: string) => key
        }
      })
      await waitNextTick(wrapper.vm)
      expect(wrapper.emitted('itemsRefreshed')).toBeDefined()
      await waitNextTick(wrapper.vm)
      expect(wrapper.find('thead').exists()).toBe(true)
      expect(wrapper.find('thead > tr').findAll('th').exists()).toBe(true)
      expect(wrapper.find('thead > tr').findAll('th').length).toBe(2)
      wrapper.destroy()
    })
    it('should not show items work for items without ids', async () => {
      const consoleWarnMock = jest.spyOn(global.console, "warn").mockImplementation();
      const wrapper = mount(Table, {
        propsData: {
          name: "Testing",
          items: [
            { a: 1, b: 2, c: 3 },
            { a: 4, b: 5, c: 6 }
          ],
          fields: fields.slice()
        },
        mocks: {
          $DataGrid,
          $t: (key: string) => key
        }
      })
      await waitNextTick(wrapper.vm)
      expect(console.warn).toBeCalled()
      expect(wrapper.text()).toContain('DataGrid.noData')
      wrapper.destroy()
      consoleWarnMock.mockRestore()
    })
    it('should create default customFields if nothing provided', async () => {
      const wrapper = mount(Table, {
        propsData: {
          name: 'Testing',
          items: testItems.slice()
        },
        mocks: {
          $DataGrid,
          $t: (key: string) => key
        }
      })
      await waitNextTick(wrapper.vm);
      expect(wrapper.vm.$data.localFieldsDef.length).toBe(Object.keys(testItems[0]).length);
      wrapper.destroy();
    })
  })
})
