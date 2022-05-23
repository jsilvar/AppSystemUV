import React, { useEffect } from 'react';
import {
    View, Text, StyleSheet
} from 'react-native';
import { RadioButton } from 'react-native-paper';

interface Props {
    stateLuminaries: {
        l1?: boolean;
        l2?: boolean;
        l3?: boolean;
        l4?: boolean;
        l5?: boolean;
        l6?: boolean;
        l7?: boolean;
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
                    status={stateLuminaries !== undefined && stateLuminaries.l1 ? 'checked' : 'unchecked'}
                />
            </View>
            <View style={styles.singleLuminary}>
                <Text>L2</Text>
                <RadioButton
                    status={stateLuminaries !== undefined && stateLuminaries.l2 ? 'checked' : 'unchecked'}
                />
            </View>
            <View style={styles.singleLuminary}>
                <Text>L3</Text>
                <RadioButton
                    status={stateLuminaries !== undefined && stateLuminaries.l3 ? 'checked' : 'unchecked'}
                />
            </View>
            <View style={styles.singleLuminary}>
                <Text>L4</Text>
                <RadioButton
                    status={stateLuminaries !== undefined && stateLuminaries.l4 ? 'checked' : 'unchecked'}
                />
            </View>
            <View style={styles.singleLuminary}>
                <Text>L5</Text>
                <RadioButton
                    status={stateLuminaries !== undefined && stateLuminaries.l5 ? 'checked' : 'unchecked'}
                />
            </View>
            <View style={styles.singleLuminary}>
                <Text>L6</Text>
                <RadioButton
                    status={stateLuminaries !== undefined && stateLuminaries.l6 ? 'checked' : 'unchecked'}
                />
            </View>
            <View style={styles.singleLuminary}>
                <Text>L7</Text>
                <RadioButton
                    status={stateLuminaries !== undefined && stateLuminaries.l7 ? 'checked' : 'unchecked'}
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