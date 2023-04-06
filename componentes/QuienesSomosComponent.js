import React, { Component } from 'react';
import { Text, View, FlatList, ScrollView } from 'react-native';
import { Card } from '@rneui/themed';
import { HISTORIA } from '../comun/historia';
import { ACTIVIDADES } from '../comun/actividades';
import { ListItem, Avatar } from '@rneui/themed';

function Historia(props) {
    const titulo = 'Un poquito de historia';
    const historia = props.historia;
    return (
        <Card>
            <Card.Title>{titulo}</Card.Title>
            <Card.Divider />
            <Text style={{ margin: 10 }}>
                {historia.contenido}
            </Text>
            <Text style={{ margin: 10 }}>
                {historia.agradecimientos}
            </Text>
            <Text style={{ margin: 10 }}>
                {historia.despedida}
            </Text>
        </Card>
    );
}


class QuienesSomos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            historia: HISTORIA,
            actividades: ACTIVIDADES
        };
    }

    render() {

        const renderActividadesItem = ({ item, index }) => {
            return (
                <ListItem
                    key={index}
                    bottomDivider>
                    <Avatar source={require('./imagenes/40Años.png')} />
                    <ListItem.Content>
                        <ListItem.Title>{item.nombre}</ListItem.Title>
                        <ListItem.Subtitle>{item.descripcion}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            );
        };

        const titulo = 'Actividades y recursos';
        return (
            <ScrollView >
                <Historia historia={this.state.historia[0]} />
                <Card>
                    <Card.Title>{titulo}</Card.Title>
                    <Card.Divider />
                    <FlatList
                        scrollEnabled={false}
                        data={this.state.actividades}
                        renderItem={renderActividadesItem}
                        keyExtractor={item => item.id.toString()}
                    />
                </Card>
            </ScrollView>
        );

    }
}

export default QuienesSomos;