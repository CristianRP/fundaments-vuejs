import { shallowMount, mount } from '@vue/test-utils'
import Counter from '@/components/Counter'

describe('Counter Component', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Counter)
  });
  // test('should be match with the snapshot', () => {
    // const wrapper = shallowMount(Counter)

  //   expect( wrapper.html() ).toMatchSnapshot()
  // });

  test('h2 should have the value Counter by default', () => {
    // const wrapper = shallowMount(Counter)

    expect(wrapper.find('h2').exists()).toBeTruthy()

    const h2Value = wrapper.find('h2').text()

    console.log(h2Value);
    expect(h2Value).toBe('Counter')
  });

  test('should be 100 on p tag', () => {
    // Wrapper
    // const wrapper = shallowMount(Counter)
    // pTags
    const value = wrapper.find('[data-testid="counter"]').text()
    // expect second p equals 100
    expect( value ).toBe('100')
  });

  test('should increment and decrement by 1', async() => {
    // const wrapper = shallowMount(Counter)

    const [ increaseBtn, decreaseBtn] = wrapper.findAll('button')

    await increaseBtn.trigger('click')

    let value = wrapper.find('[data-testid="counter"]').text()
    // expect second p equals 100
    expect( value ).toBe('101')

    await decreaseBtn.trigger('click')
    await decreaseBtn.trigger('click')

    value = wrapper.find('[data-testid="counter"]').text()
    expect( value ).toBe('99')
  });

  test('have to set the default value', () => {
    const { start } = wrapper.props()

    const value = wrapper.find('[data-testid="counter"]').text()
    console.log(typeof start)
    expect(Number(value)).toBe(start)
  });

  test('should show the title prop', () => {
    const title = 'Hello world'
    const wrapper = shallowMount(Counter, {
      props: {
        title
      }
    })

    console.log(wrapper.html());
    expect(wrapper.find('h2').text()).toBe(title)
  });
});