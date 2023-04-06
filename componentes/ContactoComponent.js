import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Card } from '@rneui/themed';
import { CONTACTO } from '../comun/contacto';


function RenderContacto(props) {

    const contacto = props.contacto;
    const titulo = 'Información de contacto';

    if (contacto != null) {
        return (
            <Card>
                <Card.Title>{titulo}</Card.Title>
                <Card.Divider />
                <Text style={{ margin: 10 }}>
                    {contacto.saludo}
                </Text>
                <Text style={{ margin: 10 }}>
                    {contacto.contenido}
                </Text>
                <Text style={{ margin: 10 }}>
                    {contacto.despedida}
                </Text>
                <Text style={{ margin: 10 }}>
                    {contacto.telefono}
                </Text>
                <Text style={{ margin: 10 }}>
                    {contacto.email}
                </Text>
            </Card>
        );
    }
    else {
        return (<View></View>);
    }
}

class Contacto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contacto: CONTACTO
        };
    }

    render() {

        return (<RenderContacto contacto={this.state.contacto[0]} />);

    }
}

export default Contacto;