import React, { useEffect } from 'react';
import {
    View, Text, StyleSheet
} from 'react-native';
import { RadioButton } from 'react-native-paper';

interface Props {
    stateLuminaries: {
        lamp1?: boolean;
        lamp2?: boolean;
        lamp3?: boolean;
        lamp4?: boolean;
        lamp5?: boolean;
        lamp6?: boolean;
        lamp7?: boolean;
    }
}

export const Luminary = ({ stateLuminaries }: Props) => {

    useEffect(() => {
    }, [stateLuminaries])

    return (
        <View style={styles.container}>
            <View style={styles.singleLuminary}>
                <Text>L1</Text>
                <RadioButton
                    status={stateLuminaries !== undefined && stateLuminaries.lamp1 ? 'checked' : 'unchecked'}
                />
            </View>
            <View style={styles.singleLuminary}>
                <Text>L2</Text>
                <RadioButton
                    status={stateLuminaries !== undefined && stateLuminaries.lamp2 ? 'checked' : 'unchecked'}
                />
            </View>
            <View style={styles.singleLuminary}>
                <Text>L3</Text>
                <RadioButton
                    status={stateLuminaries !== undefined && stateLuminaries.lamp3 ? 'checked' : 'unchecked'}
                />
            </View>
            <View style={styles.singleLuminary}>
                <Text>L4</Text>
                <RadioButton
                    status={stateLuminaries !== undefined && stateLuminaries.lamp4 ? 'checked' : 'unchecked'}
                />
            </View>
            <View style={styles.singleLuminary}>
                <Text>L5</Text>
                <RadioButton
                    status={stateLuminaries !== undefined && stateLuminaries.lamp5 ? 'checked' : 'unchecked'}
                />
            </View>
            <View style={styles.singleLuminary}>
                <Text>L6</Text>
                <RadioButton
                    status={stateLuminaries !== undefined && stateLuminaries.lamp6 ? 'checked' : 'unchecked'}
                />
            </View>
            <View style={styles.singleLuminary}>
                <Text>L7</Text>
                <RadioButton
                    status={stateLuminaries !== undefined && stateLuminaries.lamp7 ? 'checked' : 'unchecked'}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row'
    },
    singleLuminary: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
})