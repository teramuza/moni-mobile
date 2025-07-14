import Header from "@scenes/SessionRequest/components/Header.tsx";
import {View} from "react-native";
import InputField from "@components/InputField/InputField.tsx";

const ShiftEndScene = () => {
    return (
        <View>
            <Header title={'Checkout Shift'} />
            <View>
                <InputField label='ID Karyawan' />
            </View>
        </View>
    )
}

export default ShiftEndScene;
