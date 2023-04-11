import React, { Component } from 'react';
import { Text, ScrollView, View } from 'react-native';
import { Card } from '@rneui/themed';
import { StyleSheet } from 'react-native';
import axios from 'axios';

import { baseUrl } from '../comun/comun';

function RenderItem(props) {

    const item = props.item;
    const styles = StyleSheet.create({
        title: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            color: 'chocolate',
            padding: 10,
            fontSize: 35,
            fontWeight: 'bold',
            textAlign: 'center',
        },
    });

    if (item != null) {
        return (
            <Card>
                <Card.Divider />
                <Card.Image source={{ uri: baseUrl + item.imagen }}></Card.Image>
                <Card.Title style={styles.title}>{item.nombre}</Card.Title>
                <Text style={{ margin: 20 }}>
                    {item.descripcion}
                </Text>
            </Card>
        );
    }
    else {
        return (<View></View>);
    }
}

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            excursiones: "",
            cabeceras: "",
            actividades: "",
            loading: true,
        };

        const request1 = axios.get('http://192.168.31.197:3001/excursiones');
        const request2 = axios.get('http://192.168.31.197:3001/cabeceras');
        const request3 = axios.get('http://192.168.31.197:3001/actividades');

        axios.all([request1, request2, request3])
            .then(axios.spread((response1, response2, response3) => {
                this.setState({
                    excursiones: response1.data,
                    cabeceras: response2.data,
                    actividades: response3.data,
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

        return (
            <ScrollView>
                <RenderItem item={this.state.cabeceras.filter((cabecera) => cabecera.destacado)[0]} />
                <RenderItem item={this.state.excursiones.filter((excursion) => excursion.destacado)[0]} />
                <RenderItem item={this.state.actividades.filter((actividad) => actividad.destacado)[0]} />
            </ScrollView>
        );
    }
}

export default Home;