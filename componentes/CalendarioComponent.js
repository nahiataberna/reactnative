import React, { Component } from 'react';
import { ListItem, Avatar } from '@rneui/themed';
import { SafeAreaView, FlatList, Text } from 'react-native';
import axios from 'axios';
import { baseUrl } from '../comun/comun';

class Calendario extends Component {
    constructor(props) {
        super(props);
        this.state = {
            excursiones: '',
            loading: true
        };

        const request = axios.get('http://192.168.31.197:3001/excursiones');

        axios.all([request])
            .then(axios.spread((response) => {
                this.setState({
                    excursiones: response.data,
                    loading: false
                });
            }))
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        if (this.state.loading) {
            return <Text>Cargando...</Text>;
        }

        const { navigate } = this.props.navigation;

        const renderCalendarioItem = ({ item, index }) => {
            return (
                <ListItem
                    key={index}
                    onPress={() => navigate('DetalleExcursion', { excursionId: item.id })}
                    bottomDivider>
                    <Avatar source={{ uri: baseUrl + item.imagen }} />
                    <ListItem.Content>
                        <ListItem.Title>{item.nombre}</ListItem.Title>
                        <ListItem.Subtitle>{item.descripcion}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            );
        };

        return (
            <SafeAreaView>
                <FlatList
                    data={this.state.excursiones}
                    renderItem={renderCalendarioItem}
                    keyExtractor={item => item.id.toString()}
                />
            </SafeAreaView>
        );
    }
}

export default Calendario;
