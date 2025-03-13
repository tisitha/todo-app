import { Text, View, Pressable, useColorScheme } from 'react-native';
import { dmode, lmode } from './Colors';

type Props = {
    label: string,
    onPress: () => void
}

export default function Button({ label, onPress }: Props) {
    return (
        <View>
            <Pressable onPress={onPress} style={{ padding: 15 }}>
                <Text style={{ color: useColorScheme() === 'dark' ? dmode.text : lmode.text }}>{label}</Text>
            </Pressable>
        </View>
    )
}
