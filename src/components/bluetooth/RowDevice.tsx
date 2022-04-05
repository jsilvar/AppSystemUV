import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, StatusBar } from 'react-native';


import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import IconMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';

class RowDevice extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedId:null,
            ...props
        }
        console.log('PROPS FROM CONSTRUCTOR', props)
    }

    onPress(item) {
        console.log('ID', item)
        this.setState({
            selectedId: item
        })
    }


    componentDidMount() {
        console.log('COMPONENT ROWDEVICE', this.props)
    }

    render() {
        const { title, id } = this.state
        const { selectedId } = this.state
        const backgroundColor = id === selectedId ? "#6e3b6e" : "#f9c2ff";
        const color = id === selectedId ? 'white' : 'black';

        
        console.log('SELECTED ID', selectedId, 'BACKGROUNDCOLOR', backgroundColor, 'TEXTCOLOR', color)

        return (
            <TouchableOpacity onPress={() => this.onPress(id)} style={[styles.item, { backgroundColor: backgroundColor }]}>
                <View  >
                    <Text>{title}</Text>
                    <View style={styles.container_text} >
                        <Text style={styles.title}>
                            {title}
                        </Text>
                        <Text style={styles.description}>
                            {id}
                        </Text>
                    </View>
                    {id
                        ? <IconMaterialCommunity name="bluetooth-off" style={styles.photo} color="#900" />
                        : <IconMaterialCommunity name="bluetooth-transfer" style={styles.photo} color="#900" />}
                    {title
                        ? <IconMaterial name="bluetooth-disabled" solid style={styles.photo} color="#900" />
                        : <IconMaterial name="bluetooth-connected" solid style={styles.photo} color="#900" />}

                </View>
            </TouchableOpacity>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        marginLeft: 16,
        marginRight: 16,
        marginBottom: 8,
        borderRadius: 5,
        backgroundColor: '#FFF',
        elevation: 2,
        marginTop: StatusBar.currentHeight || 0,
    },
    title: {
        fontSize: 16,
        color: '#F0F',
    },
    container_text: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 12,
        justifyContent: 'center',
    },
    description: {
        fontSize: 11,
        fontStyle: 'italic',
    },
    photo: {
        height: 50,
        width: 50,
    },
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
});

export default RowDevice;