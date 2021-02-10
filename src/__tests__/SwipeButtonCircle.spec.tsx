import React from 'react'
import { ShallowWrapper, shallow } from 'enzyme'
import SwipeButtonCircle from '../SwipeButtonCircle';
import { Animated, Text } from 'react-native';
import {findElementByTestId} from '../utils/testHelpers';

let wrapper: ShallowWrapper
const mockOnRersponserStart = jest.fn();

describe('<SwipeButtonCircle />', () => {
    beforeAll(() => {
        wrapper = shallow(<SwipeButtonCircle
            panHandlers={{
                onResponderStart: mockOnRersponserStart
            }}
            translateX={new Animated.Value(0)}
            Icon={<Text testID="Icon">X</Text>}
        />)
    })

    it('should match snapshot', () => {
        expect(wrapper).toMatchSnapshot(); 
    })

    it('should display the Icon', () => {
        const iconContainer = findElementByTestId('AnimatedComponent', 'IconContainer', wrapper)
        const icon = iconContainer.find('Text')

        expect(icon.exists()).toBeTruthy();
    })
})
