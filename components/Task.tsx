import { Text, useColorScheme, View } from 'react-native';
import { dmode, lmode } from './Colors';

type Props = {
    label: string
};

export default function Task({ label }: Props) {

    return (
        <View style={{ width: '80%' }}>
            <Text style={{ color: useColorScheme() === 'dark' ? dmode.text : lmode.text }}>{label}</Text>
        </View>
    )
}