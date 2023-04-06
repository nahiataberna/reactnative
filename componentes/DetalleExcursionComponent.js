import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Card } from '@rneui/themed';
import { EXCURSIONES } from '../comun/excursiones';
import { StyleSheet } from 'react-native';

function RenderExcursion(props) {

    const excursion = props.excursion;

    const styles = StyleSheet.create({
        title: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            color: 'chocolate',
            padding: 40,
            fontSize: 35,
            fontWeight: 'bold',
            textAlign: 'center',
        },
    });

    if (excursion != null) {
        return (
            <Card>
                <Card.Image source={require('./imagenes/40Años.png')}></Card.Image>
                <Card.Title style={styles.title}>{excursion.nombre}</Card.Title>
                <Text style={{ margin: 20 }}>
                    {excursion.descripcion}
                </Text>
            </Card>
        );
    }
    else {
        return (<View></View>);
    }
}

class DetalleExcursion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            excursiones: EXCURSIONES
        };
    }

    render() {
        const { excursionId } = this.props.route.params;
        return (<RenderExcursion excursion={this.state.excursiones[+excursionId]} />);
    }
}

export default DetalleExcursion;