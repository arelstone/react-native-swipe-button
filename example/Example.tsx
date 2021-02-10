import React, { FC } from 'react';
import { View, Text, Alert } from 'react-native';
import SwipeButton from '../src/SwipeButton';

const App = () => {
    return (
        <View style={{ flex: 1 }}>
            <SwipeButton
                Icon={<Text>X</Text>}
                onComplete={() => Alert.alert('Completed')}
                title="Swipe to complete"
            />
        </View>
    );
};

export default App;
