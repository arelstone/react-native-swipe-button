import React from 'react'
import { ShallowWrapper, shallow } from 'enzyme'
import SwipeButton from '../SwipeButton'
import { Text } from 'react-native'

let wrapper: ShallowWrapper
const mockOnComplete = jest.fn();

describe('<SwipeButton />', () => {
    beforeAll(() => {
        wrapper = shallow(<SwipeButton
            Icon={<Text>X</Text>}
            onComplete={mockOnComplete}
            title="Swipe to complete"
        />)
    })

    it('should match snapshot', () => {
        expect(wrapper).toMatchSnapshot()
    })

    it('should containe SwipeButtonText', () => {
        expect(wrapper.find('SwipeButtonText').exists()).toBeTruthy();
    })

    it('should containe SwipeButtonCircle', () => {
        expect(wrapper.find('SwipeButtonCircle').exists()).toBeTruthy();
    })
    
    describe('disabled', () => {
        beforeAll(()=>{
            wrapper.setProps({disabled: true})
        })
        afterAll(()=>{
            wrapper.setProps({disabled: false})
        })

        it('should match snapshot', () => {
            expect(wrapper).toMatchSnapshot()
        })

        it('should set opacity of the container to 0.5', () => {
            expect(wrapper.find('View').prop('style')).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        opacity: 0.5
                    })
                ])
            )
        })
    })
})
