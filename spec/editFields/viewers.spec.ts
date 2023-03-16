/**
 * @jest-environment jsdom
 */
import { mount } from "@vue/test-utils";
import Table from "@/components/Table.vue";
import { waitNextTick } from "../utils";
import { type FieldDefinition, FieldType } from "../../src/datagrid-bvue";

const testItems = [
  { id: "aaa", a: "hello_0", b: 4, c: new Date() },
  { id: "bbb", a: null, b: null, c: null },
  { id: "ccc", a: undefined, b: undefined, c: undefined },
  {
    id: "ddd",
    a: true,
    b: true,
    c: null
  },
  {
    id: "eee",
    a: { title: "more" },
    b: { title: "extra" },
    c: { title: "not correct type" }
  }
]

describe('editFields', () => {
  const $DataGrid = {
    lang: 'fr',
    projectName: '',
    dateFormat: 'ddd DD-MM-YY HH:mm',
    calendarTime: true,
    _ruleSchemas: {},
    ruleEngineConfigs: {}
  }
  describe('viewers', () => {
    describe('stringViewers', () => {
      it('should detect string customFields', async () => {
        const wrapper = mount(Table, {
          propsData: {
            name: "Testing",
            items: testItems.slice()
          },
          mocks: {
            $DataGrid,
            $t: (key: string) => key
          }
        })
        await waitNextTick(wrapper.vm);
        const fieldsTypesFound: FieldType[] = wrapper.vm.$data.localFieldsDef.map(
          (f: FieldDefinition) => f.type
        );
        expect(fieldsTypesFound.includes(FieldType.String)).toBe(true);
        wrapper.destroy();
      })
      it('should show simple string content', async () => {
        const wrapper = mount(Table, {
          propsData: {
            name: "Testing",
            items: testItems.slice()
          },
          mocks: {
            $DataGrid,
            $t: (key: string) => key
          }
        })
        await waitNextTick(wrapper.vm);
        const fieldsTypesFound: FieldType[] = wrapper.vm.$data.localFieldsDef.map(
          (f: FieldDefinition) => f.type
        );
        expect(fieldsTypesFound.includes(FieldType.String)).toBe(true);
        expect(wrapper.text()).toContain("hello_0");
        wrapper.destroy();
      })
      it('should show null string content', async () => {
        const wrapper = mount(Table, {
          propsData: {
            name: "Testing",
            items: testItems.slice()
          },
          mocks: {
            $DataGrid,
            $t: (key: string) => key
          }
        })
        await waitNextTick(wrapper.vm);
        const fieldsTypesFound: FieldType[] = wrapper.vm.$data.localFieldsDef.map(
          (f: FieldDefinition) => f.type
        );
        expect(fieldsTypesFound.includes(FieldType.String)).toBe(true);
        expect(wrapper.text()).toContain("null");
        wrapper.destroy();
      })
      it('should show undefined string content', async () => {
        const wrapper = mount(Table, {
          propsData: {
            name: "Testing",
            items: testItems.slice()
          },
          mocks: {
            $DataGrid,
            $t: (key: string) => key
          }
        })
        await waitNextTick(wrapper.vm);
        const fieldsTypesFound: FieldType[] = wrapper.vm.$data.localFieldsDef.map(
          (f: FieldDefinition) => f.type
        );
        expect(fieldsTypesFound.includes(FieldType.String)).toBe(true);
        expect(wrapper.text()).toContain("undefined");
        wrapper.destroy();
      })
      it('should show boolean in string form content', async () => {
        const wrapper = mount(Table, {
          propsData: {
            name: "Testing",
            items: testItems.slice()
          },
          mocks: {
            $DataGrid,
            $t: (key: string) => key
          }
        })
        await waitNextTick(wrapper.vm);
        const fieldsTypesFound: FieldType[] = wrapper.vm.$data.localFieldsDef.map(
          (f: FieldDefinition) => f.type
        );
        expect(fieldsTypesFound.includes(FieldType.String)).toBe(true);
        expect(wrapper.text()).toContain("true");
        wrapper.destroy();
      })
      it('should show object in string form content', async () => {
        const wrapper = mount(Table, {
          propsData: {
            name: "Testing",
            items: testItems.slice()
          },
          mocks: {
            $DataGrid,
            $t: (key: string) => key
          }
        })
        await waitNextTick(wrapper.vm);
        const fieldsTypesFound: FieldType[] = wrapper.vm.$data.localFieldsDef.map(
          (f: FieldDefinition) => f.type
        );
        expect(fieldsTypesFound.includes(FieldType.String)).toBe(true);
        expect(wrapper.text()).toContain("[object Object]");
        wrapper.destroy();
      })
    })
    describe('numberViewers', () => {
      it('should detect number customFields', async () => {
        const wrapper = mount(Table, {
          propsData: {
            name: "Testing",
            items: testItems.slice()
          },
          mocks: {
            $DataGrid,
            $t: (key: string) => key
          }
        })
        await waitNextTick(wrapper.vm);
        const fieldsTypesFound: FieldType[] = wrapper.vm.$data.localFieldsDef.map(
          (f: FieldDefinition) => f.type
        );
        expect(fieldsTypesFound.includes(FieldType.Number)).toBe(true);
        wrapper.destroy();
      })
      it('should show simple number content', async () => {
        const wrapper = mount(Table, {
          propsData: {
            name: "Testing",
            items: testItems.slice()
          },
          mocks: {
            $DataGrid,
            $t: (key: string) => key
          }
        })
        await waitNextTick(wrapper.vm);
        const fieldsTypesFound: FieldType[] = wrapper.vm.$data.localFieldsDef.map(
          (f: FieldDefinition) => f.type
        );
        expect(fieldsTypesFound.includes(FieldType.Number)).toBe(true);
        expect(wrapper.text()).toContain("4");
        wrapper.destroy();
      })
      it('should show undefined or NaN content', async () => {
        const wrapper = mount(Table, {
          propsData: {
            name: "Testing",
            items: testItems.slice()
          },
          mocks: {
            $DataGrid,
            $t: (key: string) => key
          }
        })
        await waitNextTick(wrapper.vm);
        const fieldsTypesFound: FieldType[] = wrapper.vm.$data.localFieldsDef.map(
          (f: FieldDefinition) => f.type
        );
        expect(fieldsTypesFound.includes(FieldType.Number)).toBe(true);
        await waitNextTick(wrapper.vm);
        expect(wrapper.text()).toContain("undefined|NaN");
        wrapper.destroy();
      })
      it('should show boolean content', async () => {
        const wrapper = mount(Table, {
          propsData: {
            name: "Testing",
            items: testItems.slice()
          },
          mocks: {
            $DataGrid,
            $t: (key: string) => key
          }
        })
        await waitNextTick(wrapper.vm);
        const fieldsTypesFound: FieldType[] = wrapper.vm.$data.localFieldsDef.map(
          (f: FieldDefinition) => f.type
        );
        expect(fieldsTypesFound.includes(FieldType.Number)).toBe(true);
        await waitNextTick(wrapper.vm);
        expect(wrapper.text()).toContain("1");
        wrapper.destroy();
      })
    })
    describe('DateViewers', () => {
      it('should detect date customFields', async () => {
        const wrapper = mount(Table, {
          propsData: {
            name: "Testing",
            items: testItems.slice()
          },
          mocks: {
            $DataGrid,
            $t: (key: string) => key
          }
        })
        await waitNextTick(wrapper.vm);
        const fieldsTypesFound: FieldType[] = wrapper.vm.$data.localFieldsDef.map(
          (f: FieldDefinition) => f.type
        );
        expect(fieldsTypesFound.includes(FieldType.Date)).toBe(true);
        wrapper.destroy();
      })
      it('should show simple number content', async () => {
        const wrapper = mount(Table, {
          propsData: {
            name: "Testing",
            items: testItems.slice()
          },
          mocks: {
            $DataGrid,
            $t: (key: string) => key
          }
        })
        await waitNextTick(wrapper.vm);
        const fieldsTypesFound: FieldType[] = wrapper.vm.$data.localFieldsDef.map(
          (f: FieldDefinition) => f.type
        );
        expect(fieldsTypesFound.includes(FieldType.Date)).toBe(true);
        await waitNextTick(wrapper.vm);
        expect(wrapper.text()).toContain("Today");
        wrapper.destroy();
      })
      it('should show invalid Date', async () => {
        const wrapper = mount(Table, {
          propsData: {
            name: "Testing",
            items: testItems.slice()
          },
          mocks: {
            $DataGrid,
            $t: (key: string) => key
          }
        })
        await waitNextTick(wrapper.vm);
        const fieldsTypesFound: FieldType[] = wrapper.vm.$data.localFieldsDef.map(
          (f: FieldDefinition) => f.type
        );
        expect(fieldsTypesFound.includes(FieldType.Date)).toBe(true);
        await waitNextTick(wrapper.vm);
        expect(wrapper.text()).toContain("Invalid Date");
        wrapper.destroy();
      })
    })
  })
})
