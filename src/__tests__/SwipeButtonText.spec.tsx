import React from 'react'
import { ShallowWrapper, shallow } from 'enzyme'
import SwipeButtonText from '../SwipeButtonText'

let wrapper: ShallowWrapper

describe('<SwipeButtonText />', () => {
    beforeAll(() => {
        wrapper = shallow(<SwipeButtonText
            title="Swipe to complete"
        />)
    })

    it('should match snapshot', () => {
        expect(wrapper).toMatchSnapshot()        
    })

    it('should render the title', () => {
        expect(wrapper.find('Text').prop('children')).toEqual('Swipe to complete')
    })

    describe('titleProps', () => {
        beforeAll(()=>{
            wrapper.setProps({
                titleProps: {
                    numberOfLines: 1,
                    allowFontScaling: true,
                }
            })
        })

        it('should apply numberOfLines', () => {
            expect(wrapper.find('Text').prop('numberOfLines')).toEqual(1)
        })
    })

    describe('titleContainerProps', () => {
        beforeAll(()=>{
            wrapper.setProps({
                titleContainerProps: {
                    accessibilityHint: 'This is a hint'
                }
            })
        })

        it('should apply accessibilityHint', () => {
            expect(wrapper.find('View').prop('accessibilityHint')).toEqual('This is a hint')
        })
    })
})
