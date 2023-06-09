import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, Modal, TextInput, Button } from 'react-native';
import { StyleSheet } from 'react-native';
import { ListItem } from '@rneui/base';
import { Card, Icon, Input } from '@rneui/themed';
import { baseUrl } from '../comun/comun';
import { connect } from 'react-redux';
import { postFavorito, postComentario } from '../redux/ActionCreators';
import { useState } from 'react';
import { colorGaztaroaOscuro } from '../comun/comun';
import { Rating } from 'react-native-ratings';

const mapStateToProps = state => {
    return {
        excursiones: state.excursiones,
        comentarios: state.comentarios,
        favoritos: state.favoritos
    }
};

const mapDispatchToProps = dispatch => ({
    postFavorito: (excursionId) => dispatch(postFavorito(excursionId)),
    postComentario: (excursionId, rating, nombre, comentario, dia) => dispatch(postComentario(excursionId, rating, nombre, comentario, dia)),
});



function RenderComentario(props) {
    const renderComentariosItem = ({ item, index }) => {
        const parts = item.dia.split("T");
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

    const showModal = () => {
        props.updateShowModal(true);
    };

    const hideModal = () => {
        props.updateShowModal(false);
        props.updateNombre('');
        props.updateComentario('');
        props.updateRating(3);
    };

    const handleNombreChange = (text) => {
        props.updateNombre(text);
    };

    const handleComentarioChange = (text) => {
        props.updateComentario(text);
    };
    const handleSubmit = () => {
        hideModal();
        const fechaActual = new Date();
        props.postComentario(excursion.id, props.rating, props.nombre, props.comentario, fechaActual.toISOString())
    };

    ratingCompleted = (rating) => {
        props.updateRating(rating);
    };
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
        modalContainer: {
            backgroundColor: '#fff',
            padding: 20,
            borderRadius: 10,
            margin: 50,
        },
        modalTitle: {
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 10,
        },
        inputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 20,
        },
        buttonContainer: {
            flexDirection: 'row',
            justifyContent: 'space-around',
        },

    });

    if (excursion != null) {
        return (
            <Card>
                <Card.Image source={{ uri: baseUrl + excursion.imagen }}></Card.Image>
                <Card.Title style={styles.title}>{excursion.nombre}</Card.Title>
                < Text style={{ margin: 20 }}>
                    {excursion.descripcion}
                </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Icon //raised
                        reverse
                        name={props.favorita ? 'heart' : 'heart-o'}
                        type='font-awesome'
                        color='#f50'
                        onPress={() => props.favorita ? console.log('La excursión ya se encuentra entre las favoritas') : props.onPress()} />
                    <Icon //raised
                        reverse
                        name='pencil'
                        type='font-awesome'
                        color={colorGaztaroaOscuro}
                        onPress={showModal} />
                </View>

                <Modal visible={props.showModal} animationType="slide">
                    <View style={styles.modalContainer}>
                        <View>
                            <Rating
                                showRating
                                onFinishRating={this.ratingCompleted}
                                style={{ paddingVertical: 10 }}
                            />

                        </View>
                        <View style={styles.inputContainer}>
                            <Icon name="user" type="font-awesome" color="#ccc" />
                            <Input
                                placeholder="Nombre"
                                value={props.nombre}
                                onChangeText={handleNombreChange}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Icon name="comment" type="font-awesome" color="#ccc" />
                            <Input
                                placeholder="Comentario"
                                value={props.comentario}
                                onChangeText={handleComentarioChange}
                            />
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button title="Enviar" onPress={handleSubmit} />
                            <Button title="Cancelar" onPress={hideModal} />
                        </View>

                    </View>
                </Modal>
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
            rating: 3,
            nombre: '',
            comentario: '',
            showModal: false
        }
    }
    marcarFavorito(excursionId) {
        this.props.postFavorito(excursionId);
    }
    updateShowModal = (showModal) => {
        this.setState({ showModal: showModal });
    }
    updateRating = (rating) => {
        this.setState({ rating: rating });
    }
    updateComentario = (comentario) => {
        this.setState({ comentario: comentario });
    }
    updateNombre = (nombre) => {
        this.setState({ nombre: nombre });
    }
    render() {
        if (this.props.excursiones.isLoading || this.props.comentarios.isLoading) {
            return <Text>Cargando...</Text>;
        }
        const { excursionId } = this.props.route.params;
        return (
            <ScrollView>
                <RenderExcursion
                    excursion={this.props.excursiones.excursiones[+excursionId]}
                    onPress={() => this.marcarFavorito(excursionId)}
                    favorita={this.props.favoritos.favoritos.some(el => el === excursionId)}
                    rating={this.state.rating}
                    nombre={this.state.nombre}
                    comentario={this.state.comentario}
                    showModal={this.state.showModal}
                    updateShowModal={this.updateShowModal}
                    updateRating={this.updateRating}
                    updateComentario={this.updateComentario}
                    updateNombre={this.updateNombre}
                    postComentario={this.props.postComentario} />
                <RenderComentario
                    comentarios={this.props.comentarios.comentarios.filter((comentario) => comentario.excursionId === excursionId)} />

            </ScrollView>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetalleExcursion);