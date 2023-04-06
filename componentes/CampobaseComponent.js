import React, { Component } from 'react';
import Constants from 'expo-constants';
import Calendario from './CalendarioComponent';
import DetalleExcursion from './DetalleExcursionComponent';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './HomeComponent';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Contacto from './ContactoComponent';
import QuienesSomos from './QuienesSomosComponent';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function HomeNavegador() {
    return (
        <Stack.Navigator initialRouteName="Home" screenOptions={{
            headerMode: 'screen',
            headerTintColor: '#fff',
            headerStyle: { backgroundColor: '#015afc' }, headerTitleStyle: { color: '#fff' },
        }} >
            <Stack.Screen
                name="Etxea"
                component={Home}
                options={{
                    title: 'Campo Base',
                }}
            />
        </Stack.Navigator>
    );
}

function ContactoNavegador() {
    return (
        <Stack.Navigator initialRouteName="Contacto" screenOptions={{
            headerMode: 'screen',
            headerTintColor: '#fff',
            headerStyle: { backgroundColor: '#015afc' }, headerTitleStyle: { color: '#fff' },
        }} >
            <Stack.Screen
                name="Contacto2"
                component={Contacto}
                options={{
                    title: 'Contacto',
                }}
            />
        </Stack.Navigator>
    );
}

function QuienesSomosNavegador() {
    return (
        <Stack.Navigator initialRouteName="QuienesSomos" screenOptions={{
            headerMode: 'screen',
            headerTintColor: '#fff',
            headerStyle: { backgroundColor: '#015afc' }, headerTitleStyle: { color: '#fff' },
        }} >
            <Stack.Screen
                name="QuienesSomos2"
                component={QuienesSomos}
                options={{
                    title: 'Quiénes somos',
                }}
            />
        </Stack.Navigator>
    );
}

function DrawerNavegador() {
    return (
        <Drawer.Navigator initialRouteName=" Drawer" screenOptions={{
            headerShown: false,
            drawerStyle: {
                backgroundColor: '#c2d3da',
            },
        }} >
            <Drawer.Screen name="Campo base" component={HomeNavegador} />
            <Drawer.Screen name="Quiénes somos" component={QuienesSomosNavegador} />
            <Drawer.Screen name="Calendario" component={CalendarioNavegador} />
            <Drawer.Screen name="Contacto" component={ContactoNavegador} />

        </Drawer.Navigator>
    );
}

function CalendarioNavegador() {
    return (
        <Stack.Navigator
            initialRouteName="Calendario"
            headerMode="float"
            screenOptions={{
                headerTintColor: '#fff',
                headerStyle: { backgroundColor: '#015afc' },
                headerTitleStyle: { color: '#fff' },
            }}
        >
            <Stack.Screen
                name="Calendario2"
                component={Calendario}
                options={{
                    title: 'Calendario Gaztaroa',
                }}
            />
            <Stack.Screen
                name="DetalleExcursion"
                component={DetalleExcursion}
                options={{
                    title: 'Detalle Excursión',
                }}
            />
        </Stack.Navigator>
    );
}

class Campobase extends Component {
    render() {
        return (
            <NavigationContainer>
                <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight }}>
                    <DrawerNavegador />
                </View>
            </NavigationContainer>
        );
    }
}

export default Campobase;