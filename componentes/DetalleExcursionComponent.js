import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList } from 'react-native';
import { COMENTARIOS } from '../comun/comentarios';
import { EXCURSIONES } from '../comun/excursiones';
import { StyleSheet } from 'react-native';
import { ListItem } from '@rneui/base';
import { Card, Icon } from '@rneui/themed';

function RenderComentario(props) {
    const renderComentariosItem = ({ item, index }) => {
        const parts = item.dia.split("T17");
        const fecha = parts[0];
        return (
            <ListItem
                key={index}
                bottomDivider>
                <ListItem.Content>
                    <ListItem.Title>Valoración: {item.valoracion}</ListItem.Title>
                    <ListItem.Subtitle>{item.comentario}</ListItem.Subtitle>
                    <ListItem.Subtitle>{item.autor}  {fecha}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        );
    };
    const comentarios = props.comentarios;
    return (
        <Card>
            <Card.Title>Comentarios</Card.Title>
            <Card.Divider />
            <FlatList
                scrollEnabled={false}
                data={comentarios}
                renderItem={renderComentariosItem}
                keyExtractor={item => item.id.toString()}
            />
        </Card>);
}

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
                < Text style={{ margin: 20 }}>
                    {excursion.descripcion}
                </Text>
                <Icon //raised
                    reverse
                    name={props.favorita ? 'heart' : 'heart-o'}
                    type='font-awesome'
                    color='#f50'
                    onPress={() => props.favorita ? console.log('La excursión ya se encuentra entre las favoritas') : props.onPress()} />
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
            excursiones: EXCURSIONES,
            comentarios: COMENTARIOS,
            favoritos: []
        };
    }

    marcarFavorito(excursionId) {
        this.setState({
            favoritos: this.state.favoritos.concat(excursionId)
        });
    }

    render() {
        const { excursionId } = this.props.route.params;
        return (
            <ScrollView>
                <RenderExcursion excursion={this.state.excursiones[+excursionId]} onPress={() => this.marcarFavorito(excursionId)} favorita={this.state.favoritos.some(elemento => elemento === excursionId)} />
                <RenderComentario comentarios={this.state.comentarios.filter((comentario) => comentario.excursionId === excursionId)} />

            </ScrollView>
        );
    }
}

export default DetalleExcursion;