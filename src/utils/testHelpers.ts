
import { ShallowWrapper } from 'enzyme';
import { Platform } from 'react-native';

export const findElementByTestId = (Component: any, testID: string, wrapper: ShallowWrapper) => {
    return wrapper.find(Component).findWhere((n: any) => n.prop('testID') === testID);
};

export const testId = (value: string = '') => {
    return Platform.OS === 'ios'
        ? {
            testID: value,
        }
        : {
            accessibleLabel: value,
            accessible: true,
        };
};