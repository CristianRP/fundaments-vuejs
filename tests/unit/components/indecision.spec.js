import { shallowMount } from "@vue/test-utils";
import Indecision from '@/components/Indecision'

describe('Indecision component', () => {

  let wrapper
  let clgSpy

  global.fetch = jest.fn( () => Promise.resolve({
    json: () => Promise.resolve({
      answer: 'yes',
      forced: false,
      image: 'https::yesno.wtf/assets/yes/2.gif'
    })
  }))

  beforeEach(() => {
    wrapper = shallowMount( Indecision )

    clgSpy = jest.spyOn( console, 'log' )

    jest.clearAllMocks()
  });

  test('should match with the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('should not trigger the log', async() => {
    const getAnswerSpy = jest.spyOn( wrapper.vm, 'getAnswer' )

    const input = wrapper.find('input')
    await input.setValue('hello')

    // expect( clgSpy ).toHaveBeenCalled()
    expect( clgSpy ).toHaveBeenCalledTimes(1)
    expect( getAnswerSpy ).toHaveBeenCalledTimes(0)
    expect( getAnswerSpy ).not.toHaveBeenCalled()
  });

  test('should trigger getAnswer', async() => {
    const getAnswerSpy = jest.spyOn( wrapper.vm, 'getAnswer' )

    const input = wrapper.find('input')
    await input.setValue('hello?')

    expect( clgSpy ).toHaveBeenCalledTimes(1)
    expect( getAnswerSpy ).toHaveBeenCalled()
  });

  test('tests on getAnswer', async() => {
    await wrapper.vm.getAnswer()

    const img = wrapper.find('img')

    expect( img.exists() ).toBeTruthy()
    expect( wrapper.vm.img ).toBe( 'https::yesno.wtf/assets/yes/2.gif' )

    console.log(wrapper.vm.img);
    console.log(wrapper.vm.answer);
  });

  test('tests on getAnswer - Error on API', async() => {
    fetch.mockImplementationOnce(() => Promise.reject('API is down'))
    await wrapper.vm.getAnswer()

    const img = wrapper.find('img')


    expect( img.exists() ).toBeFalsy()
    expect( wrapper.vm.answer ).toBe( 'Can not load the API' )
  });
});
