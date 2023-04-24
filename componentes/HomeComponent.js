import React, { Component } from 'react';
import { Text, ScrollView, View } from 'react-native';
import { Card } from '@rneui/themed';
import { StyleSheet } from 'react-native';
import { baseUrl } from '../comun/comun';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        excursiones: state.excursiones,
        cabeceras: state.cabeceras,
        actividades: state.actividades
    }
}

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
    render() {
        if (this.props.excursiones.loading || this.props.cabeceras.loading || this.props.actividades.loading) {
            return <Text>Cargando...</Text>;
        }

        return (
            <ScrollView>
                <RenderItem item={this.props.cabeceras.cabeceras.filter((cabecera) => cabecera.destacado)[0]} />
                <RenderItem item={this.props.excursiones.excursiones.filter((excursion) => excursion.destacado)[0]} />
                <RenderItem item={this.props.actividades.actividades.filter((actividad) => actividad.destacado)[0]} />
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps)(Home);